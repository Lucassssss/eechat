<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Mail, Send, Inbox, Trash2, Edit, User, FileText, Info, Sparkles } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Reactive state for the email interface
const selectedEmail = ref(null)
const showCompose = ref(false)
const emailDraft = reactive({
  to: '',
  subject: '',
  body: ''
})
const aiSuggestion = ref('')
const emailList = ref([
  {
    id: 1,
    sender: 'Microsoft Team',
    subject: 'Welcome to Microsoft Email Integration',
    preview: 'Thanks for connecting your Microsoft account...',
    date: new Date().toLocaleDateString(),
    read: true,
    body: 'Dear User,\n\nThank you for connecting your Microsoft account with our application. You can now access and manage your emails directly from here.\n\nBest regards,\nMicrosoft Team'
  },
  {
    id: 2,
    sender: 'Project Update',
    subject: 'Weekly Progress Report',
    preview: 'Here is the summary of this week\'s progress...',
    date: new Date().toLocaleDateString(),
    read: false,
    body: 'Hi Team,\n\nHere is the summary of this week\'s progress:\n\n1. Completed the user authentication module\n2. Started working on the dashboard design\n3. Fixed 5 critical bugs in the backend\n\nLet me know if you have any questions.\n\nRegards,\nProject Manager'
  },
  {
    id: 3,
    sender: 'HR Department',
    subject: 'Upcoming Company Event',
    preview: 'We are pleased to announce our annual company retreat...',
    date: new Date().toLocaleDateString(),
    read: true,
    body: 'Dear Colleagues,\n\nWe are pleased to announce our annual company retreat will be held next month. Please save the date and prepare for a wonderful team-building experience.\n\nMore details will follow soon.\n\nBest regards,\nHR Department'
  }
])

// Functions
const selectEmail = (email) => {
  selectedEmail.value = email
  email.read = true
  showCompose.value = false
}

const openCompose = () => {
  showCompose.value = true
  selectedEmail.value = null
  emailDraft.to = ''
  emailDraft.subject = ''
  emailDraft.body = ''
}

const sendEmail = () => {
  // In a real app, this would send the email via API
  emailList.value.unshift({
    id: emailList.value.length + 1,
    sender: 'Me',
    subject: emailDraft.subject,
    preview: emailDraft.body.substring(0, 60) + '...',
    date: new Date().toLocaleDateString(),
    read: true,
    body: emailDraft.body
  })
  showCompose.value = false
  emailDraft.to = ''
  emailDraft.subject = ''
  emailDraft.body = ''
}

const getAIHelp = () => {
  // Simulate AI suggestion (in real app, this would call an AI service)
  if (emailDraft.subject.includes('meeting')) {
    aiSuggestion.value = "I notice you're writing about a meeting. Would you like me to suggest a professional closing for your email? Here's a suggestion: 'I look forward to our discussion and appreciate your time. Please let me know if you need any additional information before we meet.'"
  } else {
    aiSuggestion.value = "I can help you craft a more engaging email. Would you like me to suggest improvements to your tone or offer alternative phrases to make your message more effective?"
  }
}

const applyAISuggestion = () => {
  // In a real app, this would intelligently append or modify the email text
  if (aiSuggestion.value) {
    emailDraft.body += "\n\n" + aiSuggestion.value.split("Here's a suggestion: ")[1]?.replace(/'/g, '') || ''
    aiSuggestion.value = ''
  }
}

const requestAIExplanation = () => {
  if (selectedEmail.value) {
    aiSuggestion.value = "This email appears to be about " + 
      (selectedEmail.value.subject.toLowerCase().includes('update') ? 
        "a project update. The sender is sharing weekly progress with the team, highlighting completed tasks and seeking feedback." : 
        "a company announcement. The sender is providing information about an upcoming event and indicating that more details will follow.")
  }
}
</script>

<template>
  <div class="email-container flex h-full">
    <!-- Email sidebar -->
    <div class="email-sidebar w-1/4 min-w-[200px] border-r overflow-hidden p-2">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold flex items-center">
          <Mail class="mr-2" /> {{ t('email.inbox') || 'Inbox' }}
        </h2>
        <Button variant="ghost" size="icon" @click="openCompose">
          <Edit class="h-5 w-5" />
        </Button>
      </div>
      
      <ScrollArea class="h-[calc(100%-3rem)]">
        <div class="space-y-2">
          <div 
            v-for="email in emailList" 
            :key="email.id"
            @click="selectEmail(email)"
            class="p-2 rounded cursor-pointer hover:bg-accent transition-colors"
            :class="{ 'bg-accent/50': selectedEmail && selectedEmail.id === email.id, 'font-bold': !email.read }"
          >
            <div class="flex justify-between">
              <span class="truncate">{{ email.sender }}</span>
              <span class="text-xs text-muted-foreground">{{ email.date }}</span>
            </div>
            <div class="text-sm font-medium truncate">{{ email.subject }}</div>
            <div class="text-xs text-muted-foreground truncate">{{ email.preview }}</div>
          </div>
        </div>
      </ScrollArea>
    </div>

    <!-- Email content -->
    <div class="email-content flex-1 overflow-hidden">
      <div v-if="selectedEmail" class="flex flex-col h-full">
        <div class="p-4 border-b">
          <h3 class="text-xl font-semibold">{{ selectedEmail.subject }}</h3>
          <div class="flex justify-between items-center mt-2">
            <div class="flex items-center">
              <div class="bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center mr-2">
                {{ selectedEmail.sender.charAt(0) }}
              </div>
              <div>
                <div class="font-medium">{{ selectedEmail.sender }}</div>
                <div class="text-xs text-muted-foreground">{{ selectedEmail.date }}</div>
              </div>
            </div>
            <div class="flex space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant="ghost" size="icon" @click="requestAIExplanation">
                      <Info class="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ask AI to explain</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        
        <ScrollArea class="flex-1 p-4">
          <div class="whitespace-pre-line">{{ selectedEmail.body }}</div>
        </ScrollArea>

        <div v-if="aiSuggestion" class="p-4 border-t bg-accent/20">
          <div class="flex items-start">
            <div class="mr-2 bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
              <Sparkles class="h-3 w-3" />
            </div>
            <div class="text-sm">
              <div class="font-medium">AI Assistant</div>
              <p>{{ aiSuggestion }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="showCompose" class="flex flex-col h-full">
        <div class="p-4 border-b">
          <h3 class="text-xl font-semibold">{{ t('email.compose') || 'New Message' }}</h3>
        </div>
        
        <div class="p-4 flex-1 flex flex-col">
          <div class="mb-4">
            <label class="text-sm font-medium mb-1 block">{{ t('email.to') || 'To' }}</label>
            <Input v-model="emailDraft.to" />
          </div>
          
          <div class="mb-4">
            <label class="text-sm font-medium mb-1 block">{{ t('email.subject') || 'Subject' }}</label>
            <Input v-model="emailDraft.subject" />
          </div>
          
          <div class="flex-1 flex flex-col">
            <label class="text-sm font-medium mb-1 block">{{ t('email.message') || 'Message' }}</label>
            <Textarea 
              v-model="emailDraft.body" 
              class="flex-1 min-h-[200px] resize-none"
              @input="aiSuggestion = ''"
            />
          </div>
          
          <div class="mt-4 flex justify-between">
            <Button variant="outline" @click="getAIHelp">
              <Sparkles class="mr-2 h-4 w-4" />
              {{ t('email.aiHelp') || 'Get AI Help' }}
            </Button>
            <Button @click="sendEmail">
              <Send class="mr-2 h-4 w-4" />
              {{ t('email.send') || 'Send' }}
            </Button>
          </div>
        </div>

        <div v-if="aiSuggestion" class="p-4 border-t bg-accent/20">
          <div class="flex items-start">
            <div class="mr-2 bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
              <Sparkles class="h-3 w-3" />
            </div>
            <div class="text-sm flex-1">
              <div class="font-medium">AI Assistant</div>
              <p>{{ aiSuggestion }}</p>
              <Button 
                v-if="aiSuggestion.includes('suggestion')" 
                variant="outline" 
                size="sm" 
                class="mt-2"
                @click="applyAISuggestion"
              >
                Apply Suggestion
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="h-full flex items-center justify-center">
        <div class="text-center">
          <Mail class="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 class="mt-4 text-lg font-medium">{{ t('email.noSelection') || 'Select an email to read' }}</h3>
          <p class="text-sm text-muted-foreground">{{ t('email.noSelectionHint') || 'Or click the edit button to compose a new message' }}</p>
          <Button class="mt-4" @click="openCompose">
            <Edit class="mr-2 h-4 w-4" />
            {{ t('email.compose') || 'Compose' }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
