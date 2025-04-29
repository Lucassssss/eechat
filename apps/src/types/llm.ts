export interface LLMProvider {
  id: string
  name: string
  state: boolean
  api_url: string
  official_url?: string
  api_key_url?: string
  docs_url?: string
  models_url?: string
  description?: string
}

export interface LLMModel {
  id: string
  name: string
  provider_id: string
  group_name: string
  state: boolean
  sort?: number
  apiKey?: string
  from?: 'config'
  model_id?: string
  type?: string
}

export interface LLMModelArray {
  [key: string]: LLMModel | undefined
}

export interface APIConfig {
  apiKey: string
  baseUrl: string
  config: Record<string, any>
  state: boolean
  info: Partial<{
    name: string
    api: {
      url: string
    }
    websites: {
      official: string
      apiKey: string
      docs: string
      models: string
    }
  }>
}

export interface ProviderConfig {
  apiKey: string
  baseUrl: string
  state: boolean
  models?: LLMModel[]
}

export interface Model {
  id?: string,
  provider_id: string,
  state: boolean,
  from?: 'config' | 'common',
  name: string,
  capabilities: string[],
  group_name: string,
  sort?: number,
  created_at?: string,
  updated_at?: string,
  deleted_at?: string | null
}

export interface ModelProvider {
  id: string,
  name: string,
  icon: string,
  type: 'api' | 'local',
  api_key?: string,
  from?: 'config' | 'common',
  description: string,
  api_url?: string,
  official_url?: string,
  api_key_url?: string,
  docs_url?: string,
  models_url?: string,
  state: boolean,
  sort?: number,
  created_at?: string,
  updated_at?: string,
  deleted_at?: string | null,
  models: Model[]
}

export type ModelCapability = '工具调用' | '推理' | '视觉' | '联网' | '嵌入' | '重排';

export type ModelCapabilityValue = 
  'llm' | 
  'text_embedding' | 
  'rerank' | 
  'speech2text' | 
  'tts' | 
  'moderation' | 
  'vision' | 
  'tools';

export interface ModelCapabilityLabel {
  en: string;
  zh: string;
}

export interface ModelCapabilityDescription {
  en: string;
  zh: string;
}

export interface ModelCapabilityItem {
  value: ModelCapabilityValue;
  label: ModelCapabilityLabel;
  description: ModelCapabilityDescription;
}

export const MODEL_CAPABILITIES: ModelCapabilityItem[] = [
  { 
    value: "llm", 
    label: { en: "LLM", zh: "推理" }, 
    description: { 
      en: "General LLM capabilities for dialogue, Q&A, and text generation.", 
      zh: "系统推理模型，用于对话、问答、文本生成等。" 
    } 
  }, 
  { 
    value: "vision", 
    label: { en: "Vision", zh: "视觉" }, 
    description: { 
      en: "Image understanding and generation for multimodal tasks.", 
      zh: "视觉模型，用于图像理解、生成与多模态处理。" 
    } 
  }, 
  { 
    value: "tools", 
    label: { en: "Tools", zh: "工具调用" }, 
    description: { 
      en: "Invoke external APIs or functions to extend capabilities.", 
      zh: "工具调用能力，通过调用外部 API、函数或插件实现任务自动化。" 
    } 
  },
  { 
    value: "text_embedding", 
    label: { en: "Embedding", zh: "嵌入" }, 
    description: { 
      en: "Generate vector representations for similarity search and RAG.", 
      zh: "文本 Embedding 模型，用于生成向量表示，实现相似度检索与 RAG 等场景。" 
    } 
  }, 
  { 
    value: "speech2text", 
    label: { en: "Speech-to-Text", zh: "语音转文字" }, 
    description: { 
      en: "Convert spoken audio into text for transcription use cases.", 
      zh: "将语音输入转换为文本输出，用于客服、会议记录等场景。" 
    } 
  }, 
  { 
    value: "tts", 
    label: { en: "Text-to-Speech", zh: "文字转语音" }, 
    description: { 
      en: "Synthesize natural-sounding speech from text.", 
      zh: "将文本输入转换为语音输出，用于语音播报、无障碍阅读等场景。" 
    } 
  }, 
  { 
    value: "moderation", 
    label: { en: "Moderation", zh: "审查" }, 
    description: { 
      en: "Detect and filter inappropriate or sensitive content.", 
      zh: "内容审查模型，用于检测与过滤不当或敏感内容。" 
    } 
  }, 
  { 
    value: "rerank", 
    label: { en: "Rerank", zh: "重排序" }, 
    description: { 
      en: "Re-rank retrieved candidates with a deeper semantic model.", 
      zh: "Rerank 模型，用于对检索结果进行精排，提升相关性。" 
    } 
  }
];
