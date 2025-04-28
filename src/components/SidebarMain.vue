<script setup lang="ts">
import NavUser from '@/components/NavUser.vue'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  type SidebarProps,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import {
  ArchiveX,
  Command,
  File,
  Inbox,
  SlidersHorizontal,
  Trash2,
  Plus,
  Sparkles,
  Compass,
  BookOpen,
} from 'lucide-vue-next'
import Updater from '@/components/Updater.vue'
import { h, ref, onMounted, computed } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import { useEnvStore } from "@/stores/env"
import { useI18n } from 'vue-i18n'
import McpIcon from '@/components/icons/McpIcon.vue'

const envStore = useEnvStore()
const { t } = useI18n()
const route = useRoute()

const data = {
  user: {
    name: 'eechat',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: t('chat.newChat'),
      url: '/',
      icon: Inbox,
      isActive: false,
    },
    {
      title: t('chat.knowledgeBase.title'),
      url: '/knowledgeBase',
      icon: BookOpen,
      isActive: false,
    },
    {
      title: t('chat.mcp.title'),
      url: '/mcp',
      icon: McpIcon,
      isActive: false,
    },
    {
      title: t('chat.discover.title'),
      url: 'discover',
      icon: Compass,
      isActive: false,
    },
    {
      title: t('chat.settings.title'),
      url: 'setting',
      icon: SlidersHorizontal,
      isActive: false,
    },
  ],
  chats: [
    {
      name: '新对话',
      teaser: '对话的内容简短展示的内容',
    },
  ],
}

// 计算当前活动项
const activeItem = computed(() => {
  const currentPath = route.path
  // 找到匹配当前路径的导航项
  const matchedItem = data.navMain.find(item => {
    if (item.url === '/') {
      return currentPath === '/'
    }
    return currentPath.includes(item.url)
  }) || data.navMain[0]

  return matchedItem
})

const goPage = item => {
  console.log(item)
  router.push(item.url)
}

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})
</script>
<template>
  <Sidebar
    collapsible="none"
    class="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
    :class="
      !envStore.isWeb ? '!min-h-[calc(100dvh-30px)] h-[calc(100dvh-30px)] max-sm:hidden' : 'hello'
    "
  >
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child class="md:h-8 md:p-0">
            <a href="#">
              <!-- <div
                class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
              >
                <Command class="size-4" />
              </div>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">Acme Inc</span>
                <span class="truncate text-xs">Enterprise</span>
              </div>
              -->
              <img
                class="block w-full size-6 rounded-lg dark:hidden block"
                src="../assets/icon.svg"
                alt=""
              />
              <img
                class="w-full size-6 rounded-lg hidden dark:block"
                src="../assets/icon_dark.svg"
                alt=""
              />
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent class="px-0">
          <SidebarMenu>
            <SidebarMenuItem v-for="item in data.navMain" :key="item.title">
              <SidebarMenuButton
                :tooltip="h('div', { hidden: false }, item.title)"
                :is-active="activeItem.title === item.title"
                class="px-2.5 px-2"
                @click="
                  () => {
                    goPage(item)
                  }
                "
              >
                <component :is="item.icon" />
                <span>{{ item.title }}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <Updater></Updater>
      <!-- <NavUser :user="data.user" /> -->
    </SidebarFooter>
  </Sidebar>
</template>
