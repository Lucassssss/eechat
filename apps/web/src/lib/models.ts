export const modelsData = [
  {
    name: 'qwq',
    description: 'QwQ is the reasoning model of the Qwen series.',
    capabilities: ['tools'],
    sizes: ['32b'],
    stats: {
      pulls: '208k',
      tags: '8',
      lastUpdated: '2 weeks ago',
    },
  },
  {
    name: 'deepseek-r1',
    description:
      "DeepSeek's first-generation of reasoning models with comparable performance to OpenAI-o1, including six dense models distilled from DeepSeek-R1 based on Llama and Qwen.",
    capabilities: [],
    sizes: ['1.5b', '7b', '8b', '14b', '32b', '70b', '671b'],
    stats: {
      pulls: '21.1M',
      tags: '29',
      lastUpdated: '2 weeks ago',
    },
  },
  {
    name: 'llama3.3',
    description:
      'New state of the art 70B model. Llama 3.3 70B offers similar performance compared to the Llama 3.1 405B model.',
    capabilities: ['tools'],
    sizes: ['70b'],
    stats: {
      pulls: '1.4M',
      tags: '14',
      lastUpdated: '2 months ago',
    },
  },
  {
    name: 'phi4',
    description:
      'Phi-4 is a 14B parameter, state-of-the-art open model from Microsoft.',
    capabilities: [],
    sizes: ['14b'],
    stats: {
      pulls: '782K',
      tags: '5',
      lastUpdated: '7 weeks ago',
    },
  },
  {
    name: 'llama3.2',
    description: "Meta's Llama 3.2 goes small with 1B and 3B models.",
    capabilities: ['tools'],
    sizes: ['1b', '3b'],
    stats: {
      pulls: '9.5M',
      tags: '63',
      lastUpdated: '5 months ago',
    },
  },
  {
    name: 'llama3.1',
    description:
      'Llama 3.1 is a new state-of-the-art model from Meta available in 8B, 70B and 405B parameter sizes.',
    capabilities: ['tools'],
    sizes: ['8b', '70b', '405b'],
    stats: {
      pulls: '25.1M',
      tags: '93',
      lastUpdated: '2 months ago',
    },
  },
  {
    name: 'nomic-embed-text',
    description:
      'A high-performing open embedding model with a large token context window.',
    capabilities: ['embedding'],
    sizes: [],
    stats: {
      pulls: '17.3M',
      tags: '3',
      lastUpdated: '12 months ago',
    },
  },
  {
    name: 'mistral',
    description: 'The 7B model released by Mistral AI, updated to version 0.3.',
    capabilities: ['tools'],
    sizes: ['7b'],
    stats: {
      pulls: '9.5M',
      tags: '84',
      lastUpdated: '7 months ago',
    },
  },
  {
    name: 'llama3',
    description: 'Meta Llama 3: The most capable openly available LLM to date',
    capabilities: [],
    sizes: ['8b', '70b'],
    stats: {
      pulls: '7.5M',
      tags: '68',
      lastUpdated: '9 months ago',
    },
  },
  {
    name: 'qwen2.5',
    description:
      "Qwen2.5 models are pretrained on Alibaba's latest large-scale dataset, encompassing up to 18 trillion tokens. The model supports up to 128K tokens and has multilingual support.",
    capabilities: ['tools'],
    sizes: ['0.5b', '1.5b', '3b', '7b', '14b', '32b', '72b'],
    stats: {
      pulls: '4.7M',
      tags: '133',
      lastUpdated: '5 months ago',
    },
  },
  {
    name: 'qwen',
    description:
      'Qwen 1.5 is a series of large language models by Alibaba Cloud spanning from 0.5B to 110B parameters',
    capabilities: [],
    sizes: ['0.5b', '1.8b', '4b', '7b', '14b', '32b', '72b', '110b'],
    stats: {
      pulls: '4.4M',
      tags: '379',
      lastUpdated: '10 months ago',
    },
  },
  {
    name: 'gemma',
    description:
      'Gemma is a family of lightweight, state-of-the-art open models built by Google DeepMind. Updated to version 1.1',
    capabilities: [],
    sizes: ['2b', '7b'],
    stats: {
      pulls: '4.3M',
      tags: '102',
      lastUpdated: '10 months ago',
    },
  },
  {
    name: 'qwen2',
    description:
      'Qwen2 is a new series of large language models from Alibaba group',
    capabilities: ['tools'],
    sizes: ['0.5b', '1.5b', '7b', '72b'],
    stats: {
      pulls: '4.1M',
      tags: '97',
      lastUpdated: '5 months ago',
    },
  },
  {
    name: 'qwen2.5-coder',
    description:
      'The latest series of Code-Specific Qwen models, with significant improvements in code generation, code reasoning, and code fixing.',
    capabilities: ['tools'],
    sizes: ['0.5b', '1.5b', '3b', '7b', '14b', '32b'],
    stats: {
      pulls: '3.7M',
      tags: '196',
      lastUpdated: '3 months ago',
    },
  },
  {
    name: 'llava',
    description:
      '🌋 LLaVA is a novel end-to-end trained large multimodal model that combines a vision encoder and Vicuna for general-purpose visual and language understanding. Updated to version 1.6.',
    capabilities: ['vision'],
    sizes: ['7b', '13b', '34b'],
    stats: {
      pulls: '3.6M',
      tags: '98',
      lastUpdated: '13 months ago',
    },
  },
  {
    name: 'gemma2',
    description:
      'Google Gemma 2 is a high-performing and efficient model available in three sizes: 2B, 9B, and 27B.',
    capabilities: [],
    sizes: ['2b', '9b', '27b'],
    stats: {
      pulls: '3M',
      tags: '94',
      lastUpdated: '6 months ago',
    },
  },
  {
    name: 'llama2',
    description:
      'Llama 2 is a collection of foundation language models ranging from 7B to 70B parameters.',
    capabilities: [],
    sizes: ['7b', '13b', '70b'],
    stats: {
      pulls: '3M',
      tags: '102',
      lastUpdated: '14 months ago',
    },
  },
  {
    name: 'phi3',
    description:
      'Phi-3 is a family of lightweight 3B (Mini) and 14B (Medium) state-of-the-art open models by Microsoft.',
    capabilities: [],
    sizes: ['3.8b', '14b'],
    stats: {
      pulls: '2.9M',
      tags: '72',
      lastUpdated: '7 months ago',
    },
  },
  {
    name: 'codellama',
    description:
      'A large language model that can use text prompts to generate and discuss code.',
    capabilities: [],
    sizes: ['7b', '13b', '34b', '70b'],
    stats: {
      pulls: '1.8M',
      tags: '199',
      lastUpdated: '7 months ago',
    },
  },
  {
    name: 'mxbai-embed-large',
    description: 'State-of-the-art large embedding model from mixedbread.ai',
    capabilities: ['embedding'],
    sizes: ['335m'],
    stats: {
      pulls: '1.6M',
      tags: '4',
      lastUpdated: '9 months ago',
    },
  },
  {
    name: 'llama3.2-vision',
    description:
      'Llama 3.2 Vision is a collection of instruction-tuned image reasoning generative models in 11B and 90B sizes.',
    capabilities: ['vision'],
    sizes: ['11b', '90b'],
    stats: {
      pulls: '1.4M',
      tags: '9',
      lastUpdated: '3 months ago',
    },
  },
  {
    name: 'tinyllama',
    description:
      'The TinyLlama project is an open endeavor to train a compact 1.1B Llama model on 3 trillion tokens.',
    capabilities: [],
    sizes: ['1.1b'],
    stats: {
      pulls: '1.3M',
      tags: '36',
      lastUpdated: '14 months ago',
    },
  },
  {
    name: 'mistral-nemo',
    description:
      'A state-of-the-art 12B model with 128k context length, built by Mistral AI in collaboration with NVIDIA.',
    capabilities: ['tools'],
    sizes: ['12b'],
    stats: {
      pulls: '1.2M',
      tags: '17',
      lastUpdated: '6 months ago',
    },
  },
  {
    name: 'starcoder2',
    description:
      'StarCoder2 is the next generation of transparently trained open code LLMs that comes in three sizes: 3B, 7B and 15B parameters.',
    capabilities: [],
    sizes: ['3b', '7b', '15b'],
    stats: {
      pulls: '890.4K',
      tags: '67',
      lastUpdated: '5 months ago',
    },
  },
  {
    name: 'snowflake-arctic-embed',
    description:
      'A suite of text embedding models by Snowflake, optimized for performance.',
    capabilities: ['embedding'],
    sizes: ['22m', '33m', '110m', '137m', '335m'],
    stats: {
      pulls: '693.6K',
      tags: '16',
      lastUpdated: '10 months ago',
    },
  },
  {
    name: 'deepseek-coder-v2',
    description:
      'An open-source Mixture-of-Experts code language model that achieves performance comparable to GPT4-Turbo in code-specific tasks.',
    capabilities: [],
    sizes: ['16b', '236b'],
    stats: {
      pulls: '692.8K',
      tags: '64',
      lastUpdated: '5 months ago',
    },
  },
  {
    name: 'deepseek-v3',
    description:
      'A strong Mixture-of-Experts (MoE) language model with 671B total parameters with 37B activated for each token.',
    capabilities: [],
    sizes: ['671b'],
    stats: {
      pulls: '670.9K',
      tags: '5',
      lastUpdated: '6 weeks ago',
    },
  },
  {
    name: 'llama2-uncensored',
    description: 'Uncensored Llama 2 model by George Sung and Jarrad Hope.',
    capabilities: [],
    sizes: ['7b', '70b'],
    stats: {
      pulls: '597K',
      tags: '34',
      lastUpdated: '16 months ago',
    },
  },
  {
    name: 'deepseek-coder',
    description:
      'DeepSeek Coder is a capable coding model trained on two trillion code and natural language tokens.',
    capabilities: [],
    sizes: ['1.3b', '6.7b', '33b'],
    stats: {
      pulls: '577.8K',
      tags: '102',
      lastUpdated: '14 months ago',
    },
  },
  {
    name: 'mixtral',
    description:
      'A set of Mixture of Experts (MoE) model with open weights by Mistral AI in 8x7b and 8x22b parameter sizes.',
    capabilities: ['tools'],
    sizes: ['8x7b', '8x22b'],
    stats: {
      pulls: '571K',
      tags: '70',
      lastUpdated: '2 months ago',
    },
  },
  {
    name: 'dolphin-mixtral',
    description:
      'Uncensored, 8x7b and 8x22b fine-tuned models based on the Mixtral mixture of experts models that excels at coding tasks. Created by Eric Hartford.',
    capabilities: [],
    sizes: ['8x7b', '8x22b'],
    stats: {
      pulls: '515.5K',
      tags: '70',
      lastUpdated: '2 months ago',
    },
  },
  {
    name: 'codegemma',
    description:
      'CodeGemma is a collection of powerful, lightweight models that can perform a variety of coding tasks like fill-in-the-middle code completion, code generation, natural language understanding, mathematical reasoning, and instruction following.',
    capabilities: [],
    sizes: ['2b', '7b'],
    stats: {
      pulls: '503.7K',
      tags: '85',
      lastUpdated: '7 months ago',
    },
  },
  {
    name: 'openthinker',
    description:
      'A fully open-source family of reasoning models built using a dataset derived by distilling DeepSeek-R1.',
    capabilities: [],
    sizes: ['7b', '32b'],
    stats: {
      pulls: '503K',
      tags: '9',
      lastUpdated: '2 weeks ago',
    },
  },
  {
    name: 'phi',
    description:
      'Phi-2: a 2.7B language model by Microsoft Research that demonstrates outstanding reasoning and language understanding capabilities.',
    capabilities: [],
    sizes: ['2.7b'],
    stats: {
      pulls: '492.2K',
      tags: '18',
      lastUpdated: '13 months ago',
    },
  },
  {
    name: 'bge-m3',
    description:
      'BGE-M3 is a new model from BAAI distinguished for its versatility in Multi-Functionality, Multi-Linguality, and Multi-Granularity.',
    capabilities: ['embedding'],
    sizes: ['567m'],
    stats: {
      pulls: '470.8K',
      tags: '3',
      lastUpdated: '6 months ago',
    },
  },
  {
    name: 'minicpm-v',
    description:
      'A series of multimodal LLMs (MLLMs) designed for vision-language understanding.',
    capabilities: ['vision'],
    sizes: ['8b'],
    stats: {
      pulls: '392.9K',
      tags: '17',
      lastUpdated: '3 months ago',
    },
  },
  {
    name: 'llava-llama3',
    description:
      'A LLaVA model fine-tuned from Llama 3 Instruct with better scores in several benchmarks.',
    capabilities: ['vision'],
    sizes: ['8b'],
    stats: {
      pulls: '372.6K',
      tags: '4',
      lastUpdated: '9 months ago',
    },
  },
  {
    name: 'wizardlm2',
    description:
      'State of the art large language model from Microsoft AI with improved performance on complex chat, multilingual, reasoning and agent use cases.',
    capabilities: [],
    sizes: ['7b', '8x22b'],
    stats: {
      pulls: '354.8K',
      tags: '22',
      lastUpdated: '10 months ago',
    },
  },
  {
    name: 'dolphin-mistral',
    description:
      'The uncensored Dolphin model based on Mistral that excels at coding tasks. Updated to version 2.8.',
    capabilities: [],
    sizes: ['7b'],
    stats: {
      pulls: '321.9K',
      tags: '120',
      lastUpdated: '11 months ago',
    },
  },
  {
    name: 'all-minilm',
    description: 'Embedding models on very large sentence level datasets.',
    capabilities: ['embedding'],
    sizes: ['22m', '33m'],
    stats: {
      pulls: '300.6K',
      tags: '10',
      lastUpdated: '9 months ago',
    },
  },
  {
    name: 'smollm2',
    description:
      'SmolLM2 is a family of compact language models available in three size: 135M, 360M, and 1.7B parameters.',
    capabilities: ['tools'],
    sizes: ['135m', '360m', '1.7b'],
    stats: {
      pulls: '294.5K',
      tags: '49',
      lastUpdated: '3 months ago',
    },
  },
  {
    name: 'dolphin-llama3',
    description:
      'Dolphin 2.9 is a new model with 8B and 70B sizes by Eric Hartford based on Llama 3 that has a variety of instruction, conversational, and coding skills.',
    capabilities: [],
    sizes: ['8b', '70b'],
    stats: {
      pulls: '286.7K',
      tags: '53',
      lastUpdated: '9 months ago',
    },
  },
  {
    name: 'command-r',
    description:
      'Command R is a Large Language Model optimized for conversational interaction and long context tasks.',
    capabilities: ['tools'],
    sizes: ['35b'],
    stats: {
      pulls: '280.9K',
      tags: '32',
      lastUpdated: '6 months ago',
    },
  },
  {
    name: 'orca-mini',
    description:
      'A general-purpose model ranging from 3 billion parameters to 70 billion, suitable for entry-level hardware.',
    capabilities: [],
    sizes: ['3b', '7b', '13b', '70b'],
    stats: {
      pulls: '275.1K',
      tags: '119',
      lastUpdated: '16 months ago',
    },
  },
  {
    name: 'yi',
    description: 'Yi 1.5 is a high-performing, bilingual language model.',
    capabilities: [],
    sizes: ['6b', '9b', '34b'],
    stats: {
      pulls: '265.5K',
      tags: '174',
      lastUpdated: '9 months ago',
    },
  },
  {
    name: 'hermes3',
    description:
      'Hermes 3 is the latest version of the flagship Hermes series of LLMs by Nous Research',
    capabilities: ['tools'],
    sizes: ['3b', '8b', '70b', '405b'],
    stats: {
      pulls: '260.2K',
      tags: '65',
      lastUpdated: '2 months ago',
    },
  },
  {
    name: 'dolphin3',
    description:
      'Dolphin 3.0 Llama 3.1 8B 🐬 is the next generation of the Dolphin series of instruct-tuned models designed to be the ultimate general purpose local model, enabling coding, math, agentic, function calling, and general use cases.',
    capabilities: [],
    sizes: ['8b'],
    stats: {
      pulls: '247.4K',
      tags: '5',
      lastUpdated: '7 weeks ago',
    },
  },
  {
    name: 'phi3.5',
    description:
      'A lightweight AI model with 3.8 billion parameters with performance overtaking similarly and larger sized models.',
    capabilities: [],
    sizes: ['3.8b'],
    stats: {
      pulls: '244.4K',
      tags: '17',
      lastUpdated: '5 months ago',
    },
  },
  {
    name: 'zephyr',
    description:
      'Zephyr is a series of fine-tuned versions of the Mistral and Mixtral models that are trained to act as helpful assistants.',
    capabilities: [],
    sizes: ['7b', '141b'],
    stats: {
      pulls: '236.9K',
      tags: '40',
      lastUpdated: '10 months ago',
    },
  },
  {
    name: 'codestral',
    description:
      'Codestral is Mistral AI’s first-ever code model designed for code generation tasks.',
    capabilities: [],
    sizes: ['22b'],
    stats: {
      pulls: '221.1K',
      tags: '17',
      lastUpdated: '5 months ago',
    },
  },
  {
    name: 'mistral-small',
    description:
      'Mistral Small 3 sets a new benchmark in the “small” Large Language Models category below 70B.',
    capabilities: ['tools'],
    sizes: ['22b', '24b'],
    stats: {
      pulls: '218.6K',
      tags: '21',
      lastUpdated: '3 weeks ago',
    },
  },
  {
    name: 'olmo2',
    description:
      'OLMo 2 is a new family of 7B and 13B models trained on up to 5T tokens. These models are on par with or better than equivalently sized fully open models, and competitive with open-weight models such as Llama 3.1 on English academic benchmarks.',
    capabilities: [],
    sizes: ['7b', '13b'],
    stats: {
      pulls: '216.7K',
      tags: '9',
      lastUpdated: '6 weeks ago',
    },
  },
  {
    name: 'granite-code',
    description:
      'A family of open foundation models by IBM for Code Intelligence',
    capabilities: [],
    sizes: ['3b', '8b', '20b', '34b'],
    stats: {
      pulls: '188.4K',
      tags: '162',
      lastUpdated: '5 months ago',
    },
  },
  {
    name: 'starcoder',
    description:
      'StarCoder is a code generation model trained on 80+ programming languages.',
    capabilities: [],
    sizes: ['1b', '3b', '7b', '15b'],
    stats: {
      pulls: '185.9K',
      tags: '100',
      lastUpdated: '16 months ago',
    },
  },
  {
    name: 'smollm',
    description:
      '🪐 A family of small models with 135M, 360M, and 1.7B parameters, trained on a new high-quality dataset.',
    capabilities: [],
    sizes: ['135m', '360m', '1.7b'],
    stats: {
      pulls: '180K',
      tags: '94',
      lastUpdated: '6 months ago',
    },
  },
  {
    name: 'wizard-vicuna-uncensored',
    description:
      'Wizard Vicuna Uncensored is a 7B, 13B, and 30B parameter model based on Llama 2 uncensored by Eric Hartford.',
    capabilities: [],
    sizes: ['7b', '13b', '30b'],
    stats: {
      pulls: '179.3K',
      tags: '49',
      lastUpdated: '16 months ago',
    },
  },
  {
    name: 'vicuna',
    description:
      'General use chat model based on Llama and Llama 2 with 2K to 16K context sizes.',
    capabilities: [],
    sizes: ['7b', '13b', '33b'],
    stats: {
      pulls: '175K',
      tags: '111',
      lastUpdated: '16 months ago',
    },
  },
  {
    name: 'mistral-openorca',
    description:
      'Mistral OpenOrca is a 7 billion parameter model, fine-tuned on top of the Mistral 7B model using the OpenOrca dataset.',
    capabilities: [],
    sizes: ['7b'],
    stats: {
      pulls: '166.2K',
      tags: '17',
      lastUpdated: '16 months ago',
    },
  },
  {
    name: 'qwq',
    description:
      'QwQ is an experimental research model focused on advancing AI reasoning capabilities.',
    capabilities: ['tools'],
    sizes: ['32b'],
    stats: {
      pulls: '162.2K',
      tags: '5',
      lastUpdated: '2 months ago',
    },
  },
  {
    name: 'llama2-chinese',
    description:
      'Llama 2 based model fine tuned to improve Chinese dialogue ability.',
    capabilities: [],
    sizes: ['7b', '13b'],
    stats: {
      pulls: '149K',
      tags: '35',
      lastUpdated: '16 months ago',
    },
  },
  {
    name: 'openchat',
    description:
      'A family of open-source models trained on a wide variety of data, surpassing ChatGPT on various benchmarks. Updated to version 3.5-0106.',
    capabilities: [],
    sizes: ['7b'],
    stats: {
      pulls: '143.3K',
      tags: '50',
      lastUpdated: '13 months ago',
    },
  },
  {
    name: 'codegeex4',
    description:
      'A versatile model for AI software development scenarios, including code completion.',
    capabilities: [],
    sizes: ['9b'],
    stats: {
      pulls: '137.8K',
      tags: '17',
      lastUpdated: '7 months ago',
    },
  },
  {
    name: 'aya',
    description:
      'Aya 23, released by Cohere, is a new family of state-of-the-art, multilingual models that support 23 languages.',
    capabilities: [],
    sizes: ['8b', '35b'],
    stats: {
      pulls: '134.5K',
      tags: '33',
      lastUpdated: '9 months ago',
    },
  },
  {
    name: 'codeqwen',
    description:
      'CodeQwen1.5 is a large language model pretrained on a large amount of code data.',
    capabilities: [],
    sizes: ['7b'],
    stats: {
      pulls: '130.1K',
      tags: '30',
      lastUpdated: '8 months ago',
    },
  },
  {
    name: 'deepseek-llm',
    description:
      'An advanced language model crafted with 2 trillion bilingual tokens.',
    capabilities: [],
    sizes: ['7b', '67b'],
    stats: {
      pulls: '129.2K',
      tags: '64',
      lastUpdated: '14 months ago',
    },
  },
  {
    name: 'mistral-large',
    description:
      "Mistral Large 2 is Mistral's new flagship model that is significantly more capable in code generation, mathematics, and reasoning with 128k context window and support for dozens of languages.",
    capabilities: ['tools'],
    sizes: ['123b'],
    stats: {
      pulls: '123.1K',
      tags: '32',
      lastUpdated: '3 months ago',
    },
  },
  {
    name: 'deepseek-v2',
    description:
      'A strong, economical, and efficient Mixture-of-Experts language model.',
    capabilities: [],
    sizes: ['16b', '236b'],
    stats: {
      pulls: '123.1K',
      tags: '34',
      lastUpdated: '8 months ago',
    },
  },
  {
    name: 'glm4',
    description:
      'A strong multi-lingual general language model with competitive performance to Llama 3.',
    capabilities: [],
    sizes: ['9b'],
    stats: {
      pulls: '121.3K',
      tags: '32',
      lastUpdated: '7 months ago',
    },
  },
  {
    name: 'nous-hermes2',
    description:
      'The powerful family of models by Nous Research that excels at scientific discussion and coding tasks.',
    capabilities: [],
    sizes: ['10.7b', '34b'],
    stats: {
      pulls: '121.3K',
      tags: '33',
      lastUpdated: '14 months ago',
    },
  },
  {
    name: 'stable-code',
    description:
      'Stable Code 3B is a coding model with instruct and code completion variants on par with models such as Code Llama 7B that are 2.5x larger.',
    capabilities: [],
    sizes: ['3b'],
    stats: {
      pulls: '120.4K',
      tags: '36',
      lastUpdated: '11 months ago',
    },
  },
  {
    name: 'openhermes',
    description:
      'OpenHermes 2.5 is a 7B model fine-tuned by Teknium on Mistral with fully open datasets.',
    capabilities: [],
    sizes: [],
    stats: {
      pulls: '120.1K',
      tags: '35',
      lastUpdated: '14 months ago',
    },
  },
  {
    name: 'qwen2-math',
    description:
      'Qwen2 Math is a series of specialized math language models built upon the Qwen2 LLMs, which significantly outperforms the mathematical capabilities of open-source models and even closed-source models (e.g., GPT4o).',
    capabilities: [],
    sizes: ['1.5b', '7b', '72b'],
    stats: {
      pulls: '118.9K',
      tags: '52',
      lastUpdated: '6 months ago',
    },
  },
  {
    name: 'command-r-plus',
    description:
      'Command R+ is a powerful, scalable large language model purpose-built to excel at real-world enterprise use cases.',
    capabilities: ['tools'],
    sizes: ['104b'],
    stats: {
      pulls: '118.8K',
      tags: '21',
      lastUpdated: '6 months ago',
    },
  },
  {
    name: 'tinydolphin',
    description:
      'An experimental 1.1B parameter model trained on the new Dolphin 2.8 dataset by Eric Hartford and based on TinyLlama.',
    capabilities: [],
    sizes: ['1.1b'],
    stats: {
      pulls: '118.7K',
      tags: '18',
      lastUpdated: '13 months ago',
    },
  },
  {
    name: 'wizardcoder',
    description: 'State-of-the-art code generation model',
    capabilities: [],
    sizes: ['33b'],
    stats: {
      pulls: '116.2K',
      tags: '67',
      lastUpdated: '13 months ago',
    },
  },
  {
    name: 'moondream',
    description:
      'moondream2 is a small vision language model designed to run efficiently on edge devices.',
    capabilities: ['vision'],
    sizes: ['1.8b'],
    stats: {
      pulls: '109.8K',
      tags: '18',
      lastUpdated: '9 months ago',
    },
  },
  {
    name: 'bakllava',
    description:
      'BakLLaVA is a multimodal model consisting of the Mistral 7B base model augmented with the LLaVA  architecture.',
    capabilities: ['vision'],
    sizes: ['7b'],
    stats: {
      pulls: '108.3K',
      tags: '17',
      lastUpdated: '14 months ago',
    },
  },
  {
    name: 'stablelm2',
    description:
      'Stable LM 2 is a state-of-the-art 1.6B and 12B parameter language model trained on multilingual data in English, Spanish, German, Italian, French, Portuguese, and Dutch.',
    capabilities: [],
    sizes: ['1.6b', '12b'],
    stats: {
      pulls: '107K',
      tags: '84',
      lastUpdated: '9 months ago',
    },
  },
  {
    name: 'neural-chat',
    description:
      'A fine-tuned model based on Mistral with good coverage of domain and language.',
    capabilities: [],
    sizes: ['7b'],
    stats: {
      pulls: '103.4K',
      tags: '50',
      lastUpdated: '14 months ago',
    },
  },
  {
    name: 'reflection',
    description:
      'A high-performing model trained with a new technique called Reflection-tuning that teaches a LLM to detect mistakes in its reasoning and correct course.',
    capabilities: [],
    sizes: ['70b'],
    stats: {
      pulls: '103K',
      tags: '17',
      lastUpdated: '5 months ago',
    },
  },
  {
    name: 'wizard-math',
    description: 'Model focused on math and logic problems',
    capabilities: [],
    sizes: ['7b', '13b', '70b'],
    stats: {
      pulls: '99.9K',
      tags: '64',
      lastUpdated: '14 months ago',
    },
  },
  {
    name: 'llama3-gradient',
    description:
      "This model extends LLama-3 8B's context length from 8k to over 1m tokens.",
    capabilities: [],
    sizes: ['8b', '70b'],
    stats: {
      pulls: '97.4K',
      tags: '35',
      lastUpdated: '9 months ago',
    },
  },
  {
    name: 'llama3-chatqa',
    description:
      'A model from NVIDIA based on Llama 3 that excels at conversational question answering (QA) and retrieval-augmented generation (RAG).',
    capabilities: [],
    sizes: ['8b', '70b'],
    stats: {
      pulls: '95.5K',
      tags: '35',
      lastUpdated: '9 months ago',
    },
  },
  {
    name: 'sqlcoder',
    description:
      'SQLCoder is a code completion model fined-tuned on StarCoder for SQL generation tasks',
    capabilities: [],
    sizes: ['7b', '15b'],
    stats: {
      pulls: '91.5K',
      tags: '48',
      lastUpdated: '13 months ago',
    },
  },
  {
    name: 'bge-large',
    description: 'Embedding model from BAAI mapping texts to vectors.',
    capabilities: ['embedding'],
    sizes: ['335m'],
    stats: {
      pulls: '84.2K',
      tags: '3',
      lastUpdated: '6 months ago',
    },
  },
  {
    name: 'xwinlm',
    description:
      'Conversational model based on Llama 2 that performs competitively on various benchmarks.',
    capabilities: [],
    sizes: ['7b', '13b'],
    stats: {
      pulls: '83.9K',
      tags: '80',
      lastUpdated: '16 months ago',
    },
  },
  {
    name: 'dolphincoder',
    description:
      'A 7B and 15B uncensored variant of the Dolphin model family that excels at coding, based on StarCoder2.',
    capabilities: [],
    sizes: ['7b', '15b'],
    stats: {
      pulls: '83.1K',
      tags: '35',
      lastUpdated: '10 months ago',
    },
  },
  {
    name: 'nous-hermes',
    description:
      'General use models based on Llama and Llama 2 from Nous Research.',
    capabilities: [],
    sizes: ['7b', '13b'],
    stats: {
      pulls: '81.8K',
      tags: '63',
      lastUpdated: '16 months ago',
    },
  },
  {
    name: 'phind-codellama',
    description: 'Code generation model based on Code Llama.',
    capabilities: [],
    sizes: ['34b'],
    stats: {
      pulls: '80.9K',
      tags: '49',
      lastUpdated: '14 months ago',
    },
  },
  {
    name: 'llava-phi3',
    description: 'A new small LLaVA model fine-tuned from Phi 3 Mini.',
    capabilities: ['vision'],
    sizes: ['3.8b'],
    stats: {
      pulls: '78.9K',
      tags: '4',
      lastUpdated: '9 months ago',
    },
  },
  {
    name: 'yarn-llama2',
    description:
      'An extension of Llama 2 that supports a context of up to 128k tokens.',
    capabilities: [],
    sizes: ['7b', '13b'],
    stats: {
      pulls: '78.4K',
      tags: '67',
      lastUpdated: '16 months ago',
    },
  },
  {
    name: 'solar',
    description:
      'A compact, yet powerful 10.7B large language model designed for single-turn conversation.',
    capabilities: [],
    sizes: ['10.7b'],
    stats: {
      pulls: '78.3K',
      tags: '32',
      lastUpdated: '14 months ago',
    },
  },
  {
    name: 'granite3.1-dense',
    description:
      'The IBM Granite 2B and 8B models are text-only dense LLMs trained on over 12 trillion tokens of data, demonstrated significant improvements over their predecessors in performance and speed in IBM’s initial testing.',
    capabilities: ['tools'],
    sizes: ['2b', '8b'],
    stats: {
      pulls: '77.7K',
      tags: '33',
      lastUpdated: '5 weeks ago',
    },
  },
  {
    name: 'starling-lm',
    description:
      'Starling is a large language model trained by reinforcement learning from AI feedback focused on improving chatbot helpfulness.',
    capabilities: [],
    sizes: ['7b'],
    stats: {
      pulls: '77K',
      tags: '36',
      lastUpdated: '11 months ago',
    },
  },
  {
    name: 'athene-v2',
    description:
      'Athene-V2 is a 72B parameter model which excels at code completion, mathematics, and log extraction tasks.',
    capabilities: ['tools'],
    sizes: ['72b'],
    stats: {
      pulls: '76.1K',
      tags: '17',
      lastUpdated: '3 months ago',
    },
  },
  {
    name: 'wizardlm',
    description: 'General use model based on Llama 2.',
    capabilities: [],
    sizes: [],
    stats: {
      pulls: '75.6K',
      tags: '73',
      lastUpdated: '16 months ago',
    },
  },
  {
    name: 'yi-coder',
    description:
      'Yi-Coder is a series of open-source code language models that delivers state-of-the-art coding performance with fewer than 10 billion parameters.',
    capabilities: [],
    sizes: ['1.5b', '9b'],
    stats: {
      pulls: '75.6K',
      tags: '67',
      lastUpdated: '5 months ago',
    },
  },
  {
    name: 'internlm2',
    description:
      'InternLM2.5 is a 7B parameter model tailored for practical scenarios with outstanding reasoning capability.',
    capabilities: [],
    sizes: ['1m', '1.8b', '7b', '20b'],
    stats: {
      pulls: '72.7K',
      tags: '65',
      lastUpdated: '6 months ago',
    },
  },
  {
    name: 'samantha-mistral',
    description:
      'A companion assistant trained in philosophy, psychology, and personal relationships. Based on Mistral.',
    capabilities: [],
    sizes: ['7b'],
    stats: {
      pulls: '72K',
      tags: '49',
      lastUpdated: '16 months ago',
    },
  },
  {
    name: 'falcon',
    description:
      'A large language model built by the Technology Innovation Institute (TII) for use in summarization, text generation, and chat bots.',
    capabilities: [],
    sizes: ['7b', '40b', '180b'],
    stats: {
      pulls: '69.2K',
      tags: '38',
      lastUpdated: '16 months ago',
    },
  },
  {
    name: 'nemotron-mini',
    description:
      'A commercial-friendly small language model by NVIDIA optimized for roleplay, RAG QA, and function calling.',
    capabilities: ['tools'],
    sizes: ['4b'],
    stats: {
      pulls: '67.5K',
      tags: '17',
      lastUpdated: '5 months ago',
    },
  },
  {
    name: 'nemotron',
    description:
      'Llama-3.1-Nemotron-70B-Instruct is a large language model customized by NVIDIA to improve the helpfulness of LLM generated responses to user queries.',
    capabilities: ['tools'],
    sizes: ['70b'],
    stats: {
      pulls: '65.9K',
      tags: '17',
      lastUpdated: '4 months ago',
    },
  },
  {
    name: 'dolphin-phi',
    description:
      '2.7B uncensored Dolphin model by Eric Hartford, based on the Phi language model by Microsoft Research.',
    capabilities: [],
    sizes: ['2.7b'],
    stats: {
      pulls: '64.2K',
      tags: '15',
      lastUpdated: '14 months ago',
    },
  },
  {
    name: 'orca2',
    description:
      "Orca 2 is built by Microsoft research, and are a fine-tuned version of Meta's Llama 2 models.  The model is designed to excel particularly in reasoning.",
    capabilities: [],
    sizes: ['7b', '13b'],
    stats: {
      pulls: '62.9K',
      tags: '33',
      lastUpdated: '15 months ago',
    },
  },
  {
    name: 'deepscaler',
    description:
      'A fine-tuned version of Deepseek-R1-Distilled-Qwen-1.5B that surpasses the performance of OpenAI’s o1-preview with just 1.5B parameters on popular math evaluations.',
    capabilities: [],
    sizes: ['1.5b'],
    stats: {
      pulls: '60.2K',
      tags: '5',
      lastUpdated: '2 weeks ago',
    },
  },
  {
    name: 'wizardlm-uncensored',
    description: 'Uncensored version of Wizard LM model',
    capabilities: [],
    sizes: ['13b'],
    stats: {
      pulls: '59.8K',
      tags: '18',
      lastUpdated: '16 months ago',
    },
  },
  {
    name: 'stable-beluga',
    description:
      'Llama 2 based model fine tuned on an Orca-style dataset. Originally called Free Willy.',
    capabilities: [],
    sizes: ['7b', '13b', '70b'],
    stats: {
      pulls: '58.6K',
      tags: '49',
      lastUpdated: '16 months ago',
    },
  },
  {
    name: 'granite3-dense',
    description:
      'The IBM Granite 2B and 8B models are designed to support tool-based use cases and support for retrieval augmented generation (RAG), streamlining code generation, translation and bug fixing.',
    capabilities: ['tools'],
    sizes: ['2b', '8b'],
    stats: {
      pulls: '55.9K',
      tags: '33',
      lastUpdated: '3 months ago',
    },
  },
  {
    name: 'llama3-groq-tool-use',
    description:
      'A series of models from Groq that represent a significant advancement in open-source AI capabilities for tool use/function calling.',
    capabilities: ['tools'],
    sizes: ['8b', '70b'],
    stats: {
      pulls: '54.4K',
      tags: '33',
      lastUpdated: '7 months ago',
    },
  },
  {
    name: 'deepseek-v2.5',
    description:
      'An upgraded version of DeekSeek-V2  that integrates the general and coding abilities of both DeepSeek-V2-Chat and DeepSeek-Coder-V2-Instruct.',
    capabilities: [],
    sizes: ['236b'],
    stats: {
      pulls: '48.5K',
      tags: '7',
      lastUpdated: '5 months ago',
    },
  },
  {
    name: 'medllama2',
    description:
      'Fine-tuned Llama 2 model to answer medical questions based on an open source medical dataset.',
    capabilities: [],
    sizes: ['7b'],
    stats: {
      pulls: '46.8K',
      tags: '17',
      lastUpdated: '16 months ago',
    },
  },
  {
    name: 'meditron',
    description:
      'Open-source medical large language model adapted from Llama 2 to the medical domain.',
    capabilities: [],
    sizes: ['7b', '70b'],
    stats: {
      pulls: '46.5K',
      tags: '22',
      lastUpdated: '14 months ago',
    },
  },
  {
    name: 'llama-pro',
    description:
      'An expansion of Llama 2 that specializes in integrating both general language understanding and domain-specific knowledge, particularly in programming and mathematics.',
    capabilities: [],
    sizes: [],
    stats: {
      pulls: '45.3K',
      tags: '33',
      lastUpdated: '13 months ago',
    },
  },
  {
    name: 'smallthinker',
    description:
      'A new small reasoning model fine-tuned from the Qwen 2.5 3B Instruct model.',
    capabilities: [],
    sizes: ['3b'],
    stats: {
      pulls: '45.2K',
      tags: '5',
      lastUpdated: '8 weeks ago',
    },
  },
  {
    name: 'yarn-mistral',
    description:
      'An extension of Mistral to support context windows of 64K or 128K.',
    capabilities: [],
    sizes: ['7b'],
    stats: {
      pulls: '44.9K',
      tags: '33',
      lastUpdated: '16 months ago',
    },
  },
  {
    name: 'aya-expanse',
    description:
      "Cohere For AI's language models trained to perform well across 23 different languages.",
    capabilities: ['tools'],
    sizes: ['8b', '32b'],
    stats: {
      pulls: '44.6K',
      tags: '33',
      lastUpdated: '4 months ago',
    },
  },
  {
    name: 'paraphrase-multilingual',
    description:
      'Sentence-transformers model that can be used for tasks like clustering or semantic search.',
    capabilities: ['embedding'],
    sizes: ['278m'],
    stats: {
      pulls: '44.2K',
      tags: '3',
      lastUpdated: '6 months ago',
    },
  },
  {
    name: 'granite3-moe',
    description:
      'The IBM Granite 1B and 3B models are the first mixture of experts (MoE) Granite models from IBM designed for low latency usage.',
    capabilities: ['tools'],
    sizes: ['1b', '3b'],
    stats: {
      pulls: '43.2K',
      tags: '33',
      lastUpdated: '3 months ago',
    },
  },
  {
    name: 'nexusraven',
    description:
      'Nexus Raven is a 13B instruction tuned model for function calling tasks.',
    capabilities: [],
    sizes: ['13b'],
    stats: {
      pulls: '41.3K',
      tags: '32',
      lastUpdated: '13 months ago',
    },
  },
  {
    name: 'codeup',
    description: 'Great code generation model based on Llama2.',
    capabilities: [],
    sizes: ['13b'],
    stats: {
      pulls: '39.3K',
      tags: '19',
      lastUpdated: '16 months ago',
    },
  },
  {
    name: 'falcon3',
    description:
      'A family of efficient AI models under 10B parameters performant in science, math, and coding through innovative training techniques.',
    capabilities: [],
    sizes: ['1b', '3b', '7b', '10b'],
    stats: {
      pulls: '39.2K',
      tags: '17',
      lastUpdated: '2 months ago',
    },
  },
  {
    name: 'nous-hermes2-mixtral',
    description:
      'The Nous Hermes 2 model from Nous Research, now trained over Mixtral.',
    capabilities: [],
    sizes: ['8x7b'],
    stats: {
      pulls: '38K',
      tags: '18',
      lastUpdated: '2 months ago',
    },
  },
  {
    name: 'everythinglm',
    description:
      'Uncensored Llama2 based model with support for a 16K context window.',
    capabilities: [],
    sizes: ['13b'],
    stats: {
      pulls: '37.8K',
      tags: '18',
      lastUpdated: '14 months ago',
    },
  },
  {
    name: 'shieldgemma',
    description:
      'ShieldGemma is set of instruction tuned models for evaluating the safety of text prompt input and text output responses against a set of defined safety policies.',
    capabilities: [],
    sizes: ['2b', '9b', '27b'],
    stats: {
      pulls: '34.9K',
      tags: '49',
      lastUpdated: '4 months ago',
    },
  },
  {
    name: 'granite3.1-moe',
    description:
      'The IBM Granite 1B and 3B models are long-context mixture of experts (MoE) Granite models from IBM designed for low latency usage.',
    capabilities: ['tools'],
    sizes: ['1b', '3b'],
    stats: {
      pulls: '33.6K',
      tags: '33',
      lastUpdated: '5 weeks ago',
    },
  },
  {
    name: 'snowflake-arctic-embed2',
    description:
      "Snowflake's frontier embedding model. Arctic Embed 2.0 adds multilingual support without sacrificing English performance or scalability.",
    capabilities: ['embedding'],
    sizes: ['568m'],
    stats: {
      pulls: '32.1K',
      tags: '3',
      lastUpdated: '2 months ago',
    },
  },
  {
    name: 'falcon2',
    description:
      'Falcon2 is an 11B parameters causal decoder-only model built by TII and trained over 5T tokens.',
    capabilities: [],
    sizes: ['11b'],
    stats: {
      pulls: '31.9K',
      tags: '17',
      lastUpdated: '9 months ago',
    },
  },
  {
    name: 'mathstral',
    description:
      'MathΣtral: a 7B model designed for math reasoning and scientific discovery by Mistral AI.',
    capabilities: [],
    sizes: ['7b'],
    stats: {
      pulls: '31.8K',
      tags: '17',
      lastUpdated: '7 months ago',
    },
  },
  {
    name: 'magicoder',
    description:
      '🎩 Magicoder is a family of 7B parameter models trained on 75K synthetic instruction data using OSS-Instruct, a novel approach to enlightening LLMs with open-source code snippets.',
    capabilities: [],
    sizes: ['7b'],
    stats: {
      pulls: '31.8K',
      tags: '18',
      lastUpdated: '14 months ago',
    },
  },
  {
    name: 'marco-o1',
    description:
      'An open large reasoning model for real-world solutions by the Alibaba International Digital Commerce Group (AIDC-AI).',
    capabilities: [],
    sizes: ['7b'],
    stats: {
      pulls: '31.7K',
      tags: '5',
      lastUpdated: '2 months ago',
    },
  },
  {
    name: 'stablelm-zephyr',
    description:
      'A lightweight chat model allowing accurate, and responsive output without requiring high-end hardware.',
    capabilities: [],
    sizes: ['3b'],
    stats: {
      pulls: '31.6K',
      tags: '17',
      lastUpdated: '14 months ago',
    },
  },
  {
    name: 'reader-lm',
    description:
      'A series of models that convert HTML content to Markdown content, which is useful for content conversion tasks.',
    capabilities: [],
    sizes: ['0.5b', '1.5b'],
    stats: {
      pulls: '31.2K',
      tags: '33',
      lastUpdated: '5 months ago',
    },
  },
  {
    name: 'solar-pro',
    description:
      'Solar Pro Preview: an advanced large language model (LLM) with 22 billion parameters designed to fit into a single GPU',
    capabilities: [],
    sizes: ['22b'],
    stats: {
      pulls: '31.2K',
      tags: '18',
      lastUpdated: '5 months ago',
    },
  },
  {
    name: 'codebooga',
    description:
      'A high-performing code instruct model created by merging two existing code models.',
    capabilities: [],
    sizes: ['34b'],
    stats: {
      pulls: '31K',
      tags: '16',
      lastUpdated: '16 months ago',
    },
  },
  {
    name: 'duckdb-nsql',
    description:
      '7B parameter text-to-SQL model made by MotherDuck and Numbers Station.',
    capabilities: [],
    sizes: ['7b'],
    stats: {
      pulls: '29.7K',
      tags: '17',
      lastUpdated: '13 months ago',
    },
  },
  {
    name: 'mistrallite',
    description:
      'MistralLite is a fine-tuned model based on Mistral with enhanced capabilities of processing long contexts.',
    capabilities: [],
    sizes: ['7b'],
    stats: {
      pulls: '29.6K',
      tags: '17',
      lastUpdated: '16 months ago',
    },
  },
  {
    name: 'wizard-vicuna',
    description:
      'Wizard Vicuna is a 13B parameter model based on Llama 2 trained by MelodysDreamj.',
    capabilities: [],
    sizes: ['13b'],
    stats: {
      pulls: '29.3K',
      tags: '17',
      lastUpdated: '16 months ago',
    },
  },
  {
    name: 'llama-guard3',
    description:
      'Llama Guard 3 is a series of models fine-tuned for content safety classification of LLM inputs and responses.',
    capabilities: [],
    sizes: ['1b', '8b'],
    stats: {
      pulls: '29.2K',
      tags: '33',
      lastUpdated: '4 months ago',
    },
  },
  {
    name: 'exaone3.5',
    description:
      'EXAONE 3.5 is a collection of instruction-tuned bilingual (English and Korean) generative models ranging from 2.4B to 32B parameters, developed and released by LG AI Research.',
    capabilities: [],
    sizes: ['2.4b', '7.8b', '32b'],
    stats: {
      pulls: '25.8K',
      tags: '13',
      lastUpdated: '2 months ago',
    },
  },
  {
    name: 'megadolphin',
    description:
      'MegaDolphin-2.2-120b is a transformation of Dolphin-2.2-70b created by interleaving the model with itself.',
    capabilities: [],
    sizes: ['120b'],
    stats: {
      pulls: '25.1K',
      tags: '19',
      lastUpdated: '13 months ago',
    },
  },
  {
    name: 'nuextract',
    description:
      'A 3.8B model fine-tuned on a private high-quality synthetic dataset for information extraction, based on Phi-3.',
    capabilities: [],
    sizes: ['3.8b'],
    stats: {
      pulls: '25K',
      tags: '17',
      lastUpdated: '7 months ago',
    },
  },
  {
    name: 'opencoder',
    description:
      'OpenCoder is an open and reproducible code LLM family which includes 1.5B and 8B models, supporting chat in English and Chinese languages.',
    capabilities: [],
    sizes: ['1.5b', '8b'],
    stats: {
      pulls: '24.7K',
      tags: '9',
      lastUpdated: '3 months ago',
    },
  },
  {
    name: 'notux',
    description:
      'A top-performing mixture of experts model, fine-tuned with high-quality data.',
    capabilities: [],
    sizes: ['8x7b'],
    stats: {
      pulls: '24.1K',
      tags: '18',
      lastUpdated: '14 months ago',
    },
  },
  {
    name: 'open-orca-platypus2',
    description:
      'Merge of the Open Orca OpenChat model and the Garage-bAInd Platypus 2 model. Designed for chat and code generation.',
    capabilities: [],
    sizes: ['13b'],
    stats: {
      pulls: '23.6K',
      tags: '17',
      lastUpdated: '16 months ago',
    },
  },
  {
    name: 'notus',
    description:
      'A 7B chat model fine-tuned with high-quality data and based on Zephyr.',
    capabilities: [],
    sizes: ['7b'],
    stats: {
      pulls: '23.5K',
      tags: '18',
      lastUpdated: '14 months ago',
    },
  },
  {
    name: 'goliath',
    description:
      'A language model created by combining two fine-tuned Llama 2 70B models into one.',
    capabilities: [],
    sizes: [],
    stats: {
      pulls: '22.9K',
      tags: '16',
      lastUpdated: '15 months ago',
    },
  },
  {
    name: 'bespoke-minicheck',
    description:
      'A state-of-the-art fact-checking model developed by Bespoke Labs.',
    capabilities: [],
    sizes: ['7b'],
    stats: {
      pulls: '22K',
      tags: '17',
      lastUpdated: '5 months ago',
    },
  },
  {
    name: 'command-r7b',
    description:
      "The smallest model in Cohere's R series delivers top-tier speed, efficiency, and quality to build powerful AI applications on commodity GPUs and edge devices.",
    capabilities: ['tools'],
    sizes: ['7b'],
    stats: {
      pulls: '21.8K',
      tags: '5',
      lastUpdated: '5 weeks ago',
    },
  },
  {
    name: 'firefunction-v2',
    description:
      'An open weights function calling model based on Llama 3, competitive with GPT-4o function calling capabilities.',
    capabilities: ['tools'],
    sizes: ['70b'],
    stats: {
      pulls: '18.7K',
      tags: '17',
      lastUpdated: '7 months ago',
    },
  },
  {
    name: 'tulu3',
    description:
      'Tülu 3 is a leading instruction following model family, offering fully open-source data, code, and recipes by the The Allen Institute for AI.',
    capabilities: [],
    sizes: ['8b', '70b'],
    stats: {
      pulls: '18.5K',
      tags: '9',
      lastUpdated: '2 months ago',
    },
  },
  {
    name: 'dbrx',
    description: 'DBRX is an open, general-purpose LLM created by Databricks.',
    capabilities: [],
    sizes: ['132b'],
    stats: {
      pulls: '18.2K',
      tags: '7',
      lastUpdated: '10 months ago',
    },
  },
  {
    name: 'granite-embedding',
    description:
      'The IBM Granite Embedding 30M and 278M models models are text-only dense biencoder embedding models, with 30M available in English only and 278M serving multilingual use cases.',
    capabilities: ['embedding'],
    sizes: ['30m', '278m'],
    stats: {
      pulls: '18K',
      tags: '6',
      lastUpdated: '2 months ago',
    },
  },
  {
    name: 'granite3-guardian',
    description:
      'The IBM Granite Guardian 3.0 2B and 8B models are designed to detect risks in prompts and/or responses.',
    capabilities: [],
    sizes: ['2b', '8b'],
    stats: {
      pulls: '16.1K',
      tags: '10',
      lastUpdated: '3 months ago',
    },
  },
  {
    name: 'alfred',
    description:
      'A robust conversational model designed to be used for both chat and instruct use cases.',
    capabilities: [],
    sizes: ['40b'],
    stats: {
      pulls: '15.6K',
      tags: '7',
      lastUpdated: '15 months ago',
    },
  },
  {
    name: 'sailor2',
    description:
      'Sailor2 are multilingual language models made for South-East Asia. Available in 1B, 8B, and 20B parameter sizes.',
    capabilities: [],
    sizes: ['1b', '8b', '20b'],
    stats: {
      pulls: '9,254',
      tags: '13',
      lastUpdated: '2 months ago',
    },
  },
  {
    name: 'r1-1776',
    description:
      'A version of the DeepSeek-R1 model that has been post trained to provide unbiased, accurate, and factual information by Perplexity.',
    capabilities: [],
    sizes: ['70b', '671b'],
    stats: {
      pulls: '7,809',
      tags: '9',
      lastUpdated: '5 days ago',
    },
  },
  {
    name: 'granite3.2',
    description:
      'Granite-3.2 is a family of long-context AI models from IBM Granite fine-tuned for thinking capabilities.',
    capabilities: ['tools'],
    sizes: ['2b', '8b'],
    stats: {
      pulls: '2,630',
      tags: '9',
      lastUpdated: 'yesterday',
    },
  },
]