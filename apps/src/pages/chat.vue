<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from "vue"
import { useChatStore } from "@/stores/chatStore"
import { useI18n } from "vue-i18n"
import { LLMModel } from "@/types/llm"
import SidebarLeft from "@/components/chat/SidebarLeft.vue"
import SidebarRight from "@/components/chat/SidebarRight.vue"
import { Button } from "@/components/ui/button"
import { SidebarProvider } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import Message from "@/components/chat/Message.vue"
import ChatInput from "@/components/chat/ChatInput.vue"
import ModelSelect from "@/components/ModelSelect.vue"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Theme from "@/components/Theme.vue"
import { chatApi, llmApi } from "@/api/request"
import {
  PanelLeft,
  PanelRight,
  ArrowDownToLine,
  PictureInPicture2,
  SquareArrowLeft,
  Pin,
  PinOff,
} from "lucide-vue-next"
import { useAssistantStore } from '@/stores/assistant'
import { useRoute } from 'vue-router'

// 导入 sessionStore
import { useSessionStore } from '@/stores/session'
import { useMcpStore } from '@/stores/mcp'
import { computed } from "vue"
import { useEnvStore } from "@/stores/env"
const envStore = useEnvStore()

const sessionStore = useSessionStore()
const mcpStore = useMcpStore()

const route = useRoute()
const assistantStore = useAssistantStore()

interface Message {
  role: "system" | "user" | "assistant"
  content: string
  reasoning_content?: string
}
const { t } = useI18n()
const chatStore = useChatStore()
const activeSession = ref({ title: "", id: "" })
const chatHistory = ref<Message[]>([])
const loading = ref(false)
const currentAssistantMessage = ref("")
const sidebarLeftOpen = ref(true)
const sidebarRightOpen = ref(false)

watch(() => sessionStore.currentSession, (newValue, oldValue) => {
  if(newValue?.id != oldValue?.id) {
    console.log("Active session changed:", newValue)
    handleSessionChange(newValue) 
  }
}, { deep: true})

const tools = computed(() => {
  return mcpStore.getSelectedTools
})

const handleSessionChange = async (session) => {
  activeSession.value = session
  console.log("Session changed:", session.id)
  localStorage.setItem("activeSession", JSON.stringify(session))
  chatHistory.value = []
  try {
    const messages = await chatApi.getMessages(session.id)
    chatHistory.value = messages.data
    nextTick(() => {
      setTimeout(() => {
        scrollToBottom(false)
      }, 1)
    })
  } catch (error) {
    console.error("Error loading chat history:", error)
  }
}

const sendMsgLocalOllama = async (model: LLMModel, msg: string) => {
  if (loading.value) return
  loading.value = true

  try {
    // 添加用户消息到历史记录
    chatHistory.value.push({ role: "user", content: msg })

    // 添加空的助手消息
    chatHistory.value.push({
      role: "assistant",
      content: "",
    })

    // 发送消息并处理流式响应
    await chatApi.sendMessage(
      model,
      [
        ...chatHistory.value.slice(0, -1), // 不包含空的助手消息
      ],
      activeSession.value.id,
      (content: string) => {
        // 更新最后一条消息的内容
        const lastMessage = chatHistory.value[chatHistory.value.length - 1]
        lastMessage.content += content
      }
    )
  } catch (error) {
    console.error("Error during chat:", error)
    // 移除失败的助手消息
    chatHistory.value.pop()
  } finally {
    loading.value = false
  }
}

const sendMsgLlmApi = async (model: LLMModel, msg: string) => {
  if (loading.value) return
  loading.value = true

  try {
    // 添加用户消息到历史记录
    chatHistory.value.push({ role: "user", content: msg })

    // 添加空的助手消息
    chatHistory.value.push({
      role: "assistant",
      content: "",
      reasoning_content: "",
    })
    // 发送消息并处理流式响应
    await llmApi.sendMessageLlm(
      model,
      [...chatHistory.value.slice(0, -1)],
      activeSession.value.id,
      (content: string) => {
        const lastMessage = chatHistory.value[chatHistory.value.length - 1]
        lastMessage.content += content
      },
      (reasoning_content) => {
        // 思考过程
        const lastMessage = chatHistory.value[chatHistory.value.length - 1]
        if(typeof lastMessage.reasoning_content == 'undefined') {
          lastMessage.reasoning_content = ""
        }
        lastMessage.reasoning_content += reasoning_content
      },
      tools.value,
    )
  } catch (error) {
    console.error("Error during chat:", error)
    // 移除失败的助手消息
    chatHistory.value.pop()
  } finally {
    loading.value = false
  }
}

const sendMsg = async (msg: string) => {
  console.log(chatStore.model)
  if (chatStore.model.type === "local") {
    sendMsgLocalOllama(chatStore.model, msg)
  } else {
    sendMsgLlmApi(chatStore.model, msg)
  }
  scrollToBottom(true)
  
  // 只有在非助手创建的会话且是第一次对话时才进行总结
  if (chatHistory.value.length == 2 && activeSession.value.title == '👋 Hi') {
    const config = {
      model: chatStore.model,
      messages: chatHistory.value,
      sessionId: activeSession.value,
    }
    const summaryRes = await chatApi.summarySession(config)
    console.log(summaryRes)
    activeSession.value.title = summaryRes.title
  }
}

const scrollAreaRef = ref(null)
const showScrollButton = ref(false)
const scrollToBottom = (animate) => {
  nextTick(() => {
    if (scrollAreaRef.value) {
      const viewport = (scrollAreaRef.value as any).$el.querySelector(
        "[data-radix-scroll-area-viewport]"
      )
      if (viewport) {
        viewport.scrollTo({
          top: viewport.scrollHeight,
          behavior: animate ? "smooth" : "auto",
        })
      }
    }
  })
}

const handleScroll = () => {
  if (scrollAreaRef.value) {
    const viewport = (scrollAreaRef.value as any).$el.querySelector(
      "[data-radix-scroll-area-viewport]"
    )
    if (viewport) {
      const isAtBottom =
        viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight < 10
      showScrollButton.value = !isAtBottom
    }
  }
}

const isMiniMode = ref(false)
const handleMiniModeChange = () => {
  isMiniMode.value = !isMiniMode.value
  if (!window.ipcRenderer) return
  if (isMiniMode.value) {
    window.ipcRenderer.invoke("set-mini-mode", true)
  } else {
    window.ipcRenderer.invoke("set-mini-mode", false)
  }
}

const isAlwaysOnTop = ref(true)
const toggleAlwaysOnTop = async () => {
  isAlwaysOnTop.value = await window.ipcRenderer.invoke("toggle-always-on-top")
}

const initializeChat = async (assistant) => {
  try {
    // 创建新会话
    const newSession = await sessionStore.createChat()
    // 更新会话设置
    await sessionStore.updateSettings(newSession.id, {
      title: assistant.title,
      systemPrompt: assistant.prompt,
      ...(assistant.settings || {})
    })
    // 切换到新会话
    handleSessionChange(newSession)
  } catch (error) {
    console.error('Failed to initialize chat:', error)
  }
}

onMounted(() => {
  const viewport = (scrollAreaRef.value as any)?.$el?.querySelector(
    "[data-radix-scroll-area-viewport]"
  )
  if (viewport) {
    viewport.addEventListener("scroll", handleScroll)
  }
  const assistantId = route.query.assistantId as string
  if (assistantId) {
    const assistant = assistantStore.currentAssistant
    if (assistant) {
      // 使用助手信息初始化聊天
      initializeChat(assistant)
    }
  }
  if(sessionStore.currentSession) {
    handleSessionChange(sessionStore.currentSession)
  }
})
</script>

<template>
  <div class="flex relative overflow-hidden">
    <SidebarProvider
      class="w-auto"
      :style="{ '--sidebar-width': '200px' }"
      v-model:open="sidebarLeftOpen"
    >
      <SidebarLeft />
    </SidebarProvider>
    <div class="w-full h-[calc(100dvh-30px)] max-h-[calc(100dvh-30px)] flex flex-col grow" :class="envStore.isWeb ? 'h-[100dvh] max-h-[100dvh]' : ''">
      <header
        class="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 justify-between h-[64px] py-0 max-sm:h-[40px]"
      >
        <div class="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            class="h-7 w-7 max-sm:hidden"
            @click="sidebarLeftOpen = !sidebarLeftOpen"
            style="-webkit-app-region: no-drag"
          >
            <PanelLeft></PanelLeft>
          </Button>
          <Separator orientation="vertical" class="mr-2 h-4 max-sm:hidden" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage class="max-w-[200px] truncate max-sm:text-zinc-600">{{
                  activeSession.title
                }}</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator class="hidden md:block" />
              <BreadcrumbItem class="hidden md:block">
                <ModelSelect></ModelSelect>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div class="flex items-center gap-2">
          <Theme></Theme>

          <Separator orientation="vertical" class="mx-1 h-4 max-sm:hidden" />
          <Button
            v-if="!isMiniMode"
            @click="handleMiniModeChange"
            size="icon"
            variant="ghost"
            class="h-7 w-7"
          >
            <PictureInPicture2></PictureInPicture2>
          </Button>
          <Separator v-if="!isMiniMode" orientation="vertical" class="mx-1 h-4" />
          <Button
            v-if="isMiniMode"
            @click="handleMiniModeChange"
            size="icon"
            variant="ghost"
            class="h-7 w-7"
          >
            <SquareArrowLeft></SquareArrowLeft>
          </Button>
          <Separator
            v-if="isMiniMode"
            orientation="vertical"
            class="mx-1 h-4 max-sm:hidden"
          />
          <Button
            @click="toggleAlwaysOnTop"
            size="icon"
            variant="ghost"
            class="h-7 w-7 hidden max-sm:flex"
          >
            <Pin v-if="isAlwaysOnTop"></Pin>
            <PinOff v-else></PinOff>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            class="h-7 w-7 max-sm:hidden"
            @click="sidebarRightOpen = !sidebarRightOpen"
          >
            <PanelRight></PanelRight>
          </Button>
        </div>
      </header>
      <Button
        v-if="showScrollButton"
        @click="scrollToBottom(true)"
        variant="outline"
        size="icon"
        class="fixed bottom-[140px] right-6 z-10 drop-shadow-xl"
      >
        <ArrowDownToLine class="h-4 w-4" />
        <span class="sr-only">{{ t("chat.scrollToBottom") }}</span>
      </Button>
      <ScrollArea ref="scrollAreaRef" class="h-full w-full px-6 flex-1">
        <!-- <div class="h-[300px] overflow-hidden ml--4"> -->
        <!-- <img src="https://www.notion.so/images/page-cover/woodcuts_1.jpg" alt=""> -->
        <!-- <img src="/photo.jpeg" alt=""> -->
        <!-- </div> -->
        <!-- <ScrollArea
        class="h-full w-full px-4 flex-1 bg-slate-200 dark:bg-[#282C34]"
      > -->
        <Message :messages="chatHistory" class="py-4 xl:max-w-[1024px] xl:mx-auto" />
        <ScrollBar />
      </ScrollArea>
      <div
        class="sticky bottom-0 h-[120px] max-h-[120px] content-center shrink-0 items-center gap-2 border-b bg-background"
      >
        <ChatInput
          :loading="loading"
          @sendMsg="sendMsg"
          :placeholder="t('chat.inputPlaceholder')"
        />
      </div>
    </div>
    <SidebarProvider
      class="w-auto"
      :style="{ '--sidebar-width': '300px' }"
      v-model:open="sidebarRightOpen"
    >
      <SidebarRight :activeSession="activeSession" />
    </SidebarProvider>
  </div>
</template>
