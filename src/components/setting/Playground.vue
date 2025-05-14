<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from "vue"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useI18n } from "vue-i18n"

const serverPath = ref("../server")
const resStr = ref("")

const { t } = useI18n()

// 添加更新器事件监听
const setupUpdateListeners = () => {
  window.ipcRenderer.on("update-error", (_, message) => {
    resStr.value = JSON.stringify({ type: "error", message })
  })

  window.ipcRenderer.on("update-available", (_, info) => {
    resStr.value = JSON.stringify({ type: "update-available", info })
  })

  window.ipcRenderer.on("update-not-available", (_, info) => {
    resStr.value = JSON.stringify({ type: "update-not-available", info })
  })

  window.ipcRenderer.on("download-progress", (_, progressObj) => {
    resStr.value = JSON.stringify({ type: "progress", ...progressObj })
  })

  window.ipcRenderer.on("update-downloaded", (_, info) => {
    resStr.value = JSON.stringify({ type: "downloaded", info })
  })
}

// 移除事件监听
const removeUpdateListeners = () => {
  window.ipcRenderer.removeAllListeners("update-error")
  window.ipcRenderer.removeAllListeners("update-available")
  window.ipcRenderer.removeAllListeners("update-not-available")
  window.ipcRenderer.removeAllListeners("download-progress")
  window.ipcRenderer.removeAllListeners("update-downloaded")
}

onMounted(() => {
  setupUpdateListeners()
})

onUnmounted(() => {
  removeUpdateListeners()
})
const handleClickStart = async () => {
  console.log("handleClickStart")
  const res = await window.ipcRenderer.invoke("startEggServer", serverPath.value)
  console.log(res)
  resStr.value = res
}
const handleClickStop = async () => {
  console.log("handleClickStop")
  try {
    const res = await window.ipcRenderer.invoke("stopEggServer")
    resStr.value = res
  } catch (error) {
    resStr.value = JSON.stringify(error)
  }
}
const checkUpdate = async () => {
  console.log("checkUpdate")
  try {
    const res = await window.ipcRenderer.invoke("check-update")
    resStr.value = res
  } catch (error) {
    resStr.value = JSON.stringify(error)
  }
}
const downloadUpdate = async () => {
  console.log("downloadUpdate")
  try {
    const res = await window.ipcRenderer.invoke("download-update")
    resStr.value = res
  } catch (error) {
    resStr.value = JSON.stringify(error)
  }
}
const installUpdate = async () => {
  console.log("installUpdate")
  try {
    const res = await window.ipcRenderer.invoke("install-update")
    resStr.value = res
  } catch (error) {
    resStr.value = JSON.stringify(error)
  }
}

const modelPath = ref("/Users/lucas/workspace/workspace/ai/deepseek/llmModel/DeepSeek-R1-Distill-Qwen-7B-Q3_K_L.gguf")
const chatMessage = ref(t('settings.devPlayground.inputMessage'))

const initializeLlama = async () => {
  try {
    const res = await window.ipcRenderer.invoke("nodeLlamaCppInit", modelPath.value)
    resStr.value = JSON.stringify(res)
  } catch (error) {
    resStr.value = JSON.stringify(error)
  }
}

const sendMessage = async () => {
  try {
    const res = await window.ipcRenderer.invoke("nodeLlamaCppChat", chatMessage.value)
    resStr.value = res
  } catch (error) {
    resStr.value = JSON.stringify(error)
  }
}

const hancleQuit = async () => {
  try {
    const res = await window.ipcRenderer.invoke("quit")
    resStr.value = JSON.stringify(res)
  } catch (error) {
    resStr.value = JSON.stringify(error)
  }
}
const hancleReload = async () => {
  try {
    const res = await window.ipcRenderer.invoke("reload")
    resStr.value = JSON.stringify(res)
  } catch (error) {
    resStr.value = JSON.stringify(error)
  }
}
</script>

<template>
  <div class="h-full space-y-6">
    <div>{{ t('settings.devPlayground.title') }}</div>
    <div class="flex flex-col space-y-6">
      <div class="space-x-2"> 
        <Button @click="hancleQuit">{{ t('settings.devPlayground.quit') }}</Button>
        <Button @click="hancleReload">{{ t('settings.devPlayground.reload') }}</Button>
      </div>
      <Input v-model="serverPath" :placeholder="t('settings.devPlayground.serverPath')"></Input>
      <div class="flex space-x-2">
        <Button @click="handleClickStart">{{ t('settings.devPlayground.startEggServer') }}</Button>
        <Button @click="handleClickStop">{{ t('settings.devPlayground.stopEggServer') }}</Button>
      </div>
      <div class="flex space-x-2">
        <Button @click="checkUpdate">{{ t('settings.devPlayground.checkUpdate') }}</Button>
        <Button @click="downloadUpdate">{{ t('settings.devPlayground.downloadUpdate') }}</Button>
        <Button @click="installUpdate">{{ t('settings.devPlayground.installUpdate') }}</Button>
      </div>
      <div class="flex flex-col space-y-6">
        <Input v-model="modelPath" :placeholder="t('settings.devPlayground.modelPath')"></Input>
        <Button @click="initializeLlama">{{ t('settings.devPlayground.initModel') }}</Button>

        <Input v-model="chatMessage" :placeholder="t('settings.devPlayground.inputMessage')"></Input>
        <Button @click="sendMessage">{{ t('settings.devPlayground.sendMessage') }}</Button>
      </div>
      <div class="res">
        {{ resStr }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
