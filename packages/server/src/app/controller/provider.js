const { Controller } = require('egg');

class ProviderController extends Controller {
  async addProvider() {
    const { ctx } = this
    const uid = ctx.request.query.uid || 'default-user'
    const { provider_id, api_key, base_url, state } = ctx.request.body
    try {
      const configs = await ctx.service.provider.addProvider(uid, provider_id, api_key, base_url, state)
      ctx.body = ctx.helper.success(configs) 
    } catch (error) {
      ctx.body = ctx.helper.error(error)
    }
  }

  async deleteProvider() {
    const { ctx } = this
    const uid = ctx.request.query.uid || 'default-user'
    const { provider } = ctx.params
    try {
      const configs = await ctx.service.provider.deleteProvider(uid, provider)
      ctx.body = ctx.helper.success(configs)
    } catch (error) {
      ctx.body = ctx.helper.error(error)
    }
  }

  async addModel() {
    const { ctx } = this
    const uid = ctx.request.query.uid || 'default-user'
    const { id, provider_id, state, name, group_name, capabilities, _, } = ctx.request.body
    const model_id = `${provider_id}:${id}`
    try {
      const configs = await ctx.service.provider.addModel(uid, provider_id, model_id, state, name, group_name, capabilities, _,)
      ctx.body = ctx.helper.success(configs) 
    } catch (error) {
      ctx.body = ctx.helper.error(error)
    }
  }

  async updateModel() {
    const { ctx } = this
    const uid = ctx.request.query.uid || 'default-user'
    const { id, provider_id, state, name, group_name, capabilities, _, } = ctx.request.body
    const model_id = `${provider_id}:${id}`
    try {
      const configs = await ctx.service.provider.updateModel(uid, provider_id, model_id, state, name, group_name, capabilities, _,)
      ctx.body = ctx.helper.success(configs) 
    } catch (error) {
      ctx.body = ctx.helper.error(error)
    }
  }

  async deleteModel() {
    const { ctx } = this
    const uid = ctx.request.query.uid || 'default-user'
    const { id } = ctx.params
    const model_id = `${id}`
    try {
      const configs = await ctx.service.provider.deleteModel(uid, model_id)
      ctx.body = ctx.helper.success(configs)
    } catch (error) {
      ctx.body = ctx.helper.error(error)
    }
  }
}

module.exports = ProviderController;
