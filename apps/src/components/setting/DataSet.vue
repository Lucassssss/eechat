<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import LanguageSwitcher from '@/components/setting/LanguageSwitcher.vue'
import ThemeSwitcher from '@/components/setting/ThemeSwitcher.vue'

const { t } = useI18n()

// 定义路径变量
const configPath = ref('')
const databasePath = ref('')
const executablePath = ref('')
const logsPath = ref('')

// 获取应用路径
onMounted(async () => {
  const paths = await window.ipcRenderer.invoke('get-app-paths')
  configPath.value = paths.config
  databasePath.value = paths.database
  executablePath.value = paths.executable
  logsPath.value = paths.logs
})

// 打开目录
const openDirectory = async (dirPath: string) => {
  await window.ipcRenderer.invoke('open-directory', dirPath)
}
</script>

<template>
  <div class="h-full space-y-6">
    <div class="text-gray-500 text-sm">
      {{ t('settings.data.title') }}
    </div>
    <div class="space-y-2 items-center">
      <div class="min-w-20 text-gray-700 text-sm">
        {{ t('settings.data.config.title') }}
      </div>
      <div class="text-xs text-zinc-400">{{ t('settings.data.config.description') }}</div>
      <div class="flex space-x-2 items-center">
        <Input class="w-[500px]" v-model="configPath" readonly />
        <Button variant="outline" @click="openDirectory(configPath)">
          {{ t('settings.data.openDirectory') }}
        </Button>
      </div>
    </div>
    <div class="space-y-2 items-center">
      <div class="min-w-20 text-gray-700 text-sm">
        {{ t('settings.data.database.title') }}
      </div>
      <div class="text-xs text-zinc-400">{{ t('settings.data.database.description') }}</div>
      <div class="flex space-x-2 items-center">
        <Input class="w-[500px]" v-model="databasePath" readonly />
        <Button variant="outline" @click="openDirectory(databasePath)">
          {{ t('settings.data.openDirectory') }}
        </Button>
      </div>
    </div>
    <div class="space-y-2 items-center">
      <div class="min-w-20 text-gray-700 text-sm">
        {{ t('settings.data.executable.title') }}
      </div>
      <div class="text-xs text-zinc-400">{{ t('settings.data.executable.description') }}</div>
      <div class="flex space-x-2 items-center">
        <Input class="w-[500px]" v-model="executablePath" readonly />
        <Button variant="outline" @click="openDirectory(executablePath)">
          {{ t('settings.data.openDirectory') }}
        </Button>
      </div>
    </div>
    <div class="space-y-2 items-center">
      <div class="min-w-20 text-gray-700 text-sm">
        {{ t('settings.data.logs.title') }}
      </div>
      <div class="text-xs text-zinc-400">{{ t('settings.data.logs.description') }}</div>
      <div class="flex space-x-2 items-center">
        <Input class="w-[500px]" v-model="logsPath" readonly />
        <Button variant="outline" @click="openDirectory(logsPath)">
          {{ t('settings.data.openDirectory') }}
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
