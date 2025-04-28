<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Download, 
  Pause, 
  Play, 
  X, 
  Trash2, 
  CheckCircle, 
  AlertCircle 
} from "lucide-vue-next"

const tasks = ref([])
const refreshInterval = ref(null)

// 格式化文件大小
const formatSize = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 格式化速度
const formatSpeed = (bytesPerSecond) => {
  if (bytesPerSecond === 0) return '0 B/s'
  const k = 1024
  const sizes = ['B/s', 'KB/s', 'MB/s', 'GB/s']
  const i = Math.floor(Math.log(bytesPerSecond) / Math.log(k))
  return parseFloat((bytesPerSecond / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 获取所有下载任务
const fetchTasks = async () => {
  try {
    tasks.value = await window.ipcRenderer.invoke('get-download-tasks')
  } catch (error) {
    console.error('获取下载任务失败:', error)
  }
}

// 开始下载任务
const startTask = async (id) => {
  try {
    await window.ipcRenderer.invoke('start-download-task', id)
    await fetchTasks()
  } catch (error) {
    console.error('开始下载任务失败:', error)
  }
}

// 暂停下载任务
const pauseTask = async (id) => {
  try {
    await window.ipcRenderer.invoke('pause-download-task', id)
    await fetchTasks()
  } catch (error) {
    console.error('暂停下载任务失败:', error)
  }
}

// 取消下载任务
const cancelTask = async (id) => {
  try {
    await window.ipcRenderer.invoke('cancel-download-task', id)
    await fetchTasks()
  } catch (error) {
    console.error('取消下载任务失败:', error)
  }
}

// 删除下载任务
const deleteTask = async (id, deleteFile = false) => {
  try {
    await window.ipcRenderer.invoke('delete-download-task', id, deleteFile)
    await fetchTasks()
  } catch (error) {
    console.error('删除下载任务失败:', error)
  }
}

// 获取任务状态图标
const getStatusIcon = (status) => {
  switch (status) {
    case 'completed':
      return CheckCircle
    case 'failed':
    case 'canceled':
      return AlertCircle
    case 'downloading':
      return Download
    case 'paused':
      return Pause
    default:
      return Download
  }
}

// 获取任务状态颜色
const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return 'text-green-500'
    case 'failed':
    case 'canceled':
      return 'text-red-500'
    case 'downloading':
      return 'text-blue-500'
    case 'paused':
      return 'text-yellow-500'
    default:
      return 'text-gray-500'
  }
}

onMounted(() => {
  fetchTasks()
  // 定期刷新任务列表
  refreshInterval.value = setInterval(fetchTasks, 1000)
})

onUnmounted(() => {
  if (refreshInterval.value) {
    clearInterval(refreshInterval.value)
  }
})
</script>

<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">下载管理器</h2>
    
    <div v-if="tasks.length === 0" class="text-center py-8 text-muted-foreground">
      暂无下载任务
    </div>
    
    <div v-else class="space-y-4">
      <div v-for="task in tasks" :key="task.id" class="border rounded-lg p-4">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <component 
              :is="getStatusIcon(task.status)" 
              class="w-5 h-5" 
              :class="getStatusColor(task.status)" 
            />
            <span class="font-medium truncate max-w-[200px]">{{ task.filename }}</span>
          </div>
          
          <div class="flex items-center gap-2">
            <Button 
              v-if="task.status === 'paused' || task.status === 'pending' || task.status === 'failed'"
              variant="outline" 
              size="icon" 
              @click="startTask(task.id)"
            >
              <Play class="w-4 h-4" />
            </Button>
            
            <Button 
              v-if="task.status === 'downloading'"
              variant="outline" 
              size="icon" 
              @click="pauseTask(task.id)"
            >
              <Pause class="w-4 h-4" />
            </Button>
            
            <Button 
              v-if="task.status === 'downloading' || task.status === 'paused'"
              variant="outline" 
              size="icon" 
              @click="cancelTask(task.id)"
            >
              <X class="w-4 h-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              @click="deleteTask(task.id)"
            >
              <Trash2 class="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div class="mb-2">
          <Progress :value="task.progress" class="h-2" />
        </div>
        
        <div class="flex justify-between text-xs text-muted-foreground">
          <div>
            {{ formatSize(task.downloaded) }} / {{ formatSize(task.size) }}
          </div>
          <div v-if="task.status === 'downloading'">
            {{ formatSpeed(task.speed) }}
          </div>
          <div v-else>
            {{ task.status === 'completed' ? '已完成' : 
               task.status === 'failed' ? '下载失败' : 
               task.status === 'paused' ? '已暂停' : 
               task.status === 'canceled' ? '已取消' : '等待中' }}
          </div>
        </div>
        
        <div v-if="task.error" class="mt-2 text-xs text-red-500">
          错误: {{ task.error }}
        </div>
      </div>
    </div>
  </div>
</template>