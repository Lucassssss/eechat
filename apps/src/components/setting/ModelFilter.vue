// src/components/setting/ModelFilter.vue
<script setup lang="ts">
import { ref, computed, watchEffect } from "vue"
import { useI18n } from "vue-i18n"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-vue-next"
import { useOllamaStore } from "@/stores/ollama"

const { t } = useI18n()

const ollamaStore = useOllamaStore()

// 定义筛选选项类型
export type FilterOption = "all" | "installed" | "llm" | "vision" | "embedding" | "tools"

// Props 接口定义
interface Props {
  modelValue: FilterOption[]
  searchQuery: string
}

const props = defineProps<Props>()
const emits = defineEmits<{
  (e: "update:modelValue", value: FilterOption[]): void
  (e: "update:searchQuery", value: string): void
  (e: "update:filteredModels", value: any[]): void
}>()

// 筛选逻辑保持不变
const filteredModels = computed(() => {
  const query = props.searchQuery.toLowerCase().trim()
  let filtered = ollamaStore.allModels

  if (!props.modelValue.includes("all")) {
    filtered = filtered
      .map((item) => {
        const filteredItem = { ...item }

        if (props.modelValue.includes("installed")) {
          filteredItem.sizes = item.sizes.filter((size) =>
            ollamaStore.isModelInstalled(`${item.name}:${size}`)
          )
        }

        const capabilities = new Set([...item.capabilities, "llm"])

        const capabilityFilters = props.modelValue.filter((f) => f !== "installed")

        if (capabilityFilters.length > 0) {
          const hasAllCapabilities = capabilityFilters.every((filter) =>
            capabilities.has(filter)
          )
          if (!hasAllCapabilities) {
            filteredItem.sizes = []
          }
        }

        return filteredItem
      })
      .filter((item) => item.sizes.length > 0)
  }

  if (query) {
    filtered = filtered
      .map((item) => {
        const filteredItem = { ...item }
        filteredItem.sizes = item.sizes.filter((size) => {
          const nameMatch = item.name.toLowerCase().includes(query)
          const sizeMatch =
            size.toLowerCase() === query ||
            size.replace(/[bm]/i, "") === query.replace(/[bm]/i, "")
          const capabilitiesMatch = [...item.capabilities, "llm"].some((cap) =>
            cap.toLowerCase().includes(query)
          )
          return nameMatch || sizeMatch || capabilitiesMatch
        })
        return filteredItem
      })
      .filter((item) => item.sizes.length > 0)
  }

  return filtered
})

// 监听过滤结果变化
watchEffect(() => {
  emits("update:filteredModels", filteredModels.value)
})

// 处理筛选变化
const handleFilterChange = (values: FilterOption[]) => {
  // single select
  // emits("update:modelValue", values)
  // multiple select
  let val: FilterOption[] = []
  if (values[values.length - 1] === "all") {
    val = ["all"]
  } else if (values.length > 0 && values.includes("all")) {
    val = values.filter((v) => v !== "all")
  } else {
    val = values
  }
  emits("update:modelValue", val)
}

// 处理搜索变化
const handleSearchChange = (value: string) => {
  emits("update:searchQuery", value)
}
</script>

<template>
  <div class="flex space-x-2 justify-between">
    <ToggleGroup
      type="multiple"
      variant="outline"
      size="sm"
      :model-value="modelValue"
      @update:model-value="(values) => handleFilterChange(values as FilterOption[])"
    >
      <ToggleGroupItem value="all">{{ t('settings.modelFilter.popular') }}</ToggleGroupItem>
      <ToggleGroupItem value="installed">{{ t('settings.modelFilter.installed') }}</ToggleGroupItem>
      <ToggleGroupItem value="llm">LLM</ToggleGroupItem>
      <ToggleGroupItem value="vision">Vision</ToggleGroupItem>
      <ToggleGroupItem value="embedding">Embedding</ToggleGroupItem>
      <ToggleGroupItem value="tools">Tools</ToggleGroupItem>
    </ToggleGroup>

    <div class="relative max-w-sm items-center flex justify-end w-[220px] pr-[1px]">
      <Input
        id="search"
        type="text"
        :model-value="searchQuery"
        @update:model-value="(payload: string | number) => handleSearchChange(payload.toString())"
        :placeholder="t('settings.modelFilter.searchPlaceholder')"
        class="pl-10 w-[220px]"
      />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <Search class="size-6 text-muted-foreground" />
      </span>
    </div>
  </div>
</template>
