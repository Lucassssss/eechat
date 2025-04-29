<script setup>
import { Button } from "@/components/ui/button"
import { Settings, Save, RefreshCw } from "lucide-vue-next"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { ref, onMounted } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster } from '@/components/ui/toast'
import MonacoEditor from "@/components/common/MonacoEditor.vue"
import { useMcpStore } from "@/stores/mcp"

const mcpStore = useMcpStore()

// 正确获取 toast 函数
const { toast } = useToast() // 使用解构赋值获取 toast 函数

const configPath = ref('')
const configFilePath = ref('') // 新增完整文件路径变量
const configContent = ref('')
const originalContent = ref('')
const dialogOpen = ref(false)
const loading = ref(false)
const saving = ref(false)
const editorRef = ref(null)

// 获取配置文件路径
const getConfigPath = async () => {
  try {
    const paths = await window.ipcRenderer.invoke('get-app-paths')
    configPath.value = paths.config
    // 获取完整的配置文件路径
    configFilePath.value = await window.ipcRenderer.invoke('get-mcp-config-path')
    return paths.config
  } catch (error) {
    console.error('获取配置路径失败:', error)
    toast({
      title: "路径获取失败",
      description: "无法获取配置文件路径",
      variant: "destructive",
    })
  }
}

// 加载配置文件内容
const loadConfigFile = async () => {
  try {
    loading.value = true
    const path = await getConfigPath()
    const content = await window.ipcRenderer.invoke('read-mcp-config')
    configContent.value = content
    originalContent.value = content
  } catch (error) {
    console.error('加载配置文件失败:', error)
    // 修改 toast 调用方式
    toast({  // 直接调用 toast，不需要 toast.toast
      title: "加载失败",
      description: "无法加载MCP配置文件",
      variant: "destructive",
    })
  } finally {
    loading.value = false
  }
}

// 格式化JSON
const formatJson = () => {
  try {
    const parsed = JSON.parse(configContent.value)
    configContent.value = JSON.stringify(parsed, null, 2)
    if (editorRef.value) {
      editorRef.value.formatCode()
    }
  } catch (e) {
    // 修改 toast 调用方式
    toast({  // 直接调用 toast，不需要 toast.toast
      title: "格式错误",
      description: "JSON格式不正确，无法格式化",
      variant: "destructive",
    })
  }
}

// 保存配置文件
const saveConfigFile = async () => {
  try {
    saving.value = true
    
    // 验证JSON格式
    try {
      JSON.parse(configContent.value)
    } catch (e) {
      // 修改 toast 调用方式
      toast({  // 直接调用 toast，不需要 toast.toast
        title: "格式错误",
        description: "JSON格式不正确，请检查后重试",
        variant: "destructive",
      })
      saving.value = false
      return
    }
    
    await window.ipcRenderer.invoke('save-mcp-config', configContent.value)
    originalContent.value = configContent.value
    
    try {
      toast({
        title: "保存成功，正在重启服务",
        description: "MCP配置文件已更新",
      })
      const res = await mcpStore.restartServer()
      const desStr = res.details.failedServers.map(server => `${server.key}: ${server.error}`).join('，  \n')
      mcpStore.fetchTools()
      toast({
        title: res.message,
        description: desStr ? desStr : '重启服务成功',
      })
      dialogOpen.value = false
    } catch (error) {
      toast({  // 直接调用 toast，不需要 toast.toast
        title: "重启服务失败",
        description: error.message || "重启服务失败",
        variant: "destructive",
      })
    }
  } catch (error) {
    console.error('保存配置文件失败:', error)
    // 修改 toast 调用方式
    toast({  // 直接调用 toast，不需要 toast.toast
      title: "保存失败",
      description: error.message || "无法保存MCP配置文件",
      variant: "destructive",
    })
  } finally {
    saving.value = false
  }
}

// 重置配置
const resetConfig = () => {
  configContent.value = originalContent.value
}

// 对话框打开时的处理函数
const handleDialogOpen = (open) => {
  dialogOpen.value = open
  if (open) {
    // 对话框打开时加载配置
    loadConfigFile()
  }
}

// 打开配置文件目录
const openConfigDirectory = async () => {
  await window.ipcRenderer.invoke('open-directory', configPath.value)
}

onMounted(async () => {
  await getConfigPath()
})
</script>

<template>
  <Dialog @update:open="handleDialogOpen">
    <DialogTrigger asChild>
      <Button>
        <Settings class="w-4 h-4 mr-2" />
        配置文件
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>MCP 配置文件</DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div v-if="loading" class="flex justify-center items-center py-8">
          <RefreshCw class="w-6 h-6 animate-spin" />
          <span class="ml-2">加载中...</span>
        </div>
        <div v-else>
          <div class="relative rounded overflow-hidden">
            <!-- 使用 Monaco Editor 组件 -->
            <MonacoEditor
              ref="editorRef"
              v-model="configContent"
              language="json"
              :theme="'vs-dark'"
              height="60dvh"
              :options="{
                formatOnPaste: true,
                formatOnType: true,
                autoIndent: true
              }"
            />
          </div>
        </div>
      <div class="flex items-center justify-between mt-4 space-x-4">
        <div>
          <span class="text-sm text-muted-foreground break-all">{{ configFilePath }}</span>
        </div>
        <div class="flex space-x-2">
          <Button variant="outline" size="sm" @click="openConfigDirectory">
            打开目录
          </Button>
        </div>
      </div>
      </div>
      <DialogFooter>
        <Button variant="outline" @click="resetConfig" :disabled="loading || saving">
          重置
        </Button>
          <Button variant="outline" @click="formatJson" :disabled="loading || saving">
            格式化
          </Button>
        <Button @click="saveConfigFile" :disabled="loading || saving">
          <Save v-if="!saving" class="w-4 h-4" />
          <RefreshCw v-else class="w-4 h-4 animate-spin" />
          {{ saving ? '保存中...' : '保存' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  <!-- 添加 Toaster 组件到模板根级别 -->
  <Toaster />
</template>
