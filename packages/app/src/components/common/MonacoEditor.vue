<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
// Use the standard import for Monaco Editor
import * as monaco from 'monaco-editor'

// Remove the problematic imports and use a simpler approach
// The basic languages are included in the main package

// Set up Monaco environment with CDN workers to avoid build issues
window.MonacoEnvironment = {
  getWorkerUrl: () =>
  {encodeURIComponent(
    window.MonacoEnvironment = {
    baseUrl: 'https://unpkg.com/monaco-editor@0.50.0/min/'
    },
    importScripts('https://unpkg.com/monaco-editor@0.50.0/min/vs/base/worker/workerMain.js')
  )}
}

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: 'json'
  },
  theme: {
    type: String,
    default: 'vs-dark'
  },
  options: {
    type: Object,
    default: () => ({})
  },
  height: {
    type: String,
    default: '400px'
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'editor-mounted'])

const editorContainer = ref(null)
let editor = null

// 初始化编辑器
const initMonaco = () => {
  if (!editorContainer.value) return
  
  // 默认配置
  const defaultOptions = {
    automaticLayout: true,
    scrollBeyondLastLine: false,
    minimap: { enabled: false },
    scrollbar: {
      vertical: 'auto',
      horizontal: 'auto'
    },
    lineNumbers: 'on',
    tabSize: 2,
    fontSize: 14,
    fontFamily: 'Consolas, "Courier New", monospace',
    renderLineHighlight: 'all',
    formatOnPaste: true,
    // 添加语法高亮相关配置
    wordWrap: 'on',
    semanticHighlighting: true
  }
  
  // 合并配置
  const editorOptions = {
    ...defaultOptions,
    ...props.options,
    value: props.modelValue,
    language: props.language,
    theme: props.theme
  }
  
  // 创建编辑器
  editor = monaco.editor.create(editorContainer.value, editorOptions)
  
  // 监听内容变化
  editor.onDidChangeModelContent(() => {
    const value = editor.getValue()
    emit('update:modelValue', value)
    emit('change', value)
  })
  
  // 通知编辑器已挂载
  emit('editor-mounted', editor)
}

// 更新编辑器内容
const updateContent = () => {
  if (editor) {
    const currentValue = editor.getValue()
    if (currentValue !== props.modelValue) {
      editor.setValue(props.modelValue)
    }
  }
}

// 更新编辑器语言
const updateLanguage = () => {
  if (editor) {
    monaco.editor.setModelLanguage(editor.getModel(), props.language)
  }
}

// 更新编辑器主题
const updateTheme = () => {
  if (editor) {
    monaco.editor.setTheme(props.theme)
  }
}

// 获取编辑器实例
const getEditor = () => editor

// 格式化代码
const formatCode = () => {
  if (editor) {
    editor.getAction('editor.action.formatDocument').run()
  }
}

// 暴露方法给父组件
defineExpose({
  getEditor,
  formatCode
})

// 监听属性变化
watch(() => props.modelValue, updateContent)
watch(() => props.language, updateLanguage)
watch(() => props.theme, updateTheme)

// 生命周期钩子
onMounted(() => {
  initMonaco()
})
</script>

<template>
  <div ref="editorContainer" :style="{ height }"></div>
</template>