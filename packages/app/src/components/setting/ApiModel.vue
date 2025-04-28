<script setup lang="ts">
import { ref, reactive, onMounted, defineProps, watch, computed  } from "vue"
import { useI18n } from "vue-i18n"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useModelStore } from "@/stores/model"
import AddCustomModel from "@/components/setting/AddCustomModel.vue"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/toast/use-toast"
import { Toaster } from "@/components/ui/toast"
import Icon from "@/components/Icon.vue"
import { llmApi } from "@/api/request"
import type {
  LLMProvider,
  LLMModel,
  LLMModelArray,
  APIConfig,
  ProviderConfig,
Model,
} from "@/types/llm"
import { ProviderConfig as ProviderConfigNew } from '@/types/provider'
import { Loader2, Check, EyeClosed, Eye, Plus, Trash2, EllipsisVertical } from "lucide-vue-next"
import { Switch } from "@/components/ui/switch"
import { useEnvStore } from "@/stores/env"
const envStore = useEnvStore()

// 定义props接收providerId
const props = defineProps({
  providerId: {
    type: String,
    default: "",
  },
})

const { toast } = useToast()
const { t } = useI18n()
const testLoading = ref(false)
const saveLoading = ref(false)
const testPassed = reactive<Record<string, boolean>>({
  openai: false,
  anthropic: false,
  deepseek: false,
})
const modelStore = useModelStore()

// 添加当前选中的提供商
const currentProvider = ref("deepseek")

// const providers = ref<Record<string, LLMProvider>>({})
const providers = computed(() => {
  return Object.fromEntries(
    [...modelStore.providers]
    .filter(([key, value]) => {
      return value.type == 'api'
    })
    .sort(([keyA, valueA], [keyB, valueB]) => {
        // 首先按照 sort 字段升序排序
      if ((valueA.sort || 0) !== (valueB.sort || 0)) {
        return (valueA.sort || 0) - (valueB.sort || 0);
      }
      // 然后按照 updated_at 字段倒序排序（新的在前）
      const aTime = valueA.updated_at ? new Date(valueA.updated_at).getTime() : 0;
      const bTime = valueB.updated_at ? new Date(valueB.updated_at).getTime() : 0;
      return bTime - aTime;
    })
  )
})

// API 模型配置状态
const currentModel = computed(() => {
  return modelStore.providers.get(currentProvider.value)
})

const apiConfig = reactive<APIConfig>({
  apiKey: currentModel.value?.api_key || "",
  baseUrl: currentModel.value?.api_url || "",
  config: {},
  state: false,
  info: {},
})
watch(() => [currentProvider.value, currentModel], async (newVal) => {
  if (newVal) {
    apiConfig.apiKey = currentModel.value?.api_key || ""
    apiConfig.baseUrl = currentModel.value?.api_url || ""
    apiConfig.state = currentModel.value?.state || false
    apiConfig.info = {}
  }
}, { immediate: true, deep: true  })

// 测试连接
async function testConnection(provider: string) {
  testLoading.value = true
  try {
    const config: ProviderConfig = {
      models: _flattenModels(models.value),
      apiKey: apiConfig.apiKey,
      baseUrl: apiConfig.baseUrl,
      state: apiConfig.state,
    }
    const model = currentCheckModelObject.value
    const res = await llmApi.testConnection(provider, config, model)
    if (res) {
      testPassed[provider] = true
      await llmApi.saveConfigProvider(provider, config)
      toast({
        title: t('settings.apiModel.connectionSuccess'),
        description: t('settings.apiModel.connectionSuccessDesc'),
      })
    }
  } catch (error: any) {
    testPassed[provider] = false
    toast({
      title: t('settings.apiModel.connectionFailed'),
      description: error.message,
      variant: "destructive",
    })
  } finally {
    testLoading.value = false
  }
}

// 获取提供商列表
const defaultProvider = "deepseek"
async function getProviders(refresh) {
  await modelStore.fetchProvidersAndModels()
  const providersAndModels = modelStore.providers
  if (props.providerId && providersAndModels[props.providerId]) {
    handleProviderChange(props.providerId, providersAndModels[props.providerId])
  } else if (refresh) {
    handleProviderChange(defaultProvider, providersAndModels[defaultProvider])
  }
}

// 监听providerId变化
watch(
  () => props.providerId,
  (newVal) => {
    debugger
    if (newVal && providers.value && providers.value[newVal]) {
      handleProviderChange(newVal, providers.value[newVal])
    }
  }
)

// 组件挂载时初始化
onMounted(() => {
  getProviders(true)
})

const handleProviderChange = async (provider: string, value) => {
  currentProvider.value = provider
  getModels()
  // 查询配置
  // const res = await getConfigProvider()
  // if (res) {
  //   apiConfig.apiKey = res.api_key
  //   apiConfig.baseUrl = res.base_url
  //   apiConfig.state = res.state ? true : false
  // } else {
  //   apiConfig.apiKey = ""
  //   apiConfig.baseUrl = value.api.url
  //   apiConfig.state = value.state
  // }
  // apiConfig.info = value
  // console.log(apiConfig)
}

// const modelsArray = ref<LLMModel[]>([])
const modelsArray = computed(() => {
  const modelsList = modelStore.providers.get(currentProvider.value)?.models || [];
  return modelsList
})
// const models = ref({})

// 新增，使用全局数据
const models = computed(() => {
  const modelsList = modelStore.providers.get(currentProvider.value)?.models || [];
  const groupedModels = {};
  
  // 先对模型列表进行排序
  const sortedModels = [...modelsList].sort((a, b) => {
    // 1. 本地模型优先级最高
    if ( modelStore.providers.get(a.provider_id)?.type === 'local' &&  modelStore.providers.get(b.provider_id)?.type !== 'local') return -1;
    if ( modelStore.providers.get(a.provider_id)?.type !== 'local' &&  modelStore.providers.get(b.provider_id)?.type === 'local') return 1;
    
    // 2. 按照 sort 字段升序排序
    if ((a.sort || 0) !== (b.sort || 0)) {
      return (a.sort || 0) - (b.sort || 0);
    }
    
    // 3. 按照 created_at 字段倒序排序（新的在前）
    const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
    const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
    return bTime - aTime; // 倒序排列，最新的在前面
  });
  
  // 然后按组名分组
  sortedModels.forEach((item) => {
    if (!groupedModels[item.group_name]) {
      groupedModels[item.group_name] = [];
    }
    groupedModels[item.group_name].push(item);
  });
  
  return groupedModels;
})
const currentCheckModel = ref("")
const getModels = async () => {
  await modelStore.fetchProvidersAndModels()
  const models_cache = modelStore.providers.get(currentProvider.value)
  const models = models_cache?.models || []
  
  if(models.length > 0) {
    currentCheckModel.value = models[0]?.id as string
    currentCheckModelObject.value = models[0]
  }
  // const data = {}
  // modelsArray.value = res
  // currentCheckModel.value = res[0]?.id
  // currentCheckModelObject.value = res[0]
  // res.forEach((item) => {
  //   if (!data[item.group_name]) {
  //     data[item.group_name] = []
  //   }
  //   if (typeof item.apiKey == "undefined") item.apiKey = ""
  //   data[item.group_name].push(item)
  // })
  // console.log(data)
  // models.value = data
}

// 模型配置
const getConfigProvider = async () => {
  const res = await llmApi.getConfigProvider(currentProvider.value)
  return res
}

// 更新提供商是否开启
const saveConfigProviderState = async (state: boolean) => {
  const config: ProviderConfig = {
    apiKey: apiConfig.apiKey,
    baseUrl: apiConfig.baseUrl,
    state,
    models: _flattenModels(models.value),
  }
  config.models?.forEach((item: any) => {
    if (item && typeof item === "object") {
      item.model_id = item.id
    }
  })
  const res = await llmApi.saveConfigProviderState(currentProvider.value, config)
  modelStore.updateProviderState(currentProvider.value, state)

  getProviders(false)
}

// 更新模型是否开启
const saveConfigModelState = async (
  state: boolean,
  models: Record<string, LLMModel[]>,
  modelItem: LLMModel
) => {
  const flattenedModels = _flattenModels(models)
  const config = {
    state,
    models: flattenedModels,
  }
  const model_id = modelItem.id
  // @ts-ignore
  const res = await llmApi.saveConfigModelState(model_id, config)
  console.log(res)
  getModels()
}

// 展开 Models 数据
const _flattenModels = (models: Record<string, LLMModel[]>): LLMModel[] => {
  const result: LLMModel[] = []
  for (const key in models) {
    if (models.hasOwnProperty(key)) {
      result.push(...models[key])
    }
  }
  return result
}

const currentCheckModelObject = ref<Model>()
const handleCurrentCheckModelUpdate = (modelId: string) => {
  const selectedModel = modelsArray.value.find((model) => model.id === modelId)
  currentCheckModelObject.value = selectedModel
}

const isShowApiKey = ref(false)
const toggleShowApiKey = () => {
  isShowApiKey.value = !isShowApiKey.value
}

// 添加自定义供应商
const newProviderForm = reactive<ProviderConfigNew>({
  provider_id: '',
  api_key: '',
  base_url: '',
  state: true,
})
const showAddProviderDialog = ref(false)
const addProvider = async () => {
  if (!newProviderForm.provider_id) {
    toast({
      title: "请填写必要信息",
      description: "供应商不能为空，如 openai",
      variant: "destructive",
    })
    return
  }
  
  try {
    saveLoading.value = true
    const res = await llmApi.addProvider({
      ...newProviderForm
    })
    currentProvider.value = newProviderForm.provider_id
    toast({
      title: "添加成功",
      description: `供应商 ${newProviderForm.provider_id} 已添加`,
    })
    showAddProviderDialog.value = false
    resetNewProviderForm()
    modelStore.fetchProvidersAndModels()
  } catch (error: any) {
    toast({
      title: "添加失败",
      description: error.message,
      variant: "destructive",
    })
  } finally {
    saveLoading.value = false
  }
}
const resetNewProviderForm = () => {
  newProviderForm.provider_id = ''
  newProviderForm.api_key = ''
  newProviderForm.base_url = ''
  newProviderForm.state = true
}

// 删除供应商相关
const showDeleteConfirm = ref(false)
const deleteProvider = async () => {
  try {
    saveLoading.value = true
    await modelStore.deleteProvider(currentProvider.value)
    toast({
      title: "删除成功",
      description: `供应商 ${currentProvider.value} 已删除`,
    })
    showDeleteConfirm.value = false
    // 重新获取供应商列表
    await modelStore.fetchProvidersAndModels()
    // 如果有其他供应商，选择第一个
    const providerKeys = Object.keys(providers.value)
    if (providerKeys.length > 0) {
      handleProviderChange(providerKeys[0], providers.value[providerKeys[0]])
    }
  } catch (error: any) {
    toast({
      title: "删除失败",
      description: error.message,
      variant: "destructive",
    })
  } finally {
    saveLoading.value = false
  }
}

const currentEditModel = ref(null)

// 编辑模型方法
const editModel = (model) => {
  currentEditModel.value = model
}

// 刷新模型列表
const refreshModels = async () => {
  // 重置编辑模型
  currentEditModel.value = null
  // 刷新模型列表的逻辑
  // ... existing code ...
}

// 删除模型相关
const showDeleteModelConfirm = ref(false)
const modelToDelete = ref(null)

const confirmDeleteModel = (model) => {
  modelToDelete.value = model
  showDeleteModelConfirm.value = true
}

const deleteModel = async () => {
  try {
    saveLoading.value = true
    if (!modelToDelete.value) return
    // @ts-ignore
    await llmApi.deleteModel(modelToDelete.value.id)
    
    toast({
      title: t('common.delete') + t('common.success', '成功'),
      description: t('settings.apiModel.deleteModelSuccess', '模型已成功删除'),
    })
    
    // 刷新模型列表
    await getModels()
    showDeleteModelConfirm.value = false
    modelToDelete.value = null
  } catch (error: any) {
    toast({
      title: t('common.delete') + t('common.failed', '失败'),
      description: error.message,
      variant: "destructive",
    })
  } finally {
    saveLoading.value = false
  }
}
</script>

<template>
  <div class="h-full">
    <Toaster />
    <div class="flex h-full">
      <!-- 左侧 Sidebar -->
      <div class="w-[180px] border-r">
        <div class="flex justify-between items-center mb-4 pr-4">
          <div class="font-bold ml-2">{{ t('settings.apiModel.modelProvider') }}</div>
          <Dialog v-model:open="showAddProviderDialog">
            <DialogTrigger asChild>
              <Button size="sm" variant="outline"><Plus></Plus>新增</Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>添加新供应商</DialogTitle>
                <DialogDescription>
                  添加自定义的 LLM 供应商，填写必要的配置信息。
                </DialogDescription>
              </DialogHeader>
              <div class="grid gap-4 space-y-4">
                <div class="grid grid-cols-4 items-center gap-4 ">
                  <Label class="text-right" for="provider-id">供应商 ID</Label>
                  <Input
                    id="provider-id"
                    v-model="newProviderForm.provider_id"
                    placeholder="例如: openai, anthropic"
                    class="col-span-3"
                  />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label class="text-right" for="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    v-model="newProviderForm.api_key"
                    type="password"
                    placeholder="sk-..."
                    class="col-span-3"
                  />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label class="text-right" for="base-url">API URL</Label>
                  <Input
                    id="base-url"
                    v-model="newProviderForm.base_url"
                    placeholder="https://api.example.com"
                    class="col-span-3"
                  />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label class="text-right" for="state">启用状态</Label>
                  <div class="col-span-3 flex items-center">
                    <Switch id="state" v-model="newProviderForm.state" />
                    <span class="ml-2">{{ newProviderForm.state ? '启用' : '禁用' }}</span>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" @click="showAddProviderDialog = false">取消</Button>
                <Button :disabled="saveLoading" @click="addProvider">
                  <Loader2 v-if="saveLoading" class="mr-2 h-4 w-4 animate-spin" />
                  {{ saveLoading ? '添加中...' : '添加' }}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <ScrollArea class="h-[calc(100vh-8rem)] pr-4" :class="!envStore.isWeb ? 'h-[calc(100dvh-80px-30px-60px)]' : 'h-[calc(100dvh-80px-60px)]'">
          <div class="space-y-2">
            <div
              v-for="(value, provider) in providers"
              :key="provider"
              @click="handleProviderChange(String(provider), value)"
              class="flex items-center justify-between space-x-2 p-2 rounded-lg cursor-pointer"
              :class="{ 'bg-slate-100 dark:bg-slate-800': currentProvider === provider }"
            >
              <div>
                <div
                  class="w-1.5 h-1.5 rounded-full"
                  :class="(value as any).state ? 'bg-green-400' : ''">
                </div>
              </div>
              <div class="flex-1 flex items-center space-x-2">
                <Icon :name="String(provider)" :size="24" />
                <span>{{ provider }}</span>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      <!-- 右侧配置区域 -->
      <div class="flex-1 flex flex-col h-full">
        <div v-if="currentProvider" class="flex flex-col h-full p-4 pt-0">
          <!-- 头部 -->
          <div class="flex justify-between items-center mb-4 border-b pb-4">
            <div class="font-bold flex items-center space-x-2">
              <Icon :name="currentProvider" :size="24" />
              <span>{{ currentProvider }}</span>
            </div>
            <div class="flex space-x-2 items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Switch
                      v-model="providers[currentProvider].state"
                      @update:model-value="saveConfigProviderState"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{{ t('settings.apiModel.enableProvider') }}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <EllipsisVertical class="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem @click="showDeleteConfirm = true">
                    <Trash2 class="mr-2 h-4 w-4 text-red-500" />
                    <span>删除供应商</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <!-- <Button :disabled="testLoading" @click="testConnection(currentProvider)">
                <Loader2 v-if="testLoading" class="mr-2 h-4 w-4 animate-spin" />
                <CheckCircle2 v-else-if="testPassed[currentProvider]" class="mr-1 h-4 w-4 text-green-500" />
                {{ testLoading ? '测试中...' : '测试连接' }}
              </Button> -->
              <!-- <Button :disabled="saveLoading" @click="saveConfig(currentProvider)">
                <Loader2 v-if="saveLoading" class="mr-2 h-4 w-4 animate-spin" />
                {{ saveLoading ? '保存中...' : '保存配置' }}
              </Button> -->
            </div>
          </div>

          <!-- 配置表单 -->
          <div class="space-y-4">
            <Label class="text-zinc-500">{{ t('settings.apiModel.modelConfig') }}</Label>
            <div class="grid gap-2">
              <Label class="font-bold">API Key</Label>
              <div class="flex items-center space-x-2">
                <Input
                  v-model="apiConfig.apiKey"
                  :type="isShowApiKey? 'text' : 'password'"
                  :placeholder="`sk-${currentProvider === 'anthropic' ? 'ant-' : ''}...`"
                />
                <Button @click="toggleShowApiKey" size="icon" variant="outline" class="w-10"> 
                  <EyeClosed v-if="isShowApiKey" />
                  <Eye v-else/>
                </Button>
              </div>
            </div>

            <div class="grid gap-2">
              <Label class="font-bold">API URL</Label>
              <Input
                v-model="apiConfig.baseUrl"
                :placeholder="`https://api.${currentProvider}.com${
                  currentProvider === 'openai' ? '/v1' : ''
                }`"
              />
            </div>
            <div class="grid gap-2">
              <Label class="text-zinc-500">{{ t('settings.apiModel.connectivityCheck') }}</Label>
              <div class="flex items-center space-x-2">
                <Select
                  class="w-full flex-1"
                  v-model="currentCheckModel"
                  @update:modelValue="handleCurrentCheckModelUpdate"
                >
                  <SelectTrigger class="w-full flex-1">
                    <SelectValue :placeholder="t('settings.apiModel.selectModelToTest')" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="item in modelsArray" :value="String(item.id)" :key="item.id">
                      {{ item.name }}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  :disabled="testLoading || !apiConfig.apiKey || !apiConfig.baseUrl"
                  @click="testConnection(currentProvider)"
                >
                  <Loader2 v-if="testLoading" class="mr-2 h-4 w-4 animate-spin" />
                  <Check
                    v-else-if="testPassed[currentProvider]"
                    class="mr-1 h-4 w-4 text-green-500"
                  />
                  {{ testLoading ? t('settings.apiModel.testing') : t('settings.apiModel.testConnection') }}
                </Button>
              </div>
            </div>
          </div>

          <!-- 模型列表 -->
          <div class="flex-1 pt-6 min-h-0 overflow-hidden">
            <div class="flex items-center space-x-2">
              <Label class="text-zinc-500">{{ t('settings.apiModel.availableModels') }}</Label>
              <AddCustomModel @refresh="getModels()" :provider_id="currentProvider" :edit-model="null" ></AddCustomModel>
            </div>
            <ScrollArea class="h-full w-full rounded-md pb-8" :class="!envStore.isWeb ? 'h-[calc(100dvh-430px-30px)]' : 'h-[calc(100dvh-430px)]' ">
              <div v-for="(group, key) in models" :key="key" class="space-y-1">
                <!-- 组标题 -->
                <div class="flex items-center space-x-2 pt-6">
                  <div class="text-zinc-500 text-xs">{{ key }}</div>
                </div>

                <!-- 组内模型 -->
                <div class="flex flex-col mt-0 border rounded-md">
                  <div
                    v-for="model in group"
                    :key="
                      //@ts-ignore
                      model.name
                    "
                    class="flex flex-col space-y-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 group/item border-b"
                  >
                    <div class="flex items-center space-x-2 justify-between">
                      <div class="flex items-center space-x-2">
                        <Icon
                          :name="
                            //@ts-ignore
                            model.provider_id
                          "
                          :size="24"
                        />
                        <div class="font-medium">
                          {{
                            //@ts-ignore
                            model.name
                          }}
                        </div>
                      </div>
                      <div class="flex space-x-2 items-center">
                        <AddCustomModel class="group/edit invisible group-hover/item:visible" @refresh="getModels()" :provider_id="currentProvider" :editButton="true" :edit-model="model" ></AddCustomModel>
                        <Button @click="confirmDeleteModel(model)" class="group/edit invisible group-hover/item:visible" size="icon" variant="ghost"> <Trash2 class="text-zinc-500"/> </Button>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Switch
                                v-model="
                                  //@ts-ignore
                                  model.state
                                "
                                @update:model-value="
                                  //@ts-ignore
                                  saveConfigModelState($event, models, model)
                                "
                              >
                              </Switch>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{{ t('settings.apiModel.enableModel') }}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <div class="flex space-x-2">
                      <template v-if="(model as any).capabilities">
                        <Badge variant="outline" v-for="capability in (model as any).capabilities" :key="capability">
                          {{ capability }}
                        </Badge>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
    <!-- 删除确认对话框 -->
    <Dialog v-model:open="showDeleteConfirm">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>确认删除</DialogTitle>
          <DialogDescription>
            您确定要删除供应商 "{{ currentProvider }}" 吗？此操作无法撤销，相关的所有模型配置也将被删除。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" @click="showDeleteConfirm = false">取消</Button>
          <Button variant="destructive" :disabled="saveLoading" @click="deleteProvider">
            <Loader2 v-if="saveLoading" class="mr-2 h-4 w-4 animate-spin" />
            {{ saveLoading ? '删除中...' : '确认删除' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <!-- 删除模型确认对话框 -->
    <Dialog v-model:open="showDeleteModelConfirm">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{{ t('common.confirmDelete', '确认删除') }}</DialogTitle>
          <DialogDescription>
            <!-- {{ t('settings.apiModel.confirmDeleteModelDesc', '确定要删除模型 {model} 吗？此操作不可撤销。', { model: modelToDelete?.name }) }} -->
            {{ t('settings.apiModel.confirmDeleteModelDesc', '确定要删除模型吗？此操作不可撤销。') }}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" @click="showDeleteModelConfirm = false">{{ t('common.cancel', '取消') }}</Button>
          <Button variant="destructive" :disabled="saveLoading" @click="deleteModel">
            <Loader2 v-if="saveLoading" class="mr-2 h-4 w-4 animate-spin" />
            {{ t('common.delete', '删除') }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  gap: 0.5rem;
}
</style>
