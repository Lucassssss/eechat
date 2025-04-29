<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Button } from "@/components/ui/button"
import { PocketKnife, Check, RefreshCw } from "lucide-vue-next"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area" 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { useMcpStore } from '@/stores/mcp'

// 使用 MCP store
const mcpStore = useMcpStore()
const emit = defineEmits(['selectTool', 'selectTools'])

// 从 store 中获取工具列表和加载状态
const tools = computed(() => mcpStore.tools)
const loading = computed(() => mcpStore.loading)
// const loading = ref(true)
// 选中的工具列表，直接使用 store 中的数据
const selectedTools = computed({
  get: () => mcpStore.selectedTools,
  set: (value) => mcpStore.selectMultipleTools(value)
})

// 工具开关状态
const toolsEnabled = computed({
  get: () => mcpStore.toolsEnabled,
  set: (value) => {
    mcpStore.setToolsEnabled(value)
  }
})

// 按 serverKey 分组的工具
const groupedTools = computed(() => {
  const groups = {}
  tools.value.forEach(tool => {
    const serverKey = tool.metadata?.serverKey || '其他'
    if (!groups[serverKey]) {
      groups[serverKey] = []
    }
    groups[serverKey].push(tool)
  })
  
  return groups
})

// 获取所有分组
const groups = computed(() => Object.keys(groupedTools.value))

// 获取每个分组选中的工具数量
const groupSelectedCount = computed(() => {
  const counts = {}
  
  groups.value.forEach(group => {
    counts[group] = selectedTools.value.filter(tool => 
      tool.metadata?.serverKey === group
    ).length
  })
  
  return counts
})

// 切换工具选择状态
const toggleToolSelection = (tool: any, event: Event) => {
  // 阻止事件冒泡，防止 Dropdown 关闭
  event.stopPropagation()
  event.preventDefault()
  
  const index = selectedTools.value.findIndex(t => t.name === tool.name)
  const newSelectedTools = [...selectedTools.value] // 创建副本以避免直接修改计算属性
  
  if (index >= 0) {
    newSelectedTools.splice(index, 1)
  } else {
    newSelectedTools.push(tool)
    // 如果工具功能当前是关闭状态，则自动启用
    if (!toolsEnabled.value) {
      mcpStore.setToolsEnabled(true)
    }
  }
  
  mcpStore.selectMultipleTools(newSelectedTools)
  emit('selectTools', newSelectedTools)
}

// 检查工具是否被选中
const isToolSelected = (tool: any) => {
  return selectedTools.value.some(t => t.name === tool.name)
}

// 格式化工具名称，只显示最后一部分
const formatToolName = (tool: any) => {
  return tool.metadata?.originalName || tool.name.split('_').pop() || tool.name
}

// 组件挂载时从 store 加载工具列表
onMounted(async () => {
  if (!mcpStore.initialized) {
    await mcpStore.fetchTools()
  }
})
</script>

<template>
  <div>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button 
        variant="outline" 
        size="icon" 
        :disabled="loading" 
        :class="{ 
          'bg-primary/10': selectedTools.length > 0 && toolsEnabled, 
          'opacity-50': !toolsEnabled && selectedTools.length > 0 
        }"
      >
        <PocketKnife v-if="!loading" class="size-3.5" />
        <RefreshCw v-else class="animate-spin"></RefreshCw>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-56">
      <div class="flex items-center justify-between px-2 py-1.5">
        <DropdownMenuLabel class="p-0 font-normal">工具</DropdownMenuLabel>
        <Switch v-model="toolsEnabled" />
      </div>
      <DropdownMenuSeparator />
      
      <div v-if="tools.length === 0" class="px-2 py-1.5 text-sm text-muted-foreground">
        {{ loading ? '加载中...' : '没有可用的工具' }}
      </div>
      
      <!-- 按 serverKey 分组显示工具 -->
      <template v-for="group in groups" :key="group">
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span class="capitalize">{{ group }}</span>
              <span v-if="groupSelectedCount[group] > 0" class="ml-1 text-xs text-muted-foreground">
                ({{ groupSelectedCount[group] }})
              </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent class="w-48">
            <ScrollArea class="h-[400px]">
              <div 
                v-for="tool in groupedTools[group]" 
                :key="tool.name"
                :title="tool.description"
                @click="(event) => toggleToolSelection(tool, event)"
                class="flex items-center justify-between px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
              >
                <span class="truncate">{{ formatToolName(tool) }}</span>
                <Check v-if="isToolSelected(tool)" class="size-3.5 ml-2" />
              </div>
            </ScrollArea>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </template>
    </DropdownMenuContent>
  </DropdownMenu>
  </div>
</template>