const { Service } = require('egg')

module.exports = class ProviderService extends Service {
  constructor(ctx) {
    super(ctx)
  }

  async addProvider(uid, provider_id, api_key, base_url, state) {
    const { ctx } = this
    try {
      const exsist = await ctx.model.LlmConfigProvider.findOne({
        where: {
          uid,
          provider_id,
        }
      })
      if (exsist) {
        throw new Error('provider already exists')
      } else {
        const newProvider = ctx.model.LlmConfigProvider.create({
          uid,
          provider_id,
          api_key,
          base_url,
          state,
        })
        return newProvider
      }
    } catch (error) {
      throw error
    }
  }

  async deleteProvider(uid, provider_id) {
    const { ctx } = this
    try {
      const providerConfig = await ctx.model.LlmConfigProvider.findOne({
        where: {
          uid,
          provider_id,
        }
      })
      if (providerConfig) {
        await providerConfig.destroy({force: true})
      }
      const modelConfigs = await ctx.model.LlmConfigModel.findAll({
        where: {
          uid,
          provider_id,
        }
      })
      if (modelConfigs && modelConfigs.length > 0) {
        for (const config of modelConfigs) {
          await config.destroy({force: true})
        }
      }
      const providerDefault = await ctx.model.LlmProvider.findOne({
        where: {
          id: provider_id,
        }
      })
      if (providerDefault) {
        await providerDefault.destroy()
      }
      const modelsDefault = await ctx.model.LlmModel.findAll({
        where: {
          provider_id,
        }
      })
      if (modelsDefault && modelsDefault.length > 0) {
        for (const config of modelsDefault) {
          await config.destroy();
        }
      }
      return true
    } catch (error) {
      throw error
    }
  }

  async addModel(uid, provider_id, model_id, state, name, group_name, capabilities, _) {
    const { ctx } = this
    try {
      const exsist = await ctx.model.LlmConfigModel.findOne({
        where: {
          provider_id,
          model_id,
        }
      })
      if (exsist) {
        throw new Error('model already exists')
      }
      const newModel = ctx.model.LlmConfigModel.create({
        uid,
        provider_id,
        model_id,
        state,
        name,
        group_name,
        parameters: JSON.stringify({capabilities}),
      })
      return newModel
    } catch (error) {
      throw error
    }
  }

  async updateModel(uid, provider_id, model_id, state, name, group_name, capabilities, _) {
    const { ctx } = this
    try {
      const modelConfig = await ctx.model.LlmConfigModel.findOne({
        where: {
          uid,
          provider_id,
          model_id,
        }
      })
      if (modelConfig) {
        modelConfig.model_id = model_id
        modelConfig.state = state
        modelConfig.name = name
        modelConfig.group_name = group_name
        modelConfig.parameters = JSON.stringify({capabilities})
        await modelConfig.save()
        return modelConfig
      }
    } catch (error) {
      throw error
    }
  }

  async deleteModel(uid, model_id) {
    const { ctx } = this
    try {
      const modelConfig = await ctx.model.LlmConfigModel.findOne({
        where: {
          uid,
          model_id,
        }
      })
      if (modelConfig) {
        await modelConfig.destroy({force: true})
        return true
      }
    } catch (error) {
      throw error
    }
  }
}