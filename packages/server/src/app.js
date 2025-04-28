// app.js
const paths = require('./config/paths')
class AppBootHook {
  constructor(app) {
    this.app = app
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用
    this.app.logger.info("[AppDataPath]:", paths.appDataPath)
  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务
  }

  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用
    try {
      const res = await this.app.model.sync({ alter: true })
      this.app.logger.info('数据库结构同步成功')
    } catch (error) {
      this.app.logger.error('数据库结构同步失败:', error)
    }
  }

  async didReady() {
    // 应用已经启动完毕
    try {
      const updateDatabase = require('./scripts/updateDatabase')
      await updateDatabase(this.app.logger)
      this.app.logger.info('数据库初始化/更新成功')
    } catch (error) {
      this.app.logger.error('数据库初始化/更新失败:', error)
      // 如果数据库初始化失败，可以选择退出应用
      // process.exit(1)
    }
  }

  async serverDidReady() {
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例
  }
}

module.exports = AppBootHook
