const Controller = require('egg').Controller

class LLMController extends Controller {
  async saveConfig() {
    const { ctx } = this
    const { provider } = ctx.params
    const config = ctx.request.body

    try {
      await ctx.service.llm.saveConfig(provider, config)
      ctx.body = ctx.helper.success()
    } catch (error) {
      ctx.body = ctx.helper.error(error.message)
    }
  }

  async testConnection() {
    const { ctx } = this
    const { provider } = ctx.params
    const config = ctx.request.body
    const { model } = ctx.request.body

    try {
      const result = await ctx.service.llm.testConnection(provider, config, model)
      ctx.body = ctx.helper.success(result)
    } catch (error) {
      ctx.body = ctx.helper.error(error.message)
    }
  }

  async listModels() {
    const { ctx } = this
    const { provider } = ctx.params

    try {
      const models = await ctx.service.llm.listModels(provider)
      ctx.body = ctx.helper.success(models)
    } catch (error) {
      ctx.body = ctx.helper.error(error)
    }
  }

  async listProviders() {
    const { ctx } = this
    try {
      const providers = await ctx.service.llm.listProviders()
      ctx.body = ctx.helper.success(providers)
    } catch (error) {
      ctx.body = ctx.helper.error(error)
    }
  }

  async providersAndModels() {
    const { ctx } = this
    try {
      const providers = await ctx.service.llm.providersAndModels()
      ctx.body = ctx.helper.success(providers)
    } catch (error) {
      ctx.body = ctx.helper.error(error)
    }
  }

  // 获取指定提供商的配置信息
  async getConfigProvider() {
    const { ctx } = this
    const uid = ctx.request.query.uid || 'default-user'
    const { providerId } = ctx.params
    try {
      const configs = await ctx.service.llm.getConfigProvider(uid, providerId)
      ctx.body = ctx.helper.success(configs)
    } catch (error) {
      ctx.body = ctx.helper.error(error)
    }
  }

  // 保存用户模型提供商配置
  async saveConfigProvider() {
    const { ctx } = this
    const uid = ctx.request.query.uid || 'default-user'
    const { providerId } = ctx.params
    const config = ctx.request.body
    try {
      const configs = await ctx.service.llm.saveConfigProvider(
        uid,
        providerId,
        config,
      )
      ctx.body = ctx.helper.success(configs)
    } catch (error) {
      ctx.body = ctx.helper.error(error)
    }
  }

  // 更新提供商状态
  async saveConfigProviderState() {
    const { ctx } = this
    const { providerId } = ctx.params
    const config = ctx.request.body
    const uid = ctx.request.query.uid || 'default-user'
    try {
      const res = await ctx.service.llm.saveConfigProviderState(
        uid,
        providerId,
        config,
      )
      ctx.body = ctx.helper.success(res)
    } catch (error) {
      ctx.body = ctx.helper.error(error.message)
    }
  }

  // 获取指定模型配置信息
  // async getConfigModel() {
  //   const { ctx } = this
  //   const { providerId, modelId } = ctx.params
  //   try {
  //   const uid = ctx.request.query.uid || 'default-user'
  //     const config = await ctx.service.llm.getConfigModel(uid, providerId, modelId)
  //     ctx.body = ctx.helper.success(config)
  //   } catch (error) {
  //     ctx.body = ctx.helper.error(error)
  //   }
  // }

  // 获取提供商下模型配置列表
  // async getConfigModelList() {
  //   const { ctx } = this
  //   const { providerId } = ctx.params
  //   const uid = ctx.request.query.uid || 'default-user'
  //   try {
  //     const config = await ctx.service.llm.getConfigModelList(uid, providerId)
  //     ctx.body = ctx.helper.success(config)
  //   } catch (error) {
  //     ctx.body = ctx.helper.error(error)
  //   }
  // }

  // 保存模型配置
  // async saveConfigModel() {
  //   const { ctx } = this
  //   const { providerId, modelId } = ctx.params
  //   const config = ctx.request.body
  //   const uid = ctx.request.query.uid || 'default-user'
  //   try {
  //     const res = await ctx.service.llm.saveConfigModel(uid, providerId, modelId, config)
  //     ctx.body = ctx.helper.success(res)
  //   } catch (error) {
  //     ctx.body = ctx.helper.error(error)
  //   }
  // }

  // 更新模型开启状态
  async saveConfigModelState() {
    const { ctx } = this
    const { modelId, config } = ctx.request.body
    const uid = ctx.request.query.uid || 'default-user'
    try {
      const res = await ctx.service.llm.saveConfigModelState(
        uid,
        modelId,
        config,
      )
      ctx.body = ctx.helper.success(res)
    } catch (error) {
      ctx.body = ctx.helper.error(error.message)
    }
  }

  // 对话
  async chat() {
    const { ctx } = this
    const { model, provider, messages, sessionId, config, tools } = ctx.request.body
    const uid = ctx.request.query.uid || 'default-user'
    try {
      const res = await ctx.service.llm.chat(
        model,
        provider,
        messages,
        sessionId,
        config,
        tools,
      )
      ctx.body = ctx.helper.success(res)
    } catch (error) {
      ctx.body = ctx.helper.error(error)
    }
  }
}

module.exports = LLMController
