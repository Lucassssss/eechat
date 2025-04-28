const { Controller } = require('egg');

class McpController extends Controller {
  async listAllTools() {
    const { ctx } = this

    try {
      const res = await ctx.service.mcp.listAllTools()
      ctx.body = ctx.helper.success(res)
    } catch (error) {
      ctx.body = ctx.helper.error(error.message)
    }
  }
  async restartServer() {
    const { ctx } = this

    try {
      const res = await ctx.service.mcp.restartServer()
      ctx.body = ctx.helper.success(res)
    } catch (error) {
      ctx.body = ctx.helper.error(error.message)
    }
  }

  // 获取README内容
  async fetchReadme() {
    const { ctx } = this
    const { url } = ctx.query
  
    try {
      if (!url) {
        ctx.body = ctx.helper.error('URL不能为空')
        return
      }
  
      const content = await ctx.service.mcp.fetchReadme(url)
      ctx.body = ctx.helper.success(content)
    } catch (error) {
      ctx.logger.error('获取README失败:', error)
      ctx.body = ctx.helper.error(error.message)
    }
  }
  
  // 添加MCP服务器
  async addServer() {
    const { ctx } = this
    const serverData = ctx.request.body
  
    try {
      if (!serverData || Object.keys(serverData).length === 0) {
        ctx.body = ctx.helper.error('服务器数据不能为空')
        return
      }
  
      const result = await ctx.service.mcp.addServer(serverData)
      ctx.body = ctx.helper.success(result)
    } catch (error) {
      ctx.logger.error('添加MCP服务器失败:', error)
      ctx.body = ctx.helper.error(error.message)
    }
  }
  
  // 获取已安装的MCP服务器列表
  async getInstalledServers() {
    const { ctx } = this
    
    try {
      const servers = await ctx.service.mcp.getInstalledServers()
      ctx.body = ctx.helper.success(servers)
    } catch (error) {
      ctx.logger.error('获取已安装MCP服务器列表失败:', error)
      ctx.body = ctx.helper.error(error.message)
    }
  }
  
  // 删除MCP服务器
  async deleteServer() {
    const { ctx } = this
    const { key } = ctx.params
    
    try {
      if (!key) {
        ctx.body = ctx.helper.error('服务器标识不能为空')
        return
      }
      
      const result = await ctx.service.mcp.deleteServer(key)
      ctx.body = ctx.helper.success(result)
    } catch (error) {
      ctx.logger.error(`删除MCP服务器 ${key} 失败:`, error)
      ctx.body = ctx.helper.error(error.message)
    }
  }
  
  // 启动MCP服务器
  async startServer() {
    const { ctx } = this
    const { key } = ctx.params
    
    try {
      if (!key) {
        ctx.body = ctx.helper.error('服务器标识不能为空')
        return
      }
      
      const result = await ctx.service.mcp.startServer(key)
      ctx.body = ctx.helper.success(result)
    } catch (error) {
      ctx.logger.error(`启动MCP服务器 ${key} 失败:`, error)
      ctx.body = ctx.helper.error(error.message)
    }
  }
  
  // 停止MCP服务器
  async stopServer() {
    const { ctx } = this
    const { key } = ctx.params
    
    try {
      if (!key) {
        ctx.body = ctx.helper.error('服务器标识不能为空')
        return
      }
      
      const result = await ctx.service.mcp.stopServer(key)
      ctx.body = ctx.helper.success(result)
    } catch (error) {
      ctx.logger.error(`停止MCP服务器 ${key} 失败:`, error)
      ctx.body = ctx.helper.error(error.message)
    }
  }
  
  // 更新MCP服务器
  async updateServer() {
    const { ctx } = this
    const serverData = ctx.request.body
    
    try {
      if (!serverData || Object.keys(serverData).length === 0) {
        ctx.body = ctx.helper.error('服务器配置不能为空')
        return
      }
      
      const result = await ctx.service.mcp.updateServer(serverData)
      ctx.body = ctx.helper.success(result)
    } catch (error) {
      ctx.logger.error('更新MCP服务器失败:', error)
      ctx.body = ctx.helper.error(error.message)
    }
  }
}
module.exports = McpController;
