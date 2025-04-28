<script setup lang="ts">
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { ArrowDown, Download, RefreshCw } from "lucide-vue-next"
import { onMounted, ref } from "vue"

const { isMobile } = useSidebar()
const hasUpdate = ref(false)
const isDownloaded = ref(false)
const isChecking = ref(false)
const isDownloading = ref(false)
const downloadProgress = ref(0)

// 检查更新
const checkUpdate = async () => {
  try {
    isChecking.value = true
    const res = await window.ipcRenderer.invoke("check-update")
    console.log("检查更新结果:", res)
  } catch (error) {
    console.error("检查更新失败:", error)
  } finally {
    isChecking.value = false
  }
}

// 下载更新
const downloadUpdate = async () => {
  try {
    isDownloading.value = true
    await window.ipcRenderer.invoke("download-update")
  } catch (error) {
    console.error("下载更新失败:", error)
  }
}

// 安装更新
const installUpdate = async () => {
  try {
    await window.ipcRenderer.invoke("install-update")
  } catch (error) {
    console.error("安装更新失败:", error)
  }
}

// 监听更新事件
const setupUpdateListeners = () => {
  window.ipcRenderer.on("update-available", () => {
    hasUpdate.value = true
    downloadUpdate() // 自动开始下载
  })

  window.ipcRenderer.on("download-progress", (_, progressObj) => {
    downloadProgress.value = progressObj.percent || 0
  })

  window.ipcRenderer.on("update-downloaded", () => {
    isDownloaded.value = true
    isDownloading.value = false
  })

  window.ipcRenderer.on("update-not-available", () => {
    hasUpdate.value = false
  })
}

// 组件加载完成后自动检查更新
onMounted(() => {
  setupUpdateListeners()
  checkUpdate()
})
</script>

<template>
  <SidebarMenu class="mb-2">
    <SidebarMenuItem class="relative">
      <SidebarMenuButton
        class="rounded-full border flex justify-center items-center w-8 h-8"
        @click="isDownloaded && installUpdate()"
      >
        <template v-if="isChecking">
          <RefreshCw class="animate-spin text-gray-600" />
        </template>
        <template v-else-if="isDownloading">
          <span class="text-xs font-medium text-blue-600">
            {{ Math.round(downloadProgress) }}
          </span>
        </template>
        <template v-else>
          <ArrowDown :class="isDownloaded ? 'text-green-600' : 'text-gray-600'" />
        </template>
      </SidebarMenuButton>

      <!-- 更新提示动画 -->
      <span v-if="isDownloaded" class="absolute right-0 top-0 flex size-2">
        <span
          class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"
        ></span>
        <span class="relative inline-flex size-2 rounded-full bg-green-600"></span>
      </span>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
