/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app

  // 测试接口
  router.get('/', controller.home.index)

  router.post('/api/local/chat', controller.chat.sendMessageLocal)
  router.get('/api/chat/:id', controller.chat.history)
  router.post('/api/session/new', controller.chat.createSession)
  router.get('/api/session/list', controller.chat.listSession)
  router.delete('/api/session/:id', controller.chat.removeSession)
  // 对话总结标题
  router.post('/api/session/summary', controller.chat.summary)
  router.get('/api/session/:id/settings', controller.chat.getSettings)
  router.post('/api/session/:id/settings', controller.chat.updateSettings)

  router.get('/api/ollama/models', controller.ollama.getLocalOllamaModels)
  router.get('/api/ollama/sync', controller.ollama.syncModelFromOllama)
  router.get('/api/ollama/state', controller.ollama.state)
  router.post('/api/ollama/start', controller.ollama.start)
  router.post('/api/ollama/stop', controller.ollama.stop)
  router.post('/api/ollama/restart', controller.ollama.restart)
  router.post('/api/ollama/install', controller.ollama.install)
  router.post('/api/ollama/pull', controller.ollama.pullModel)
  router.get('/api/ollama/list', controller.ollama.listModel)
  router.delete('/api/ollama/remove/:name', controller.ollama.removeModel)

  // LLM API 路由
  // LLM 基础数据
  // router.post('/api/llm/config/:provider', controller.llm.saveConfig)
  router.post('/api/llm/test/:provider', controller.llm.testConnection)
  router.get('/api/llm/models/:provider', controller.llm.listModels)
  router.get('/api/llm/providers', controller.llm.listProviders)
  router.get('/api/llm/providersAndModels', controller.llm.providersAndModels)
  router.post('/api/provider/addProvider', controller.provider.addProvider)
  router.delete('/api/provider/:provider', controller.provider.deleteProvider)
  router.post('/api/provider/addModel', controller.provider.addModel)
  router.post('/api/provider/updateModel', controller.provider.updateModel)
  router.delete('/api/provider/deleteModel/:id', controller.provider.deleteModel)

  // LLM 模型配置
  router.get(
    '/api/llm/configProvider/:providerId',
    controller.llm.getConfigProvider,
  )
  router.post(
    '/api/llm/configProvider/:providerId',
    controller.llm.saveConfigProvider,
  )
  router.post(
    '/api/llm/configProvider/state/:providerId',
    controller.llm.saveConfigProviderState,
  )
  // router.get(
  //   '/api/llm/configModel/:providerId/:modelId',
  //   controller.llm.getConfigModel,
  // )
  // router.get(
  //   '/api/llm/configModel/:providerId',
  //   controller.llm.getConfigModelList,
  // )
  // router.post(
  //   '/api/llm/configModel/:providerId',
  //   controller.llm.saveConfigModel,
  // )
  router.post('/api/llm/configModel/state', controller.llm.saveConfigModelState)

  router.post('/api/llm/chat', controller.llm.chat)
  // mcp
  router.get('/api/mcp/listAllTools', controller.mcp.listAllTools)
  router.get('/api/mcp/restartServer', controller.mcp.restartServer)
  // MCP相关接口
  router.get('/api/mcp/fetch-readme', controller.mcp.fetchReadme)
  router.post('/api/mcp/add-server', controller.mcp.addServer)
  router.put('/api/mcp/update-server', controller.mcp.updateServer) // 新增更新接口
  // 新增：获取已安装的MCP服务器列表
  router.get('/api/mcp/installed-servers', controller.mcp.getInstalledServers)
  
  // MCP服务器管理
  router.delete('/api/mcp/server/:key', controller.mcp.deleteServer)
  router.post('/api/mcp/server/:key/start', controller.mcp.startServer)
  router.post('/api/mcp/server/:key/stop', controller.mcp.stopServer)
}
