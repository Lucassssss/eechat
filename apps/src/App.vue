<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue"
import { onMounted, onErrorCaptured } from "vue"
import { useModelStore } from "@/stores/model"
import { useEnvStore } from "@/stores/env"
import Layout from "@/components/Layout.vue"
import { llmApi, ollamaApi } from "@/api/request"
import { LLMProvider, ModelProvider } from "@/types/llm"
import { useRouter } from "vue-router"
import { useColorMode } from '@vueuse/core'
import { Analytics } from '@vercel/analytics/vue'
const mode = useColorMode()

const modelStore = useModelStore()
const envStore = useEnvStore()
const router = useRouter()

// 捕获全局错误
onErrorCaptured((err, instance, info) => {
  console.error("Vue 错误:", err)
  console.error("错误信息:", info)
  return false
})

// 初始化模型配置
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

onMounted(() => {
  setTimeout(() => {
    modelStore.fetchProvidersAndModels()
  }, 100)
})

envStore.initEnv()
console.log(`platform:`, envStore.platform)
console.log(`isweb:`, envStore.isWeb)
</script>

<template>
  <div class="h-full w-full overflow-hidden"><Layout></Layout></div>
  <Analytics mode="production" />
</template>

<style>
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo.electron:hover {
  filter: drop-shadow(0 0 2em #9feaf9);
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
