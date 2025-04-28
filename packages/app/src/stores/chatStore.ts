// src/stores/ollama.ts
import { defineStore } from 'pinia'
import type { LLMModel, ModelProvider } from '@/types/llm'

interface ChatState {
  model: LLMModel
}
export const useChatStore = defineStore('chat', {
  state: (): ChatState => ({
    model: {} as LLMModel,
  }),

  actions: {
    setModel(payload) {
      localStorage.setItem('chating_model', JSON.stringify(payload))
      this.model = payload
    },
  },

  getters: {
    getModel(state) {
      return state.model
    },
  },
})
