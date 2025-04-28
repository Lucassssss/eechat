import { defineStore } from 'pinia'

export const useEnvStore = defineStore('env', {
  state: () => ({
    isWeb: false,
    platform: 'unknown',
  }),
  
  actions: {
    initEnv() {
      let platform = 'unknown'
      let isWeb = false
      if (typeof window !== 'undefined' && 'electron' in window) {
        // Electron 环境
        isWeb = false
        if ((window as any).electron.platform === 'win32') platform = 'windows'
        if ((window as any).electron.platform === 'darwin') platform = 'mac'
        if ((window as any).electron.platform === 'linux') platform = 'linux'
      } else {
        // Web 环境
        isWeb = true
        const userAgent = navigator.userAgent.toLowerCase()
        if (userAgent.includes('windows')) platform = 'windows'
        if (userAgent.includes('macintosh') || userAgent.includes('mac os x')) platform = 'mac'
        if (userAgent.includes('linux')) platform = 'linux'
      }
      this.isWeb = isWeb
      this.platform = platform
    }
  },
  
  getters: {
    
  }
})