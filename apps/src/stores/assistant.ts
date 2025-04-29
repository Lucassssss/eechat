import { defineStore } from 'pinia'

export const useAssistantStore = defineStore('assistant', {
  state: () => ({
    currentAssistant: null
  }),
  actions: {
    setCurrentAssistant(assistant) {
      this.currentAssistant = assistant
    }
  }
})