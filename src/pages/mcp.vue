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
import type { McpServer } from '@/types/mcp'
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
const mcpToDelete = ref<McpServer | null>(null)

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
    <div class="flex justify-between items-center">
      <div>
        <div class="font-bold pt-6 text-2xl">{{ t('mcp.title') }}</div>
        <div class="mt-2 text-sm text-gray-400">{{ t('mcp.subtitle') }}</div>
      </div>
      <div class="flex items-center space-x-2">
        <Config></Config>
        <Env></Env>
        <Button variant="outline">
          <FileText class="w-4 h-4 mr-2" />
          {{ t('mcp.helpDoc') }}
        </Button>
      </div>
    </div>

    <ScrollArea class="h-[calc(100dvh-130px)]">
      <div class="mt-6">
        <div class="font-medium mb-3 flex justify-between">
          <h3>{{ t('mcp.installedTitle') }}</h3>
          <div class="flex items-center space-x-2">
            <Button variant="outline" size="sm" @click="refreshServers" :disabled="mcpStore.loadingServers">
              <RefreshCw class="w-4 h-4" :class="{ 'animate-spin': mcpStore.loadingServers }" />
              {{ t('mcp.refresh') }}
            </Button>
          </div>
        </div>

        <AddNew></AddNew>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="rounded-md border overflow-hidden cursor-pointer hover:border-primary flex flex-col justify-center" @click="handleAddNew">
            <div class="flex flex-col items-center justify-center">
              <PlusCircle class="w-8 h-8 mb-2" />
              <span class="text-sm">{{ t('mcp.addNew') }}</span>
            </div>
          </div>

          <div 
            v-for="item in mcpStore.installedServers" 
            :key="item.key"
            class="rounded-md border overflow-hidden"
          >
            <div class="font-bold p-4 flex justify-between items-center">
              <span>{{ item.chineseName }}</span>
              <Badge :variant="item.status === 'running' ? 'default' : 'secondary'">
                {{ item.status === 'running' ? t('mcp.running') : t('mcp.stopped') }}
              </Badge>
            </div>
            <Separator></Separator>
            <div class="p-4 relative">
              <div class="text-sm line-clamp-3 text-zinc-500 min-h-16">{{ item.AbstractCN }}</div>
              <div class="flex justify-between items-center mt-2">
                <div class="flex items-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    @click="toggleServerStatus(item)" 
                    :title="item.status === 'running' ? t('mcp.stop') : t('mcp.start')"
                    :disabled="loadingMcps[item.key]"
                  >
                    <RefreshCw v-if="loadingMcps[item.key]" class="w-4 h-4 animate-spin" />
                    <Play v-else-if="item.status !== 'running'" class="w-4 h-4 fill-primary" />
                    <Square v-else class="w-4 h-4 fill-primary-foreground" />
                  </Button>
                </div>
                <div class="flex items-center space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    @click="openAddNewWithMcp(item)" 
                    :title="t('mcp.edit')"
                    class="hover:bg-primary/10 transition-colors"
                  >
                    <Edit class="w-4 h-4 text-gray-400 group-hover:text-primary" />
                  </Button>
                  <Button variant="ghost" size="icon" @click="handleDelete(item)" :title="t('mcp.delete')">
                    <Trash2 class="w-4 h-4 text-gray-400" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="mcpStore.installedServers.length === 0 && !mcpStore.loadingServers" class="col-span-4 text-center py-8 text-muted-foreground">
            {{ t('mcp.noInstalled') }}
          </div>

          <div v-if="mcpStore.loadingServers && mcpStore.installedServers.length === 0" class="col-span-4 text-center py-8 text-muted-foreground">
            {{ t('mcp.loading') }}
          </div>
        </div>
      </div>

      <div class="flex-1 mt-6">
        <div class="font-medium mb-3 flex justify-between">
          <h3>{{ t('mcp.recommendedTitle') }}</h3>
          <div class="flex items-center space-x-2">
            <Button variant="outline">{{ t('mcp.viewMore') }}</Button>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="item in filteredMcpList" :key="item.Id" class="rounded-md border overflow-hidden">
            <div class="font-bold p-4">
              {{ item.ChineseName || item.Name }}
            </div>
            <Separator></Separator>
            <div class="p-4 relative">
              <div class="text-sm line-clamp-3 text-zinc-500">{{ item.AbstractCN || item.Abstract }}</div>
              <div class="flex justify-between items-center mt-4">
                <div class="flex items-center">
                  <Badge variant="outline">
                    <span>{{ item.FromSite }}</span>
                  </Badge>
                </div>
                <Button 
                  @click="openAddNewWithMcp(item)" 
                  variant="ghost" 
                  size="icon"
                  :title="t('mcp.installApp')"
                  class="hover:bg-primary/10 transition-colors"
                >
                  <SquareArrowOutUpRight class="w-4 h-4 text-gray-400 hover:text-primary" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>

    <Dialog :open="showDeleteDialog" @update:open="showDeleteDialog = $event">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{{ t('mcp.confirmDeleteTitle') }}</DialogTitle>
          <DialogDescription>
            {{ t('mcp.confirmDeleteDesc', { name: mcpToDelete?.chineseName || mcpToDelete?.name || mcpToDelete?.key }) }}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" @click="cancelDelete">{{ t('mcp.cancel') }}</Button>
          <Button variant="destructive" @click="confirmDelete">{{ t('mcp.delete') }}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>