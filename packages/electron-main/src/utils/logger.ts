import { createRequire } from 'node:module'
import { app } from 'electron'
import path from 'path'

const require = createRequire(import.meta.url)
const log = require('electron-log')

// 配置日志
log.transports.file.resolvePathFn = variables =>
  path.join(app.getPath('userData'), 'logs', 'eechat-app', variables.fileName)
log.transports.file.level = 'debug'

Object.assign(console, log.functions)

// 创建应用范围的日志实例
export const AppLog = log.scope('APP')
export const McpLog = log.scope('MCP')

// 导出日志实例供其他模块使用
export default log