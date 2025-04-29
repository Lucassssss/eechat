<script setup lang="ts">
import { ref, onMounted, watch, reactive, computed } from "vue"
import { useI18n } from "vue-i18n"
import { useModelStore } from "@/stores/model"
import { useChatStore } from "@/stores/chatStore"
import { llmApi, ollamaApi } from "@/api/request"
import { LLMProvider, ModelProvider } from "@/types/llm"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import router from "@/router"
import { Button } from "@/components/ui/button"
import { ChevronsDownUp, SlidersHorizontal, ArrowUpDown, Pin, Cog } from "lucide-vue-next"
import Icon from "@/components/Icon.vue"
const modelStore = useModelStore()
const chatStore = useChatStore()
const { t } = useI18n()

const groupedModels = computed(() => {
  // 通过展开 Map 的值来强制追踪内部变化
  const providersArray = Array.from(modelStore.providers.values())
  const groups: Record<string, any> = {}

  // 首先对提供商数组进行排序
  const sortedProviders = [...providersArray].sort((a, b) => {
    // 本地模型始终排在最前面
    // debugger
    if (a.type === 'local') return -2
    if (b.type === 'local') return 1
    
    // 其他按照更新时间倒序排列
    const aTime = a.updated_at ? new Date(a.updated_at).getTime() : 0
    const bTime = b.updated_at ? new Date(b.updated_at).getTime() : 0
    return bTime - aTime // 倒序排列，最新的在前面
  })

  sortedProviders.forEach((provider) => {
    if (provider.state) {
      // 使用provider.id作为key，确保一致性
      groups[provider.id] = {
        models: provider.models.filter((model) => model.state),
        name: provider.name, // 保存name用于显示
      }
    }
  })
  // 移除debugger
  return groups
})

const currentModel = computed(() => {
  return modelStore.currentModel
})
const isShowModelSelect = ref(false)
const handleModelChange = (key, item) => {
  isShowModelSelect.value = false
  chatStore.setModel(item)
  console.log(chatStore.model)
}

const handleConfigModel = (key) => {
  console.log(key)

  router.push({ path: "/setting", query: { action: key } })
}

// async function initModelConfig() {
//   try {
//     modelStore.isLoading = true
//     modelStore.initLocalProvider()
//     const providers = await llmApi.getProviders()
//     for (const [providerId, providerInfo] of Object.entries(providers) as [
//       string,
//       LLMProvider
//     ][]) {
//       const config = await llmApi.getConfigProvider(providerId)
//       const models = await llmApi.getModels(providerId)
//       const provider: ModelProvider = {
//         id: providerId,
//         name: providerInfo.name || providerId,
//         type: "api",
//         state: providerInfo.state,
//         models: models.map((model) => ({
//           ...model,
//           state: model.state,
//         })),
//         config: {
//           apiKey: config?.api_key || "",
//           baseUrl: config?.base_url || providerInfo.api_url || "",
//         },
//         description: providerInfo.description,
//         icon: providerId,
//       }
//       modelStore.setProvider(providerId, provider)
//     }
//     console.log(modelStore.providers)
//     // 获取本地模型配置
//     const localModels = await ollamaApi.listModel()
//     const modelsData = localModels.data.models
//     if (modelsData?.length) {
//       // 转换本地模型格式
//       const formattedModels = modelsData.map((model) => ({
//         id: model.name,
//         name: model.name,
//         provider_id: "local",
//         group_name: "Local",
//         state: true, // 本地模型默认启用
//         type: "local",
//         capabilities: ["chat", "completion"],
//         from: "local",
//       }))
//       modelStore.updateLocalModels(formattedModels)
//     }
//   } catch (error) {
//     console.log(error)
//     modelStore.error = (error as Error).message
//   } finally {
//     modelStore.isLoading = false
//   }
// }

onMounted( () => {
  // initModelConfig()
  modelStore.fetchProvidersAndModels()
  const chatingModel = localStorage.getItem("chating_model")
  if (chatingModel) {
    chatStore.setModel(JSON.parse(chatingModel))
  } else {
    const initModel = {"id":"deepseek:deepseek-chat","provider_id":"deepseek","name":"DeepSeek Chat","group_name":"DeepSeek Chat","state":true,"sort":78,"created_at":null,"updated_at":null,"deleted_at":null,"createdAt":null,"updatedAt":null,"deletedAt":null,"from":"common"}
    chatStore.setModel(initModel)
  }
})
</script>

<template>
  <div>
    <Popover align="left" v-model:open="isShowModelSelect">
      <PopoverTrigger>
        <Button asChild variant="outline" class="flex">
          <div>
            <Icon :size="18" :name="chatStore.model.provider_id ? chatStore.model.provider_id : '⚙️'"></Icon>
            {{ chatStore.model.name ? chatStore.model.name : t('settings.modelSelect.selectModel') }} <ChevronsDownUp> </ChevronsDownUp>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" class="w-auto px-2 py-2">
        <!-- group -->
        <ScrollArea class="h-[500px] max-h-[500px] w-[350px]" :class="groupedModels.size">
          <!-- <ScrollArea class="max-h-[400px] w-full"> -->
          <div class="" v-for="(value, key) in groupedModels" :key="key">
            <div class="text-sm px-4 py-2 text-gray-400 flex items-center">
              <div>{{ key === "local" ? t('settings.modelSelect.localModel') : value.name }}</div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      @click="handleConfigModel(key)"
                      size="icon"
                      variant="ghost"
                      class="size-6 ml-2"
                    >
                      <Cog></Cog> </Button
                  ></TooltipTrigger>
                  <TooltipContent>
                    <p>{{ t('settings.modelSelect.clickToConfig') }}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <!-- model -->
            <div v-if="key === 'local' && value.models.length == 0">
              <div class="ml-4 text-sm">
                {{ t('settings.modelSelect.noLocalModel') }}<Button
                  variant="link"
                  class="p-0 text-blue-500"
                  @click="handleConfigModel('local')"
                  >{{ t('settings.modelSelect.configureModel') }}</Button
                >
              </div>
            </div>
            <div
              v-for="item in value.models"
              class="flex items-center"
              :key="key + item.name"
            >
              <Button
                @click="handleModelChange(key, item)"
                class="w-full items-center justify-start"
                variant="ghost"
              >
                <Icon :name="key !== 'local' ? item.provider_id : item.name"></Icon> <span>{{ item.name }}</span>
                <!-- <Pin class="w-4 h-4 text-gray-300"></Pin> -->
              </Button>
            </div>
          </div>
          <ScrollBar />
        </ScrollArea>
      </PopoverContent>
    </Popover>
  </div>
</template>

<style scoped>
.select-trigger {
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
}
</style>
