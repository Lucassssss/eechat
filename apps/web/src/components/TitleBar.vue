<script setup lang="ts">
import { ref, onMounted } from "vue"
import { ArrowDown } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import { useEnvStore } from "@/stores/env"
const envStore = useEnvStore()
const version = ref('')

onMounted(async () => {
  if (!envStore.isWeb) {
    try {
      version.value = await window.ipcRenderer.invoke('get-app-version')
    } catch (error) {
      console.error('Failed to get app version:', error)
    }
  }
})
</script>
<template>
  <div
    style="-webkit-app-region: drag"
    class="bg-sidebar h-[30px] flex items-center justify-center text-center border-b text-xs font-bold"
    :class="envStore.isWeb && 'hidden'"
  >
  eechat <span v-if="version" class="ml-1 opacity-30 font-normal">(v{{ version }})</span>
  </div>
</template>
