<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { Calendar, ChevronLeft, ChevronRight, Plus, Edit, Trash2, X, Info, Sparkles } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Reactive state for the calendar interface
const currentDate = ref(new Date())
const currentView = ref('month')
const showEventDialog = ref(false)
const isEditMode = ref(false)
const selectedEvent = ref(null)
const aiSuggestion = ref('')

// Calendar event model
const eventForm = reactive({
  id: 0,
  title: '',
  startDate: '',
  endDate: '',
  location: '',
  description: '',
  allDay: false
})

// Sample events data
const events = ref([
  {
    id: 1,
    title: 'Team Meeting',
    startDate: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
    endDate: new Date(new Date().setHours(11, 30, 0, 0)).toISOString(),
    location: 'Conference Room A',
    description: 'Weekly team sync to discuss project progress and blockers.',
    allDay: false
  },
  {
    id: 2,
    title: 'Product Launch Preparation',
    startDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
    location: 'Marketing Department',
    description: 'Finalize materials and coordination for upcoming product launch.',
    allDay: true
  },
  {
    id: 3,
    title: 'Client Presentation',
    startDate: new Date(new Date().setDate(new Date().getDate() + 4)).toISOString(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 4)).toISOString(),
    location: 'Executive Boardroom',
    description: 'Present quarterly results to key client stakeholders.',
    allDay: false
  }
])

// Calendar utility functions
const daysInMonth = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  return new Date(year, month + 1, 0).getDate()
})

const firstDayOfMonth = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  return new Date(year, month, 1).getDay()
})

const calendarDays = computed(() => {
  const days = []
  const numDays = daysInMonth.value
  const firstDay = firstDayOfMonth.value
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: '', isCurrentMonth: false })
  }
  
  // Add the days of the current month
  for (let i = 1; i <= numDays; i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
      date: new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), i)
    })
  }
  
  return days
})

const monthName = computed(() => {
  return currentDate.value.toLocaleString('default', { month: 'long' })
})

const yearAndMonth = computed(() => {
  return `${monthName.value} ${currentDate.value.getFullYear()}`
})

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const eventsForDay = (date) => {
  if (!date) return []
  return events.value.filter(event => {
    const eventStart = new Date(event.startDate)
    return eventStart.getDate() === date.getDate() &&
           eventStart.getMonth() === date.getMonth() &&
           eventStart.getFullYear() === date.getFullYear()
  })
}

const upcomingEvents = computed(() => {
  const today = new Date()
  return events.value
    .filter(event => new Date(event.startDate) >= today)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    .slice(0, 5)
})

// Calendar navigation
const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const goToToday = () => {
  currentDate.value = new Date()
}

// Event management
const openNewEventDialog = () => {
  isEditMode.value = false
  eventForm.id = 0
  eventForm.title = ''
  eventForm.startDate = new Date().toISOString().substring(0, 16)
  eventForm.endDate = new Date(new Date().getTime() + 60 * 60 * 1000).toISOString().substring(0, 16)
  eventForm.location = ''
  eventForm.description = ''
  eventForm.allDay = false
  showEventDialog.value = true
}

const openEditEventDialog = (event) => {
  isEditMode.value = true
  selectedEvent.value = event
  eventForm.id = event.id
  eventForm.title = event.title
  eventForm.startDate = new Date(event.startDate).toISOString().substring(0, 16)
  eventForm.endDate = new Date(event.endDate).toISOString().substring(0, 16)
  eventForm.location = event.location
  eventForm.description = event.description
  eventForm.allDay = event.allDay
  showEventDialog.value = true
}

const saveEvent = () => {
  if (isEditMode.value) {
    // Edit existing event
    const index = events.value.findIndex(event => event.id === eventForm.id)
    if (index !== -1) {
      events.value[index] = { ...eventForm }
    }
  } else {
    // Add new event
    const newEvent = {
      id: events.value.length + 1,
      ...eventForm
    }
    events.value.push(newEvent)
  }
  showEventDialog.value = false
}

const deleteEvent = () => {
  if (isEditMode.value && selectedEvent.value) {
    events.value = events.value.filter(event => event.id !== selectedEvent.value.id)
    showEventDialog.value = false
    selectedEvent.value = null
  }
}

// Helper functions for week and day views
const getEventsForWeekDay = (dayIndex) => {
  const weekStart = new Date(currentDate.value)
  weekStart.setDate(weekStart.getDate() - weekStart.getDay())
  
  const targetDate = new Date(weekStart)
  targetDate.setDate(targetDate.getDate() + dayIndex)
  
  return events.value.filter(event => {
    const eventDate = new Date(event.startDate)
    return eventDate.getDate() === targetDate.getDate() &&
           eventDate.getMonth() === targetDate.getMonth() &&
           eventDate.getFullYear() === targetDate.getFullYear()
  })
}

const getEventTopPosition = (event) => {
  const start = new Date(event.startDate)
  const hours = start.getHours()
  const minutes = start.getMinutes()
  
  return (hours * 60 + minutes) * (12 / 60)
}

const getEventHeight = (event) => {
  const start = new Date(event.startDate)
  const end = new Date(event.endDate)
  
  const durationMinutes = (end - start) / (1000 * 60)
  
  // If it's less than 30 minutes, make it at least 30 minutes tall for visibility
  return Math.max(durationMinutes * (12 / 60), 30)
}

// AI assistance
const getAIHelp = () => {
  // Simulate AI suggestion (in real app, this would call an AI service)
  if (eventForm.title.toLowerCase().includes('meeting')) {
    aiSuggestion.value = "I notice you're creating a meeting. Would you like me to suggest some common meeting details? For standard meetings, I recommend adding an agenda in the description and setting a reminder 15 minutes before."
  } else if (eventForm.title.toLowerCase().includes('launch')) {
    aiSuggestion.value = "For product launches, consider adding key stakeholders to the event description, and make sure you've scheduled enough time for Q&A and troubleshooting after the main event."
  } else {
    aiSuggestion.value = "I can help optimize your calendar entry. Would you like me to suggest a better title or description format to make this event more findable and actionable later?"
  }
}
</script>

<template>
  <div class="calendar-container flex flex-col h-full p-4">
    <!-- Calendar header with navigation -->
    <div class="calendar-header flex items-center justify-between mb-4">
      <div class="calendar-title text-xl font-semibold">{{ yearAndMonth }}</div>
      <div class="calendar-nav flex items-center space-x-2">
        <Button variant="outline" size="sm" @click="goToToday">
          {{ t('calendar.today') }}
        </Button>
        <Tabs v-model="currentView" class="mx-4">
          <TabsList>
            <TabsTrigger value="month">{{ t('calendar.month') }}</TabsTrigger>
            <TabsTrigger value="week">{{ t('calendar.week') }}</TabsTrigger>
            <TabsTrigger value="day">{{ t('calendar.day') }}</TabsTrigger>
          </TabsList>
        </Tabs>
        <div class="nav-buttons flex">
          <Button variant="ghost" size="icon" @click="previousMonth">
            <ChevronLeft class="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" @click="nextMonth">
            <ChevronRight class="h-5 w-5" />
          </Button>
        </div>
        <Button @click="openNewEventDialog">
          <Plus class="mr-2 h-4 w-4" />
          {{ t('calendar.newEvent') }}
        </Button>
      </div>
    </div>

    <div class="calendar-content flex flex-1 overflow-hidden">
      <!-- Main calendar grid -->
      <div class="calendar-grid flex-1">
        <TabsContent value="month" class="h-full">
          <div class="calendar-month grid grid-cols-7 gap-1 h-full">
            <!-- Days of the week headers -->
            <div v-for="day in daysOfWeek" :key="day" class="day-header text-center p-2 font-medium">
              {{ day }}
            </div>
            
            <!-- Calendar days -->
            <div 
              v-for="(day, index) in calendarDays" 
              :key="index"
              class="calendar-day border rounded-sm p-1 min-h-24 relative"
              :class="{ 
                'bg-muted/20': day.isCurrentMonth, 
                'opacity-50': !day.isCurrentMonth,
                'border-primary': day.date && day.date.getDate() === new Date().getDate() && 
                                  day.date.getMonth() === new Date().getMonth() && 
                                  day.date.getFullYear() === new Date().getFullYear()
              }"
            >
              <div class="day-number font-medium">{{ day.day }}</div>
              
              <!-- Events for this day -->
              <div class="day-events mt-1 overflow-hidden">
                <div 
                  v-for="event in eventsForDay(day.date)" 
                  :key="event.id"
                  class="event text-xs p-1 mb-1 rounded truncate cursor-pointer"
                  :class="{ 'bg-primary/20': !event.allDay, 'bg-secondary/20': event.allDay }"
                  @click="openEditEventDialog(event)"
                >
                  {{ event.title }}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="week" class="h-full">
          <div class="week-view h-full flex flex-col">
            <!-- Week header with days -->
            <div class="week-header grid grid-cols-7 gap-1 mb-2">
              <div v-for="(day, index) in 7" :key="index" class="p-2 text-center font-medium">
                {{ new Date(
                  new Date(currentDate.value).setDate(
                    new Date(currentDate.value).getDate() - new Date(currentDate.value).getDay() + index
                  )
                ).toLocaleDateString('default', { weekday: 'short', day: 'numeric', month: 'short' }) }}
              </div>
            </div>
            
            <!-- Week time slots -->
            <div class="week-body flex-1 overflow-auto">
              <div class="relative min-h-[1200px]">
                <!-- Time indicators -->
                <div class="absolute top-0 left-0 w-16 h-full border-r">
                  <div v-for="hour in 24" :key="hour" class="h-12 border-b flex items-center justify-center text-xs">
                    {{ hour - 1 }}:00
                  </div>
                </div>
                
                <!-- Day columns -->
                <div class="ml-16 grid grid-cols-7 h-full">
                  <div v-for="dayIndex in 7" :key="dayIndex" class="border-r min-h-full relative">
                    <!-- Hour grid lines -->
                    <div v-for="hour in 24" :key="hour" class="h-12 border-b"></div>
                    
                    <!-- Events for this day -->
                    <div v-for="event in getEventsForWeekDay(dayIndex - 1)" :key="event.id"
                      class="absolute rounded p-1 text-xs overflow-hidden shadow-sm cursor-pointer"
                      :class="{'bg-primary/20': !event.allDay, 'bg-secondary/20': event.allDay}"
                      :style="{
                        top: `${getEventTopPosition(event)}px`,
                        height: `${getEventHeight(event)}px`,
                        left: '4px',
                        right: '4px'
                      }"
                      @click="openEditEventDialog(event)"
                    >
                      {{ event.title }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="day" class="h-full">
          <div class="day-view h-full flex flex-col">
            <!-- Day header -->
            <div class="day-header p-2 text-center font-medium mb-2">
              {{ currentDate.value.toLocaleDateString('default', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }}
            </div>
            
            <!-- Day time slots -->
            <div class="day-body flex-1 overflow-auto">
              <div class="relative min-h-[1200px]">
                <!-- Time indicators -->
                <div class="absolute top-0 left-0 w-16 h-full border-r">
                  <div v-for="hour in 24" :key="hour" class="h-12 border-b flex items-center justify-center text-xs">
                    {{ hour - 1 }}:00
                  </div>
                </div>
                
                <!-- Events container -->
                <div class="ml-16 h-full relative pr-4">
                  <!-- Hour grid lines -->
                  <div v-for="hour in 24" :key="hour" class="h-12 border-b w-full"></div>
                  
                  <!-- Events for this day -->
                  <div v-for="event in getEventsForDay(currentDate.value)" :key="event.id"
                    class="absolute rounded p-2 overflow-hidden shadow-sm cursor-pointer"
                    :class="{'bg-primary/20': !event.allDay, 'bg-secondary/20': event.allDay}"
                    :style="{
                      top: `${getEventTopPosition(event)}px`,
                      height: `${getEventHeight(event)}px`,
                      left: '4px',
                      right: '4px'
                    }"
                    @click="openEditEventDialog(event)"
                  >
                    <div class="font-medium">{{ event.title }}</div>
                    <div class="text-xs" v-if="event.location">{{ event.location }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </div>
      
      <!-- Sidebar for upcoming events -->
      <div class="calendar-sidebar w-80 ml-4 border-l pl-4">
        <h3 class="text-lg font-medium mb-3">{{ t('calendar.upcoming') }}</h3>
        
        <ScrollArea class="h-[calc(100%-3rem)]">
          <div class="space-y-3">
            <Card v-for="event in upcomingEvents" :key="event.id" class="cursor-pointer" @click="openEditEventDialog(event)">
              <CardContent class="p-3">
                <h4 class="font-medium">{{ event.title }}</h4>
                <p class="text-xs text-muted-foreground">
                  {{ new Date(event.startDate).toLocaleDateString() }} • 
                  {{ event.allDay ? t('calendar.allDay') : new Date(event.startDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
                </p>
                <p v-if="event.location" class="text-xs mt-1">{{ event.location }}</p>
              </CardContent>
            </Card>
            
            <div v-if="upcomingEvents.length === 0" class="text-center py-4 text-muted-foreground">
              {{ t('calendar.noEvents') }}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
    
    <!-- Event Dialog -->
    <Dialog v-model:open="showEventDialog">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {{ isEditMode ? t('calendar.editEvent') : t('calendar.newEvent') }}
          </DialogTitle>
        </DialogHeader>
        
        <div class="py-4 space-y-4">
          <div class="grid items-center gap-2">
            <label class="text-sm font-medium" for="event-title">{{ t('calendar.eventTitle') }}</label>
            <Input id="event-title" v-model="eventForm.title" />
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="grid items-center gap-2">
              <label class="text-sm font-medium" for="event-start">{{ t('calendar.startDate') }}</label>
              <Input id="event-start" type="datetime-local" v-model="eventForm.startDate" />
            </div>
            
            <div class="grid items-center gap-2">
              <label class="text-sm font-medium" for="event-end">{{ t('calendar.endDate') }}</label>
              <Input id="event-end" type="datetime-local" v-model="eventForm.endDate" />
            </div>
          </div>
          
          <div class="flex items-center space-x-2">
            <Checkbox id="all-day" v-model="eventForm.allDay" />
            <label for="all-day" class="text-sm font-medium">{{ t('calendar.allDay') }}</label>
          </div>
          
          <div class="grid items-center gap-2">
            <label class="text-sm font-medium" for="event-location">{{ t('calendar.location') }}</label>
            <Input id="event-location" v-model="eventForm.location" />
          </div>
          
          <div class="grid items-center gap-2">
            <label class="text-sm font-medium" for="event-description">{{ t('calendar.description') }}</label>
            <Textarea id="event-description" v-model="eventForm.description" />
          </div>
          
          <Button variant="outline" class="w-full" @click="getAIHelp">
            <Sparkles class="mr-2 h-4 w-4" />
            {{ t('calendar.aiHelp') }}
          </Button>
          
          <div v-if="aiSuggestion" class="bg-accent/20 p-3 rounded text-sm">
            <div class="flex">
              <div class="mr-2 bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                <Sparkles class="h-3 w-3" />
              </div>
              <div>
                <div class="font-medium text-sm mb-1">{{ t('calendar.aiSuggestions') }}</div>
                <p>{{ aiSuggestion }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter class="flex justify-between">
          <div class="flex space-x-2">
            <Button variant="destructive" v-if="isEditMode" @click="deleteEvent">
              <Trash2 class="mr-2 h-4 w-4" />
              {{ t('calendar.deleteEvent') }}
            </Button>
          </div>
          <div class="flex space-x-2">
            <Button variant="outline" @click="showEventDialog = false">
              {{ t('calendar.cancel') }}
            </Button>
            <Button @click="saveEvent">
              {{ t('calendar.save') }}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<style scoped>
.calendar-day {
  min-height: 100px;
}
</style>
