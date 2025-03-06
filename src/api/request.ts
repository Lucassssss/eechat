// import { LLMConfig } from '@/types/llm'
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { LLMModel } from '@/types/llm'

export const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://127.0.0.1:7002' // 生产环境服务器地址
    : 'http://localhost:7002' // 开发环境地址

// 请求配置接口
interface RequestConfig extends AxiosRequestConfig {
  loading?: boolean
}

// 统一响应格式
interface ApiResponse<T = any> {
  code: number // 0: 成功, 非0: 失败
  data: T | null // 响应数据
  message: string // 提示信息
}

class Request {
  private instance: AxiosInstance

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 60000,
      ...config,
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      config => {
        // 这里可以添加 token 等通用请求头
        return config
      },
      error => Promise.reject(error),
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        const { code, data, message } = response.data
        // console.log(response)

        // 业务状态判断
        if (code !== 0) {
          // 统一处理业务错误
          return Promise.reject(new Error(message || '请求失败'))
        }

        // 成功返回数据
        return data
      },
      error => {
        // 处理 HTTP 错误
        const message = error.response?.data?.message || error.message
        return Promise.reject(new Error(message))
      },
    )
  }

  // 通用请求方法
  public async request<T = any>(config: RequestConfig): Promise<T> {
    try {
      const response = await this.instance.request<any, T>(config)
      return response
    } catch (error) {
      return Promise.reject(error)
    }
  }

  // GET 请求
  public get<T = any>(
    url: string,
    params?: any,
    config?: RequestConfig,
  ): Promise<T> {
    return this.request({ ...config, method: 'GET', url, params })
  }

  // POST 请求
  public post<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<T> {
    return this.request({ ...config, method: 'POST', url, data })
  }

  // PUT 请求
  public put<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<T> {
    return this.request({ ...config, method: 'PUT', url, data })
  }

  // DELETE 请求
  public delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE', url })
  }
}

// 导出请求实例
export const request = new Request()

// 聊天相关的 API 方法
export const chatApi = {
  // 创建新对话
  async createChat(title?: string) {
    return request.post('/api/session/new', { title })
  },

  // 获取历史会话列表
  async getSessions() {
    return request.get('/api/session/list', {
      // params: {
      //   page: 1,
      //   pageSize: 20,
      // },
    })
  },

  // 发送消息，本地
  async sendMessage(
    model: LLMModel,
    messages: Array<{ role: string; content: string }>,
    sessionId,
    onProgress?: (content: string) => void,
  ) {
    try {
      const response = await fetch(API_BASE_URL + '/api/local/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model, messages, sessionId }),
      })

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (!line || !line.startsWith('data: ')) continue

          try {
            const data = JSON.parse(line.slice(5))
            if (data.code === 0 && data.data?.content) {
              onProgress?.(data.data.content)
            }
          } catch (e) {
            console.error('Parse response error:', e)
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error)
      throw error
    }
  },

  // 获取消息记录
  async getMessages(sessionId) {
    return request.get(`/api/chat/${sessionId}`)
  },
}

export const ollamaApi = {
  // 获取 Ollama 状态
  async getOllamaSatate() {
    return request.get('/api/ollama/state')
  },
  async installOllama() {
    return request.post('/api/ollama/install')
  },
  async startOllama() {
    return request.post('/api/ollama/start')
  },
  async stopOllama() {
    return request.post('/api/ollama/stop')
  },
  async restartOllama() {
    return request.post('/api/ollama/restart')
  },
  async pullModel(modelName) {
    try {
      const response = await fetch(API_BASE_URL + '/api/ollama/pull', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ modelName }),
      })
      return response
    } catch (error) {}
  },
  async listModel() {
    return await request.get('/api/ollama/list')
  },
  async removeModel(modelName: string) {
    return request.delete(`/api/ollama/remove/${modelName}`)
  },
}

export const llmApi = {
  // 获取模型列表
  async getModels(provider: string) {
    return request.get(`/api/llm/models/${provider}`)
  },

  // 测试连接
  async testConnection(provider: string, config: any) {
    return request.post(`/api/llm/test/${provider}`, config)
  },

  // 获取提供商列表
  async getProviders() {
    return request.get('/api/llm/providers')
  },

  // 获取提供商配置
  async getConfigProvider(provider: string) {
    return request.get(`/api/llm/configProvider/${provider}`)
  },

  // 保存提供商列表
  async saveConfigProvider(provider, config) {
    return request.post(`/api/llm/configProvider/${provider}`, config)
  },

  // 保存提供商列表
  async saveConfigProviderState(provider, config) {
    return request.post(`/api/llm/configProvider/state/${provider}`, config)
  },

  // 获取模型配置列表
  // async getConfigModels(provider: string) {
  //   return request.get(`/api/llm/configModel/${provider}`)
  // },

  // 更新模型状态
  async saveConfigModelState(modelId: string, config: any) {
    return request.post(`/api/llm/configModel/state/${modelId}`, config)
  },

  // 发送消息，LLM API
  async sendMessageLlm(
    model: LLMModel,
    messages: Array<{ role: string; content: string }>,
    sessionId,
    onProgress?: (content: string) => void,
  ) {
    const provider = model.provider_id
    try {
      const response = await fetch(API_BASE_URL + '/api/llm/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model, provider, messages, sessionId }),
      })

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (!line || !line.startsWith('data: ')) continue

          try {
            const data = JSON.parse(line.slice(5))
            if (data.code === 0 && data.data?.content) {
              onProgress?.(data.data.content)
            }
          } catch (e) {
            console.error('Parse response error:', e)
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error)
      throw error
    }
  },
}
