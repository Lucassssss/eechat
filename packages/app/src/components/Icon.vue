<template>
  <div class="flex items-center">
    <Avatar size="sm" class="overflow-hidden p-1 bg-slate-300 dark:bg-white dark:text-sidebar" :style="{
        height: props.size + 'px',
        width: props.size + 'px',
      }">
      <AvatarImage v-if="iconExists" :src="src"></AvatarImage>
      <AvatarFallback>{{ props.name.charAt(0).toUpperCase() }}</AvatarFallback>
    </Avatar>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, defineProps, defineEmits } from 'vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
const emit = defineEmits()
const props = defineProps({
  name: {
    type: String,
    required: true,
    default: '',
  },
  size: {
    type: Number,
    default: 24,
  },
})

// 本地图标路径
const localIconsPath = '/src/assets/icons/'

// 远程图标路径（作为备用）
const remoteIconsPath = 'https://registry.npmmirror.com/@lobehub/icons-static-svg/1.25.0/files/icons/'

const src = ref('')
const iconExists = ref(true)

// 检查图标是否存在的函数
const checkIconExists = (url) => {
  return new Promise((resolve) => {
    if (url.startsWith('http')) {
      // 远程图标检查
      const img = new Image()
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.src = url
    } else {
      // 本地图标检查 - 使用fetch API
      fetch(url)
        .then(response => resolve(response.ok))
        .catch(() => resolve(false))
    }
  })
}

watch(
  () => props.name, 
  async (val) => {
    // 首先尝试使用本地图标
    const localPath = `${localIconsPath}${val}.svg`
    
    try {
      // 检查本地图标是否存在
      const exists = await checkIconExists(localPath)
      
      if (exists) {
        src.value = localPath
        iconExists.value = true
      } else {
        // 如果本地不存在，尝试使用远程图标
        const remotePath = `${remoteIconsPath}${val}.svg`
        const remoteExists = await checkIconExists(remotePath)
        
        if (remoteExists) {
          src.value = remotePath
          iconExists.value = true
        } else {
          // 如果远程也不存在，使用fallback
          iconExists.value = false
        }
      }
    } catch (error) {
      console.error('加载图标出错:', error)
      iconExists.value = false
    }
  }, 
  {
    immediate: true,
  }
)
</script>

<style scoped></style>
