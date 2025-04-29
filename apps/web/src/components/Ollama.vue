<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { Button } from "@/components/ui/button"
import { CircleDot, Download, Play, Square, AlertCircle } from "lucide-vue-next"

// Ollama 状态枚举
enum OllamaStatus {
  CHECKING = "checking",
  NOT_INSTALLED = "not_installed",
  STOPPED = "stopped",
  RUNNING = "running",
  ERROR = "error",
}

const status = ref<OllamaStatus>(OllamaStatus.CHECKING)
const errorMessage = ref("")

// 添加工具函数
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// 添加状态检查控制变量
const shouldCheck = ref(true) // 控制是否继续检查
const intervalTime = 5000 // 检查间隔时间

// 检查 Ollama 状态
const checkOllamaStatus = async () => {
  // 如果不需要检查,直接返回
  if (!shouldCheck.value) return

  let attempts = 0
  const maxAttempts = 3 // 最多重试3次

  while (attempts < maxAttempts && shouldCheck.value) {
    try {
      const response = await fetch("http://localhost:11434/api/version")
      if (response.ok) {
        status.value = OllamaStatus.RUNNING
        return
      } else {
        status.value = OllamaStatus.STOPPED
        return
      }
    } catch (error: any) {
      console.error(`Attempt ${attempts + 1} failed:`, error)
      attempts++

      if (attempts === maxAttempts) {
        // 最后一次尝试失败，检查是否安装
        try {
          const platform = await window.ipcRenderer.invoke("get-platform")
          const isWindows = platform === "win32"
          const checkCmd = isWindows ? "where ollama" : "which ollama"
          await window.ipcRenderer.invoke("exec", checkCmd)
          status.value = OllamaStatus.STOPPED
        } catch {
          status.value = OllamaStatus.NOT_INSTALLED
          shouldCheck.value = false // 未安装时停止检查
        }
        return
      }

      // 等待后重试
      await wait(1000)
    }
  }
}

// 启动 Ollama
const startOllama = async (): Promise<void> => {
  try {
    shouldCheck.value = true // 开始检查
    status.value = OllamaStatus.CHECKING

    // 先检查 Ollama 是否已经在运行
    try {
      const response = await fetch("http://localhost:11434/api/version")
      if (response.ok) {
        status.value = OllamaStatus.RUNNING
        return
      }
    } catch {}

    // 启动 Ollama
    await window.ipcRenderer.invoke("exec", "ollama serve")

    // 等待服务启动
    let attempts = 0
    const maxAttempts = 10 // 最多尝试10次

    while (attempts < maxAttempts) {
      try {
        const response = await fetch("http://localhost:11434/api/version")
        if (response.ok) {
          status.value = OllamaStatus.RUNNING
          return
        }
      } catch {}

      // 等待1秒后重试
      await new Promise((resolve) => setTimeout(resolve, 1000))
      attempts++
    }

    // 如果多次尝试后仍未成功,则认为启动失败
    shouldCheck.value = false
    throw new Error("启动超时")
  } catch (error: any) {
    console.error("Failed to start Ollama:", error)
    status.value = OllamaStatus.ERROR
    errorMessage.value = "启动失败: " + (error.message || "未知错误")
    shouldCheck.value = false // 错误时停止检查
  }
}

// 停止 Ollama
const stopOllama = async () => {
  try {
    shouldCheck.value = false // 停止前暂停检查
    status.value = OllamaStatus.CHECKING

    // 从主进程获取平台信息
    const platform = await window.ipcRenderer.invoke("get-platform")
    const killCmd = platform === "win32" ? "taskkill /F /IM ollama.exe" : "pkill ollama"

    await window.ipcRenderer.invoke("exec", killCmd)

    // 等待进程真正结束
    let attempts = 0
    const maxAttempts = 5

    while (attempts < maxAttempts) {
      try {
        const response = await fetch("http://localhost:11434/api/version")
        if (!response.ok) {
          status.value = OllamaStatus.STOPPED
          return
        }
      } catch {
        // 如果请求失败,说明服务已经停止
        status.value = OllamaStatus.STOPPED
        return
      }

      await wait(1000)
      attempts++
    }

    throw new Error("停止超时")
  } catch (error) {
    console.error("Failed to stop Ollama:", error)
    status.value = OllamaStatus.ERROR
    // @ts-ignore
    errorMessage.value = "停止失败: " + (error.message || "未知错误")
  } finally {
    shouldCheck.value = true // 恢复检查
  }
}

// 下载 Ollama
const downloadOllama = () => {
  // 打开下载页面
  window.ipcRenderer.invoke("open-external", "https://ollama.ai/download")
}

// 状态文本映射
const statusText = {
  [OllamaStatus.CHECKING]: "Ollama 检查中...",
  [OllamaStatus.NOT_INSTALLED]: "Ollama 未安装",
  [OllamaStatus.STOPPED]: "Ollama 未运行",
  [OllamaStatus.RUNNING]: "Ollama 运行中",
  [OllamaStatus.ERROR]: errorMessage.value || "Ollama 错误",
}

// 状态图标映射
const StatusIcon = {
  [OllamaStatus.CHECKING]: CircleDot,
  [OllamaStatus.NOT_INSTALLED]: Download,
  [OllamaStatus.STOPPED]: Play,
  [OllamaStatus.RUNNING]: Square,
  [OllamaStatus.ERROR]: AlertCircle,
}

// 添加定期检查
let checkInterval: NodeJS.Timeout | null = null

onMounted(() => {
  checkOllamaStatus()
  // 每5秒检查一次状态
  checkInterval = setInterval(() => {
    if (shouldCheck.value) {
      checkOllamaStatus()
    }
  }, intervalTime)
})

onUnmounted(() => {
  shouldCheck.value = false
  if (checkInterval) {
    clearInterval(checkInterval)
    checkInterval = null
  }
})
</script>

<template>
  <div class="flex items-center gap-2">
    <Button
      variant="outline"
      size="sm"
      class="gap-2"
      :disabled="status === OllamaStatus.CHECKING"
      @click="
        () => {
          if (status === OllamaStatus.NOT_INSTALLED) {
            downloadOllama()
          } else if (status === OllamaStatus.STOPPED) {
            startOllama()
          } else if (status === OllamaStatus.RUNNING) {
            stopOllama()
          }
        }
      "
    >
      <component
        :is="StatusIcon[status]"
        class="h-4 w-4"
        :class="{
          'text-gray-400': status === OllamaStatus.CHECKING,
          'text-red-500': status === OllamaStatus.NOT_INSTALLED,
          'text-yellow-500': status === OllamaStatus.STOPPED,
          'text-green-500': status === OllamaStatus.RUNNING,
          // @ts-ignore
          'text-red-500': status === OllamaStatus.ERROR,
        }"
      />
      {{ statusText[status] }}
    </Button>
  </div>
</template>
