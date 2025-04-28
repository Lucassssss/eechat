<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ref, defineProps, defineEmits, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  initialPrompt: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:isOpen', 'save'])

const promptText = ref(props.initialPrompt)

// 监听 initialPrompt 的变化
watch(
  () => props.initialPrompt,
  newPrompt => {
    promptText.value = newPrompt
  },
)

const handleSave = () => {
  emit('save', promptText.value)
  emit('update:isOpen', false)
}

const handleCancel = () => {
  promptText.value = props.initialPrompt
  emit('update:isOpen', false)
}
</script>

<template>
  <Dialog :open="isOpen" @update:open="val => emit('update:isOpen', val)">
    <DialogContent class="sm:max-w-[800px]">
      <DialogHeader>
        <DialogTitle>{{ t('chat.promptEditor.title') }}</DialogTitle>
      </DialogHeader>
      <div class="py-4">
        <Textarea
          v-model="promptText"
          :placeholder="t('chat.promptEditor.placeholder')"
          class="min-h-[500px]"
        />
      </div>
      <DialogFooter>
        <Button variant="outline" @click="handleCancel">{{
          t('common.cancel')
        }}</Button>
        <Button @click="handleSave">{{ t('common.save') }}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
