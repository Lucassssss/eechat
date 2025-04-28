const { Controller } = require('egg')

class OllamaController extends Controller {
  async state() {
    const { ctx } = this
    try {
      const state = await ctx.service.ollama.checkState()
      ctx.body = ctx.helper.success(state)
    } catch (error) {
      ctx.body = ctx.helper.error(error.message)
    }
  }
  async start() {
    const { ctx } = this
    try {
      await ctx.service.ollama.start()
      ctx.body = ctx.helper.success()
    } catch (error) {
      ctx.body = ctx.helper.error(error.message)
    }
  }
  async stop() {
    const { ctx } = this
    try {
      await ctx.service.ollama.stop()
      ctx.body = ctx.helper.success()
    } catch (error) {
      ctx.body = ctx.helper.error(error.message)
    }
  }

  async restart() {
    const { ctx } = this
    try {
      await ctx.service.ollama.restart()
      ctx.body = ctx.helper.success()
    } catch (error) {
      ctx.body = ctx.helper.error(error.message)
    }
  }

  async install() {
    const { ctx } = this
    try {
      const data = await ctx.service.ollama.install()
      ctx.body = ctx.helper.success(data)
    } catch (error) {
      ctx.body = ctx.helper.error(error.message)
    }
  }

  async pullModel() {
    const { ctx } = this
    const { modelName } = ctx.request.body
    try {
      await ctx.service.ollama.pullModel(modelName)
      // ctx.body = ctx.helper.success()
    } catch (error) {
      ctx.body = ctx.helper.error(error.message)
    }
  }

  async listModel() {
    const { ctx } = this
    try {
      const data = await ctx.service.ollama.listModel()
      ctx.body = ctx.helper.success(data)
    } catch (error) {
      ctx.body = ctx.helper.error(error.message)
    }
  }

  async removeModel() {
    const { ctx } = this
    const { name } = ctx.params

    try {
      const result = await ctx.service.ollama.removeModel(name)
      ctx.body = ctx.helper.success(result)
    } catch (error) {
      ctx.body = ctx.helper.error(error.message)
    }
  }
  async syncModelFromOllama() {
    const { ctx } = this
    try {
      const result = await ctx.service.ollama.syncModelFromOllama()
      ctx.body = ctx.helper.success(result)
    } catch (error) {
      ctx.body = ctx.helper.error(error.message)
    }
  }
  async getLocalOllamaModels() {
    const { ctx } = this
    try {
      const result = await ctx.service.ollama.getLocalOllamaModels()
      ctx.body = ctx.helper.success(result)
    } catch (error) {
      ctx.body = ctx.helper.error(error.message)
    }
  }
}

module.exports = OllamaController
