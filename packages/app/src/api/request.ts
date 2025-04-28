// import { LLMConfig } from '@/types/llm'
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { LLMModel, Model } from '@/types/llm'
import { ProviderConfig } from '@/types/provider'
import i18n from '@/i18n'

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
      timeout: 60 * 60 * 1000,
      ...config,
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      config => {
        // 这里可以添加 token 等通用请求头
        const currentLang = i18n.global.locale.value
        config.headers['Accept-Language'] = currentLang
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

export const systemApi = {
  // 获取系统信息
  async locale(locale: string) {
    return request.get('/', { locale })
  },
}

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

  // 删除会话
  async removeSession(sessionId: number) {
    return request.delete(`/api/session/${sessionId}`)
  },

  // 对话总结
  async summarySession(config) {
    return request.post(`/api/session/summary`, config)
  },

  // 发送消息，本地
  async sendMessage(
    model: LLMModel,
    messages: Array<{ role: string; content: string }>,
    sessionId,
    onProgress?: (content: string) => void,
    onProgressReasoning?: (reasoning_content: string) => void,
  ) {
    try {
      const currentLang = i18n.global.locale.value
      const response = await fetch(API_BASE_URL + '/api/local/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': currentLang,
        },
        body: JSON.stringify({ model, messages, sessionId }),
      })
      handleStream(response, onProgress, onProgressReasoning)
    } catch (error) {
      console.error('Chat error:', error)
      throw error
    }
  },

  // 获取消息记录
  async getMessages(sessionId) {
    return request.get(`/api/chat/${sessionId}`)
  },

  // 获取会话设置
  async getSettings(sessionId: number) {
    return request.get<{
      title: string
      systemPrompt: string
      temperature: number
      top_p: number
      presence_penalty: number
      frequency_penalty: number
    }>(`/api/session/${sessionId}/settings`)
  },

  // 更新会话设置
  async updateSettings(
    sessionId: number,
    settings: {
      title?: string
      systemPrompt?: string
      temperature?: number[]
      top_p?: number[]
      presence_penalty?: number[]
      frequency_penalty?: number[]
    },
  ) {
    return request.post(`/api/session/${sessionId}/settings`, settings)
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
          'Accept-Language': i18n.global.locale.value,
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
  async syncModel() {
    return request.get('/api/ollama/sync')
  },
  async getAllModels() {
    return request.get('/api/ollama/models')
  },
}

export const mcpApi = {
  async listAllTools() {
    return request.get('/api/mcp/listAllTools') 
  },
  async restartServer() {
    return request.get('/api/mcp/restartServer') 
  },
  
  async fetchReadme(url: string): Promise<string> {
    return request.get<string>('/api/mcp/fetch-readme', { url })
  },

  // 添加MCP服务器
  async addMcpServer(serverData: Record<string, any>): Promise<any> {
    return request.post('/api/mcp/add-server', serverData)
  },
  
  // 更新MCP服务器
  async updateMcpServer(serverData: Record<string, any>): Promise<any> {
    return request.put('/api/mcp/update-server', serverData)
  },
  
  // 新增：获取已安装的MCP服务器列表
  async getInstalledServers(): Promise<any[]> {
    return request.get('/api/mcp/installed-servers')
  },
  
  // 删除MCP服务器
  async deleteMcpServer(serverKey: string): Promise<any> {
    return request.delete(`/api/mcp/server/${serverKey}`)
  },
  
  // 启动MCP服务器
  async startMcpServer(serverKey: string): Promise<any> {
    return request.post(`/api/mcp/server/${serverKey}/start`)
  },
  
  // 停止MCP服务器
  async stopMcpServer(serverKey: string): Promise<any> {
    return request.post(`/api/mcp/server/${serverKey}/stop`)
  },
}

export const llmApi = {
  // 获取模型列表
  async getModels(provider: string) {
    return request.get(`/api/llm/models/${provider}`)
  },

  async addProvider(form: ProviderConfig) {
    return request.post(`/api/provider/addProvider`, form)
  },
  async deleteProvider(provider_id: string) {
    return request.delete(`/api/provider/${provider_id}`)
  },
  async addModel(form: Model) {
    return request.post(`/api/provider/addModel`, form)
  },
  async updateModel(form: Model) {
    return request.post(`/api/provider/updateModel`, form)
  },
  async deleteModel(modelId: string) {
    return request.delete(`/api/provider/deleteModel/${modelId}`)
  },
  
  async getProvidersAndModels() {
    return request.get(`/api/llm/providersAndModels`)
  },

  // 测试连接
  async testConnection(provider: string, config: any, model) {
    return request.post(`/api/llm/test/${provider}`, { ...config, model })
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
    return request.post(`/api/llm/configModel/state`, { modelId, config })
  },

  // 发送消息，LLM API
  async sendMessageLlm(
    model: LLMModel,
    messages: Array<{ role: string; content: string }>,
    sessionId,
    onProgress?: (content: string) => void,
    onProgressReasoning?: (reasoning_content: string) => void,
    tools?: any[],
  ) {
    const provider = model.provider_id

    const requestBody: any = { model, provider, messages, sessionId }
    
    // 只有当tools存在且长度大于0时才添加到请求体中
    if (tools && tools.length > 0) {
      requestBody.tools = tools
    } else {
      console.log('没有tools，不添加到请求体中')
    }

    try {
      const response = await fetch(API_BASE_URL + '/api/llm/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': i18n.global.locale.value,
        },
        body: JSON.stringify(requestBody)
      })
      handleStream(response, onProgress, onProgressReasoning)
    } catch (error) {
      console.error('Chat error:', error)
      throw error
    }
  },
}

const handleStream = async (response, onProgress, onProgressReasoning) => {
  const reader = response.body?.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let isThinking = false
  let thinkContent = ''
  let formalContent = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const processChunk = chunk => {
        buffer += chunk
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        lines.forEach(line => {
          if (!line.trim()) return
          try {
            const data = JSON.parse(line)
            if (line.includes('tool')) {
              // debugger
            }
            // console.log('data:', data);
            const reasoning_content = data.choices[0]?.delta?.reasoning_content || ''
            const content = data.choices[0]?.delta?.content || ''

            // 处理思考标记
            if (content === '<think>') {
              isThinking = true
              // 只发送标记，不累加
              onProgress?.('<think>')
              return
            }

            if (isThinking && content === '</think>') {
              isThinking = false
              // 发送结束标记
              onProgress?.('</think>')
              return
            }

            // 直接发送增量内容，不在这里累加
            if (content && onProgress) {
              onProgress(content)
            }
            if(reasoning_content && onProgressReasoning) {
              onProgressReasoning(reasoning_content)
            }
          } catch (e) {
            console.error('解析错误:', e)
            console.log('原始数据:', line)
            console.log('原始数据类型:', typeof line)
          }
        })
      }
      processChunk(decoder.decode(value, { stream: true }))
    }
  } finally {
    reader?.releaseLock()
  }
}

