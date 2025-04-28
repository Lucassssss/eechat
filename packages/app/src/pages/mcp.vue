<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ref, onMounted } from "vue"
import { SquareArrowOutUpRight, PlusCircle, RefreshCw, Edit, Trash2, Play, Square } from "lucide-vue-next"
import { useI18n } from "vue-i18n"
import mcpMock from '@/api/mcpMock.json'
import { Settings, Terminal, FileText } from "lucide-vue-next"
import Env from "@/components/mcp/Env.vue"
import Config from "@/components/mcp/Config.vue"
import AddNew from "@/components/mcp/AddNew.vue"
import { Toaster } from '@/components/ui/toast'
import { useMcpStore } from '@/stores/mcp'
import { useToast } from "@/components/ui/toast/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// 使用MCP store
const mcpStore = useMcpStore()
const { toast } = useToast()
const { t } = useI18n()

// 分类列表
const categories = ref([
  {
    title: '推荐',
    value: 'recommended'
  },
  ...mcpMock.FiledAgg.Category.map(cat => ({
    title: cat.Value,
    value: cat.Value,
    count: cat.Count
  }))
])

// MCP 列表
const mcpList = ref(mcpMock.McpServer.McpServers)
const filteredMcpList = ref(mcpList.value)

// 当前选中的分类
const activeCategory = ref('recommended')

// 处理分类切换
const handleCategoryChange = (value: string) => {
  activeCategory.value = value
  if (value === 'recommended') {
    filteredMcpList.value = mcpList.value
  } else {
    filteredMcpList.value = mcpList.value.filter(item => item.Category === value)
  }
}

// 处理安装
const handleInstall = (mcp) => {
  console.log('安装', mcp)
}

// 移除静态数据，使用store中的数据
// const installedMcps = ref([...])

// 当前选中的MCP信息
const selectedMcp = ref(null)
const showAddNewDialog = ref(false)

// 处理添加新应用
const handleAddNew = () => {
  mcpStore.openAddNewDialog() // 使用store打开弹窗，不传MCP参数
}

// 打开AddNew对话框并传递MCP信息
const openAddNewWithMcp = (mcp) => {
  // 判断是编辑模式还是安装模式
  const isEditing = mcp.key !== undefined; // 已安装的MCP有key属性
  
  mcpStore.openAddNewDialog({
    ...mcp,
    isEditing: isEditing // 根据来源设置编辑模式标志
  })
}

// 刷新服务器列表
const refreshServers = async () => {
  try {
    await mcpStore.refreshServers()
    toast({
      title: "刷新成功",
      description: "MCP服务器列表已更新",
    })
  } catch (error) {
    toast({
      title: "刷新失败",
      description: (error as Error).message || "未知错误",
      variant: "destructive",
    })
  }
}

// 组件挂载时获取已安装的MCP服务器列表
onMounted(async () => {
  await mcpStore.fetchInstalledServers()
})

// 删除确认对话框状态
const showDeleteDialog = ref(false)
const mcpToDelete = ref(null)

// 处理删除MCP
const handleDelete = (mcp) => {
  mcpToDelete.value = mcp
  showDeleteDialog.value = true
}

// 确认删除MCP
const confirmDelete = async () => {
  if (!mcpToDelete.value) return
  
  try {
    await mcpStore.deleteMcpServer((mcpToDelete.value as any).key)
    toast({
      title: "删除成功",
      description: `已删除 ${(mcpToDelete.value as any).chineseName || (mcpToDelete.value as any).name || (mcpToDelete.value as any).key}`,
    })
    showDeleteDialog.value = false
    mcpToDelete.value = null
  } catch (error) {
    toast({
      title: "删除失败",
      description: (error as Error).message || "未知错误",
      variant: "destructive",
    })
  }
}

// 取消删除
const cancelDelete = () => {
  showDeleteDialog.value = false
  mcpToDelete.value = null
}

// 处理启动/停止MCP服务器
// 在 script 部分添加 loadingMcps 状态管理
const loadingMcps = ref<Record<string, boolean>>({}) // 记录每个MCP的loading状态

// 修改处理启动/停止MCP服务器的方法
const toggleServerStatus = async (mcp) => {
  try {
    // 设置当前MCP的loading状态为true
    loadingMcps.value[mcp.key] = true
    
    if (mcp.status === 'running') {
      await mcpStore.stopMcpServer(mcp.key)
      toast({
        title: "停止成功",
        description: `已停止 ${mcp.chineseName || mcp.name || mcp.key}`,
      })
    } else {
      await mcpStore.startMcpServer(mcp.key)
      toast({
        title: "启动成功",
        description: `已启动 ${mcp.chineseName || mcp.name || mcp.key}`,
      })
    }
    // 刷新服务器列表
    await mcpStore.refreshServers()
  } catch (error) {
    toast({
      title: mcp.status === 'running' ? "停止失败" : "启动失败",
      description: (error as Error).message || "未知错误",
      variant: "destructive",
    })
  } finally {
    // 操作完成后，重置loading状态
    loadingMcps.value[mcp.key] = false
  }
}
</script>

<template>
  <div class="mx-auto h-[100vh] max-[100vh] px-4 max-sm:px-4 flex flex-col overflow-hidden">
    <!-- 修改标题部分 -->
    <div class="flex justify-between items-center">
      <div>
        <div class="font-bold pt-6 text-2xl">MCP管理</div>
        <div class="mt-2 text-sm text-gray-400">
          管理和安装 MCP 应用，提升 AI 助手的能力
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <Config></Config>
        <Env></Env>
        <Button variant="outline">
          <FileText class="w-4 h-4 mr-2" />
          帮助文档
        </Button>
      </div>
    </div>

    <ScrollArea class="h-[calc(100dvh-130px)]">
    <!-- 调整已安装部分布局 -->
    <div class="mt-6">
      <div class="font-medium mb-3 flex justify-between">
        <h3>已安装应用</h3>
        <div class="flex items-center space-x-2">
          <Button variant="outline" size="sm" @click="refreshServers" :disabled="mcpStore.loadingServers">
            <RefreshCw class="w-4 h-4" :class="{ 'animate-spin': mcpStore.loadingServers }" />
            刷新
          </Button>
        </div>
      </div>
      
      <AddNew></AddNew>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- 添加新应用卡片 -->
        <div class="rounded-md border overflow-hidden cursor-pointer hover:border-primary flex flex-col justify-center" @click="handleAddNew">
          <div class="flex flex-col items-center justify-center">
            <PlusCircle class="w-8 h-8 mb-2" />
            <span class="text-sm">添加新应用</span>
          </div>
        </div>

        <!-- 使用store中的数据 -->
        <div 
          v-for="item in mcpStore.installedServers" 
          :key="item.key"
          class="rounded-md border overflow-hidden"
        >
          <div class="font-bold p-4 flex justify-between items-center">
            <span>{{ item.chineseName }}</span>
            <Badge :variant="item.status === 'running' ? 'default' : 'secondary'">
              {{ item.status === 'running' ? '运行中' : '已停止' }}
            </Badge>
          </div>
          <Separator></Separator>
          <div class="p-4 relative">
            <div class="text-sm line-clamp-3 text-zinc-500 min-h-16">{{ item.AbstractCN }}</div>
            <div class="flex justify-between items-center mt-2">
              <div class="flex items-center">
                <!-- 启动/停止按钮 -->
                <Button 
                  variant="ghost" 
                  size="icon" 
                  @click="toggleServerStatus(item)" 
                  :title="item.status === 'running' ? '停止服务' : '启动服务'"
                  :disabled="loadingMcps[item.key]"
                >
                  <!-- 显示loading状态 -->
                  <RefreshCw v-if="loadingMcps[item.key]" class="w-4 h-4 animate-spin" />
                  <!-- 非loading状态下显示播放或停止图标 -->
                  <Play v-else-if="item.status !== 'running'" class="w-4 h-4 fill-primary" />
                  <Square v-else class="w-4 h-4 fill-primary-foreground" />
                </Button>
              </div>
              <div class="flex items-center space-x-1">
                <!-- 编辑按钮 -->
                <Button 
                  variant="ghost" 
                  size="icon" 
                  @click="openAddNewWithMcp(item)" 
                  title="编辑配置"
                  class="hover:bg-primary/10 transition-colors"
                >
                  <Edit class="w-4 h-4 text-gray-400 group-hover:text-primary" />
                </Button>
                <!-- 删除按钮 -->
                <Button variant="ghost" size="icon" @click="handleDelete(item)" title="删除">
                  <Trash2 class="w-4 h-4 text-gray-400" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 显示无数据状态 -->
        <div v-if="mcpStore.installedServers.length === 0 && !mcpStore.loadingServers" class="col-span-4 text-center py-8 text-muted-foreground">
          暂无已安装的MCP应用，请点击"添加新应用"进行添加
        </div>
        
        <!-- 显示加载状态 -->
        <div v-if="mcpStore.loadingServers && mcpStore.installedServers.length === 0" class="col-span-4 text-center py-8 text-muted-foreground">
          正在加载MCP应用列表...
        </div>
      </div>
    </div>

    <!-- 调整下半部分布局 -->
    <div class=" flex-1 mt-6">
      <div class="font-medium mb-3 flex justify-between">
        <h3>推荐应用</h3>
        <div class="flex items-center space-x-2">
          <Button variant="outline">查看更多</Button>
        </div>
      </div>
        <div class="">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="item in filteredMcpList" :key="item.Id" class="rounded-md border overflow-hidden">
              <!-- 卡片内容保持不变 -->
              <div class="font-bold p-4">
                {{ item.ChineseName || item.Name }}
              </div>
              <Separator></Separator>
              <div class="p-4 relative">
                <div class="text-sm line-clamp-3 text-zinc-500">{{ item.AbstractCN || item.Abstract }}</div>
                <div class="flex justify-between items-center mt-4">
                  <div class="flex items-center">
                    <Badge variant="outline">
                      <span class="">{{ item.FromSite }}</span>
                    </Badge>
                  </div>
                  <Button 
                    @click="openAddNewWithMcp(item)" 
                    variant="ghost" 
                    size="icon"
                    title="安装此应用"
                    class="hover:bg-primary/10 transition-colors"
                  >
                    <SquareArrowOutUpRight class="w-4 h-4 text-gray-400 hover:text-primary"></SquareArrowOutUpRight>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </ScrollArea>
  
  <!-- 删除确认对话框 -->
  <Dialog :open="showDeleteDialog" @update:open="showDeleteDialog = $event">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>确认删除</DialogTitle>
        <DialogDescription>
          您确定要删除 {{ (mcpToDelete as any)?.chineseName || (mcpToDelete as any)?.name || (mcpToDelete as any)?.key }} 吗？此操作无法撤销。
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" @click="cancelDelete">取消</Button>
        <Button variant="destructive" @click="confirmDelete">删除</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  </div>
</template>