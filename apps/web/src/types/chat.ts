export interface Message {
  id: number
  uid: string
  role: 'user' | 'assistant' | 'system'
  content: string
  created_at: string
  updated_at: string
}

export interface ChatHistoryResponse {
  total: number
  page: number
  pageSize: number
  data: Message[]
}

export interface ChatSession {
  id: number
  uid: string
  title: string
  model: string
  updated_at: string
  created_at: string
}