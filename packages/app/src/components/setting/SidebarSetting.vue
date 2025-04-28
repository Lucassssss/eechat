<script setup lang="ts">
import { ref, markRaw } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  SidebarProvider,
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
import Icon from '@/components/icon.vue'
import { Brain, HardDrive, Heart,PocketKnife, Database } from 'lucide-vue-next'
import LocalModel from '@/components/setting/LocalModel.vue'
import ApiModel from '@/components/setting/ApiModel.vue'
import About from '@/components/setting/About.vue'
import Appearance from '@/components/setting/Appearance.vue'
import DataSet from '@/components/setting/DataSet.vue'
import Playground from '@/components/setting/Playground.vue'

const { t } = useI18n()

// const props = withDefaults(defineProps<SidebarProps>(), {
//   collapsible: 'icon',
// })
const menuData = [
  {
    label: t('settings.sidebar.models'),
    icon: Brain,
    items: [
      {
        label: t('settings.sidebar.localModel'),
        icon: HardDrive,
        key: 'LocalModel',
        component: markRaw(LocalModel),
      },
      {
        label: t('settings.sidebar.apiModel'),
        icon: Brain,
        key: 'ApiModel',
        component: markRaw(ApiModel),
      },
    ],
  },
  {
    label: t('settings.sidebar.general'),
    icon: Heart,
    items: [
      {
        label: t('settings.sidebar.interface'),
        icon: HardDrive,
        key: 'appearance',
        component: markRaw(Appearance),
      },
      {
        label: t('settings.sidebar.data'),
        icon: Database,
        key: 'data',
        component: markRaw(DataSet),
      },
      {
        label: t('settings.sidebar.about'),
        icon: Heart,
        key: 'about',
        component: markRaw(About),
      },
      ...(import.meta.env.MODE === 'development' ? [
        {
          label: t('settings.sidebar.playground'),
          icon: PocketKnife,
          key: 'playground',
          component: markRaw(Playground),
        },
      ] : [])
    ],
  },
  // {
  //   label: '数据',
  //   icon: Brain,
  //   items: [
  //     {
  //       label: '备份/恢复',
  //       icon: HardDrive,
  //       key: 'interface',
  //       component: markRaw(LocalModel),
  //     },
  //   ],
  // },
]
const emit = defineEmits(['change'])

const activeKey = ref('LocalModel')
const handleMenuClick = e => {
  emit('change', e)
  activeKey.value = e.key
}
</script>

<template>
  <SidebarProvider class="w-auto" :style="{ '--sidebar-width': '200px' }">
    <Sidebar class="hidden flex-1 md:flex absolute">
      <SidebarHeader class="gap-3.5 border-b p-4">
        <div class="flex w-full items-center justify-between">
          <div class="text-base font-medium text-foreground">{{ t('settings.title') }}</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup
          class="group-data-[collapsible=icon]:hidden"
          v-for="group in menuData"
          :key="group.label"
        >
          <SidebarGroupLabel>{{ group.label }}</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in group.items" :key="item.label">
              <SidebarMenuButton
                class="cursor-pointer w-full"
                @click="handleMenuClick(item)"
                as-child
                :is-active="item.key == activeKey"
              >
                <div class="flex items-center">
                  <component :is="item.icon"></component>
                  <span class="ml-2">{{ item.label }}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  </SidebarProvider>
</template>
