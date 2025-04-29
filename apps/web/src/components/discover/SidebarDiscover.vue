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
import { Brain, LayoutGrid } from 'lucide-vue-next'

const { t } = useI18n()

// const props = withDefaults(defineProps<SidebarProps>(), {
//   collapsible: 'icon',
// })
const menuData = [
  {
    label: t('discover.categories.all'),
    icon: LayoutGrid,
    key: 'LocalModel',
  },
  {
    label: t('discover.categories.academic'),
    icon: Brain,
    key: 'Academic',
  },
  {
    label: t('discover.categories.copywriting'),
    icon: Brain,
    key: 'Copywriting',
  },
  {
    label: t('discover.categories.design'),
    icon: Brain,
    key: 'Design',
  },
  {
    label: t('discover.categories.commercial'),
    icon: Brain,
    key: 'Commercial',
  },
  {
    label: t('discover.categories.programming'),
    icon: Brain,
    key: 'Programming',
  },
  {
    label: t('discover.categories.technology'),
    icon: Brain,
    key: 'Technology',
  },
  {
    label: t('discover.categories.music'),
    icon: Brain,
    key: 'Music',
  },
  {
    label: t('discover.categories.openSource'),
    icon: Brain,
    key: 'OpenSource',
  },
  {
    label: t('discover.categories.financial'),
    icon: Brain,
    key: 'Financial',
  },
  {
    label: t('discover.categories.medical'),
    icon: Brain,
    key: 'Medical',
  },
  {
    label: t('discover.categories.legal'),
    icon: Brain,
    key: 'Legal',
  },
  {
    label: t('discover.categories.education'),
    icon: Brain,
    key: 'Education',
  },
  {
    label: t('discover.categories.entertainment'),
    icon: Brain,
    key: 'Entertainment',
  },
  {
    label: t('discover.categories.government'),
    icon: Brain,
    key: 'Government',
  },
  {
    label: t('discover.categories.other'),
    icon: Brain,
    key: 'Other',
  },


]
const emit = defineEmits(['change'])

const handleMenuClick = e => {
  emit('change', e)
}
</script>

<template>
  <SidebarProvider class="w-auto" :style="{ '--sidebar-width': '200px' }">
    <Sidebar class="hidden flex-1 md:flex absolute">
      <SidebarHeader class="gap-3.5 border-b p-4">
        <div class="flex w-full items-center justify-between">
          <div class="text-base font-medium text-foreground">{{ t('discover.title') }}</div>
        </div>
        <SidebarInput :placeholder="t('discover.searchPlaceholder')" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{{ t('discover.mine') }}</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton @click="handleMenuClick('mine')" as-child>
                <div class="flex items-center">
                  <component :is="'my'"></component>
                  <span class="ml-2">{{ t('discover.mine') }}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup
          class="group-data-[collapsible=icon]:hidden"
        >
          <SidebarGroupLabel>{{ t('discover.assistant') }}</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in menuData" :key="item.label">
              <SidebarMenuButton @click="handleMenuClick(item)" as-child>
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
