const OpenAI = require('openai')
const BaseLLMService = require('./base')

class DeepseekService extends BaseLLMService {
  constructor(ctx) {
    super(ctx)
    this.provider = 'deepseek'
  }

  async createClient(config) {
    return new OpenAI({
      // apiKey: this.decrypt(config.apiKey),
      apiKey: config.apiKey,
      baseURL: config.baseUrl || 'https://api.deepseek.com/v1',
    })
  }

  async testConnection(config) {
    try {
      console.log(config)

      const client = await this.createClient(config)
      const model_id = model.id.includes(':') ? model.id.split(':').pop()  : model.id
      const response = await client.chat.completions.create({
        model: model_id,
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 1,
      })
      return response.choices.length > 0
    } catch (error) {
      throw new Error(`连接测试失败: ${error.message}`)
    }
  }

  async listModels() {
    // 使用基类的 listModels 方法
    return super.listModels()
  }

  async chat(model, messages, config) {
    try {
      const configSaved = await this.getConfig('deepseek')
      console.log(configSaved)
      const client = await this.createClient(configSaved)
      const model_id = model.id.includes(':') ? model.id.split(':').pop()  : model.id
      const response = await client.chat.completions.create({
        model: model_id,
        messages,
        stream: true,
        // max_tokens: 2048,
        // temperature: 0.7,
      })
      // return response.choices[0].message.content
      return response
    } catch (error) {
      throw new Error(`Deepseek 对话失败: ${error.message}`)
    }
  }

  async chatNoStream(messages, modelName) {
    const { ctx } = this
    try {
      const configSaved = await this.getConfig('deepseek')
      const client = await this.createClient(configSaved)
      const response = await client.chat.completions.create({
        model: 'deepseek-chat',
        messages,
        stream: false,
        // max_tokens: 2048,
        // temperature: 0.7,
      })
      return response
    } catch (error) {
      ctx.logger.error(error)
      throw new Error(error.message)
    }
  }
}

module.exports = DeepseekService
