const { Controller } = require('egg')

class ChatController extends Controller {
  async sendMessageLocal() {
    const { ctx } = this
    const { model, messages, sessionId } = ctx.request.body
    try {
      // const { model, provider, messages, config } = loopArgs
      const result = await ctx.service.chat.sendMessageLocal(
        model,
        messages,
        sessionId,
      )
      ctx.body = ctx.helper.success(result)
    } catch (error) {
      ctx.helper.streamError(ctx, error, sessionId)
    }
  }

  async history() {
    const { ctx } = this
    const { page = 1, pageSize = 20 } = ctx.query
    const sessionId = ctx.params.id
    const uid = 'default-user'
    try {
      const result = await ctx.service.chat.getHistory(
        sessionId,
        uid,
        page,
        pageSize,
      )
      ctx.body = ctx.helper.success(result)
    } catch (error) {
      ctx.body = ctx.helper.error(error.message)
    }
  }

  async createSession() {
    const { ctx } = this
    const { title = '👋 Hi' } = ctx.request.body

    try {
      // 创建新会话
      const session = {
        title,
        uid: 'default-user', // 暂时使用默认用户
      }
      const result = await ctx.service.chat.createSession(session)
      ctx.body = ctx.helper.success(result)
    } catch (error) {
      ctx.body = ctx.helper.error(error.message)
    }
  }

  async listSession() {
    const { ctx } = this
    const { page = 1, pageSize = 20 } = ctx.query

    try {
      const result = await ctx.service.chat.listSession(page, pageSize)

      ctx.body = ctx.helper.success(result)
    } catch (error) {
      ctx.body = ctx.helper.error(error.message)
    }
  }

  async removeSession() {
    const { ctx } = this
    const { id } = ctx.params

    try {
      const result = await ctx.service.chat.removeSession(id)
      ctx.body = ctx.helper.success(result)
    } catch (error) {
      ctx.body = ctx.helper.error(error.message)
    }
  }

  async summary() {
    const { ctx } = this
    const { model, messages, sessionId } = ctx.request.body
    try {
      const result = await ctx.service.chat.summary(model, messages, sessionId)
      ctx.body = ctx.helper.success(result)
    } catch (error) {
      ctx.body = ctx.helper.error(error.message)
    }
  }

  async updateSettings() {
    const { ctx } = this
    const { id } = ctx.params
    const settings = ctx.request.body

    try {
      const result = await ctx.service.chat.updateSettings(id, settings)
      ctx.body = ctx.helper.success(result)
    } catch (error) {
      ctx.body = ctx.helper.error(error.message)
    }
  }

  async getSettings() {
    const { ctx } = this
    const { id } = ctx.params

    try {
      const settings = await ctx.service.chat.getSettings(id)
      ctx.body = ctx.helper.success(settings)
    } catch (error) {
      ctx.body = ctx.helper.error(error.message)
    }
  }
}

module.exports = ChatController
