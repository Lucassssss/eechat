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
import MicrosoftMailIcon from '@/components/icons/MicrosoftMailIcon.vue'
import CalendarIcon from '@/components/icons/CalendarIcon.vue'
import TodoIcon from '@/components/icons/TodoIcon.vue'

const envStore = useEnvStore()
const { t } = useI18n()
const route = useRoute()

const data = {
  user: {

    name: 'xavi9',
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
    // {
    //   title: t('rag.title'),
    //   url: '/rag',
    //   icon: BookOpen,
    //   isActive: false,
    // },
    {
      title: t('chat.mcp.title'),
      url: '/mcp',
      icon: McpIcon,
      isActive: false,
    },
    {
      title: t('chat.discover.title'),
      url: '/discover',
      icon: Compass,
      isActive: false,
    },
    {
      title: t('email.title') || 'Microsoft Mail',
      url: 'email',
      icon: MicrosoftMailIcon,
      isActive: false,
    },
    {
      title: t('calendar.title') || 'Calendar',
      url: 'calendar',
      icon: CalendarIcon,
      isActive: false,
    },
    {
      title: t('todo.title') || 'To-Do List',
      url: 'todo',
      icon: TodoIcon,
      isActive: false,
    },
    {
      title: t('chat.settings.title'),
      url: '/setting',
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

// Hacemos que los elementos de navegación sean reactivos usando computed
const navMain = computed(() => [
  {
    title: t('chat.newChat'),
    url: '/',
    icon: Inbox,
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
])

const chats = [
  {
    name: '新对话',
    teaser: '对话的内容简短展示的内容',
  },
]

// Calculamos el item activo basado en navMain computed
const activeItem = computed(() => {
  const currentPath = route.path
  // Encontrar el ítem que coincide con la ruta actual
  const matchedItem = navMain.value.find(item => {
    if (item.url === '/') {
      return currentPath === '/'
    }
    return currentPath.includes(item.url)
  }) || navMain.value[0]

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
            <SidebarMenuItem v-for="item in navMain" :key="item.title">
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
      <!-- <NavUser :user="user" /> -->
    </SidebarFooter>
  </Sidebar>
</template>