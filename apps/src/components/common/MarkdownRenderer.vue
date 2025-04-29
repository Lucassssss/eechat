<script setup>
import { computed } from 'vue'
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css"
import rehypeRaw from "rehype-raw"
import rehypeStringify from "rehype-stringify"
import remarkRehype from "remark-rehype"
import rehypeHighlight from "rehype-highlight"
import remarkDirective from 'remark-directive'
import { unified } from "unified"
import "highlight.js/styles/atom-one-dark.css"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"


const props = defineProps({
  content: {
    type: String,
    default: ''
  },
})

// 使用 remark 处理 Markdown
const processor = unified()
  .use(remarkParse) // 解析 Markdown
  .use(remarkDirective)
  .use(remarkGfm) // 支持 GFM (GitHub Flavored Markdown)
  .use(remarkMath) // 支持数学公式
  .use(remarkRehype, { allowDangerousHtml: true }) // 转换为 HTML，允许原始 HTML
  .use(rehypeRaw) // 处理原始 HTML
  .use(rehypeHighlight) // 代码高亮
  .use(rehypeKatex) // 渲染数学公式
  .use(rehypeStringify) // 输出 HTML 字符串

// 处理 Markdown 内容
const processedContent = computed(() => {
  if (!props.content) return "";
  return processor.processSync(props.content).toString();
})
</script>

<template>
  <ScrollArea class="h-full">
    <div class="markdown-content">
      <div v-html="processedContent"></div>
    </div>
  </ScrollArea>
</template>

<style scoped>
/* 添加代码块样式控制 */
:deep(pre) {
  max-width: 100%;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0.75rem 0;
  border-radius: 0.375rem;
}

:deep(code) {
  max-width: 100%;
  word-break: break-all;
  white-space: pre-wrap;
  font-size: 13px;
  line-height: 1.6;
}

/* 表格样式 */
:deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 1rem 0;
}

:deep(th),
:deep(td) {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

/* 添加无序列表样式 */
:deep(ul) {
  list-style-type: none;
  padding-left: 0;
}

:deep(ul li) {
  position: relative;
  padding-left: 2.5em;
  margin: 0.5em 0;
}

:deep(ul li::before) {
  content: "•";
  position: absolute;
  left: 1em;
  color: #666;
  font-weight: bold;
}

:deep(ul ul li::before) {
  content: "◦";
}

:deep(ul ul ul li::before) {
  content: "▪";
}

/* 暗黑模式支持 */
:root[class~="dark"] :deep(ul li::before) {
  color: #999;
}

/* 添加有序列表样式 */
:deep(ol) {
  counter-reset: item;
  list-style-type: none;
  padding-left: 0;
}

:deep(ol li) {
  counter-increment: item;
  position: relative;
  padding-left: 2.5em;
  margin: 0.5em 0;
}

:deep(ol li:before) {
  content: counter(item) ".";
  position: absolute;
  left: 0.8em;
  color: #666;
  font-weight: 500;
}

/* 支持多级有序列表 */
:deep(ol ol) {
  margin-left: 1em;
}

:deep(ol ol li:before) {
  content: counter(item, lower-alpha) ".";
}

:deep(ol ol ol li:before) {
  content: counter(item, lower-roman) ".";
}

/* 暗黑模式支持 */
:root[class~="dark"] :deep(ol li:before) {
  color: #999;
}

/* 调整列表项间距 */
:deep(li p) {
  margin: 0.3em 0;
}

/* 确保列表内的代码块正确对齐 */
:deep(li pre) {
  margin: 1em 0;
}

/* 暗黑模式表格样式 */
:root[class~="dark"] :deep(th) {
  background-color: #333;
}

:root[class~="dark"] :deep(td),
:root[class~="dark"] :deep(th) {
  border-color: #444;
}

:root[class~="dark"] :deep(tr:nth-child(even)) {
  background-color: #2a2a2a !important;
}

/* 链接样式 */
:deep(a) {
  color: #0070f3;
  text-decoration: none;
}

:deep(a:hover) {
  text-decoration: underline;
}

:root[class~="dark"] :deep(a) {
  color: #3291ff;
}

/* 标题样式 */
:deep(h1), :deep(h2), :deep(h3), :deep(h4), :deep(h5), :deep(h6) {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-weight: 600;
}

:deep(h1) {
  font-size: 1.5em;
}

:deep(h2) {
  font-size: 1.3em;
}

:deep(h3) {
  font-size: 1.2em;
}

:deep(h4) {
  font-size: 1.1em;
}

/* 引用样式 */
:deep(blockquote) {
  border-left: 4px solid #ddd;
  padding-left: 1em;
  margin-left: 0;
  color: #666;
}

:root[class~="dark"] :deep(blockquote) {
  border-left-color: #444;
  color: #aaa;
}

/* 水平线样式 */
:deep(hr) {
  border: none;
  border-top: 1px solid #ddd;
  margin: 1.5em 0;
}

:root[class~="dark"] :deep(hr) {
  border-top-color: #444;
}

/* 图片样式 */
:deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}
</style>