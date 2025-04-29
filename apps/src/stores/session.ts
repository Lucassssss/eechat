import { defineStore } from 'pinia'
import { chatApi } from '@/api/request'
import type { ChatSession } from '@/types/chat'

interface SessionState {
  sessions: ChatSession[]
  activeSessionId: number
  currentSession: ChatSession | null
  settings: SessionSettings
}

interface SessionSettings {
  title: string
  systemPrompt: string
  temperature: number[]
  top_p: number[]
  presence_penalty: number[]
  frequency_penalty: number[]
}

export const useSessionStore = defineStore('session', {
  state: (): SessionState => ({
    sessions: [],
    activeSessionId: 0,
    currentSession: null,
    settings: {
      title: '',
      systemPrompt: 'You are a helpful assistant',
      temperature: [0.6],
      top_p: [1],
      presence_penalty: [0],
      frequency_penalty: [0],
    } as SessionSettings,
  }),

  actions: {
    // 创建新会话
    // 修改 createChat 方法
    async createChat() {
      try {
        const res = await chatApi.createChat()
        // 检查 res 是否为 null 或 undefined
        if (!res) {
          throw new Error('创建会话失败：服务器返回空数据')
        }
        
        const newSession = res
        // 确保在更新数组前移除可能存在的重复会话
        this.sessions = this.sessions.filter(s => s.id !== newSession.id)
        this.sessions.unshift(newSession)
        this.setActiveSession(newSession)
        return newSession
      } catch (error) {
        console.error('Failed to create chat:', error)
        throw error
      }
    },
    // async createChat() {
    //   try {
    //     const res = await chatApi.createChat()
    //     const newSession = res
    //     // 确保在更新数组前移除可能存在的重复会话
    //     this.sessions = this.sessions.filter(s => s.id !== newSession.id)
    //     this.sessions.unshift(newSession)
    //     this.setActiveSession(newSession)
    //     return newSession
    //   } catch (error) {
    //     console.error('Failed to create chat:', error)
    //     throw error
    //   }
    // },

    // 修改 setActiveSession 方法
    setActiveSession(session: ChatSession) {
      // 检查 session 是否为 null 或 undefined
      if (!session || typeof session.id === 'undefined') {
        console.error('尝试设置无效的会话对象')
        return
      }
      
      // 确保会话存在于列表中
      const existingSession = this.sessions.find(s => s.id === session.id)
      if (!existingSession) {
        this.sessions = this.sessions.filter(s => s.id !== session.id)
        this.sessions.unshift(session)
      }
      this.activeSessionId = session.id
      this.currentSession = session
    },

    // 获取所有会话
    async fetchSessions() {
      try {
        const res = await chatApi.getSessions()
        this.sessions = res.data
        if (this.sessions.length > 0 && !this.currentSession) {
          this.setActiveSession(this.sessions[0])
        }
        return res.data
      } catch (error) {
        console.error('Failed to fetch sessions:', error)
        throw error
      }
    },

    // 添加删除会话方法
    async removeSession(sessionId: number) {
      try {
        const res = await chatApi.removeSession(sessionId)
        if (res) {
          this.sessions = this.sessions.filter(s => s.id !== sessionId)
          // 如果删除的是当前活动会话，切换到第一个会话
          if (this.activeSessionId === sessionId && this.sessions.length > 0) {
            this.setActiveSession(this.sessions[0])
          }
        }
        return res
      } catch (error) {
        console.error('Failed to delete session:', error)
        throw error
      }
    },

    // 获取会话设置
    async fetchSettings(sessionId: number) {
      try {
        const settings = await chatApi.getSettings(sessionId)
        this.settings = {
          title: settings.title,
          systemPrompt: settings.systemPrompt || 'You are a helpful assistant',
          temperature: [settings.temperature ?? 0.6],
          top_p: [settings.top_p ?? 1],
          presence_penalty: [settings.presence_penalty ?? 0],
          frequency_penalty: [settings.frequency_penalty ?? 0],
        }
        return settings
      } catch (error) {
        // console.error('Failed to fetch settings:', error)
        // if session not found, set active session to first session
        this.setActiveSession(this.sessions[0])
      }
    },

    // 更新会话设置
    async updateSettings(
      sessionId: number,
      settings: Partial<SessionSettings>,
    ) {
      try {
        await chatApi.updateSettings(sessionId, settings)
        this.settings = { ...this.settings, ...settings }

        // 如果更新了标题，同步更新会话列表中的标题
        if (settings.title) {
          const session = this.sessions.find(s => s.id === sessionId)
          if (session) {
            session.title = settings.title
          }
          if (this.currentSession?.id === sessionId) {
            this.currentSession.title = settings.title
          }
        }
      } catch (error) {
        console.error('Failed to update settings:', error)
        throw error
      }
    },
  },
  getters: {
    getActiveSession: state =>
      state.sessions.find(session => session.id === state.activeSessionId),
  },

  persist: true,
})
