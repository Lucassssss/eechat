const fs = require('fs')
const path = require('path')
const paths = require('../config/paths')
const { app } = require('electron')
const sqlite3 = require('sqlite3').verbose()
let logger = null
let pkg = null
// console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
// console.log('process.resourcesPath:', process.resourcesPath)

// 数据库文件路径
// const dbPath = path.join(app.getPath('userData'), 'database', 'database.db')
// const dbPath = path.join(__dirname, '../database/database.db')
const dbPath = paths.databasePath

// SQL目录
const sqlDir = path.join(__dirname, './updateSQl')
const initSqlDir = path.join(sqlDir, 'init')
const updateSqlDir = path.join(sqlDir, 'update')

function getPkg() {
  let pkgPath
  const isDev = process.env.NODE_ENV !== 'production'
  logger.info('isDev:', isDev)
  if (isDev) {
    pkgPath = path.join(__dirname, '../../../package.json')
  } else {
    pkgPath = path.join(process.resourcesPath, 'package.json')
  }
  const pkg = require(pkgPath)
  logger.info('version:', pkg.version)
  return pkg
}

// 获取应用版本号并转换为数据库版本号
function getAppVersion() {
  const version = pkg.version.split('.')
  return parseInt(version[0]) * 100 + parseInt(version[1])
}

// 获取所有SQL升级文件
function getSqlUpdateFiles() {
  const files = fs
    .readdirSync(updateSqlDir)
    .filter(file => file.endsWith('.sql'))
    .sort((a, b) => {
      // 从文件名中提取版本号（假设格式为vX.Y.sql）
      const versionA = a.match(/v(\d+)\.(\d+)\.sql/)
      const versionB = b.match(/v(\d+)\.(\d+)\.sql/)

      if (!versionA || !versionB) return 0

      const majorA = parseInt(versionA[1])
      const minorA = parseInt(versionA[2])
      const majorB = parseInt(versionB[1])
      const minorB = parseInt(versionB[2])

      if (majorA !== majorB) return majorA - majorB
      return minorA - minorB
    })

  return files.map(file => ({
    path: path.join(updateSqlDir, file),
    version: getVersionFromFileName(file),
  }))
}

// 获取初始化SQL文件列表
function getInitSqlFiles() {
  const files = fs
    .readdirSync(initSqlDir)
    .filter(file => file.endsWith('.sql'))
    .sort() // 按文件名字母顺序排序，确保执行顺序一致

  return files.map(file => ({
    name: path.basename(file, '.sql'),
    path: path.join(initSqlDir, file),
  }))
}

// 初始化数据库
async function initializeDatabase(db) {
  logger.info('开始初始化数据库...')

  try {
    // 获取并执行所有初始化SQL文件
    const initFiles = getInitSqlFiles()
    for (const file of initFiles) {
      logger.info(`导入${file.name}数据...`)
      await executeSqlFile(db, file.path)
    }

    // 设置初始版本为当前应用版本
    const appVersion = getAppVersion()
    await setVersion(db, appVersion)

    logger.info(`数据库初始化完成，版本设置为 ${appVersion}`)
    return true
  } catch (err) {
    logger.error('初始化数据库失败:', err)
    throw err
  }
}

// 检查数据库是否需要初始化
async function checkNeedInitialize(db) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT COUNT(*) as count FROM llm_providers`, (err, row) => {
      if (err) {
        // 如果表不存在，说明需要初始化
        if (err.message.includes('no such table')) {
          resolve(true)
          return
        }
        reject(err)
        return
      }
      // 如果表存在但没有数据，也需要初始化
      resolve(row.count === 0)
    })
  })
}

// 主函数
async function updateDatabase(appLogger) {
  logger = appLogger
  logger.info('开始升级数据库...')
  pkg = getPkg()
  // 确保数据库目录存在
  const dbDir = path.dirname(dbPath)

  // 检查数据库文件是否存在
  async function connectToDatabase(retryCount = 3) {
    if (!fs.existsSync(dbPath)) {
      if (retryCount <= 0) {
        throw new Error('数据库文件不存在，已达到最大重试次数')
      }

      logger.info(
        `数据库文件不存在，等待3秒后重试 (剩余重试次数: ${retryCount})`,
      )
      await new Promise(resolve => setTimeout(resolve, 3000))
      return connectToDatabase(retryCount - 1)
    }

    // 只在数据库文件存在时打开连接
    return new Promise((resolve, reject) => {
      const database = new sqlite3.Database(
        dbPath,
        sqlite3.OPEN_READWRITE, // 只读取模式，不创建
        err => {
          if (err) {
            logger.error('打开数据库失败:', err)
            reject(err)
            return
          }
          resolve(database)
        },
      )
    })
  }

  let db

  try {
    db = await connectToDatabase()
  } catch (err) {
    logger.error('无法连接到数据库:', err)
    throw err
  }

  try {
    // 检查是否需要初始化
    const needInitialize = await checkNeedInitialize(db)

    if (needInitialize) {
      await initializeDatabase(db)
    } else {
      // 获取当前数据库版本
      const currentVersion = await getCurrentVersion(db)
      logger.info(`当前数据库版本: ${currentVersion}`)

      // 获取所有SQL升级文件
      const updateFiles = getSqlUpdateFiles()
      logger.info(`找到 ${updateFiles.length} 个SQL升级文件`)

      // 执行版本高于当前版本的SQL文件
      for (const file of updateFiles) {
        if (file.version > currentVersion) {
          logger.info(
            `执行SQL升级文件: ${path.basename(file.path)} (版本 ${
              file.version
            })`,
          )
          await executeSqlFile(db, file.path)
          await setVersion(db, file.version)
          logger.info(`数据库已升级到版本 ${file.version}`)
        }
      }

      logger.info('数据库升级完成')
    }
  } catch (err) {
    logger.error('升级数据库时出错:', err)
    throw err
  } finally {
    db.close()
  }
}

// 导出升级函数
module.exports = updateDatabase

// 获取当前数据库版本
async function getCurrentVersion(db) {
  return new Promise((resolve, reject) => {
    db.get('PRAGMA user_version', (err, row) => {
      if (err) {
        reject(err)
        return
      }
      resolve(row.user_version)
    })
  })
}

// 设置数据库版本
async function setVersion(db, version) {
  return new Promise((resolve, reject) => {
    db.run(`PRAGMA user_version = ${version}`, err => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

// 执行SQL文件
async function executeSqlFile(db, filePath) {
  const sql = fs.readFileSync(filePath, 'utf8')

  // 分割SQL语句（按分号分割，但忽略注释行中的分号）
  const statements = []
  let currentStatement = ''

  // 按行分割SQL
  const lines = sql.split('\n')
  for (const line of lines) {
    const trimmedLine = line.trim()
    // 跳过注释行
    if (trimmedLine.startsWith('--')) continue

    // 添加到当前语句
    currentStatement += line + '\n'

    // 如果行以分号结尾，则认为是一个完整语句
    if (trimmedLine.endsWith(';')) {
      statements.push(currentStatement.trim())
      currentStatement = ''
    }
  }

  // 添加最后一个语句（如果没有分号结尾）
  if (currentStatement.trim()) {
    statements.push(currentStatement.trim())
  }

  // 执行每个语句
  for (const statement of statements) {
    if (statement.trim()) {
      try {
        await new Promise((resolve, reject) => {
          // logger.info(
          //   `执行SQL: ${statement.substring(0, 100)}${
          //     statement.length > 100 ? '...' : ''
          //   }`,
          // )
          db.run(statement, err => {
            if (err) {
              // 忽略"column already exists"错误
              if (
                err.message.includes('duplicate column name') ||
                err.message.includes('already exists')
              ) {
                logger.info(`警告: ${err.message}`)
                resolve()
                return
              }
              reject(err)
              return
            }
            resolve()
          })
        })
      } catch (error) {
        logger.error(`执行SQL语句失败: ${statement}`)
        logger.error(`错误信息: ${error.message}`)
        throw error
      }
    }
  }
}

// 从文件名获取版本号
function getVersionFromFileName(fileName) {
  const match = fileName.match(/v(\d+)\.(\d+)\.sql/)
  if (!match) return 0

  const major = parseInt(match[1])
  const minor = parseInt(match[2])

  return major * 100 + minor // 例如：v1.2.sql -> 102
}