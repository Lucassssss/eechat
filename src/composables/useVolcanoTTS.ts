import { ref } from 'vue'

interface VolcanoTTSOptions {
  apiKey?: string
  appId?: string
  token?: string
  resourceId?: string
  cluster?: string
  voiceType?: string
  speed?: number
  volume?: number
  pitch?: number
}

export function useVolcanoTTS(options?: Partial<VolcanoTTSOptions>) {
  const isPlaying = ref(false)
  const isPaused = ref(false)
  const error = ref<Error | null>(null)
  
  // 获取最新配置
  const getConfig = (): VolcanoTTSOptions => {
    return {
      apiKey: localStorage.getItem('volcano_api_key') || localStorage.getItem('volcano_token') || '',
      appId: localStorage.getItem('volcano_app_id') || '',
      token: localStorage.getItem('volcano_token') || '',
      resourceId: localStorage.getItem('volcano_resource_id') || 'volc.service_type.10029',
      cluster: localStorage.getItem('volcano_cluster') || 'volcano_tts',
      voiceType: localStorage.getItem('volcano_voice_type') || 'zh_female_cancan_mars_bigtts',
      speed: 1.0,
      volume: 1.0,
      pitch: 1.0,
      ...options
    }
  }
  
  let audioContext: AudioContext | null = null
  let audioSource: AudioBufferSourceNode | null | any = null
  
  // 初始化音频上下文
  const initAudioContext = () => {
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return audioContext
  }
  
  // 使用HTTP API合成语音
  const synthesizeSpeech = async (text: string): Promise<ArrayBuffer> => {
    const config = getConfig()
    const apiKey = config.apiKey || config.token
    
    if (!apiKey && !config.appId) {
      throw new Error('缺少火山引擎 API Key，请检查【设置 -> 语音】中的配置')
    }

    const reqId = "uuid_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9)
    const voiceType = config.voiceType || "zh_female_cancan_mars_bigtts"

    // 尝试调用 V3 API 的函数助手
    const tryCallV3 = async (targetResourceId: string): Promise<ArrayBuffer | null> => {
      const requestDataV3 = {
        "user": {
          "uid": "uid123"
        },
        "audio": {
          "voice_type": voiceType,
          "encoding": "mp3",
          "speed_ratio": config.speed || 1.0,
          "volume_ratio": config.volume || 1.0
        },
        "request": {
          "reqid": reqId,
          "text": text,
          "operation": "query"
        }
      }

      const appId = config.appId || apiKey || ''
      const response = await fetch('https://openspeech.bytedance.com/api/v3/tts/unidirectional', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-App-Key': appId,
          'X-Api-Access-Key': apiKey || '',
          'X-Api-Resource-Id': targetResourceId,
          'X-Api-Request-Id': reqId
        },
        body: JSON.stringify(requestDataV3)
      })

      if (!response.ok) {
        const errText = await response.text()
        console.warn(`V3 API (${targetResourceId}) HTTP 状态不正常:`, response.status, errText)
        return null
      }

      const contentType = response.headers.get('content-type') || ''
      if (contentType.includes('application/json')) {
        const resJson = await response.json()
        if (resJson.code && resJson.code !== 3000) {
          if (resJson.code === 55000000 || (resJson.message && resJson.message.includes('mismatched with speaker'))) {
            throw new Error(`RESOURCE_MISMATCH: ${resJson.message}`)
          }
          throw new Error(`豆包语音合成错误 (${resJson.code}): ${resJson.message || '未知错误'}`)
        }
        if (resJson.data) {
          const binaryString = atob(resJson.data)
          const len = binaryString.length
          const bytes = new Uint8Array(len)
          for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i)
          }
          return bytes.buffer
        }
      } else {
        return await response.arrayBuffer()
      }
      return null
    }

    // 1. 尝试 豆包大模型语音合成 API (V3 / API Key 模式)
    if (apiKey) {
      const primaryResourceId = config.resourceId || "volc.service_type.10029"
      try {
        const result = await tryCallV3(primaryResourceId)
        if (result) return result
      } catch (err: any) {
        if (err.message && err.message.includes('RESOURCE_MISMATCH')) {
          console.warn(`Resource ID [${primaryResourceId}] 与音色 [${voiceType}] 不匹配，尝试自动使用替代 Resource ID 重试...`)
          const fallbackResourceId = primaryResourceId === 'volc.service_type.10029' ? 'seed-tts-2.0' : 'volc.service_type.10029'
          try {
            const retryResult = await tryCallV3(fallbackResourceId)
            if (retryResult) return retryResult
          } catch (retryErr: any) {
            throw new Error(`Resource ID 与音色不匹配 (错误 55000000): 音色【${voiceType}】不支持当前 Resource ID。请在设置中切换 Resource ID 为 ${fallbackResourceId} 或更换音色。`)
          }
        } else {
          console.warn('V3 API 尝试失败，准备回退至 V1 模式:', err?.message)
        }
      }
    }
    
    // 2. V1 / OpenSpeech 模式 (兼容传统模式或传入了 appId/token/apiKey)
    const requestDataV1 = {
      "app": {
          "appid": config.appId || "default",
          "token": apiKey,
          "cluster": config.cluster || "volcano_tts",
      },
      "user": {
          "uid": "uid123"
      },
      "audio": {
          "voice_type": voiceType,
          "encoding": "mp3",
          "speed_ratio": config.speed || 1,
      },
      "request": {
          "reqid": reqId,
          "text": text,
          "operation": "query",
      }
    }
    
    try {
      const response = await fetch('https://openspeech.bytedance.com/api/v1/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer; ${apiKey}`
        },
        body: JSON.stringify(requestDataV1)
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        if (response.status === 401 || errorText.includes('3001') || errorText.includes('grant not found')) {
          throw new Error(`火山引擎授权未找到 (错误码 3001): 请检查 API Key 是否正确且在火山引擎控制台中激活了该音色服务。原始响应: ${errorText}`)
        }
        throw new Error(`火山引擎TTS请求失败 (${response.status}): ${errorText}`)
      }
      
      const responseData = await response.json()
      
      if (responseData.code !== 3000) {
        if (responseData.code === 3001 || (responseData.message && responseData.message.includes('grant not found'))) {
          throw new Error(`火山引擎授权未找到 (错误码 3001): 请检查 API Key 是否正确且在火山引擎控制台激活了【${voiceType}】音色服务。`)
        }
        throw new Error(`火山引擎TTS错误 (${responseData.code}): ${responseData.message || '未知错误'}`)
      }
      
      const base64Audio = responseData.data
      const binaryString = atob(base64Audio)
      const len = binaryString.length
      const bytes = new Uint8Array(len)
      
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }
      
      return bytes.buffer
    } catch (e) {
      console.error('TTS合成请求错误:', e)
      throw e
    }
  }
  
  // 播放音频
  const playAudio = async (audioBuffer: ArrayBuffer): Promise<void> => {
    try {
      const context = initAudioContext()
      
      // 停止当前播放
      if (audioSource) {
        audioSource.stop()
        audioSource.disconnect()
      }
      
      // 解码音频
      const decodedData = await context.decodeAudioData(audioBuffer)
      
      // 创建音频源
      audioSource = context.createBufferSource()
      audioSource.buffer = decodedData
      audioSource.connect(context.destination)
      
      // 监听播放结束
      audioSource.onended = () => {
        isPlaying.value = false
        audioSource = null
      }
      
      // 开始播放
      audioSource.start(0)
      isPlaying.value = true
      isPaused.value = false
      
      // 返回一个Promise，只有在音频播放完成或出错时才会解析
      return new Promise((resolve, reject) => {
        audioSource.onended = () => {
          isPlaying.value = false
          audioSource = null
          resolve();
        }
        
        // 添加错误处理
        audioSource.onerror = (err) => {
          isPlaying.value = false
          audioSource = null
          reject(err);
        }
      });
      
    } catch (e) {
      console.error('音频播放错误:', e)
      error.value = e instanceof Error ? e : new Error('音频播放错误')
      isPlaying.value = false
      throw error.value
    }
  }
  
  // 暂停播放
  const pause = () => {
    if (audioContext && isPlaying.value && !isPaused.value) {
      audioContext.suspend()
      isPaused.value = true
    }
  }
  
  // 恢复播放
  const resume = () => {
    if (audioContext && isPlaying.value && isPaused.value) {
      audioContext.resume()
      isPaused.value = false
    }
  }
  
  // 停止播放
  const stop = () => {
    if (audioSource) {
      try {
        audioSource.stop()
        audioSource.disconnect()
      } catch (e) {
        // 忽略已停止的错误
      }
      audioSource = null
    }
    
    isPlaying.value = false
    isPaused.value = false
  }
  
  // 使用火山引擎TTS合成并播放
  const speak = async (text: string) => {
    try {
      error.value = null
      
      // 获取音频数据
      const audioData = await synthesizeSpeech(text)
      
      // 播放音频并等待播放完成
      await playAudio(audioData)
      
      return true
    } catch (e) {
      console.error('TTS合成错误:', e)
      error.value = e instanceof Error ? e : new Error('TTS合成错误')
      isPlaying.value = false
      throw error.value
    }
  }
  
  // 清理资源
  const dispose = () => {
    stop()
    if (audioContext) {
      audioContext.close()
      audioContext = null
    }
  }
  
  return {
    speak,
    pause,
    resume,
    stop,
    dispose,
    isPlaying,
    isPaused,
    error
  }
}