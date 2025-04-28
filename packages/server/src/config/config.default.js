const { app } = require('electron')
const path = require('path')
const paths = require('./paths')

module.exports = appInfo => {
  const config = (exports = {})

  // 使用环境变量来区分环境
  const isProd = process.env.NODE_ENV === 'production'

  // 基础配置
  config.keys = appInfo.name + '_1740383378737_8971'
  config.middleware = []

  // 跨域配置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  }

  // 根据环境配置不同的端口
  config.cluster = {
    listen: {
      port: isProd ? 7001 : 7002,
    },
  }

  // 安全配置
  config.security = {
    csrf: {
      enable: false,
    },
    xframe: {
      enable: false,
    },
    domainWhiteList: ['*'],
  }

  // 日志
  config.logger = {
    dir: path.join(paths.logsPath, 'eechat-server'),
    allowDebugAtProd: true,
    level: 'DEBUG',
    consoleLevel: 'DEBUG',
    encoding: 'utf8',
    when: 'D',
    keepFileExt: true,
    maxFiles: 10,
  }

  // 添加数据库配置
  config.sequelize = {
    dialect: 'sqlite',
    storage: paths.databasePath,
    // storage: path.join(app.getPath('userData'), 'database', 'database.db'),
    // storage: path.join(__dirname, '../database/database.db'),
    define: {
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
      underscored: true,
      constraints: false, // 禁用外键约束
    },
    logging: false, // 关闭 SQL 日志
    // logging: console.log,
    // sync: process.env.NODE_ENV !== 'production', // 非生产环境下自动同步
  }
  config.cors = {
    // credentials: true,
    // origin: ctx => ctx.get('origin'),
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  }

  config.i18n = {
    defaultLocale: 'en-US',
    writeCookie: false,
    queryField: 'locale',
    cookieField: 'locale',
    cookieMaxAge: '1y',
  }

  return config
}
