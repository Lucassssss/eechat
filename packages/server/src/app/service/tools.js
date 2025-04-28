const { Service } = require('egg')
const { type } = require('os')

module.exports = class ToolsService extends Service {
  constructor(ctx) {
    super(ctx)
    this.tools = [
      //   {
      //     "type": "function",
      //     "function": {
      //         "name": "get_weather",
      //         "description": "Get weather of an location, the user shoud supply a location first",
      //         "parameters": {
      //             "type": "object",
      //             "properties": {
      //                 "location": {
      //                     "type": "string",
      //                     "description": "The city and state, e.g. San Francisco, CA",
      //                 }
      //             },
      //             "required": ["location"]
      //         },
      //     }
      // },
    ]
  }

  addTool(name, tool) {
    this.tools[name] = tool
  }

  // 解析工具名称，提取服务器键和原始工具名
  parseMcpToolName(name) {
    if (name.startsWith('mcp_')) {
      const parts = name.split('_')
      if (parts.length >= 3) {
        const serverKey = parts[1]
        // 原始工具名可能包含下划线，需要重新组合
        const originalName = parts.slice(2).join('_')
        return { serverKey, originalName }
      }
    }
    return { serverKey: null, originalName: name }
  }

  async runTools(name, args) {
    console.log('run tools', name, args)

    // 检查是否是MCP工具
    if (name.startsWith('mcp_')) {
      try {
        const { serverKey, originalName } = this.parseMcpToolName(name)

        // 调用MCP服务的工具
        if (serverKey) {
          // 这里需要实现MCP工具的调用逻辑
          const result = await this.ctx.service.mcp.callTool(
            serverKey,
            originalName,
            args,
          )
          return result
        }
      } catch (error) {
        this.ctx.logger.error('MCP工具调用失败:', error)
        return `工具调用失败: ${error.message}`
      }
    }

    // 处理内置工具
    return 'tool: done, 北京：25℃'
  }

  async getTools() {
    try {
      const mcpTools = await this.ctx.service.mcp.listAllTools()
      const openaiTools = JSON.parse(
        JSON.stringify(this.convertMcpToolsToOpenaiTools(mcpTools)),
      )
      // console.log('转换后的工具列表:', JSON.stringify(openaiTools))
      // return this.tools
      return [...this.tools, ...openaiTools]
      return openaiTools
    } catch (error) {
      this.ctx.logger.error('获取工具列表失败:', error)
      console.error('获取工具列表失败:', error)
      return this.tools // 如果 MCP 工具获取失败，至少返回内置工具
    }
  }

  convertMcpToolsToOpenaiTools(mcpTools) {
    return mcpTools.map(tool => ({
      type: 'function',
      function: {
        name: `${tool.name}`,
        description: tool.description,
        parameters: {
          type: tool.inputSchema.type,
          properties: tool.inputSchema.properties,
          required: tool.inputSchema.required,
        },
      },
    }))
  }
}
