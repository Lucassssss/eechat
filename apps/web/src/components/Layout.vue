<script setup lang="ts">
import { ref } from 'vue'

const sidebarLeftOpenMain = ref(false)
import { SidebarProvider, type SidebarProps } from '@/components/ui/sidebar'
import SidebarMain from '@/components/SidebarMain.vue'
const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})
import TitleBar from '@/components/TitleBar.vue'
</script>

<template>
  <div class="flex w-full flex-col">
    <TitleBar class="h-[30px] w-full z-1000"></TitleBar>
    <div class="w-full flex">
      <SidebarProvider class="w-auto" v-model:open="sidebarLeftOpenMain">
        <SidebarMain></SidebarMain>
      </SidebarProvider>
      <div class="flex-1 overflow-auto">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
