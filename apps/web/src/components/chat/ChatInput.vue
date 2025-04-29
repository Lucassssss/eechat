<script setup lang="ts">
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUpToLine } from "lucide-vue-next"
import { CornerDownLeft, Mic } from "lucide-vue-next"
import UseTool from "@/components/chat/UseTool.vue" // 导入 UseTool 组件

const { t } = useI18n()

const count = ref(0)
const msg = ref("")
const emit = defineEmits(["sendMsg"])
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})

const handleSendMsg = (e: Event) => {
  if(!msg.value.trim()) return
  emit("sendMsg", msg.value)
  msg.value = ""
}

// 监听回车键
const initEvent = () => {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleSendMsg(e)
    }
  })
}
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault()
    handleSendMsg(e)
  } else if (e.key === "Enter" && e.shiftKey) {
    // 允许默认换行行为
    e.stopPropagation() // 添加这行防止事件冒泡
  }
}

const isRecording = ref(false)
const handleRecord = () => {
  isRecording.value = !isRecording.value
  // 添加类型声明以解决 TypeScript 报错
  const recognition = new (window as any).webkitSpeechRecognition()
  recognition.lang = "cmn-Hans-CN"
  recognition.continuous = true
  recognition.interimResults = true
  recognition.addEventListener('result', (event) => {
    const transcript = event.results[0][0].transcript
    msg.value = `${transcript}`
  });

  recognition.addEventListener('speechend', () => {
    recognition.stop()
    isRecording.value = false
  });

  recognition.addEventListener('error', (event) => {
    console.log(event);
    
    msg.value = `Error: ${event.error}`
    isRecording.value = false
  })
  recognition.start()
}

// 删除 initEvent 函数及其调用
</script>

<template>
  <div class="relative l-footer">
    <form @submit.prevent="handleSendMsg">
      <Textarea
        v-model="msg"
        class="h-[120px] min-h-[120px] max-h-[120px] rounded-none focus-visible:ring-offset-0 focus-visible:ring-0 border-l-0 outline-none appearance-none resize-none"
        :placeholder="t('chat.inputPlaceholder')"
        @keydown="handleKeyDown"
      ></Textarea>
      <div class="ml-auto gap-1.5 absolute bottom-4 right-4 flex items-center space-x-1">
        <UseTool class="relative"></UseTool>
        <Button
          @click="handleRecord"
          :variant="isRecording ? 'destructive' : 'outline'"
          :disabled="isRecording"
          size="icon"
          class="ml-auto gap-1.5"
        >
          <Mic class="size-3.5" />
        </Button>
        <Button
          type="submit"
          :disabled="disabled"
          size="icon"
          class="ml-auto gap-1.5 "
        >
          <CornerDownLeft class="size-3.5" />
        </Button>
      </div>
    </form>
  </div>
</template>
