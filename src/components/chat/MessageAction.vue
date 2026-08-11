<script setup lang="ts">
import { ref, watch, onBeforeUnmount, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import { Volume2, VolumeX, Copy, Check, Headphones } from 'lucide-vue-next'
import { useVolcanoTTS } from '@/composables/useVolcanoTTS'
import { useSpeechStore } from '@/stores/speech'
import { ttsApi } from '@/api/request'
import { useToast } from '@/components/ui/toast/use-toast'

const props = defineProps<{
  message: string,
  role: string
}>()

const { toast } = useToast()

onMounted(() => {
  const localVoice = localStorage.getItem('tts-voice')
  if(!localVoice) {
    localStorage.setItem('tts-voice', 'zh-CN-XiaoxiaoNeural')
  }
})

const { t, locale } = useI18n()
const isSpeaking = ref(false)
const isCopied = ref(false)
const isVolcanoSpeaking = ref(false)
const isEdgeTtsSpeaking = ref(false)
const speechSynthesis = window.speechSynthesis
let utterance:any = null

// 引入火山引擎TTS
const { speak: volcanoSpeak, stop: volcanoStop, isPlaying } = useVolcanoTTS()

// 引入全局语音状态
const speechStore = useSpeechStore()

// 计算是否任意语音引擎正在播放
const isAnySpeaking = computed(() => isSpeaking.value || isVolcanoSpeaking.value || isEdgeTtsSpeaking.value)

// 统一朗读点击处理函数
const handleSpeak = () => {
  // 如果当前正在播放，停止所有播放
  if (isAnySpeaking.value) {
    if (isSpeaking.value) stopSpeaking()
    if (isVolcanoSpeaking.value) {
      volcanoStop()
      isVolcanoSpeaking.value = false
      speechStore.stopSpeaking()
    }
    if (isEdgeTtsSpeaking.value) stopEdgeTts()
    return
  }

  const engine = localStorage.getItem('tts_engine') || 'volcano'
  if (engine === 'volcano') {
    const appId = localStorage.getItem('volcano_app_id')
    const token = localStorage.getItem('volcano_token')
    if (!appId || !token) {
      toast({
        title: t('settings.tts.missingVolcanoConfig', '请先在【设置 -> 语音】中配置火山引擎 App ID 和 Access Token'),
        variant: 'destructive'
      })
      return
    }
    speakWithVolcano()
  } else if (engine === 'edge-tts') {
    speakWithEdgeTts()
  } else {
    speak()
  }
}

// 清理HTML标签，获取纯文本内容
const getPlainText = (html) => {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html
  let text = tempDiv.textContent || tempDiv.innerText || ''
  
  // 移除英文括号和中文括号包裹的内容
  text = text.replace(/\([^)]*\)/g, '') // 移除英文小括号 (...)
  text = text.replace(/（[^）]*）/g, '') // 移除中文小括号 （...）
  text = text.replace(/\[[^\]]*\]/g, '') // 移除英文中括号 [...]
  text = text.replace(/【[^】]*】/g, '') // 移除中文中括号 【...】
  text = text.replace(/\{[^}]*\}/g, '') // 移除英文大括号 {...}
  text = text.replace(/［[^］]*］/g, '') // 移除中文方括号 ［...］
  text = text.replace(/｛[^｝]*｝/g, '') // 移除中文花括号 ｛...｝
  
  // 移除连续的空格
  text = text.replace(/\s+/g, ' ').trim()
  
  return text
}

// 开始朗读文本 (Web Speech API)
const speak = () => {
  // 如果火山引擎TTS或Edge TTS正在播放，先停止它
  if (isVolcanoSpeaking.value) {
    volcanoStop()
    isVolcanoSpeaking.value = false
    speechStore.stopSpeaking()
  }
  
  if (isEdgeTtsSpeaking.value) {
    stopEdgeTts()
  }
  
  if (isSpeaking.value) {
    stopSpeaking()
    return
  }
  
  const text = getPlainText(props.message)
  if (!text) return
  
  utterance = new SpeechSynthesisUtterance(text)
  
  // 设置语言，默认使用当前i18n的语言
  utterance.lang = locale.value
  
  // 监听语音结束事件
  utterance.onend = () => {
    isSpeaking.value = false
    speechStore.stopSpeaking()
  }
  
  // 监听语音错误事件
  utterance.onerror = (event) => {
    // console.error('语音合成错误:', event)
    isSpeaking.value = false
    speechStore.stopSpeaking()
  }
  
  // 开始朗读
  speechSynthesis.speak(utterance)
  isSpeaking.value = true
  
  // 更新全局语音状态
  speechStore.startSpeaking(text, 'system')
}

// 停止朗读 (Web Speech API)
const stopSpeaking = () => {
  speechSynthesis.cancel()
  isSpeaking.value = false
  speechStore.stopSpeaking()
}

// 使用火山引擎TTS朗读
const speakWithVolcano = async () => {
  // 如果系统TTS或Edge TTS正在播放，先停止它
  if (isSpeaking.value) {
    stopSpeaking()
  }
  
  if (isEdgeTtsSpeaking.value) {
    stopEdgeTts()
  }
  
  if (isVolcanoSpeaking.value) {
    await volcanoStop()
    isVolcanoSpeaking.value = false
    speechStore.stopSpeaking()
    return
  }
  
  const text = getPlainText(props.message)
  if (!text) return
  
  try {
    isVolcanoSpeaking.value = true
    
    // 更新全局语音状态
    speechStore.startSpeaking(text, 'volcano')
    
    // 等待播放完成
    await volcanoSpeak(text)
    // 只有在正常播放完成后才执行
    isVolcanoSpeaking.value = false
    speechStore.stopSpeaking()
  } catch (error) {
    console.error('火山引擎TTS错误:', error)
    // 出错时也需要重置状态
    isVolcanoSpeaking.value = false
    speechStore.stopSpeaking()
  }
}

// 添加一个变量来保存当前播放的音频实例
let currentEdgeTtsAudio = null

const speakWithEdgeTts = async () => {
  const text = getPlainText(props.message)
  if (!text) return

  if (isSpeaking.value) {
    stopSpeaking()
  }

  if (isVolcanoSpeaking.value) {
    await volcanoStop()
    isVolcanoSpeaking.value = false
    speechStore.stopSpeaking()
  }

  if (isEdgeTtsSpeaking.value) {
    stopEdgeTts()
    return
  }
  
  try {
    isEdgeTtsSpeaking.value = true
    // 获取存储的语音设置，如果没有则使用默认值
    const voice = localStorage.getItem('tts-voice') || 
                 (locale.value.startsWith('zh') ? 'zh-CN-XiaoxiaoNeural' : 'en-US-AriaNeural')
    
    // 调用API进行TTS转换
    const result = await ttsApi.textToSpeech(text, voice)
    
    // 创建音频源
    const audioSrc = `data:${result.mimeType};base64,${result.base64Audio}`
    
    // 播放音频
    const audio = new Audio(audioSrc)
    
    // 保存音频实例的引用
    // @ts-ignore
    currentEdgeTtsAudio = audio
    
    // 更新全局语音状态
    speechStore.startSpeaking(text, 'edge-tts', audioSrc)
    
    // 播放音频
    audio.play()
    
    // 监听播放结束
    audio.onended = () => {
      isEdgeTtsSpeaking.value = false
      speechStore.stopSpeaking()
      currentEdgeTtsAudio = null
    }
    
    // 监听播放错误
    audio.onerror = () => {
      isEdgeTtsSpeaking.value = false
      speechStore.stopSpeaking()
      currentEdgeTtsAudio = null
    }
  } catch (error) {
    console.error('Edge TTS错误:', error)
    isEdgeTtsSpeaking.value = false
    speechStore.stopSpeaking()
    currentEdgeTtsAudio = null
  }
}

// 停止Edge TTS播放
const stopEdgeTts = () => {
  // 如果有正在播放的音频，停止它
  if (currentEdgeTtsAudio) {
    // @ts-ignore
    currentEdgeTtsAudio.pause()
    // @ts-ignore
    currentEdgeTtsAudio.currentTime = 0
    currentEdgeTtsAudio = null
  }
  
  isEdgeTtsSpeaking.value = false
  speechStore.stopSpeaking()
}

// 监听火山引擎播放状态
watch(isPlaying, (newValue) => {
  isVolcanoSpeaking.value = newValue
})

// 复制消息内容
const copyMessage = async () => {
  const text = getPlainText(props.message)
  if (!text) return
  
  try {
    await navigator.clipboard.writeText(text)
    isCopied.value = true
    
    // 2秒后重置复制状态
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}

// 当组件卸载时停止朗读
watch(() => props.message, () => {
  if (isSpeaking.value) {
    stopSpeaking()
  }
  if (isVolcanoSpeaking.value) {
    volcanoStop()
    speechStore.stopSpeaking()
  }
  if (isEdgeTtsSpeaking.value) {
    stopEdgeTts()
  }
})

// 组件卸载时清理
onBeforeUnmount(() => {
  if (isSpeaking.value) {
    stopSpeaking()
  }
  if (isVolcanoSpeaking.value) {
    volcanoStop()
    speechStore.stopSpeaking()
  }
  if (isEdgeTtsSpeaking.value) {
    stopEdgeTts()
  }
})
</script>

<template>
  <div class="message-actions space-x-2 mt-[-10px]" :class="role === 'user' ? 'flex justify-end' : 'flex justify-start'">
    
    <Button 
      variant="outline" 
      size="icon" 
      class="h-8 w-8" 
      @click="handleSpeak" 
      :title="isAnySpeaking ? t('chat.stopSpeaking', '停止朗读') : t('chat.speakWithVolcano', '火山引擎朗读')"
    >
      <Headphones v-if="!isAnySpeaking" class="h-4 w-4" />
      <VolumeX v-else class="h-4 w-4 text-primary animate-pulse" />
    </Button>

    <Button 
      variant="outline" 
      size="icon" 
      class="h-8 w-8" 
      @click="copyMessage" 
      :title="t('chat.copyMessage')"
    >
      <Copy v-if="!isCopied" class="h-4 w-4" />
      <Check v-else class="h-4 w-4 text-green-500" />
    </Button>
  </div>
</template>

<style scoped>
.message-actions {
  opacity: 0.7;
  transition: opacity 0.2s;
}

.message-actions:hover {
  opacity: 1;
}
</style>