<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Volume2, Save } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast/use-toast'
import { ttsApi } from '@/api/request'
import { useSpeechStore } from '@/stores/speech'
import { useVolcanoTTS } from '@/composables/useVolcanoTTS'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const { t, locale } = useI18n()
const { toast } = useToast()
const speechStore = useSpeechStore()
const { speak: volcanoSpeak, stop: volcanoStop } = useVolcanoTTS()

const loading = ref(false)
const testLoading = ref(false)
const voices = ref<any[]>([])
const filteredVoices = ref<any[]>([])
const selectedVoice = ref('')
const testText = ref('')

// TTS Engine
const ttsEngine = ref<'volcano' | 'edge-tts' | 'system'>(
  (localStorage.getItem('tts_engine') as any) || 'volcano'
)

// 火山引擎配置 (豆包大模型 TTS 符合文档 2528925)
const volcanoApiKey = ref(
  localStorage.getItem('volcano_api_key') || localStorage.getItem('volcano_token') || ''
)
const volcanoResourceId = ref(
  localStorage.getItem('volcano_resource_id') || 'volc.service_type.10029'
)
const volcanoAppId = ref(localStorage.getItem('volcano_app_id') || '')
const volcanoToken = ref(localStorage.getItem('volcano_token') || '')
const volcanoCluster = ref(localStorage.getItem('volcano_cluster') || 'volcano_tts')
const volcanoVoiceType = ref(
  localStorage.getItem('volcano_voice_type') || 'zh_female_cancan_mars_bigtts'
)

// 火山引擎 Resource ID 预设
const volcanoResourcePresets = [
  { label: 'volc.service_type.10029 (语音合成 1.0 - 推荐兼容大音色库)', value: 'volc.service_type.10029' },
  { label: 'seed-tts-2.0 (豆包语音大模型 2.0)', value: 'seed-tts-2.0' },
  { label: 'seed-tts-1.0 (豆包语音大模型 1.0)', value: 'seed-tts-1.0' },
  { label: 'volc.tts_async.default (标准流式语音)', value: 'volc.tts_async.default' },
]

// 火山引擎预设音色
const volcanoVoicePresets = [
  { label: '灿灿 (女声-自然)', value: 'zh_female_cancan_mars_bigtts' },
  { label: '灿灿/小和 (女声-多情感)', value: 'zh_female_wanwanxiaohe_moon_bigtts' },
  { label: '爽快女声', value: 'zh_female_shuangkuai_mars_bigtts' },
  { label: '醇厚男声', value: 'zh_male_chunhou_mars_bigtts' },
  { label: '性感御姐', value: 'ICL_zh_female_xingganyujie_tob' },
]

// 火山引擎 Cluster 集群预设 (V1 兼容)
const volcanoClusterPresets = [
  { label: 'volcano_tts (标准语音合成)', value: 'volcano_tts' },
  { label: 'volcano_mega (大模型/声音复刻 1.0)', value: 'volcano_mega' },
  { label: 'volcano_icl (零样本声音复刻)', value: 'volcano_icl' },
]

// 切换引擎
const handleEngineChange = (engine: string) => {
  const selected = (engine as 'volcano' | 'edge-tts' | 'system') || 'volcano'
  ttsEngine.value = selected
  localStorage.setItem('tts_engine', selected)
  speechStore.speechType = selected
  toast({
    title: t('common.success', '设置已保存'),
    description: `已切换默认语音引擎为 ${selected === 'volcano' ? '火山引擎/豆包 TTS' : selected === 'edge-tts' ? 'Edge TTS' : '系统默认语音'}`,
  })
}

// 保存火山引擎配置
const saveVolcanoConfig = () => {
  const apiKey = volcanoApiKey.value.trim()
  localStorage.setItem('volcano_api_key', apiKey)
  localStorage.setItem('volcano_token', apiKey) // 同步保持兼容
  localStorage.setItem('volcano_resource_id', volcanoResourceId.value.trim())
  localStorage.setItem('volcano_voice_type', volcanoVoiceType.value.trim())
  localStorage.setItem('volcano_app_id', volcanoAppId.value.trim())
  localStorage.setItem('volcano_cluster', volcanoCluster.value.trim())
  toast({
    title: t('common.success', '保存成功'),
    description: '火山引擎配置已保存',
  })
}

// 获取当前语言的简写（如zh-CN -> zh, en-US -> en）
const currentLangPrefix = computed(() => {
  return locale.value.split('-')[0]
})

// 获取语音列表 (Edge TTS)
const getVoices = async () => {
  try {
    loading.value = true
    const result = await ttsApi.getVoices()
    voices.value = result || []
    
    // 根据当前语言筛选语音
    filterVoicesByLanguage()
    
    // 如果有存储的语音设置，则使用它
    const savedVoice = localStorage.getItem('tts-voice')
    if (savedVoice && voices.value.some(v => v.ShortName === savedVoice)) {
      selectedVoice.value = savedVoice
    } else if (filteredVoices.value.length > 0) {
      // 否则使用当前语言的第一个语音
      selectedVoice.value = filteredVoices.value[0].ShortName
      localStorage.setItem('tts-voice', selectedVoice.value)
    }
  } catch (error: any) {
    toast({
      title: t('settings.tts.getVoicesFailed', '获取语音列表失败'),
      description: error.message,
      variant: 'destructive'
    })
  } finally {
    loading.value = false
  }
}

// 根据当前语言筛选语音
const filterVoicesByLanguage = () => {
  const prefix = currentLangPrefix.value
  filteredVoices.value = voices.value.filter(voice => 
    voice.Locale.toLowerCase().startsWith(prefix.toLowerCase())
  )
  
  // 如果没有找到当前语言的语音，则显示所有语音
  if (filteredVoices.value.length === 0) {
    filteredVoices.value = voices.value
  }
}

// 选择语音 (Edge TTS)
const handleVoiceChange = (value: string) => {
  selectedVoice.value = value
  localStorage.setItem('tts-voice', value)
}

// 选择火山音色
const handleVolcanoVoiceChange = (value: string) => {
  volcanoVoiceType.value = value
  localStorage.setItem('volcano_voice_type', value)
}

// 测试语音
const testVoice = async () => {
  const text = testText.value || t('settings.tts.testText', 'eechat 真棒，我很喜欢。')
  
  try {
    testLoading.value = true
    
    if (ttsEngine.value === 'volcano') {
      if (!volcanoAppId.value.trim() || !volcanoToken.value.trim()) {
        toast({
          title: t('settings.tts.missingVolcanoConfig', '请先配置火山引擎 App ID 和 Access Token'),
          variant: 'destructive'
        })
        return
      }
      // 保存一次最新配置
      saveVolcanoConfig()
      
      speechStore.startSpeaking(text, 'volcano')
      await volcanoSpeak(text)
      speechStore.stopSpeaking()
    } else if (ttsEngine.value === 'edge-tts') {
      if (!selectedVoice.value) {
        toast({
          title: t('settings.tts.selectVoiceFirst', '请先选择语音'),
          variant: 'destructive'
        })
        return
      }
      const result = await ttsApi.textToSpeech(text, selectedVoice.value)
      const audioSrc = `data:${result.mimeType};base64,${result.base64Audio}`
      const audio = new Audio(audioSrc)
      audio.play()
      speechStore.startSpeaking(text, 'edge-tts', audioSrc)
      audio.onended = () => {
        speechStore.stopSpeaking()
      }
    } else {
      // System TTS
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = locale.value
      speechSynthesis.speak(utterance)
      speechStore.startSpeaking(text, 'system')
      utterance.onend = () => {
        speechStore.stopSpeaking()
      }
    }
  } catch (error: any) {
    toast({
      title: t('settings.tts.testFailed', '测试语音失败'),
      description: error.message,
      variant: 'destructive'
    })
    speechStore.stopSpeaking()
  } finally {
    testLoading.value = false
  }
}

// 监听语言变化
watch(locale, () => {
  filterVoicesByLanguage()
  
  if (filteredVoices.value.length > 0 && 
      !filteredVoices.value.some(v => v.ShortName === selectedVoice.value)) {
    selectedVoice.value = filteredVoices.value[0].ShortName
    localStorage.setItem('tts-voice', selectedVoice.value)
  }
  
  testText.value = t('settings.tts.testText', 'eechat 真棒，我很喜欢。')
})

onMounted(() => {
  getVoices()
  testText.value = t('settings.tts.testText', 'eechat 真棒，我很喜欢。')
})
</script>

<template>
  <div class="h-full space-y-6">
    <div class="text-gray-500 text-sm">
      {{ t('settings.tts.title', '文本转语音设置') }}
    </div>
    
    <div class="space-y-6">
      <!-- 引擎选择 -->
      <div class="space-y-2">
        <Label>{{ t('settings.tts.engine', '默认语音引擎') }}</Label>
        <Select v-model="ttsEngine" @update:modelValue="handleEngineChange">
          <SelectTrigger class="w-full">
            <SelectValue :placeholder="t('settings.tts.engine', '选择语音引擎')" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="volcano">{{ t('settings.tts.volcanoEngine', '火山引擎 TTS (推荐)') }}</SelectItem>
            <SelectItem value="edge-tts">{{ t('settings.tts.edgeEngine', 'Edge TTS') }}</SelectItem>
            <SelectItem value="system">{{ t('settings.tts.systemEngine', '系统默认语音') }}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <!-- 火山引擎/豆包大模型 TTS 配置区域 -->
      <div class="border p-4 rounded-lg space-y-4 bg-muted/20">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="font-medium text-sm">豆包大模型 / 火山引擎语音合成配置</h4>
            <p class="text-xs text-muted-foreground">对应火山引擎【语音技术 -> 应用管理】中的认证凭证</p>
          </div>
          <Button size="sm" @click="saveVolcanoConfig" class="h-8">
            <Save class="mr-1 h-3.5 w-3.5" />
            {{ t('common.save', '保存配置') }}
          </Button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <Label for="volcano-appid">App ID (应用 ID)</Label>
            <Input 
              id="volcano-appid" 
              v-model="volcanoAppId" 
              placeholder="控制台应用 App ID" 
              @change="saveVolcanoConfig"
            />
          </div>

          <div class="space-y-1.5">
            <Label for="volcano-apikey">Access Token / API Key</Label>
            <Input 
              id="volcano-apikey" 
              type="password"
              v-model="volcanoApiKey" 
              placeholder="如 928b70d5-473b-449a-8d13-2d9741973ef1" 
              @change="saveVolcanoConfig"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <Label for="volcano-voicetype">{{ t('settings.tts.voiceType', '音色 (Voice Type)') }}</Label>
            <div class="flex space-x-2">
              <Select v-model="volcanoVoiceType" @update:modelValue="handleVolcanoVoiceChange">
                <SelectTrigger class="w-full">
                  <SelectValue :placeholder="t('settings.tts.voiceTypePlaceholder', '选择音色')" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem 
                    v-for="preset in volcanoVoicePresets" 
                    :key="preset.value" 
                    :value="preset.value"
                  >
                    {{ preset.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div class="space-y-1.5">
            <Label for="volcano-resource">模型 Resource ID</Label>
            <Select v-model="volcanoResourceId" @update:modelValue="saveVolcanoConfig">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="选择 Resource ID" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem 
                  v-for="preset in volcanoResourcePresets" 
                  :key="preset.value" 
                  :value="preset.value"
                >
                  {{ preset.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <!-- Edge TTS 配置区域 -->
      <div v-if="ttsEngine === 'edge-tts'" class="border p-4 rounded-lg space-y-4 bg-muted/20">
        <h4 class="font-medium text-sm">{{ t('settings.tts.edgeConfigTitle', 'Edge TTS 配置') }}</h4>
        <div class="space-y-2">
          <Label for="voice-select">{{ t('settings.tts.voice', '音色') }}</Label>
          <div class="flex space-x-2">
            <Select v-model="selectedVoice" @update:modelValue="handleVoiceChange">
              <SelectTrigger class="w-full">
                <SelectValue :placeholder="t('settings.tts.selectVoice', '选择语音')" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{{ t('settings.tts.currentLanguageVoices', '当前语言语音') }}</SelectLabel>
                  <SelectItem 
                    v-for="voice in filteredVoices" 
                    :key="voice.ShortName" 
                    :value="voice.ShortName"
                  >
                    {{ voice.FriendlyName }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <Button variant="outline" @click="getVoices" :disabled="loading">
              <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
              {{ t('settings.tts.refresh', '刷新') }}
            </Button>
          </div>
        </div>
      </div>

      <!-- 测试区域 -->
      <div class="space-y-2 pt-2">
        <Label for="test-text">{{ t('settings.tts.testTextTitle', '测试文本') }}</Label>
        <div class="flex space-x-2">
          <Input 
            id="test-text" 
            v-model="testText" 
            :placeholder="t('settings.tts.enterTestText', '输入测试文本')"
            class="flex-1 bg-background"
          />
          <Button @click="testVoice" :disabled="testLoading">
            <Loader2 v-if="testLoading" class="mr-2 h-4 w-4 animate-spin" />
            <Volume2 v-else class="mr-2 h-4 w-4" />
            {{ t('settings.tts.test', '测试') }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>