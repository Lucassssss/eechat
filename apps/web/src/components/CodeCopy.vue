<script setup lang="ts">
import { ref } from 'vue'

const copied = ref(false)

const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

defineProps<{
  code: string
}>()
</script>

<template>
  <button class="code-copy" :class="{ copied }" @click="copy(code)">
    <span v-if="!copied">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z"
        />
      </svg>
    </span>
    <span v-else>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
        />
      </svg>
    </span>
  </button>
</template>
