<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Moon, Sun, Cog } from 'lucide-vue-next'
import { useColorMode } from '@vueuse/core'
const { t } = useI18n()
const { system, store } = useColorMode()
const changeTheme = (value: string) => {
  store.value = value as 'light' | 'dark' | 'auto'
}
</script>

<template>
  <Tabs
    :default-value="store"
    v-model="store"
    @update:modelValue="(value: string | number) => changeTheme(String(value))"
  >
    <TabsList class="w-full">
      <TabsTrigger value="auto">
        <div class="flex items-center space-x-1">
          <Cog class="size-3.5"></Cog> <span>{{ t('settings.system', '系统') }}</span>
        </div>
      </TabsTrigger>
      <TabsTrigger value="light">
        <div class="flex items-center space-x-1">
          <Sun class="size-3.5"></Sun> <span>{{ t('settings.light', '浅色') }}</span>
        </div>
      </TabsTrigger>
      <TabsTrigger value="dark" as-child>
        <div class="flex items-center space-x-1">
          <Moon class="size-3.5"></Moon> <span>{{ t('settings.dark', '深色') }}</span>
        </div>
      </TabsTrigger>
    </TabsList>
  </Tabs>
</template>

<style scoped></style>
