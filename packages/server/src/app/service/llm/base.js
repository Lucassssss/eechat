const { Service } = require('egg')
const crypto = require('crypto')
const modelList = require('../../../tools/modelList')

class BaseLLMService extends Service {
  constructor(ctx) {
    super(ctx)
  }

  async getConfig(provider_id) {
    try {
      const config = await this.ctx.model.LlmConfigProvider.findOne({
        where: { provider_id },
        order: [['created_at', 'DESC']],
      })

      if (!config) return null

      return {
        apiKey: this.decrypt(config.api_key),
        baseUrl: config.base_url,
      }
    } catch (error) {
      this.ctx.logger.error('获取配置失败:', error)
      throw new Error('获取配置失败: ' + error.message)
    }
  }

  async saveConfig(provider, config) {
    try {
      const { apiKey, baseUrl, models } = config

      const existConfig = await this.ctx.model.LlmConfigProvider.findOne({
        where: { provider },
      })

      const data = {
        api_key: this.encrypt(apiKey),
        base_url: baseUrl,
        models: JSON.stringify(models || []),
        updated_at: new Date(),
      }

      if (existConfig) {
        await existConfig.update(data)
      } else {
        await this.ctx.model.LlmConfigProvider.create({
          provider,
          ...data,
          created_at: new Date(),
        })
      }
      return true
    } catch (error) {
      this.ctx.logger.error('保存配置失败:', error)
      throw new Error('保存配置失败: ' + error.message)
    }
  }

  // 添加/更新模型
  async updateModels(provider, newModels) {
    const config = await this.getConfig(provider)
    if (!config) throw new Error('配置不存在')

    const existingModels = config.models || []
    // 合并模型，以新模型为准
    const mergedModels = [...newModels]

    await this.saveConfig(provider, {
      ...config,
      models: mergedModels,
    })
  }

  // 加密存储
  encrypt(text) {
    if (!text) return text
    const key = crypto.scryptSync(this.app.config.keys, 'salt', 32)
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return iv.toString('hex') + ':' + encrypted
  }

  decrypt(text) {
    if (!text) return text
    const [ivHex, encryptedHex] = text.split(':')
    if (!ivHex || !encryptedHex) return text

    try {
      const key = crypto.scryptSync(this.app.config.keys, 'salt', 32)
      const iv = Buffer.from(ivHex, 'hex')
      const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
      let decrypted = decipher.update(encryptedHex, 'hex', 'utf8')
      decrypted += decipher.final('utf8')
      return decrypted
    } catch (error) {
      this.ctx.logger.error('解密失败:', error)
      return text
    }
  }

  async listModels() {
    const provider = this.provider
    const baseModels = modelList[provider]

    if (!baseModels) {
      return {
        name: provider.charAt(0).toUpperCase() + provider.slice(1),
        description: `${provider} 模型系列`,
        models: [],
      }
    }

    return baseModels
  }
}

module.exports = BaseLLMService
