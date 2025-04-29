// 自定义 Updater 类型
type Updater<T> = T | ((prev: T) => T)
import type { Ref } from 'vue'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function valueUpdater<T extends Updater<any>>(
  updaterOrValue: T,
  ref: Ref,
) {
  ref.value =
    typeof updaterOrValue === 'function'
      ? updaterOrValue(ref.value)
      : updaterOrValue
}

const ICON_MAP = {
  'deepseek-r1': 'deepseek',
  'deepseek-coder': 'deepseek',
  'deepseek-v2': 'deepseek',
  'deepseek-v3': 'deepseek',
  qwen: 'qwen',
  qwen2: 'qwen',
  'qwen2.5': 'qwen',
  'qwen2.5-coder': 'qwen',
  phi: 'microsoft',
  phi3: 'microsoft',
  'phi3.5': 'microsoft',
  phi4: 'microsoft',
  llama3: 'meta',
  'llama3.1': 'meta',
  'llama3.2': 'meta',
  'llama3.3': 'meta',
  llama2: 'meta',
  mistral: 'mistral',
  mixtral: 'mistral',
  codellama: 'meta',
  gemma: 'google',
  gemma2: 'google',
  openchat: 'openchat',
  falcon: 'tii',
  vicuna: 'lmsys',
  'wizard-vicuna': 'lmsys',
  'stable-beluga': 'stability',
  stablelm2: 'stability',
} as const

// 获取图标名称
export function getIconName(modelName: string): string {
  const name = modelName.toLowerCase()

  // 1. 直接匹配
  if (ICON_MAP[name]) {
    return ICON_MAP[name]
  }

  // 2. 前缀匹配
  for (const [key, value] of Object.entries(ICON_MAP)) {
    if (name.startsWith(key)) {
      return value
    }
  }

  // 3. 获取首字母作为备选
  // 先分割名称,比如 'deepseek-r1' => ['deepseek', 'r1']
  const parts = modelName.split(/[-_\s]/)
  // 获取第一个有效部分的首字母
  const firstChar = parts[0]?.charAt(0)?.toLowerCase() || 'x'

  return firstChar
}

// 将参数量转换为文件大小
export function modelSizeToGB(size: string): string {
  // 提取数字和单位
  const dNum = 0.73
  const match = size.match(/(\d+(?:\.\d+)?)([bm]+)/)
  if (!match) return 'Unknown'

  const [_, num, unit] = match
  const number = parseFloat(num)

  // 根据单位转换
  switch (unit.toLowerCase()) {
    case 'b': // billion
      return `${(number * dNum).toFixed(1)}GB`
    case 'm': // million
      return `${((number * dNum) / 1000).toFixed(1)}GB`
    default:
      return 'Unknown'
  }
}
