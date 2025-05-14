export interface McpServer {
  key: string
  name?: string
  chineseName?: string
  Abstract?: string
  AbstractCN?: string
  Category?: string
  FromSite?: string
  status?: 'running' | 'stopped' | string
}
