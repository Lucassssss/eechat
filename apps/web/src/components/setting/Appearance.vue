<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import LanguageSwitcher from '@/components/setting/LanguageSwitcher.vue'
import ThemeSwitcher from '@/components/setting/ThemeSwitcher.vue'
const { t } = useI18n()
</script>

<template>
  <div class="h-full space-y-6">
    <div class="text-gray-500 text-sm">
      {{ t('settings.configureInterface', '配置您的软件界面') }}
    </div>
    <div class="flex space-x-2 items-center">
      <div class="min-w-16 text-gray-700 text-sm">
        {{ t('settings.language', '语言') }}
      </div>
      <div><LanguageSwitcher></LanguageSwitcher></div>
    </div>
    <div class="flex space-x-2 items-center text-sm">
      <div class="min-w-16 text-gray-700">
        {{ t('settings.theme', '主题') }}
      </div>
      <div><ThemeSwitcher></ThemeSwitcher></div>
    </div>
  </div>
</template>

<style scoped></style>
