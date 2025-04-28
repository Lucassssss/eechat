import { defineStore } from 'pinia'
import { mcpApi } from '@/api/request'
import mcpMock from '@/api/mcpMock.json'

interface McpState {
  tools: any[]
  loading: boolean
  selectedTool: any | null
  selectedTools: any[] // 存储多选的工具
  error: string | null
  initialized: boolean
  toolsEnabled: boolean
  showAddNewDialog: boolean // 新增：控制弹窗显示
  selectedMcp: any | null // 新增：当前选中的MCP
  installedServers: any[] // 新增：已安装的MCP服务器列表
  loadingServers: boolean // 新增：加载服务器列表状态
}

export const useMcpStore = defineStore('mcp', {
  state: (): McpState => ({
    tools: [],
    loading: false,
    selectedTool: null,
    selectedTools: [],
    error: null,
    initialized: false,
    toolsEnabled: true,
    showAddNewDialog: false,
    selectedMcp: null,
    installedServers: [], // 新增：初始化为空数组
    loadingServers: false, // 新增：初始化为false
  }),

  actions: {
    // 获取所有工具列表
    async fetchTools() {
      if (this.loading) return

      try {
        this.loading = true
        this.error = null
        const response = await mcpApi.listAllTools()
        this.tools = response.tools || []
        this.initialized = true
      } catch (error) {
        console.error('获取MCP工具列表失败:', error)
        this.error = error instanceof Error ? error.message : '获取工具列表失败'
      } finally {
        this.loading = false
      }
    },

    async restartServer() {
      try {
        const res = await mcpApi.restartServer()
        console.log('MCP服务器已重启')
        return res
      } catch (error) {
        console.error('重启MCP服务器失败:', error)
        throw error
      }
    },

    // 选择单个工具
    selectTool(tool: any) {
      this.selectedTool = tool
      this.selectedTools = [tool] // 单选时也更新多选数组
    },

    // 选择多个工具
    selectMultipleTools(tools: any[]) {
      this.selectedTools = [...tools] // 使用浅拷贝避免引用问题
      // 如果有选择工具，则将第一个设为当前选中工具，保持向后兼容
      this.selectedTool = tools.length > 0 ? tools[0] : null
    },

    // 清除选择的工具
    clearSelectedTools() {
      this.selectedTool = null
      this.selectedTools = []
    },

    // 设置工具启用状态
    setToolsEnabled(enabled: boolean) {
      this.toolsEnabled = enabled
    },

    // 重置状态
    reset() {
      this.tools = []
      this.selectedTool = null
      this.selectedTools = []
      this.error = null
      this.initialized = false
      this.toolsEnabled = true
      this.installedServers = [] // 新增：重置服务器列表
    },
    
    // 新增：打开添加新MCP的弹窗
    openAddNewDialog(mcp = null) {
      this.selectedMcp = mcp
      this.showAddNewDialog = true
    },
    
    // 新增：关闭添加新MCP的弹窗
    closeAddNewDialog() {
      this.showAddNewDialog = false
      this.selectedMcp = null
    },
    
    // 新增：获取已安装的MCP服务器列表
    async fetchInstalledServers() {
      if (this.loadingServers) return
      
      try {
        this.loadingServers = true
        this.error = null
        const response = await mcpApi.getInstalledServers()
        this.installedServers = response || []
        // 获取服务器列表
        let servers = response || []
        
        // 从mcpMock.json中获取额外信息并合并
        if (servers.length > 0 && mcpMock.McpServer && mcpMock.McpServer.McpServers) {
          servers = servers.map(server => {
            // 在mcpMock.json中查找匹配的服务器
            const mockServer = mcpMock.McpServer.McpServers.find(
              mockServer => mockServer.Name === server.key
            )
            
            // 如果找到匹配的服务器，合并信息
            if (mockServer) {
              return {
                ...server,
                // 优先使用服务器自身的信息，如果没有则使用mock数据
                name: server.name || mockServer.Name,
                chineseName: server.chineseName || mockServer.ChineseName || mockServer.Name,
                AbstractCN: server.AbstractCN || mockServer.AbstractCN || mockServer.Abstract,
                Abstract: server.Abstract || mockServer.Abstract,
                Category: server.Category || mockServer.Category,
                FromSite: server.FromSite || mockServer.FromSite || 'local',
                FromSiteIcon: server.FromSiteIcon || mockServer.FromSiteIcon || 'https://resouces.modelscope.cn/studio-cover-pre/studio-cover_761f7bfe-fc5c-4753-b955-dcdd3288941b.png',
                Tools: server.Tools || mockServer.Tools || [],
                Readme: mockServer.Readme || '',
                ReadmeCN: mockServer.ReadmeCN || '',
                // 保留服务器状态和配置信息
                status: server.status,
                config: server.config,
              }
            } else {
              return {
                ...server,
                name: server.name || server.key,
                chineseName: server.chineseName || server.name || server.key,
                AbstractCN: server.AbstractCN || `本地MCP服务器 - ${server.key} \n \n`,
                Abstract: server.Abstract || `Local MCP Server - ${server.key}`,
                Category: server.Category || 'other',
                FromSite: server.FromSite || 'local',
                FromSiteIcon: server.FromSiteIcon || 'https://www.ee.chat/icon.svg',
                Tools: server.Tools || [],
                Readme: '',
                ReadmeCN: '',
                // 保留服务器状态和配置信息
                status: server.status,
                config: server.config,
              }
            }
            
            return server
          })
        }
        this.installedServers = servers
      } catch (error) {
        console.error('获取已安装MCP服务器列表失败:', error)
        this.error = error instanceof Error ? error.message : '获取服务器列表失败'
      } finally {
        this.loadingServers = false
      }
    },
    
    // 新增：刷新服务器列表
    async refreshServers() {
      await this.fetchInstalledServers()
    },
    
    // 删除MCP服务器
    async deleteMcpServer(serverKey: string) {
      try {
        await mcpApi.deleteMcpServer(serverKey)
        // 删除成功后刷新列表
        await this.fetchInstalledServers()
        return true
      } catch (error) {
        console.error('删除MCP服务器失败:', error)
        throw error
      }
    },
    
    // 启动MCP服务器
    async startMcpServer(serverKey: string) {
      try {
        await mcpApi.startMcpServer(serverKey)
        return true
      } catch (error) {
        console.error('启动MCP服务器失败:', error)
        throw error
      }
    },
    
    // 停止MCP服务器
    async stopMcpServer(serverKey: string) {
      try {
        await mcpApi.stopMcpServer(serverKey)
        return true
      } catch (error) {
        console.error('停止MCP服务器失败:', error)
        throw error
      }
    },
    
    // ... 现有代码 ...
  },

  getters: {
    // 获取当前选中的工具列表
    // getSelectedTools: (state) => state.selectedTools,
    getSelectedTools: state => {
      if (!state.toolsEnabled) {
        return []
      }
      return state.selectedTools
    },

    // 检查是否有工具被选中
    hasSelectedTools: state => state.selectedTools.length > 0,

    // 获取选中工具的数量
    selectedToolsCount: state => state.selectedTools.length,

    // 检查是否有工具可用
    hasTools: state => state.tools.length > 0,

    // 获取工具数量
    toolCount: state => state.tools.length,
  },
  persist: {
    pick: ['selectedTools', 'toolsEnabled'],
    // todo: 移除mcp工具时这里的缓存也需要清理
  },
})