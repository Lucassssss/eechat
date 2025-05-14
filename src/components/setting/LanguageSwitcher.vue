<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLanguage } from '@/i18n'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { systemApi } from '@/api/request'

type AvailableLanguages = 'en-US' | 'zh-CN' | 'es-ES' | 'ca-ES'
const { locale } = useI18n()
const currentLanguage = ref<AvailableLanguages>(locale.value as AvailableLanguages)

const changeLanguage = (value: string) => {
  const lang = value as AvailableLanguages
  currentLanguage.value = lang
  
  // Usa type assertion para asegurar compatibilidad con setLanguage
  setLanguage(lang as any)
  
  // Usa type assertion para asegurar compatibilidad con systemApi
  systemApi.locale(lang as any)
  
  // window.location.reload()
}

onMounted(() => {
  currentLanguage.value = locale.value as AvailableLanguages
})

const languages = {
  'es-ES': 'Español',
  'ca-ES': 'Català',
  'en-US': 'English',
  'zh-CN': '简体中文',
}
</script>

<template>
  <div class="language-switcher">
    <Tabs
      :default-value="currentLanguage"
      v-model="currentLanguage"
      @update:modelValue="(value: string | number) => changeLanguage(String(value))"
    >
      <TabsList class="w-full">
        <TabsTrigger v-for="(value, key) in languages" :value="key" :key="key">
          <div class="flex items-center space-x-1">
            <span>{{ value }}</span>
          </div>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
</template>