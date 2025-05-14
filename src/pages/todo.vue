<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { CheckCheck, ClipboardList, Plus, Edit, Trash2, X, Info, Sparkles, Calendar, Layout, List, Mail } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Reactive state for the todo interface
const currentFilter = ref('all')
const showTaskDialog = ref(false)
const isEditMode = ref(false)
const selectedTask = ref(null)
const aiSuggestion = ref('')
const searchQuery = ref('')
const viewMode = ref('list') // 'list' or 'board'

// Todo task model
const taskForm = reactive({
  id: 0,
  title: '',
  description: '',
  dueDate: '',
  priority: 'medium',
  status: 'backlog', // 'backlog', 'next', 'in-progress', 'blocked', 'completed'
  completed: false
})

// Sample tasks data
const tasks = ref([
  {
    id: 1,
    title: 'Prepare weekly report',
    description: 'Compile data from all departments and prepare summary slides.',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
    priority: 'high',
    status: 'in-progress',
    completed: false
  },
  {
    id: 2,
    title: 'Review project proposal',
    description: 'Go through the new client project proposal and provide feedback.',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0],
    priority: 'medium',
    status: 'next',
    completed: false
  },
  {
    id: 3,
    title: 'Order office supplies',
    description: 'Restock printer paper and ink cartridges.',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0],
    priority: 'low',
    status: 'completed',
    completed: true
  },
  {
    id: 4,
    title: 'Schedule team building event',
    description: 'Find venue and activity options for quarterly team building.',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0],
    priority: 'medium',
    status: 'backlog',
    completed: false
  },
  {
    id: 5,
    title: 'Fix login page bug',
    description: 'Address authentication issues on the login screen.',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0],
    priority: 'high',
    status: 'blocked',
    completed: false
  }
])

// Watch for status changes and update completed property
watch(() => [...tasks.value], (newTasks) => {
  newTasks.forEach(task => {
    // If status changes to completed, update the completed flag
    if (task.status === 'completed' && !task.completed) {
      const taskIndex = tasks.value.findIndex(t => t.id === task.id)
      if (taskIndex !== -1) {
        tasks.value[taskIndex].completed = true
      }
    }
    // If status changes from completed, update the completed flag
    if (task.status !== 'completed' && task.completed) {
      const taskIndex = tasks.value.findIndex(t => t.id === task.id)
      if (taskIndex !== -1) {
        tasks.value[taskIndex].completed = false
      }
    }
  })
}, { deep: true })

// Computed properties for filtering tasks in list view
const filteredTasks = computed(() => {
  let result = tasks.value

  // Apply filter
  if (currentFilter.value === 'active') {
    result = result.filter(task => !task.completed)
  } else if (currentFilter.value === 'completed') {
    result = result.filter(task => task.completed)
  }

  // Apply search
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(task => 
      task.title.toLowerCase().includes(query) || 
      task.description.toLowerCase().includes(query)
    )
  }

  // Sort by priority and due date
  return result.sort((a, b) => {
    // First sort by completion status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    
    // Then sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }
    
    // Then sort by due date
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  })
})

// Get tasks by status for board view
const tasksByStatus = computed(() => {
  // Create arrays for each status column
  const result = {
    'backlog': [],
    'next': [],
    'in-progress': [],
    'blocked': [],
    'completed': []
  }
  
  // Fill arrays with tasks
  let filteredResult = tasks.value
  
  // Apply search filter if needed
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filteredResult = filteredResult.filter(task => 
      task.title.toLowerCase().includes(query) || 
      task.description.toLowerCase().includes(query)
    )
  }
  
  // Sort tasks by priority and add to corresponding array
  filteredResult.forEach(task => {
    result[task.status].push(task)
  })
  
  // Sort each status array by priority
  Object.keys(result).forEach(status => {
    result[status].sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    })
  })
  
  return result
})

// Task counts
const taskCounts = computed(() => {
  return {
    total: tasks.value.length,
    active: tasks.value.filter(task => !task.completed).length,
    completed: tasks.value.filter(task => task.completed).length
  }
})

// Status labels and colors
const statusConfig = {
  'backlog': { label: 'Backlog', color: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100' },
  'next': { label: 'Siguiente', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' },
  'in-progress': { label: 'En Curso', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100' },
  'blocked': { label: 'Bloqueado', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' },
  'completed': { label: 'Completada', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' }
}

// Task due date formatting
const formatDueDate = (dateString) => {
  const date = new Date(dateString)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  if (date.toDateString() === today.toDateString()) {
    return `${t('common.timeGroup.today')}`
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return `${t('common.timeGroup.tomorrow') || 'Tomorrow'}`
  } else {
    return date.toLocaleDateString()
  }
}

// Task management
const openNewTaskDialog = () => {
  isEditMode.value = false
  taskForm.id = 0
  taskForm.title = ''
  taskForm.description = ''
  taskForm.dueDate = new Date().toISOString().split('T')[0]
  taskForm.priority = 'medium'
  taskForm.status = 'backlog'
  taskForm.completed = false
  showTaskDialog.value = true
  aiSuggestion.value = ''
}

const openEditTaskDialog = (task) => {
  isEditMode.value = true
  selectedTask.value = task
  taskForm.id = task.id
  taskForm.title = task.title
  taskForm.description = task.description
  taskForm.dueDate = task.dueDate
  taskForm.priority = task.priority
  taskForm.status = task.status
  taskForm.completed = task.completed
  showTaskDialog.value = true
  aiSuggestion.value = ''
}

const saveTask = () => {
  if (isEditMode.value) {
    // Edit existing task
    const index = tasks.value.findIndex(task => task.id === taskForm.id)
    if (index !== -1) {
      // If status is completed, set completed to true
      if (taskForm.status === 'completed') {
        taskForm.completed = true
      } else {
        taskForm.completed = false
      }
      tasks.value[index] = { ...taskForm }
    }
  } else {
    // Add new task
    const newTask = {
      id: tasks.value.length + 1,
      ...taskForm
    }
    // If status is completed, set completed to true
    if (newTask.status === 'completed') {
      newTask.completed = true
    }
    tasks.value.push(newTask)
  }
  showTaskDialog.value = false
}

const deleteTask = () => {
  if (isEditMode.value && selectedTask.value) {
    tasks.value = tasks.value.filter(task => task.id !== selectedTask.value.id)
    showTaskDialog.value = false
    selectedTask.value = null
  }
}

const toggleTaskCompletion = (task) => {
  const index = tasks.value.findIndex(t => t.id === task.id)
  if (index !== -1) {
    const newCompletedState = !tasks.value[index].completed
    tasks.value[index].completed = newCompletedState
    
    // Also update the status to match the completed state
    if (newCompletedState && tasks.value[index].status !== 'completed') {
      tasks.value[index].status = 'completed'
    } else if (!newCompletedState && tasks.value[index].status === 'completed') {
      tasks.value[index].status = 'in-progress'
    }
  }
}

const updateTaskStatus = (task, newStatus) => {
  const index = tasks.value.findIndex(t => t.id === task.id)
  if (index !== -1) {
    tasks.value[index].status = newStatus
    // Update completed status if needed
    if (newStatus === 'completed') {
      tasks.value[index].completed = true
    } else if (tasks.value[index].completed) {
      tasks.value[index].completed = false
    }
  }
}

// AI assistance
const getAIHelp = () => {
  // Simulate AI suggestion (in real app, this would call an AI service)
  if (taskForm.title.toLowerCase().includes('report')) {
    aiSuggestion.value = "For report tasks, consider breaking it down into sub-steps like 'gather data', 'draft report', and 'review'. This helps track progress better. Would you like me to suggest a more structured description?"
  } else if (taskForm.title.toLowerCase().includes('review')) {
    aiSuggestion.value = "Review tasks typically need clear completion criteria. Consider adding specific points to check in your description, and set a medium priority with a reasonable deadline to ensure thorough review."
  } else {
    aiSuggestion.value = "I notice this task might benefit from more specificity. Tasks with clear, measurable outcomes are easier to complete. Would you like me to suggest ways to make this task more actionable?"
  }
}

// Priority badge color
const priorityColor = (priority) => {
  switch (priority) {
    case 'high': return 'bg-red-500/20 text-red-600 dark:text-red-400'
    case 'medium': return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'
    case 'low': return 'bg-green-500/20 text-green-600 dark:text-green-400'
    default: return 'bg-secondary text-secondary-foreground'
  }
}
</script>

<template>
  <div class="todo-container flex flex-col h-full p-4">
    <!-- Todo header with filters and search -->
    <div class="todo-header flex items-center justify-between mb-4">
      <div class="todo-title text-xl font-semibold flex items-center">
        <ClipboardList class="mr-2 h-5 w-5" />
        {{ t('todo.title') }}
      </div>
      
      <div class="todo-actions flex items-center space-x-4">
        <div class="search-box relative">
          <Input 
            v-model="searchQuery"
            class="w-64"
            placeholder="Search tasks..."
          />
        </div>

        <div class="view-toggle flex items-center border rounded-md overflow-hidden">
          <Button 
            variant="ghost" 
            size="sm" 
            class="rounded-none" 
            :class="{ 'bg-muted': viewMode === 'list' }"
            @click="viewMode = 'list'"
          >
            <List class="h-4 w-4 mr-1" />
            Lista
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            class="rounded-none" 
            :class="{ 'bg-muted': viewMode === 'board' }"
            @click="viewMode = 'board'"
          >
            <Layout class="h-4 w-4 mr-1" />
            Panel
          </Button>
        </div>
        
        <div v-if="viewMode === 'list'">
          <Tabs v-model="currentFilter">
            <TabsList>
              <TabsTrigger value="all" class="relative">
                {{ t('todo.all') }}
                <Badge class="ml-1 bg-secondary text-secondary-foreground">{{ taskCounts.total }}</Badge>
              </TabsTrigger>
              <TabsTrigger value="active" class="relative">
                {{ t('todo.active') }}
                <Badge class="ml-1 bg-secondary text-secondary-foreground">{{ taskCounts.active }}</Badge>
              </TabsTrigger>
              <TabsTrigger value="completed" class="relative">
                {{ t('todo.completed') }}
                <Badge class="ml-1 bg-secondary text-secondary-foreground">{{ taskCounts.completed }}</Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <Button @click="openNewTaskDialog">
          <Plus class="mr-2 h-4 w-4" />
          {{ t('todo.newTask') }}
        </Button>
      </div>
    </div>

    <!-- List View -->
    <div v-if="viewMode === 'list'" class="task-list flex-1 overflow-hidden">
      <ScrollArea class="h-full">
        <div class="space-y-3 pr-3">
          <div v-if="filteredTasks.length === 0" class="text-center py-12">
            <ClipboardList class="mx-auto h-12 w-12 text-muted-foreground mb-3" />
            <h3 class="text-lg font-medium">{{ t('todo.noTasks') }}</h3>
            <Button class="mt-4" variant="outline" @click="openNewTaskDialog">
              <Plus class="mr-2 h-4 w-4" />
              {{ t('todo.newTask') }}
            </Button>
          </div>
          
          <Card 
            v-for="task in filteredTasks" 
            :key="task.id" 
            class="transition-all duration-200"
            :class="{ 'opacity-60': task.completed }"
          >
            <CardContent class="p-4">
              <div class="flex items-start">
                <div class="mr-3 mt-1">
                  <Checkbox 
                    :checked="task.completed" 
                    @update:checked="toggleTaskCompletion(task)"
                  />
                </div>
                
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between mb-1">
                    <h3 
                      class="font-medium text-base truncate" 
                      :class="{ 'line-through': task.completed }"
                    >
                      {{ task.title }}
                    </h3>
                    
                    <div class="flex items-center space-x-2 ml-3 flex-shrink-0">
                      <Badge :class="statusConfig[task.status].color" variant="outline">
                        {{ statusConfig[task.status].label }}
                      </Badge>
                      
                      <Badge :class="priorityColor(task.priority)" variant="outline">
                        {{ t(`todo.${task.priority}`) }}
                      </Badge>
                      
                      <Button variant="ghost" size="icon" @click="openEditTaskDialog(task)">
                        <Edit class="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <p class="text-sm text-muted-foreground mb-2" v-if="task.description">
                    {{ task.description }}
                  </p>
                  
                  <div class="flex items-center text-xs text-muted-foreground">
                    <Calendar class="h-3 w-3 mr-1" />
                    {{ formatDueDate(task.dueDate) }}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
    
    <!-- Board View (Kanban) -->
    <div v-else class="kanban-board flex-1 overflow-hidden">
      <div class="h-full flex space-x-4 overflow-x-auto p-1">
        <!-- Backlog Column -->
        <div class="kanban-column flex-shrink-0 w-72 flex flex-col bg-muted/40 rounded-lg overflow-hidden">
          <div class="column-header p-2 border-b bg-muted/60">
            <h3 class="font-medium text-sm flex items-center">
              <Badge class="mr-2" variant="outline">{{ tasksByStatus.backlog.length }}</Badge>
              Backlog
            </h3>
          </div>
          <ScrollArea class="flex-1 p-2">
            <div class="space-y-2">
              <Card 
                v-for="task in tasksByStatus.backlog"
                :key="task.id"
                class="cursor-pointer"
                @click="openEditTaskDialog(task)"
              >
                <CardContent class="p-3 space-y-2">
                  <div class="flex justify-between items-start">
                    <h4 class="font-medium text-sm">{{ task.title }}</h4>
                    <Badge :class="priorityColor(task.priority)" variant="outline" class="ml-2 flex-shrink-0">
                      {{ t(`todo.${task.priority}`) }}
                    </Badge>
                  </div>
                  <p v-if="task.description" class="text-xs text-muted-foreground line-clamp-2">
                    {{ task.description }}
                  </p>
                  <div class="flex items-center text-xs text-muted-foreground">
                    <Calendar class="h-3 w-3 mr-1" />
                    {{ formatDueDate(task.dueDate) }}
                  </div>
                </CardContent>
              </Card>
              <div v-if="tasksByStatus.backlog.length === 0" class="text-center p-4 text-sm text-muted-foreground">
                No hay tareas
              </div>
            </div>
          </ScrollArea>
        </div>
        
        <!-- Next Column -->
        <div class="kanban-column flex-shrink-0 w-72 flex flex-col bg-muted/40 rounded-lg overflow-hidden">
          <div class="column-header p-2 border-b bg-muted/60">
            <h3 class="font-medium text-sm flex items-center">
              <Badge class="mr-2" variant="outline">{{ tasksByStatus.next.length }}</Badge>
              Siguiente
            </h3>
          </div>
          <ScrollArea class="flex-1 p-2">
            <div class="space-y-2">
              <Card 
                v-for="task in tasksByStatus.next"
                :key="task.id"
                class="cursor-pointer"
                @click="openEditTaskDialog(task)"
              >
                <CardContent class="p-3 space-y-2">
                  <div class="flex justify-between items-start">
                    <h4 class="font-medium text-sm">{{ task.title }}</h4>
                    <Badge :class="priorityColor(task.priority)" variant="outline" class="ml-2 flex-shrink-0">
                      {{ t(`todo.${task.priority}`) }}
                    </Badge>
                  </div>
                  <p v-if="task.description" class="text-xs text-muted-foreground line-clamp-2">
                    {{ task.description }}
                  </p>
                  <div class="flex items-center text-xs text-muted-foreground">
                    <Calendar class="h-3 w-3 mr-1" />
                    {{ formatDueDate(task.dueDate) }}
                  </div>
                </CardContent>
              </Card>
              <div v-if="tasksByStatus.next.length === 0" class="text-center p-4 text-sm text-muted-foreground">
                No hay tareas
              </div>
            </div>
          </ScrollArea>
        </div>
        
        <!-- In Progress Column -->
        <div class="kanban-column flex-shrink-0 w-72 flex flex-col bg-muted/40 rounded-lg overflow-hidden">
          <div class="column-header p-2 border-b bg-muted/60">
            <h3 class="font-medium text-sm flex items-center">
              <Badge class="mr-2" variant="outline">{{ tasksByStatus['in-progress'].length }}</Badge>
              En Curso
            </h3>
          </div>
          <ScrollArea class="flex-1 p-2">
            <div class="space-y-2">
              <Card 
                v-for="task in tasksByStatus['in-progress']"
                :key="task.id"
                class="cursor-pointer"
                @click="openEditTaskDialog(task)"
              >
                <CardContent class="p-3 space-y-2">
                  <div class="flex justify-between items-start">
                    <h4 class="font-medium text-sm">{{ task.title }}</h4>
                    <Badge :class="priorityColor(task.priority)" variant="outline" class="ml-2 flex-shrink-0">
                      {{ t(`todo.${task.priority}`) }}
                    </Badge>
                  </div>
                  <p v-if="task.description" class="text-xs text-muted-foreground line-clamp-2">
                    {{ task.description }}
                  </p>
                  <div class="flex items-center text-xs text-muted-foreground">
                    <Calendar class="h-3 w-3 mr-1" />
                    {{ formatDueDate(task.dueDate) }}
                  </div>
                </CardContent>
              </Card>
              <div v-if="tasksByStatus['in-progress'].length === 0" class="text-center p-4 text-sm text-muted-foreground">
                No hay tareas
              </div>
            </div>
          </ScrollArea>
        </div>
        
        <!-- Blocked Column -->
        <div class="kanban-column flex-shrink-0 w-72 flex flex-col bg-muted/40 rounded-lg overflow-hidden">
          <div class="column-header p-2 border-b bg-muted/60">
            <h3 class="font-medium text-sm flex items-center">
              <Badge class="mr-2" variant="outline">{{ tasksByStatus.blocked.length }}</Badge>
              Bloqueado
            </h3>
          </div>
          <ScrollArea class="flex-1 p-2">
            <div class="space-y-2">
              <Card 
                v-for="task in tasksByStatus.blocked"
                :key="task.id"
                class="cursor-pointer"
                @click="openEditTaskDialog(task)"
              >
                <CardContent class="p-3 space-y-2">
                  <div class="flex justify-between items-start">
                    <h4 class="font-medium text-sm">{{ task.title }}</h4>
                    <Badge :class="priorityColor(task.priority)" variant="outline" class="ml-2 flex-shrink-0">
                      {{ t(`todo.${task.priority}`) }}
                    </Badge>
                  </div>
                  <p v-if="task.description" class="text-xs text-muted-foreground line-clamp-2">
                    {{ task.description }}
                  </p>
                  <div class="flex items-center text-xs text-muted-foreground">
                    <Calendar class="h-3 w-3 mr-1" />
                    {{ formatDueDate(task.dueDate) }}
                  </div>
                </CardContent>
              </Card>
              <div v-if="tasksByStatus.blocked.length === 0" class="text-center p-4 text-sm text-muted-foreground">
                No hay tareas
              </div>
            </div>
          </ScrollArea>
        </div>
        
        <!-- Completed Column -->
        <div class="kanban-column flex-shrink-0 w-72 flex flex-col bg-muted/40 rounded-lg overflow-hidden">
          <div class="column-header p-2 border-b bg-muted/60">
            <h3 class="font-medium text-sm flex items-center">
              <Badge class="mr-2" variant="outline">{{ tasksByStatus.completed.length }}</Badge>
              Completada
            </h3>
          </div>
          <ScrollArea class="flex-1 p-2">
            <div class="space-y-2">
              <Card 
                v-for="task in tasksByStatus.completed"
                :key="task.id"
                class="cursor-pointer opacity-70"
                @click="openEditTaskDialog(task)"
              >
                <CardContent class="p-3 space-y-2">
                  <div class="flex justify-between items-start">
                    <h4 class="font-medium text-sm line-through">{{ task.title }}</h4>
                    <Badge :class="priorityColor(task.priority)" variant="outline" class="ml-2 flex-shrink-0">
                      {{ t(`todo.${task.priority}`) }}
                    </Badge>
                  </div>
                  <p v-if="task.description" class="text-xs text-muted-foreground line-clamp-2">
                    {{ task.description }}
                  </p>
                  <div class="flex items-center text-xs text-muted-foreground">
                    <Calendar class="h-3 w-3 mr-1" />
                    {{ formatDueDate(task.dueDate) }}
                  </div>
                </CardContent>
              </Card>
              <div v-if="tasksByStatus.completed.length === 0" class="text-center p-4 text-sm text-muted-foreground">
                No hay tareas
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
    
    <!-- Task Dialog -->
    <Dialog v-model:open="showTaskDialog">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {{ isEditMode ? t('todo.editTask') : t('todo.newTask') }}
          </DialogTitle>
        </DialogHeader>
        
        <div class="py-4 space-y-4">
          <div class="grid items-center gap-2">
            <label class="text-sm font-medium" for="task-title">{{ t('todo.taskTitle') }}</label>
            <Input id="task-title" v-model="taskForm.title" />
          </div>
          
          <div class="grid items-center gap-2">
            <label class="text-sm font-medium" for="task-description">{{ t('todo.description') }}</label>
            <Textarea id="task-description" v-model="taskForm.description" />
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="grid items-center gap-2">
              <label class="text-sm font-medium" for="task-due-date">{{ t('todo.dueDate') }}</label>
              <Input id="task-due-date" type="date" v-model="taskForm.dueDate" />
            </div>
            
            <div class="grid items-center gap-2">
              <label class="text-sm font-medium" for="task-priority">{{ t('todo.priority') }}</label>
              <Select v-model="taskForm.priority">
                <SelectTrigger>
                  <SelectValue :placeholder="t('todo.priority')" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">{{ t('todo.high') }}</SelectItem>
              <Select id="task-priority" v-model="taskForm.priority">
                <SelectTrigger>
                  <SelectValue :placeholder="t('todo.selectPriority')" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">{{ t('todo.low') }}</SelectItem>
                  <SelectItem value="medium">{{ t('todo.medium') }}</SelectItem>
                  <SelectItem value="high">{{ t('todo.high') }}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div class="grid items-center gap-2">
            <label class="text-sm font-medium" for="task-status">{{ t('todo.status') }}</label>
            <Select id="task-status" v-model="taskForm.status">
              <SelectTrigger>
                <SelectValue :placeholder="t('todo.selectStatus')" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="backlog">Backlog</SelectItem>
                <SelectItem value="next">Siguiente</SelectItem>
                <SelectItem value="in-progress">En Curso</SelectItem>
                <SelectItem value="blocked">Bloqueado</SelectItem>
                <SelectItem value="completed">Completada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div class="flex items-center gap-2" v-if="aiSuggestion">
            <div class="p-3 text-sm bg-muted/50 rounded-md border">
              <div class="flex items-start gap-2">
                <Sparkles class="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>{{ aiSuggestion }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <Button 
              v-if="!aiSuggestion" 
              variant="outline" 
              size="sm" 
              @click="getAIHelp"
            >
              <Sparkles class="mr-2 h-4 w-4" />
              {{ t('todo.getAIHelp') }}
            </Button>
            
            <Button 
              v-if="isEditMode" 
              variant="destructive" 
              size="sm" 
              @click="deleteTask"
            >
              <Trash2 class="mr-2 h-4 w-4" />
              {{ t('todo.delete') }}
            </Button>
          </div>
          
          <div class="flex items-center gap-2">
            <Button 
              variant="outline" 
              @click="showTaskDialog = false"
            >
              <X class="mr-2 h-4 w-4" />
              {{ t('todo.cancel') }}
            </Button>
            
            <Button 
              type="submit" 
              @click="saveTask"
            >
              <CheckCheck class="mr-2 h-4 w-4" />
              {{ t('todo.save') }}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
