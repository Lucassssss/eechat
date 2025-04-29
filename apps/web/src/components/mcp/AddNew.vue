<script setup>
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { PlusCircle, Server, Globe, Terminal, Wand2, RefreshCw } from "lucide-vue-next"
import { useToast } from "@/components/ui/toast/use-toast"
import { Toaster } from "@/components/ui/toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ref, computed, reactive, watch, onMounted } from "vue"
import { useMcpStore } from "@/stores/mcp"
// 导入 Markdown 渲染组件
import MarkdownRenderer from "@/components/common/MarkdownRenderer.vue"
import { mcpApi } from '@/api/request'

const { toast } = useToast()
const mcpStore = useMcpStore() // 使用MCP store
const transportType = ref("stdio")
const serverKey = ref("")
const dialogOpen = ref(false) // 初始值设为false

// 添加缺失的变量
const readmeUrl = ref("") // README URL输入框的值
const readmeContent = ref("") // 存储获取到的README内容
const isLoadingReadme = ref(false) // 加载状态

// 计算显示的README内容
const displayReadmeContent = computed(() => {
  // 如果有手动获取的README内容，优先显示
  if (readmeContent.value) {
    return readmeContent.value
  }
  // 否则显示选中MCP的README内容
  return mcpStore.selectedMcp?.ReadmeCN || mcpStore.selectedMcp?.Readme || ""
})

// 获取README内容的函数
const fetchReadme = async () => {
  if (!readmeUrl.value.trim()) {
    toast({
      title: "URL不能为空",
      description: "请输入有效的README URL",
      variant: "destructive",
    })
    return
  }

  isLoadingReadme.value = true
  try {
    // 调用API获取README内容
    const content = await mcpApi.fetchReadme(readmeUrl.value)
    
    if (content) {
      readmeContent.value = content
      toast({
        title: "获取成功",
        description: "README内容已成功获取",
      })
    } else {
      toast({
        title: "获取失败",
        description: "无法获取README内容，请检查URL是否正确",
        variant: "destructive",
      })
    }
  } catch (error) {
    console.error("获取README失败:", error)
    toast({
      title: "获取失败",
      description: error.message || "未知错误",
      variant: "destructive",
    })
  } finally {
    isLoadingReadme.value = false
  }
}

const formData = reactive({
  stdio: {
    command: "",
    args: "",
    env: "",
    enabled: true,
  },
  sse: {
    url: "",
    headers: "",
    enabled: true,
  },
})

// 表单验证
const isValid = computed(() => {
  if (!serverKey.value.trim()) return false

  if (transportType.value === "stdio") {
    return formData.stdio.command.trim() !== ""
  } else {
    return formData.sse.url.trim() !== ""
  }
})

// 重置表单
const resetForm = () => {
  serverKey.value = ""
  transportType.value = "stdio"
  formData.stdio.command = ""
  formData.stdio.args = ""
  formData.stdio.env = ""
  formData.stdio.enabled = true
  formData.sse.url = ""
  formData.sse.headers = ""
  formData.sse.enabled = true
  readmeContent.value = "" // 重置README内容
  readmeUrl.value = "" // 重置URL输入框
}

// AI自动填充表单
const autoFillForm = () => {
  // 如果既没有选中MCP也没有README内容，则不执行
  if (!mcpStore.selectedMcp && !readmeContent.value) return

  toast({
    title: "AI正在分析",
    description: "正在分析MCP信息并自动填充表单...",
  })

  // 根据MCP信息自动填充表单
  setTimeout(() => {
    // 如果有选中的MCP，使用MCP信息
    if (mcpStore.selectedMcp) {
      const mcp = mcpStore.selectedMcp

      // 设置服务标识
      serverKey.value = mcp.Name?.toLowerCase() || ""

      // 根据README中的配置信息设置表单
      if (mcp.ServerConfig) {
        try {
          const configs = JSON.parse(mcp.ServerConfig)
          if (configs && configs.length > 0) {
            const config = configs[0]
            const serverName = Object.keys(config.mcpServers)[0]
            const serverConfig = config.mcpServers[serverName]

            if (serverConfig.command) {
              transportType.value = "stdio"
              formData.stdio.command = serverConfig.command

              // 处理参数，每行一个
              if (serverConfig.args && Array.isArray(serverConfig.args)) {
                formData.stdio.args = serverConfig.args.join("\n")
              }

              // 处理环境变量
              if (serverConfig.env) {
                const envVars = []
                for (const [key, value] of Object.entries(serverConfig.env)) {
                  envVars.push(`${key}=${value}`)
                }
                formData.stdio.env = envVars.join("\n")
              }
            } else if (serverConfig.url) {
              transportType.value = "sse"
              formData.sse.url = serverConfig.url

              // 处理请求头
              if (serverConfig.headers) {
                const headerLines = []
                for (const [key, value] of Object.entries(serverConfig.headers)) {
                  headerLines.push(`${key}: ${value}`)
                }
                formData.sse.headers = headerLines.join("\n")
              }
            }
          }
        } catch (e) {
          console.error("解析ServerConfig失败:", e)
        }
      }
    } 
    // 如果有手动获取的README内容，尝试从中提取配置信息
    else if (readmeContent.value) {
      // 尝试从README中提取服务名称作为服务标识
      const nameMatch = readmeContent.value.match(/# ([a-zA-Z0-9_-]+)/);
      if (nameMatch && nameMatch[1]) {
        serverKey.value = nameMatch[1].toLowerCase();
      }
      
      // 尝试从README中提取配置信息
      try {
        // 查找JSON配置块
        const configMatch = readmeContent.value.match(/```json\s*({[\s\S]*?})\s*```/);
        if (configMatch && configMatch[1]) {
          const configJson = JSON.parse(configMatch[1]);
          
          // 检查是否包含MCP服务器配置
          if (configJson.mcpServers) {
            const serverName = Object.keys(configJson.mcpServers)[0];
            const serverConfig = configJson.mcpServers[serverName];
            
            if (serverConfig.command) {
              transportType.value = "stdio";
              formData.stdio.command = serverConfig.command;
              
              // 处理参数
              if (serverConfig.args && Array.isArray(serverConfig.args)) {
                formData.stdio.args = serverConfig.args.join("\n");
              }
              
              // 处理环境变量
              if (serverConfig.env) {
                const envVars = [];
                for (const [key, value] of Object.entries(serverConfig.env)) {
                  envVars.push(`${key}=${value}`);
                }
                formData.stdio.env = envVars.join("\n");
              }
            } else if (serverConfig.url) {
              transportType.value = "sse";
              formData.sse.url = serverConfig.url;
              
              // 处理请求头
              if (serverConfig.headers) {
                const headerLines = [];
                for (const [key, value] of Object.entries(serverConfig.headers)) {
                  headerLines.push(`${key}: ${value}`);
                }
                formData.sse.headers = headerLines.join("\n");
              }
            }
          }
        }
      } catch (e) {
        console.error("从README中提取配置失败:", e);
      }
    }

    toast({
      title: "填充完成",
      description: "AI已完成表单自动填充，请检查并修改",
    })
  }, 1500)
}

// 检查是否为编辑模式
const isEditMode = computed(() => mcpStore.selectedMcp?.isEditing || false)
// 根据编辑模式设置对话框标题
const dialogTitle = computed(() => isEditMode.value ? '编辑 MCP 应用' : '添加新 MCP 应用')

// 添加加载状态变量
const loading = ref(false)

// 监听对话框打开状态，当对话框打开时初始化表单
watch(() => mcpStore.showAddNewDialog, (newVal) => {
  if (newVal && mcpStore.selectedMcp) {
    // 如果是编辑模式，填充表单数据
    if (mcpStore.selectedMcp.isEditing) {
      const mcp = mcpStore.selectedMcp
      
      // 设置服务标识
      serverKey.value = mcp.key || ''
      
      // 设置传输类型
      transportType.value = mcp.config?.transportType || 'stdio'
      
      if (transportType.value === 'stdio') {
        // 填充命令
        formData.stdio.command = mcp.config?.command || ''
        
        // 填充参数，将数组转换为换行分隔的字符串
        if (mcp.config?.args && Array.isArray(mcp.config.args)) {
          formData.stdio.args = mcp.config.args.join('\n')
        } else {
          formData.stdio.args = ''
        }
        
        // 填充环境变量
        if (mcp.config?.env) {
          const envVars = []
          for (const [key, value] of Object.entries(mcp.config.env)) {
            envVars.push(`${key}=${value}`)
          }
          formData.stdio.env = envVars.join('\n')
        } else {
          formData.stdio.env = ''
        }
        
        // 设置启用状态
        formData.stdio.enabled = mcp.config?.enabled !== false
      } else if (transportType.value === 'sse') {
        // 填充URL
        formData.sse.url = mcp.config?.url || ''
        
        // 填充请求头
        if (mcp.config?.headers) {
          const headerLines = []
          for (const [key, value] of Object.entries(mcp.config.headers)) {
            headerLines.push(`${key}: ${value}`)
          }
          formData.sse.headers = headerLines.join('\n')
        } else {
          formData.sse.headers = ''
        }
        
        // 设置启用状态
        formData.sse.enabled = mcp.config?.enabled !== false
      }
    } else {
      // 如果是新增模式，可以预填充一些信息
      if (mcpStore.selectedMcp.Name) {
        serverKey.value = mcpStore.selectedMcp.Name.toLowerCase()
      }
    }
  }
})

// 修改提交表单方法，区分新增和编辑操作
const handleSubmit = async () => {
  try {
    loading.value = true
    
    // 验证服务标识
    if (!serverKey.value.trim()) {
      toast({
        title: "验证失败",
        description: "服务标识不能为空",
        variant: "destructive",
      })
      loading.value = false
      return
    }
    
    // 验证传输类型相关字段
    if (transportType.value === "stdio" && !formData.stdio.command.trim()) {
      toast({
        title: "验证失败",
        description: "命令不能为空",
        variant: "destructive",
      })
      loading.value = false
      return
    }
    
    if (transportType.value === "sse" && !formData.sse.url.trim()) {
      toast({
        title: "验证失败",
        description: "URL不能为空",
        variant: "destructive",
      })
      loading.value = false
      return
    }
    
    const serverData = {}

    // 构建服务器配置对象
    if (transportType.value === "stdio") {
      // 处理环境变量，将换行分隔的键值对转换为对象
      let env = {}
      if (formData.stdio.env.trim()) {
        const envLines = formData.stdio.env.split("\n").filter((line) => line.trim())
        for (const line of envLines) {
          const [key, value] = line.split("=").map((part) => part.trim())
          if (key && value !== undefined) {
            env[key] = value
          }
        }
      }

      // 处理参数，每行一个参数
      const args = formData.stdio.args
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "")

      serverData[serverKey.value] = {
        transportType: "stdio",
        command: formData.stdio.command,
        args: args,
        env: env,
        enabled: formData.stdio.enabled,
        // 添加名称和中文名称
        name: mcpStore.selectedMcp?.Name || serverKey.value,
        chineseName: mcpStore.selectedMcp?.ChineseName || mcpStore.selectedMcp?.Name || serverKey.value,
      }
    } else {
      // 处理请求头，将换行分隔的键值对转换为对象
      let headers = {}
      if (formData.sse.headers.trim()) {
        const headerLines = formData.sse.headers.split("\n").filter((line) => line.trim())
        for (const line of headerLines) {
          const [key, value] = line.split(":").map((part) => part.trim())
          if (key && value !== undefined) {
            headers[key] = value
          }
        }
      }

      serverData[serverKey.value] = {
        transportType: "sse",
        url: formData.sse.url,
        headers: headers,
        enabled: formData.sse.enabled,
        // 添加名称和中文名称
        name: mcpStore.selectedMcp?.Name || serverKey.value,
        chineseName: mcpStore.selectedMcp?.ChineseName || mcpStore.selectedMcp?.Name || serverKey.value,
      }
    }

    // 根据模式调用不同的API
    let res
    if (isEditMode.value) {
      // 编辑模式：调用更新API
      res = await mcpApi.updateMcpServer(serverData)
      toast({
        title: "更新成功",
        description: `MCP服务 ${serverKey.value} 已更新`,
      })
    } else {
      // 新增模式：调用添加API
      res = await mcpApi.addMcpServer(serverData)
      toast({
        title: "添加成功",
        description: `MCP服务 ${serverKey.value} 已添加`,
      })
    }

    console.log(isEditMode.value ? "更新" : "添加", "MCP服务器响应:", res)

    // 关闭对话框并重置表单
    mcpStore.closeAddNewDialog()
    resetForm()
    
    // 刷新服务器列表
    await mcpStore.refreshServers()
  } catch (error) {
    console.error(isEditMode.value ? "更新" : "添加", "MCP服务器失败:", error)
    toast({
      title: isEditMode.value ? "更新失败" : "添加失败",
      description: error.message || "未知错误",
      variant: "destructive",
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <Dialog v-model:open="mcpStore.showAddNewDialog">
      <DialogContent class="sm:min-w-[900px] md:min-w-[90vw]">
        <DialogHeader>
          <DialogTitle>{{ dialogTitle }}</DialogTitle>
        </DialogHeader>
        <!-- <DialogTrigger as-child></DialogTrigger> -->
        <div class="flex md:min-h-[70vh] h-[70dvh]">
          <!-- 左侧：MCP信息展示 -->
          <div class="border-r pr-8 p-4 w-[50%]">
            <div class="flex justify-between items-center mb-2">
              <div class="font-bold truncate">
                {{ mcpStore.selectedMcp?.ChineseName || mcpStore.selectedMcp?.Name || "新MCP服务" }}
              </div>
              <div>
                <div class="flex items-center space-x-2" v-if="!isEditMode">
                  <Input
                    v-model="readmeUrl"
                    class="w-[25dvw]"
                    placeholder="https://github.com/repo/project/README.md"
                  />
                  <Button @click="fetchReadme" :disabled="isLoadingReadme">
                    <span v-if="isLoadingReadme" class="animate-spin mr-2">⟳</span>
                    {{ isLoadingReadme ? "获取中..." : "获取" }}
                  </Button>
                </div>
              </div>
            </div>
            <!-- 使用 MarkdownRenderer 组件渲染 Readme 内容 -->
            <MarkdownRenderer
              :content="displayReadmeContent"
              class="text-sm mb-4 max-h-[60dvh] bg-gray-100 p-4 rounded-md overflow-y-auto"
            />
            <!-- <div class="flex items-center mb-4" v-if="mcpStore.selectedMcp">
              <img
                :src="mcpStore.selectedMcp.FromSiteIcon"
                class="w-5 h-5 rounded-full mr-2"
                alt="icon"
              />
              <span class="text-sm text-gray-500">{{
                mcpStore.selectedMcp.FromSite
              }}</span>
            </div> -->

            <Button @click="autoFillForm" class="w-full">
              <Wand2 class="w-4 h-4 mr-2" />
              AI自动填充 (Beta)
            </Button>
          </div>

          <!-- 右侧表单部分保持不变 -->
          <div :class="{ 'md:col-span-2': !mcpStore.selectedMcp }" class="space-y-4  w-[50%]">
            <div class="grid grid-cols-4 items-center gap-4">
              <Label class="text-right" for="server-key">服务标识</Label>
              <Input
                id="server-key"
                v-model="serverKey"
                placeholder="例如: filesystem, fetch"
                class="col-span-3"
              />
            </div>

            <div class="grid grid-cols-4 items-center gap-4">
              <Label class="text-right" for="transport-type">传输类型</Label>
              <Select v-model="transportType">
                <SelectTrigger class="col-span-3">
                  <SelectValue placeholder="选择传输类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stdio">
                    <div class="flex items-center">
                      <Terminal class="w-4 h-4 mr-2" />
                      <span>标准输入输出 (stdio)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="sse">
                    <div class="flex items-center">
                      <Globe class="w-4 h-4 mr-2" />
                      <span>服务器发送事件 (SSE)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <!-- stdio 配置 -->
            <div v-if="transportType === 'stdio'" class="space-y-4">
              <div class="grid grid-cols-4 items-center gap-4">
                <Label class="text-right" for="command">命令</Label>
                <Input
                  id="command"
                  v-model="formData.stdio.command"
                  placeholder="例如: npx, node, uvx"
                  class="col-span-3"
                />
              </div>

              <div class="grid grid-cols-4 items-start gap-4">
                <Label class="text-right pt-2" for="args">参数</Label>
                <div class="col-span-3">
                  <Textarea
                    id="args"
                    v-model="formData.stdio.args"
                    placeholder="每行一个参数
例如:
-y
@modelcontextprotocol/server-filesystem
C:/Users/Documents"
                    class="min-h-[140px]"
                  />
                  <p class="text-xs text-muted-foreground mt-1">
                    每行输入一个参数，无需逗号分隔
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-4 items-start gap-4">
                <Label class="text-right pt-2" for="env">环境变量</Label>
                <div class="col-span-3">
                  <Textarea
                    id="env"
                    v-model="formData.stdio.env"
                    placeholder="每行一个环境变量，格式为 KEY=VALUE
例如:
NODE_ENV=production
DEBUG=true"
                    class="min-h-[140px]"
                  />
                  <p class="text-xs text-muted-foreground mt-1">
                    每行一个环境变量，格式为 KEY=VALUE
                  </p>
                </div>
              </div>
            </div>

            <!-- sse 配置 -->
            <div v-if="transportType === 'sse'" class="space-y-4">
              <div class="grid grid-cols-4 items-center gap-4">
                <Label class="text-right" for="url">URL</Label>
                <Input
                  id="url"
                  v-model="formData.sse.url"
                  placeholder="例如: https://mcp.example.com/sse"
                  class="col-span-3"
                />
              </div>

              <div class="grid grid-cols-4 items-start gap-4">
                <Label class="text-right pt-2" for="headers">请求头</Label>
                <div class="col-span-3">
                  <Textarea
                    id="headers"
                    v-model="formData.sse.headers"
                    placeholder="每行一个请求头，格式为 KEY: VALUE
例如:
Authorization: Bearer token123
Content-Type: application/json"
                    class="min-h-[120px]"
                  />
                  <p class="text-xs text-muted-foreground mt-1">
                    每行一个请求头，格式为 KEY: VALUE
                  </p>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-4 items-center gap-4">
              <Label class="text-right" for="enabled">启用</Label>
              <div class="flex items-center space-x-2 col-span-3">
                <Switch id="enabled" v-model="formData[transportType].enabled" />
                <Label for="enabled">{{
                  formData[transportType].enabled ? "已启用" : "已禁用"
                }}</Label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" @click="mcpStore.closeAddNewDialog()">
            取消
          </Button>
          <!-- <Button type="button" variant="secondary" class="mr-2"> 测试连接 </Button> -->
          <Button 
            type="submit" 
            :disabled="!isValid || loading" 
            @click="handleSubmit"
          > 
            <RefreshCw v-if="loading" class="animate-spin">
            
            </RefreshCw>
            {{ isEditMode ? '更新' : '添加' }} 
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <Toaster />
  </div>
</template>
