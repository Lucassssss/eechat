// src/stores/ollama.ts
import { defineStore } from 'pinia'
import { ollamaApi } from '@/api/request'

interface ModelDetails {
  parent_model: string
  format: string
  family: string
  families: string[]
  parameter_size: string
  quantization_level: string
}

interface LocalModel {
  name: string
  model: string
  modified_at: string
  size: number
  digest: string
  details: ModelDetails
}

interface DownloadStatus {
  completed: number
  total: number
  percent: number
  speed: number
  status: string
}

interface OllamaState {
  downloadStatus: Record<string, DownloadStatus>
  localModels: LocalModel[]
  allModels: any[]
}

export const useOllamaStore = defineStore('ollama', {
  state: (): OllamaState => ({
    downloadStatus: {},
    localModels: [],
    allModels: [],
  }),

  actions: {
    async fetchAllModels() {
      try {
        const res = await ollamaApi.getAllModels()
        if (res) {
          this.allModels = res
        }
      } catch (error) {
        console.error('获取所有模型列表失败:', error)
      }
    },

    updateDownloadStatus(modelName: string, status: DownloadStatus) {
      this.downloadStatus[modelName] = status
    },

    clearDownloadStatus(modelName: string) {
      delete this.downloadStatus[modelName]
    },

    setLocalModels(models: LocalModel[]) {
      // 创建一个映射来存储每个模型系列的具体版本信息
      const modelFamilyMap = new Map<string, string>()

      // 首先处理所有非 latest 的模型,建立映射关系
      models.forEach(model => {
        if (!model.model.endsWith(':latest')) {
          const [baseName, version] = model.model.split(':')
          modelFamilyMap.set(baseName, version)
        }
      })

      // 处理所有模型,替换 latest 标记
      const processedModels = models.map(model => {
        if (model.model.endsWith(':latest')) {
          const [baseName] = model.model.split(':')

          // 首先查找是否有已安装的具体版本
          const actualVersion = modelFamilyMap.get(baseName)
          if (actualVersion) {
            return {
              ...model,
              model: `${baseName}:${actualVersion}`,
            }
          }

          // 如果没有已安装版本,则从 modelsData 中找到对应模型的第一个 size
          const modelInfo = this.allModels.find(m => m.name === baseName)
          if (modelInfo && modelInfo.sizes.length > 0) {
            return {
              ...model,
              model: `${baseName}:${modelInfo.sizes[0]}`,
            }
          }
        }
        return model
      })

      this.localModels = processedModels
    },
  },

  getters: {
    getAllModels: state => state.allModels,
    getDownloadStatus: state => {
      return (modelName: string) => state.downloadStatus[modelName]
    },
    isDownloading: state => {
      return (modelName: string) => !!state.downloadStatus[modelName]
    },
    isModelInstalled: state => {
      return (modelName: string) =>
        state.localModels.some(m => m.model === modelName)
    },
    getModelInfo: state => {
      return (modelName: string) =>
        state.localModels.find(m => m.model === modelName)
    },
  },
})
