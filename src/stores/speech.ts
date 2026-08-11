import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSpeechStore = defineStore('speech', () => {
  // 当前是否正在播放语音
  const isSpeaking = ref(false)
  
  // 当前播放的文本内容
  const currentText = ref('')
  
  // 当前使用的语音类型（system、volcano 或 edge-tts）
  const speechType = ref<'system' | 'volcano' | 'edge-tts'>(
    (localStorage.getItem('tts_engine') as 'system' | 'volcano' | 'edge-tts') || 'volcano'
  )
  
  // 音频URL（用于分析频谱）
  const audioUrl = ref('')
  
  // 当前选择的语音
  const selectedVoice = ref('')
  
  // 开始播放语音
  const startSpeaking = (text: string, type: 'system' | 'volcano' | 'edge-tts' = 'volcano', url: string = '') => {
    currentText.value = text
    speechType.value = type
    audioUrl.value = url
    isSpeaking.value = true
  }
  
  // 停止播放语音
  const stopSpeaking = () => {
    isSpeaking.value = false
    currentText.value = ''
    audioUrl.value = ''
  }
  
  // 设置选择的语音
  const setSelectedVoice = (voice: string) => {
    selectedVoice.value = voice
    localStorage.setItem('tts-voice', voice)
  }
  
  // 获取选择的语音
  const getSelectedVoice = () => {
    return localStorage.getItem('tts-voice')
  }
  
  return {
    isSpeaking,
    currentText,
    speechType,
    audioUrl,
    selectedVoice,
    startSpeaking,
    stopSpeaking,
    setSelectedVoice,
    getSelectedVoice
  }
})