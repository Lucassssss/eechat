import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { LLMModel, ModelProvider } from '@/types/llm'
import { llmApi, ollamaApi } from "@/api/request"

export const LOCAL_PROVIDER_ID = 'local'

export const useModelStore = defineStore('model', () => {
  // 状态
  const providers = ref<Map<string, ModelProvider>>(new Map())
  const currentModel = ref<LLMModel | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchProvidersAndModels = async () => {
    try {
      isLoading.value = true
      initLocalProvider()
      const res = await llmApi.getProvidersAndModels()
      Object.keys(res).forEach((providerId) => {
        setProvider(providerId, res[providerId])
      })
      // 获取本地模型配置
      const localModels = await ollamaApi.listModel()
      const modelsData = localModels.data.models
      if (modelsData?.length) {
        // 转换本地模型格式
        const formattedModels = modelsData.map((model) => ({
          id: model.name,
          name: model.name,
          provider_id: "local",
          group_name: "Local",
          state: true, // 本地模型默认启用
          type: "local",
          capabilities: ["chat", "completion"],
          from: "local",
        }))
        updateLocalModels(formattedModels)
      }
    } catch (error) {
      console.log(error)
      error = (error as Error).message
    } finally {
      isLoading.value = false
    }
  }

  const deleteProvider = async (providerId: string) => {
    try {
      isLoading.value = true
      await llmApi.deleteProvider(providerId)
      providers.value.delete(providerId)
      return true
    } catch (error) {
      console.log(error)
      error = (error as Error).message
    } finally {
      isLoading.value = false
    }
  }

  // Getters
  const availableModels = computed(() => {
    const models: LLMModel[] = []
    providers.value.forEach(provider => {
      if (provider.state) {
        // @ts-ignore
        models.push(...provider.models.filter(model => model.state))
      }
    })
    return models
  })

  const getProviderModels = computed(() => (providerId: string) => {
    return providers.value.get(providerId)?.models || []
  })

  // Actions
  function setProvider(providerId: string, provider: ModelProvider) {
    providers.value.set(providerId, provider)
  }

  function updateProviderState(providerId: string, state: boolean) {
    const provider = providers.value.get(providerId)
    if (provider) {
      provider.state = state
      providers.value.set(providerId, provider)
    }
  }

  function updateModelState(
    providerId: string,
    modelId: string,
    state: boolean,
  ) {
    const provider = providers.value.get(providerId)
    if (provider) {
      const model = provider.models.find(m => m.id === modelId)
      if (model) {
        model.state = state
        providers.value.set(providerId, provider)
      }
    }
  }

  function setCurrentModel(model: LLMModel | null) {
    currentModel.value = model
  }

  function clearProviders() {
    providers.value.clear()
  }
  // ... 保持现有的状态定义 ...

  // 初始化本地模型提供商
  function initLocalProvider() {
    const localProvider: ModelProvider = {
      id: LOCAL_PROVIDER_ID,
      name: 'Local',
      type: 'local',
      state: true, // 修改为默认启用
      models: [],
      description: '本地运行的 LLM 模型',
      icon: 'ollama',
    }
    setProvider(LOCAL_PROVIDER_ID, localProvider)
  }
  // 更新本地模型列表
  function updateLocalModels(models: LLMModel[]) {
    const provider = providers.value.get(LOCAL_PROVIDER_ID)
    if (provider) {
      // @ts-ignore
      provider.models = models.map(model => ({
        ...model,
        state: true, // 确保本地模型默认启用
      }))
      providers.value.set(LOCAL_PROVIDER_ID, provider)
    }
  }
  // 按提供商分组的模型列表
  const groupedModels = computed(() => {
    const groups: Record<string, LLMModel[]> = {}
    const providersArray = Array.from(providers.value.values())
    providersArray.forEach(provider => {
      // 只显示启用的提供商和模型
      if (provider.state) {
        // @ts-ignore
        groups[provider.name] = provider.models.filter(model => model.state)
      }
    })
    return groups
  })
  return {
    // 状态
    providers,
    currentModel,
    isLoading,
    error,

    // Getters
    availableModels,
    getProviderModels,

    // Actions
    setProvider,
    updateProviderState,
    updateModelState,
    setCurrentModel,
    clearProviders,
    fetchProvidersAndModels,
    deleteProvider,

    // 新增导出
    initLocalProvider,
    updateLocalModels,
    groupedModels,
    LOCAL_PROVIDER_ID,
  }
})
