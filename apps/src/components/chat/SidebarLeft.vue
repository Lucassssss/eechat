<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { useI18n } from 'vue-i18n'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  type SidebarProps,
} from '@/components/ui/sidebar'
import {ChatSession} from '@/types/chat'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Loader2 } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster } from '@/components/ui/toast'
import {
  ArchiveX,
  Command,
  File,
  Inbox,
  SlidersHorizontal,
  Trash2,
  Copy,
  Plus,
  EllipsisVertical,
} from 'lucide-vue-next'
import { h, ref, onMounted, toRaw,computed  } from 'vue'
import { chatApi } from '@/api/request'
import Icon from '@/components/Icon.vue'
import router from '@/router'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { useSessionStore } from '@/stores/session'
import { useEnvStore } from "@/stores/env"
const envStore = useEnvStore()

const sessionStore = useSessionStore()
// 设置语言为中文
dayjs.locale('zh-cn')

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

const emit = defineEmits(['sessionChange'])

const sessions = computed(() => sessionStore.sessions)
const activeSessionId = computed(() => sessionStore.activeSessionId)

// 创建新对话
const createNewChat = async () => {
  try {
    const newSession = await sessionStore.createChat()
    // emit('sessionChange', newSession)
  } catch (error) {
    console.error('Failed to create chat:', error)
  }
}

// 切换会话
const handleSessionChange = session => {
  sessionStore.setActiveSession(session)
  // emit('sessionChange', session)
}

// 删除会话
const { t } = useI18n()
const { toast } = useToast()
const deleteLoading = ref(false)
const sessionToDelete = ref<ChatSession | null>(null)

const handleRemoveSession = item => {
  sessionToDelete.value = JSON.parse(JSON.stringify(item))
  console.log(sessionToDelete.value)
}

const handleCancelDelete = () => {
  sessionToDelete.value = null
  deleteLoading.value = false
}

const confirmDeleteSession = async () => {
  if (!sessionToDelete.value) return
  deleteLoading.value = true
  try {
    const res = await sessionStore.removeSession(sessionToDelete.value.id)
    if(res) {
      // 如果还有其他会话，切换到第一个
      if (sessionStore.sessions.length > 0) {
        handleSessionChange(sessionStore.sessions[0])
      }
      toast({
        title: t('chat.sidebar.deleteSuccess'),
        description: t('chat.sidebar.deleteSuccessDesc', { title: sessionToDelete.value.title })
      })
    }
  } catch (error) {
    console.error('Failed to delete session:', error)
    toast({
      title: t('chat.sidebar.deleteFailed'),
      variant: 'destructive',
      description: (error as Error).message || t('chat.sidebar.unknownError')
    })
  } finally {
    deleteLoading.value = false
    sessionToDelete.value = null
  }
}
const activeSessionTitle = ref<string>('')
onMounted( async () => {
  const localActiveSession = localStorage.getItem('activeSession')
  if (localActiveSession) {
    const activeSession = JSON.parse(localActiveSession)
    sessionStore.setActiveSession(activeSession)
    handleSessionChange(activeSession)
  }
  await sessionStore.fetchSessions()
})

// 添加时间分组函数
const getTimeGroup = (date: string) => {
  const now = dayjs()
  const targetDate = dayjs(date)
  const diffDays = now.diff(targetDate, 'day')

  if (diffDays === 0) return t('common.timeGroup.today')
  if (diffDays === 1) return t('common.timeGroup.yesterday')
  if (diffDays <= 7) return t('common.timeGroup.within7days')
  if (diffDays <= 30) return t('common.timeGroup.within30days')

  // 如果是不同年份，显示完整年月
  if (targetDate.year() !== now.year()) {
    return targetDate.format(t('common.timeGroup.yearMonthFormat'))
  }
  // 同年不同月
  return targetDate.format(t('common.timeGroup.monthFormat'))
}

// 对会话列表进行分组
const groupedSessions = computed(() => {
  if (!sessions.value) return {}

  const groups: Record<string, ChatSession[]> = {}
  sessions.value.forEach(session => {
    const group = getTimeGroup(session.created_at)
    if (!groups[group]) {
      groups[group] = []
    }
    groups[group].push(session)
  })

  return groups
})
</script>

<template>
  <Toaster />
  <!-- 添加确认对话框 -->
  <AlertDialog :open="!!sessionToDelete" @update:open="">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ t('chat.sidebar.confirmDelete') }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ t('chat.sidebar.confirmDeleteDesc', { title: sessionToDelete?.title }) }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="handleCancelDelete">{{ t('common.cancel') }}</AlertDialogCancel>
        <AlertDialogAction :disabled="deleteLoading" @click="confirmDeleteSession">
          <Loader2 v-if="deleteLoading" class="mr-2 h-4 w-4 animate-spin" />
          {{ deleteLoading ? t('chat.sidebar.deleting') : t('chat.sidebar.confirmDeleteBtn') }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  <Sidebar class="hidden flex-1 md:flex absolute">
    <SidebarHeader class="gap-3.5 border-b p-4 h-[64px]">
      <div class="flex w-full items-center justify-between">
        <div class="text-base font-medium text-foreground">
          <!-- {{ activeItem.title }} -->
            {{ t('chat.sidebar.chat') }}
        </div>
        <Label class="flex items-center gap-2 text-sm">
          <Button size="sm" class="font-bold" @click="createNewChat">
            <Plus class="w-4 h-4" />{{ t('chat.sidebar.newChat') }}
          </Button>
        </Label>
      </div>
      <!-- <SidebarInput placeholder="输入要搜索的内容..." /> -->
    </SidebarHeader>
    <SidebarContent>
      <ScrollArea class="w-full h-fulll" :class="envStore.isWeb ? 'h-[calc(100dvh-64px-30px)]' : 'h-[calc(100dvh-64px)]'">
        <SidebarGroup class="px-0">
          <template v-for="(sessions, groupName) in groupedSessions" :key="groupName">
            <SidebarGroupLabel class="pl-4 mt-2 text-xs text-gray-400">{{
              groupName
            }}</SidebarGroupLabel>
            <SidebarGroupContent>
              <template v-for="item in sessions" :key="item.id">
                <a
                  @click="handleSessionChange(item)"
                  href="#"
                  class="group/item flex justify-between items-center px-4 py-1 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  :class="
                    item.id === activeSessionId
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : ''
                  "
                >
                  <div class="flex-1 max-w-[80%] space-y-2">
                    <div
                      class="truncate text-gray-950 dark:text-white"
                      :class="item.id === activeSessionId ? 'font-bold' : 'font-normal'"
                    >
                      {{ item.title }}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button
                        class="invisible group-hover/item:visible"
                        size="icon"
                        variant="ghost"
                        v-on:click.stop=""
                      >
                        <EllipsisVertical class=""></EllipsisVertical>
                      </Button>
                    </DropdownMenuTrigger>
                    <!-- <DropdownMenuContent algin="start" side="right" as-child> -->
                    <DropdownMenuContent align="start" side="right">
                      <!-- <DropdownMenuItem> <Copy></Copy> 复制 </DropdownMenuItem> -->
                      <DropdownMenuItem
                        @click.stop="handleRemoveSession(item)"
                        class="text-red-600 hover:text-red-500"
                      >
                        <Trash2></Trash2> {{ t('common.delete') }}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </a>
              </template>
            </SidebarGroupContent>
          </template>
        </SidebarGroup>
        <ScrollBar />
      </ScrollArea>
    </SidebarContent>
  </Sidebar>
</template>
