const { Subscription } = require('egg')
const exec = require('child_process').exec

class UpdateModelsSubscription extends Subscription {
  static get schedule() {
    return {
      cron: '0 0 */12 * * *', // 每12小时执行一次
      type: 'worker',
    }
  }

  async subscribe() {
    try {
      exec('npm run update-models', (error, stdout, stderr) => {
        if (error) {
          this.ctx.logger.error('更新模型列表失败:', error)
          return
        }
        this.ctx.logger.info('模型列表更新成功:', stdout)
      })
    } catch (error) {
      this.ctx.logger.error('执行更新模型脚本失败:', error)
    }
  }
}

module.exports = UpdateModelsSubscription
