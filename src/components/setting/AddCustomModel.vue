<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue"
import { useI18n } from "vue-i18n"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/toast/use-toast"
import { Plus, Loader2, Edit } from "lucide-vue-next"
import { llmApi } from "@/api/request"
import type { Model } from "@/types/llm"
import { MODEL_CAPABILITIES } from '@/types/llm'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'


const { t, locale} = useI18n()
const { toast } = useToast()
const isOpen = ref(false)
const isLoading = ref(false)
const currentLang = computed(() => locale.value)

const props = defineProps({
  provider_id: {
    type: String,
    default: '',
  },
  editModel: {
    type: Object as () => Model | null,
    default: null
  },
  editButton: {
    type: Boolean,
    default: false
  }
})

const isEditMode = computed(() => !!props.editModel)
const dialogTitle = computed(() => isEditMode.value ? t('settings.apiModel.editModel', '编辑模型') : t('settings.apiModel.addModel', '新增模型'))
const dialogDescription = computed(() => isEditMode.value ? t('settings.apiModel.editModelDesc', '编辑自定义模型') : t('settings.apiModel.addModelDesc', '新增自定义模型'))
const buttonText = computed(() => isEditMode.value ? t('common.update', '更新') : t('common.save', '保存'))

// 表单数据 - 按照 Model 类型定义
const formData = reactive<Model>({
  id: "",
  provider_id: props.provider_id,
  state: true,
  name: "",
  group_name: "",
  capabilities: ['llm']
})

watch(() => props.editModel, (model) => {
  if (model) {
    formData.provider_id = model.provider_id || props.provider_id
    formData.state = model.state !== undefined ? model.state : true
    formData.name = model.name || ""
    formData.group_name = model.group_name || ""
    formData.capabilities = model.capabilities || ['llm']
    formData.id = model.id || ""
  }
}, { immediate: true })

watch(() => formData.id, (newId) => {
  if (newId && newId.length > 0 && formData.name.toLocaleLowerCase() != newId.toLocaleLowerCase() && !isEditMode.value) {
    const firstChar = newId.charAt(0).toUpperCase();
    const restChars = newId.substring(1);
    formData.name = firstChar + restChars;
  }
})

// 重置表单
const resetForm = () => {
  if (isEditMode.value && props.editModel) {
    // 编辑模式下，重置为原始编辑数据
    formData.id = props.editModel.id?.split(props.editModel.provider_id + ':')[1]
    formData.provider_id = props.editModel.provider_id || props.provider_id
    formData.state = props.editModel.state !== undefined ? props.editModel.state : true
    formData.name = props.editModel.name || ""
    formData.group_name = props.editModel.group_name || ""
    formData.capabilities = props.editModel.capabilities || ['llm']
  } else {
    // 添加模式下，重置为默认值
    formData.provider_id = props.provider_id
    formData.state = true
    formData.id = ""
    formData.name = ""
    formData.group_name = ""
    formData.capabilities = ['llm']
  }
}
// 提交表单
const handleSubmit = async () => {
  if (!formData.name) {
    toast({
      title: t('settings.apiModel.formError'),
      description: t('settings.apiModel.formErrorDesc'),
      variant: "destructive",
    })
    return
  }

  try {
    isLoading.value = true
    
    // 构建 API 请求数据
    const requestData = {
      ...formData,
    }

    // 根据模式调用不同的 API
    if (isEditMode.value) {
      // 编辑模式：调用更新 API
      await llmApi.updateModel(requestData)
      
      toast({
        title: t('settings.apiModel.updateSuccess', '更新成功'),
        description: t('settings.apiModel.updateSuccessDesc', '模型已成功更新'),
      })
    } else {
      // 添加模式：调用添加 API
      await llmApi.addModel(requestData)
      
      // toast({
      //   title: t('settings.apiModel.addSuccess'),
      //   description: t('settings.apiModel.addSuccessDesc'),
      // })
    }
    
    // 关闭对话框并重置表单
    isOpen.value = false
    resetForm()
    
    // 触发刷新
    emit('refresh')
  } catch (error: any) {
    toast({
      title: isEditMode.value 
        ? t('settings.apiModel.updateFailed', '更新失败') 
        : t('settings.apiModel.addFailed', '添加失败'),
      description: error.message,
      variant: "destructive",
    })
  } finally {
    isLoading.value = false
  }
}

// 定义事件
const emit = defineEmits(['refresh'])

// 打开对话框
const openDialog = () => {
  resetForm()
  isOpen.value = true
}

// 切换能力选择
function toggleCapability(capability) {
  const index = formData.capabilities.indexOf(capability)
if (index === -1) {
    formData.capabilities.push(capability)
  } else {
    formData.capabilities.splice(index, 1)
  }
}
</script>

<template>
  <div>
    <Dialog v-model:open="isOpen">
      <DialogTrigger as-child>
        <Button v-if="editButton" size="icon" variant="ghost" @click="openDialog"> 
          <Edit class="text-zinc-500" />
        </Button>
        <Button v-else variant="outline" size="sm" @click="openDialog">
          <Plus class="h-4 w-4" />
          {{ t('settings.apiModel.addCustomModelDialog.titleAdd') }}
        </Button>
      </DialogTrigger>

      <DialogContent class="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {{ isEditMode ? t('settings.apiModel.addCustomModelDialog.titleEdit') : t('settings.apiModel.addCustomModelDialog.titleAdd') }}
          </DialogTitle>
          <DialogDescription>
            {{ isEditMode ? t('settings.apiModel.addCustomModelDialog.descEdit') : t('settings.apiModel.addCustomModelDialog.descAdd') }}
          </DialogDescription>
        </DialogHeader>

        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label class="text-right" for="id">{{ t('settings.apiModel.addCustomModelDialog.modelId') }}</Label>
            <Input id="id" v-model="formData.id" class="col-span-3" />
          </div>

          <div class="grid grid-cols-4 items-center gap-4">
            <Label class="text-right" for="name">{{ t('settings.apiModel.addCustomModelDialog.modelName') }}</Label>
            <Input id="name" v-model="formData.name" class="col-span-3" />
          </div>

          <div class="grid grid-cols-4 items-center gap-4">
            <Label class="text-right" for="group_name">{{ t('settings.apiModel.addCustomModelDialog.groupName') }}</Label>
            <Input id="group_name" v-model="formData.group_name" class="col-span-3" />
          </div>

          <div class="grid grid-cols-4 gap-4 mt-2">
            <Label class="text-right">{{ t('settings.apiModel.addCustomModelDialog.capabilities') }}</Label>
            <div class="space-y-3 col-span-3">
              <div
                v-for="capability in MODEL_CAPABILITIES"
                :key="capability.value"
                class="flex items-center space-x-2"
              >
                <Checkbox
                  :id="capability.value"
                  :model-value="formData.capabilities.includes(capability.value)"
                  @update:model-value="toggleCapability(capability.value)"
                />
                <label :for="capability.value" class="w-full text-sm font-medium leading-none">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger as-child>
                        <span>
                          {{
                            capability.label[
                              currentLang.toLowerCase().startsWith('zh') ? 'zh' : 'en'
                            ]
                          }} ({{ capability.value }})
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {{
                            capability.description[
                              currentLang.toLowerCase().startsWith('zh') ? 'zh' : 'en'
                            ]
                          }}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" @click="isOpen = false">
            {{ t('common.cancel') }}
          </Button>
          <Button type="submit" @click="handleSubmit" :disabled="isLoading">
            <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
            {{
              isEditMode
                ? t('settings.apiModel.addCustomModelDialog.update')
                : t('settings.apiModel.addCustomModelDialog.save')
            }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>