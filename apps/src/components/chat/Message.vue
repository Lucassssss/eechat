<script setup lang="ts">
import MessageItem from "@/components/chat/MessageItem.vue"

defineProps<{
  messages: Array<{ role: string; content: string; reasoning_content?: string }>
}>()
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="flex-1 leading-8">
      <MessageItem
        v-for="(message, index) in messages"
        :key="index"
        :message="message.content"
        :messageReasoning="message.reasoning_content || ''"
        :role="message.role"
        :isLastMessage="index === messages.length - 1"
      />
    </div>
    <!-- {{ messages[messages.length - 1].reasoning_content }} -->
  </div>
</template>
