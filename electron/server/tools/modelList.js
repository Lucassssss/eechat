// 此文件由 getOpenrouterModelList.js 自动生成
// 最后更新时间: 2025/3/3 22:27:23

module.exports = {
  "moonshotai": {
    "name": "Moonshotai",
    "description": "moonshotai",
    "models": [
      {
        "id": "moonshotai/moonlight-16b-a3b-instruct:free",
        "name": "Moonlight 16B A3B Instruct (free)",
        "description": "Moonlight-16B-A3B-Instruct is a 16B-parameter Mixture-of-Experts (MoE) language model developed by Moonshot AI. It is optimized for instruction-following tasks with 3B activated parameters per inference. The model advances the Pareto frontier in performance per FLOP across English, coding, math, and Chinese benchmarks. It outperforms comparable models like Llama3-3B and Deepseek-v2-Lite while maintaining efficient deployment capabilities through Hugging Face integration and compatibility with popular inference engines like vLLM12.",
        "context_length": 8192,
        "capabilities": [],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      }
    ]
  },
  "nousresearch": {
    "name": "Nousresearch",
    "description": "nousresearch",
    "models": [
      {
        "id": "nousresearch/deephermes-3-llama-3-8b-preview:free",
        "name": "DeepHermes 3 Llama 3 8B Preview (free)",
        "description": "DeepHermes 3 Preview is the latest version of our flagship Hermes series of LLMs by Nous Research, and one of the first models in the world to unify Reasoning (long chains of thought that improve answer accuracy) and normal LLM response modes into one model. We have also improved LLM annotation, judgement, and function calling.\n\nDeepHermes 3 Preview is one of the first LLM models to unify both \"intuitive\", traditional mode responses and long chain of thought reasoning responses into a single model, toggled by a system prompt.",
        "context_length": 131072,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "nousresearch/hermes-3-llama-3.1-70b",
        "name": "Hermes 3 70B Instruct",
        "description": "Hermes 3 is a generalist language model with many improvements over [Hermes 2](/models/nousresearch/nous-hermes-2-mistral-7b-dpo), including advanced agentic capabilities, much better roleplaying, reasoning, multi-turn conversation, long context coherence, and improvements across the board.\n\nHermes 3 70B is a competitive, if not superior finetune of the [Llama-3.1 70B foundation model](/models/meta-llama/llama-3.1-70b-instruct), focused on aligning LLMs to the user, with powerful steering capabilities and control given to the end user.\n\nThe Hermes 3 series builds and expands on the Hermes 2 set of capabilities, including more powerful and reliable function calling and structured output capabilities, generalist assistant capabilities, and improved code generation skills.",
        "context_length": 131000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 1.2e-7,
          "completion": 3e-7,
          "image": 0
        }
      },
      {
        "id": "nousresearch/hermes-3-llama-3.1-405b",
        "name": "Hermes 3 405B Instruct",
        "description": "Hermes 3 is a generalist language model with many improvements over Hermes 2, including advanced agentic capabilities, much better roleplaying, reasoning, multi-turn conversation, long context coherence, and improvements across the board.\n\nHermes 3 405B is a frontier-level, full-parameter finetune of the Llama-3.1 405B foundation model, focused on aligning LLMs to the user, with powerful steering capabilities and control given to the end user.\n\nThe Hermes 3 series builds and expands on the Hermes 2 set of capabilities, including more powerful and reliable function calling and structured output capabilities, generalist assistant capabilities, and improved code generation skills.\n\nHermes 3 is competitive, if not superior, to Llama-3.1 Instruct models at general capabilities, with varying strengths and weaknesses attributable between the two.",
        "context_length": 131000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 8e-7,
          "completion": 8e-7,
          "image": 0
        }
      },
      {
        "id": "nousresearch/hermes-2-pro-llama-3-8b",
        "name": "Hermes 2 Pro - Llama-3 8B",
        "description": "Hermes 2 Pro is an upgraded, retrained version of Nous Hermes 2, consisting of an updated and cleaned version of the OpenHermes 2.5 Dataset, as well as a newly introduced Function Calling and JSON Mode dataset developed in-house.",
        "context_length": 131000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 2.5e-8,
          "completion": 4e-8,
          "image": 0
        }
      },
      {
        "id": "nousresearch/nous-hermes-2-mixtral-8x7b-dpo",
        "name": "Hermes 2 Mixtral 8x7B DPO",
        "description": "Nous Hermes 2 Mixtral 8x7B DPO is the new flagship Nous Research model trained over the [Mixtral 8x7B MoE LLM](/models/mistralai/mixtral-8x7b).\n\nThe model was trained on over 1,000,000 entries of primarily [GPT-4](/models/openai/gpt-4) generated data, as well as other high quality data from open datasets across the AI landscape, achieving state of the art performance on a variety of tasks.\n\n#moe",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 6e-7,
          "completion": 6e-7,
          "image": 0
        }
      },
      {
        "id": "nousresearch/nous-hermes-llama2-13b",
        "name": "Hermes 13B",
        "description": "A state-of-the-art language model fine-tuned on over 300k instructions by Nous Research, with Teknium and Emozilla leading the fine tuning process.",
        "context_length": 4096,
        "capabilities": [],
        "pricing": {
          "prompt": 1.8e-7,
          "completion": 1.8e-7,
          "image": 0
        }
      }
    ]
  },
  "openai": {
    "name": "Openai",
    "description": "openai",
    "models": [
      {
        "id": "openai/gpt-4.5-preview",
        "name": "GPT-4.5 (Preview)",
        "description": "GPT-4.5 (Preview) is a research preview of OpenAI’s latest language model, designed to advance capabilities in reasoning, creativity, and multi-turn conversation. It builds on previous iterations with improvements in world knowledge, contextual coherence, and the ability to follow user intent more effectively.\n\nThe model demonstrates enhanced performance in tasks that require open-ended thinking, problem-solving, and communication. Early testing suggests it is better at generating nuanced responses, maintaining long-context coherence, and reducing hallucinations compared to earlier versions.\n\nThis research preview is intended to help evaluate GPT-4.5’s strengths and limitations in real-world use cases as OpenAI continues to refine and develop future models. Read more at the [blog post here.](https://openai.com/index/introducing-gpt-4-5/)",
        "context_length": 128000,
        "capabilities": [
          "视觉",
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.000075,
          "completion": 0.00015,
          "image": 0.108375
        }
      },
      {
        "id": "openai/o3-mini-high",
        "name": "o3 Mini High",
        "description": "OpenAI o3-mini-high is the same model as [o3-mini](/openai/o3-mini) with reasoning_effort set to high. \n\no3-mini is a cost-efficient language model optimized for STEM reasoning tasks, particularly excelling in science, mathematics, and coding. The model features three adjustable reasoning effort levels and supports key developer capabilities including function calling, structured outputs, and streaming, though it does not include vision processing capabilities.\n\nThe model demonstrates significant improvements over its predecessor, with expert testers preferring its responses 56% of the time and noting a 39% reduction in major errors on complex questions. With medium reasoning effort settings, o3-mini matches the performance of the larger o1 model on challenging reasoning evaluations like AIME and GPQA, while maintaining lower latency and cost.",
        "context_length": 200000,
        "capabilities": [
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.0000011,
          "completion": 0.0000044,
          "image": 0
        }
      },
      {
        "id": "openai/o3-mini",
        "name": "o3 Mini",
        "description": "OpenAI o3-mini is a cost-efficient language model optimized for STEM reasoning tasks, particularly excelling in science, mathematics, and coding.\n\nThis model supports the `reasoning_effort` parameter, which can be set to \"high\", \"medium\", or \"low\" to control the thinking time of the model. The default is \"medium\". OpenRouter also offers the model slug `openai/o3-mini-high` to default the parameter to \"high\".\n\nThe model features three adjustable reasoning effort levels and supports key developer capabilities including function calling, structured outputs, and streaming, though it does not include vision processing capabilities.\n\nThe model demonstrates significant improvements over its predecessor, with expert testers preferring its responses 56% of the time and noting a 39% reduction in major errors on complex questions. With medium reasoning effort settings, o3-mini matches the performance of the larger o1 model on challenging reasoning evaluations like AIME and GPQA, while maintaining lower latency and cost.",
        "context_length": 200000,
        "capabilities": [
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.0000011,
          "completion": 0.0000044,
          "image": 0
        }
      },
      {
        "id": "openai/o1",
        "name": "o1",
        "description": "The latest and strongest model family from OpenAI, o1 is designed to spend more time thinking before responding. The o1 model series is trained with large-scale reinforcement learning to reason using chain of thought. \n\nThe o1 models are optimized for math, science, programming, and other STEM-related tasks. They consistently exhibit PhD-level accuracy on benchmarks in physics, chemistry, and biology. Learn more in the [launch announcement](https://openai.com/o1).\n",
        "context_length": 200000,
        "capabilities": [
          "视觉",
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.000015,
          "completion": 0.00006,
          "image": 0.021675
        }
      },
      {
        "id": "openai/gpt-4o-2024-11-20",
        "name": "GPT-4o (2024-11-20)",
        "description": "The 2024-11-20 version of GPT-4o offers a leveled-up creative writing ability with more natural, engaging, and tailored writing to improve relevance & readability. It’s also better at working with uploaded files, providing deeper insights & more thorough responses.\n\nGPT-4o (\"o\" for \"omni\") is OpenAI's latest AI model, supporting both text and image inputs with text outputs. It maintains the intelligence level of [GPT-4 Turbo](/models/openai/gpt-4-turbo) while being twice as fast and 50% more cost-effective. GPT-4o also offers improved performance in processing non-English languages and enhanced visual capabilities.",
        "context_length": 128000,
        "capabilities": [
          "视觉",
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.0000025,
          "completion": 0.00001,
          "image": 0.003613
        }
      },
      {
        "id": "openai/o1-mini-2024-09-12",
        "name": "o1-mini (2024-09-12)",
        "description": "The latest and strongest model family from OpenAI, o1 is designed to spend more time thinking before responding.\n\nThe o1 models are optimized for math, science, programming, and other STEM-related tasks. They consistently exhibit PhD-level accuracy on benchmarks in physics, chemistry, and biology. Learn more in the [launch announcement](https://openai.com/o1).\n\nNote: This model is currently experimental and not suitable for production use-cases, and may be heavily rate-limited.",
        "context_length": 128000,
        "capabilities": [
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.0000011,
          "completion": 0.0000044,
          "image": 0
        }
      },
      {
        "id": "openai/o1-preview",
        "name": "o1-preview",
        "description": "The latest and strongest model family from OpenAI, o1 is designed to spend more time thinking before responding.\n\nThe o1 models are optimized for math, science, programming, and other STEM-related tasks. They consistently exhibit PhD-level accuracy on benchmarks in physics, chemistry, and biology. Learn more in the [launch announcement](https://openai.com/o1).\n\nNote: This model is currently experimental and not suitable for production use-cases, and may be heavily rate-limited.",
        "context_length": 128000,
        "capabilities": [
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.000015,
          "completion": 0.00006,
          "image": 0
        }
      },
      {
        "id": "openai/o1-preview-2024-09-12",
        "name": "o1-preview (2024-09-12)",
        "description": "The latest and strongest model family from OpenAI, o1 is designed to spend more time thinking before responding.\n\nThe o1 models are optimized for math, science, programming, and other STEM-related tasks. They consistently exhibit PhD-level accuracy on benchmarks in physics, chemistry, and biology. Learn more in the [launch announcement](https://openai.com/o1).\n\nNote: This model is currently experimental and not suitable for production use-cases, and may be heavily rate-limited.",
        "context_length": 128000,
        "capabilities": [
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.000015,
          "completion": 0.00006,
          "image": 0
        }
      },
      {
        "id": "openai/o1-mini",
        "name": "o1-mini",
        "description": "The latest and strongest model family from OpenAI, o1 is designed to spend more time thinking before responding.\n\nThe o1 models are optimized for math, science, programming, and other STEM-related tasks. They consistently exhibit PhD-level accuracy on benchmarks in physics, chemistry, and biology. Learn more in the [launch announcement](https://openai.com/o1).\n\nNote: This model is currently experimental and not suitable for production use-cases, and may be heavily rate-limited.",
        "context_length": 128000,
        "capabilities": [
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.0000011,
          "completion": 0.0000044,
          "image": 0
        }
      },
      {
        "id": "openai/chatgpt-4o-latest",
        "name": "ChatGPT-4o",
        "description": "OpenAI ChatGPT 4o is continually updated by OpenAI to point to the current version of GPT-4o used by ChatGPT. It therefore differs slightly from the API version of [GPT-4o](/models/openai/gpt-4o) in that it has additional RLHF. It is intended for research and evaluation.\n\nOpenAI notes that this model is not suited for production use-cases as it may be removed or redirected to another model in the future.",
        "context_length": 128000,
        "capabilities": [
          "视觉",
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.000005,
          "completion": 0.000015,
          "image": 0.007225
        }
      },
      {
        "id": "openai/gpt-4o-2024-08-06",
        "name": "GPT-4o (2024-08-06)",
        "description": "The 2024-08-06 version of GPT-4o offers improved performance in structured outputs, with the ability to supply a JSON schema in the respone_format. Read more [here](https://openai.com/index/introducing-structured-outputs-in-the-api/).\n\nGPT-4o (\"o\" for \"omni\") is OpenAI's latest AI model, supporting both text and image inputs with text outputs. It maintains the intelligence level of [GPT-4 Turbo](/models/openai/gpt-4-turbo) while being twice as fast and 50% more cost-effective. GPT-4o also offers improved performance in processing non-English languages and enhanced visual capabilities.\n\nFor benchmarking against other models, it was briefly called [\"im-also-a-good-gpt2-chatbot\"](https://twitter.com/LiamFedus/status/1790064963966370209)",
        "context_length": 128000,
        "capabilities": [
          "视觉",
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.0000025,
          "completion": 0.00001,
          "image": 0.003613
        }
      },
      {
        "id": "openai/gpt-4o-mini",
        "name": "GPT-4o-mini",
        "description": "GPT-4o mini is OpenAI's newest model after [GPT-4 Omni](/models/openai/gpt-4o), supporting both text and image inputs with text outputs.\n\nAs their most advanced small model, it is many multiples more affordable than other recent frontier models, and more than 60% cheaper than [GPT-3.5 Turbo](/models/openai/gpt-3.5-turbo). It maintains SOTA intelligence, while being significantly more cost-effective.\n\nGPT-4o mini achieves an 82% score on MMLU and presently ranks higher than GPT-4 on chat preferences [common leaderboards](https://arena.lmsys.org/).\n\nCheck out the [launch announcement](https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence/) to learn more.\n\n#multimodal",
        "context_length": 128000,
        "capabilities": [
          "视觉",
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 1.5e-7,
          "completion": 6e-7,
          "image": 0.000217
        }
      },
      {
        "id": "openai/gpt-4o-mini-2024-07-18",
        "name": "GPT-4o-mini (2024-07-18)",
        "description": "GPT-4o mini is OpenAI's newest model after [GPT-4 Omni](/models/openai/gpt-4o), supporting both text and image inputs with text outputs.\n\nAs their most advanced small model, it is many multiples more affordable than other recent frontier models, and more than 60% cheaper than [GPT-3.5 Turbo](/models/openai/gpt-3.5-turbo). It maintains SOTA intelligence, while being significantly more cost-effective.\n\nGPT-4o mini achieves an 82% score on MMLU and presently ranks higher than GPT-4 on chat preferences [common leaderboards](https://arena.lmsys.org/).\n\nCheck out the [launch announcement](https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence/) to learn more.\n\n#multimodal",
        "context_length": 128000,
        "capabilities": [
          "视觉",
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 1.5e-7,
          "completion": 6e-7,
          "image": 0.007225
        }
      },
      {
        "id": "openai/gpt-4o-2024-05-13",
        "name": "GPT-4o (2024-05-13)",
        "description": "GPT-4o (\"o\" for \"omni\") is OpenAI's latest AI model, supporting both text and image inputs with text outputs. It maintains the intelligence level of [GPT-4 Turbo](/models/openai/gpt-4-turbo) while being twice as fast and 50% more cost-effective. GPT-4o also offers improved performance in processing non-English languages and enhanced visual capabilities.\n\nFor benchmarking against other models, it was briefly called [\"im-also-a-good-gpt2-chatbot\"](https://twitter.com/LiamFedus/status/1790064963966370209)\n\n#multimodal",
        "context_length": 128000,
        "capabilities": [
          "视觉",
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.000005,
          "completion": 0.000015,
          "image": 0.007225
        }
      },
      {
        "id": "openai/gpt-4o",
        "name": "GPT-4o",
        "description": "GPT-4o (\"o\" for \"omni\") is OpenAI's latest AI model, supporting both text and image inputs with text outputs. It maintains the intelligence level of [GPT-4 Turbo](/models/openai/gpt-4-turbo) while being twice as fast and 50% more cost-effective. GPT-4o also offers improved performance in processing non-English languages and enhanced visual capabilities.\n\nFor benchmarking against other models, it was briefly called [\"im-also-a-good-gpt2-chatbot\"](https://twitter.com/LiamFedus/status/1790064963966370209)\n\n#multimodal",
        "context_length": 128000,
        "capabilities": [
          "视觉",
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.0000025,
          "completion": 0.00001,
          "image": 0.003613
        }
      },
      {
        "id": "openai/gpt-4o:extended",
        "name": "GPT-4o (extended)",
        "description": "GPT-4o (\"o\" for \"omni\") is OpenAI's latest AI model, supporting both text and image inputs with text outputs. It maintains the intelligence level of [GPT-4 Turbo](/models/openai/gpt-4-turbo) while being twice as fast and 50% more cost-effective. GPT-4o also offers improved performance in processing non-English languages and enhanced visual capabilities.\n\nFor benchmarking against other models, it was briefly called [\"im-also-a-good-gpt2-chatbot\"](https://twitter.com/LiamFedus/status/1790064963966370209)\n\n#multimodal",
        "context_length": 128000,
        "capabilities": [
          "视觉",
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.000006,
          "completion": 0.000018,
          "image": 0.007225
        }
      },
      {
        "id": "openai/gpt-4-turbo",
        "name": "GPT-4 Turbo",
        "description": "The latest GPT-4 Turbo model with vision capabilities. Vision requests can now use JSON mode and function calling.\n\nTraining data: up to December 2023.",
        "context_length": 128000,
        "capabilities": [
          "视觉",
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.00001,
          "completion": 0.00003,
          "image": 0.01445
        }
      },
      {
        "id": "openai/gpt-3.5-turbo-0613",
        "name": "GPT-3.5 Turbo (older v0613)",
        "description": "GPT-3.5 Turbo is OpenAI's fastest model. It can understand and generate natural language or code, and is optimized for chat and traditional completion tasks.\n\nTraining data up to Sep 2021.",
        "context_length": 4095,
        "capabilities": [],
        "pricing": {
          "prompt": 0.000001,
          "completion": 0.000002,
          "image": 0
        }
      },
      {
        "id": "openai/gpt-4-turbo-preview",
        "name": "GPT-4 Turbo Preview",
        "description": "The preview GPT-4 model with improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more. Training data: up to Dec 2023.\n\n**Note:** heavily rate limited by OpenAI while in preview.",
        "context_length": 128000,
        "capabilities": [
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.00001,
          "completion": 0.00003,
          "image": 0
        }
      },
      {
        "id": "openai/gpt-3.5-turbo-1106",
        "name": "GPT-3.5 Turbo 16k (older v1106)",
        "description": "An older GPT-3.5 Turbo model with improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more. Training data: up to Sep 2021.",
        "context_length": 16385,
        "capabilities": [
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.000001,
          "completion": 0.000002,
          "image": 0
        }
      },
      {
        "id": "openai/gpt-4-1106-preview",
        "name": "GPT-4 Turbo (older v1106)",
        "description": "The latest GPT-4 Turbo model with vision capabilities. Vision requests can now use JSON mode and function calling.\n\nTraining data: up to April 2023.",
        "context_length": 128000,
        "capabilities": [
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.00001,
          "completion": 0.00003,
          "image": 0
        }
      },
      {
        "id": "openai/gpt-3.5-turbo-instruct",
        "name": "GPT-3.5 Turbo Instruct",
        "description": "This model is a variant of GPT-3.5 Turbo tuned for instructional prompts and omitting chat-related optimizations. Training data: up to Sep 2021.",
        "context_length": 4095,
        "capabilities": [
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.0000015,
          "completion": 0.000002,
          "image": 0
        }
      },
      {
        "id": "openai/gpt-3.5-turbo-16k",
        "name": "GPT-3.5 Turbo 16k",
        "description": "This model offers four times the context length of gpt-3.5-turbo, allowing it to support approximately 20 pages of text in a single request at a higher cost. Training data: up to Sep 2021.",
        "context_length": 16385,
        "capabilities": [
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.000003,
          "completion": 0.000004,
          "image": 0
        }
      },
      {
        "id": "openai/gpt-4-32k",
        "name": "GPT-4 32k",
        "description": "GPT-4-32k is an extended version of GPT-4, with the same capabilities but quadrupled context length, allowing for processing up to 40 pages of text in a single pass. This is particularly beneficial for handling longer content like interacting with PDFs without an external vector database. Training data: up to Sep 2021.",
        "context_length": 32767,
        "capabilities": [
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.00006,
          "completion": 0.00012,
          "image": 0
        }
      },
      {
        "id": "openai/gpt-4-32k-0314",
        "name": "GPT-4 32k (older v0314)",
        "description": "GPT-4-32k is an extended version of GPT-4, with the same capabilities but quadrupled context length, allowing for processing up to 40 pages of text in a single pass. This is particularly beneficial for handling longer content like interacting with PDFs without an external vector database. Training data: up to Sep 2021.",
        "context_length": 32767,
        "capabilities": [
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.00006,
          "completion": 0.00012,
          "image": 0
        }
      },
      {
        "id": "openai/gpt-3.5-turbo",
        "name": "GPT-3.5 Turbo",
        "description": "GPT-3.5 Turbo is OpenAI's fastest model. It can understand and generate natural language or code, and is optimized for chat and traditional completion tasks.\n\nTraining data up to Sep 2021.",
        "context_length": 16385,
        "capabilities": [
          "内容审核"
        ],
        "pricing": {
          "prompt": 5e-7,
          "completion": 0.0000015,
          "image": 0
        }
      },
      {
        "id": "openai/gpt-3.5-turbo-0125",
        "name": "GPT-3.5 Turbo 16k",
        "description": "The latest GPT-3.5 Turbo model with improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more. Training data: up to Sep 2021.\n\nThis version has a higher accuracy at responding in requested formats and a fix for a bug which caused a text encoding issue for non-English language function calls.",
        "context_length": 16385,
        "capabilities": [
          "内容审核"
        ],
        "pricing": {
          "prompt": 5e-7,
          "completion": 0.0000015,
          "image": 0
        }
      },
      {
        "id": "openai/gpt-4",
        "name": "GPT-4",
        "description": "OpenAI's flagship model, GPT-4 is a large-scale multimodal language model capable of solving difficult problems with greater accuracy than previous models due to its broader general knowledge and advanced reasoning capabilities. Training data: up to Sep 2021.",
        "context_length": 8191,
        "capabilities": [
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.00003,
          "completion": 0.00006,
          "image": 0
        }
      },
      {
        "id": "openai/gpt-4-0314",
        "name": "GPT-4 (older v0314)",
        "description": "GPT-4-0314 is the first version of GPT-4 released, with a context length of 8,192 tokens, and was supported until June 14. Training data: up to Sep 2021.",
        "context_length": 8191,
        "capabilities": [
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.00003,
          "completion": 0.00006,
          "image": 0
        }
      }
    ]
  },
  "google": {
    "name": "Google",
    "description": "google",
    "models": [
      {
        "id": "google/gemini-2.0-flash-lite-001",
        "name": "Gemini 2.0 Flash Lite",
        "description": "Gemini 2.0 Flash Lite offers a significantly faster time to first token (TTFT) compared to [Gemini Flash 1.5](/google/gemini-flash-1.5), while maintaining quality on par with larger models like [Gemini Pro 1.5](/google/gemini-pro-1.5), all at extremely economical token prices.",
        "context_length": 1048576,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 7.5e-8,
          "completion": 3e-7,
          "image": 0
        }
      },
      {
        "id": "google/gemini-2.0-flash-001",
        "name": "Gemini Flash 2.0",
        "description": "Gemini Flash 2.0 offers a significantly faster time to first token (TTFT) compared to [Gemini Flash 1.5](/google/gemini-flash-1.5), while maintaining quality on par with larger models like [Gemini Pro 1.5](/google/gemini-pro-1.5). It introduces notable enhancements in multimodal understanding, coding capabilities, complex instruction following, and function calling. These advancements come together to deliver more seamless and robust agentic experiences.",
        "context_length": 1000000,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 1e-7,
          "completion": 4e-7,
          "image": 0.0000258
        }
      },
      {
        "id": "google/gemini-2.0-flash-lite-preview-02-05:free",
        "name": "Gemini Flash Lite 2.0 Preview (free)",
        "description": "Gemini Flash Lite 2.0 offers a significantly faster time to first token (TTFT) compared to [Gemini Flash 1.5](/google/gemini-flash-1.5), while maintaining quality on par with larger models like [Gemini Pro 1.5](/google/gemini-pro-1.5). Because it's currently in preview, it will be **heavily rate-limited** by Google. This model will move from free to paid pending a general rollout on February 24th, at $0.075 / $0.30 per million input / ouput tokens respectively.",
        "context_length": 1000000,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "google/gemini-2.0-pro-exp-02-05:free",
        "name": "Gemini Pro 2.0 Experimental (free)",
        "description": "Gemini 2.0 Pro Experimental is a bleeding-edge version of the Gemini 2.0 Pro model. Because it's currently experimental, it will be **heavily rate-limited** by Google.\n\nUsage of Gemini is subject to Google's [Gemini Terms of Use](https://ai.google.dev/terms).\n\n#multimodal",
        "context_length": 2000000,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "google/gemini-2.0-flash-thinking-exp:free",
        "name": "Gemini 2.0 Flash Thinking Experimental 01-21 (free)",
        "description": "Gemini 2.0 Flash Thinking Experimental (01-21) is a snapshot of Gemini 2.0 Flash Thinking Experimental.\n\nGemini 2.0 Flash Thinking Mode is an experimental model that's trained to generate the \"thinking process\" the model goes through as part of its response. As a result, Thinking Mode is capable of stronger reasoning capabilities in its responses than the [base Gemini 2.0 Flash model](/google/gemini-2.0-flash-exp).",
        "context_length": 1048576,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "google/gemini-2.0-flash-thinking-exp-1219:free",
        "name": "Gemini 2.0 Flash Thinking Experimental (free)",
        "description": "Gemini 2.0 Flash Thinking Mode is an experimental model that's trained to generate the \"thinking process\" the model goes through as part of its response. As a result, Thinking Mode is capable of stronger reasoning capabilities in its responses than the [base Gemini 2.0 Flash model](/google/gemini-2.0-flash-exp).",
        "context_length": 40000,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "google/gemini-2.0-flash-exp:free",
        "name": "Gemini Flash 2.0 Experimental (free)",
        "description": "Gemini Flash 2.0 offers a significantly faster time to first token (TTFT) compared to [Gemini Flash 1.5](/google/gemini-flash-1.5), while maintaining quality on par with larger models like [Gemini Pro 1.5](/google/gemini-pro-1.5). It introduces notable enhancements in multimodal understanding, coding capabilities, complex instruction following, and function calling. These advancements come together to deliver more seamless and robust agentic experiences.",
        "context_length": 1048576,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "google/gemini-exp-1206:free",
        "name": "Gemini Experimental 1206 (free)",
        "description": "Experimental release (December 6, 2024) of Gemini.",
        "context_length": 2097152,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "google/learnlm-1.5-pro-experimental:free",
        "name": "LearnLM 1.5 Pro Experimental (free)",
        "description": "An experimental version of [Gemini 1.5 Pro](/google/gemini-pro-1.5) from Google.",
        "context_length": 40960,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "google/gemini-flash-1.5-8b",
        "name": "Gemini Flash 1.5 8B",
        "description": "Gemini Flash 1.5 8B is optimized for speed and efficiency, offering enhanced performance in small prompt tasks like chat, transcription, and translation. With reduced latency, it is highly effective for real-time and large-scale operations. This model focuses on cost-effective solutions while maintaining high-quality results.\n\n[Click here to learn more about this model](https://developers.googleblog.com/en/gemini-15-flash-8b-is-now-generally-available-for-use/).\n\nUsage of Gemini is subject to Google's [Gemini Terms of Use](https://ai.google.dev/terms).",
        "context_length": 1000000,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 3.75e-8,
          "completion": 1.5e-7,
          "image": 0
        }
      },
      {
        "id": "google/gemini-flash-1.5-8b-exp",
        "name": "Gemini Flash 1.5 8B Experimental",
        "description": "Gemini Flash 1.5 8B Experimental is an experimental, 8B parameter version of the [Gemini Flash 1.5](/models/google/gemini-flash-1.5) model.\n\nUsage of Gemini is subject to Google's [Gemini Terms of Use](https://ai.google.dev/terms).\n\n#multimodal\n\nNote: This model is currently experimental and not suitable for production use-cases, and may be heavily rate-limited.",
        "context_length": 1000000,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "google/gemma-2-27b-it",
        "name": "Gemma 2 27B",
        "description": "Gemma 2 27B by Google is an open model built from the same research and technology used to create the [Gemini models](/models?q=gemini).\n\nGemma models are well-suited for a variety of text generation tasks, including question answering, summarization, and reasoning.\n\nSee the [launch announcement](https://blog.google/technology/developers/google-gemma-2/) for more details. Usage of Gemma is subject to Google's [Gemma Terms of Use](https://ai.google.dev/gemma/terms).",
        "context_length": 8192,
        "capabilities": [],
        "pricing": {
          "prompt": 2.7e-7,
          "completion": 2.7e-7,
          "image": 0
        }
      },
      {
        "id": "google/gemma-2-9b-it:free",
        "name": "Gemma 2 9B (free)",
        "description": "Gemma 2 9B by Google is an advanced, open-source language model that sets a new standard for efficiency and performance in its size class.\n\nDesigned for a wide variety of tasks, it empowers developers and researchers to build innovative applications, while maintaining accessibility, safety, and cost-effectiveness.\n\nSee the [launch announcement](https://blog.google/technology/developers/google-gemma-2/) for more details. Usage of Gemma is subject to Google's [Gemma Terms of Use](https://ai.google.dev/gemma/terms).",
        "context_length": 8192,
        "capabilities": [],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "google/gemma-2-9b-it",
        "name": "Gemma 2 9B",
        "description": "Gemma 2 9B by Google is an advanced, open-source language model that sets a new standard for efficiency and performance in its size class.\n\nDesigned for a wide variety of tasks, it empowers developers and researchers to build innovative applications, while maintaining accessibility, safety, and cost-effectiveness.\n\nSee the [launch announcement](https://blog.google/technology/developers/google-gemma-2/) for more details. Usage of Gemma is subject to Google's [Gemma Terms of Use](https://ai.google.dev/gemma/terms).",
        "context_length": 8192,
        "capabilities": [],
        "pricing": {
          "prompt": 3e-8,
          "completion": 6e-8,
          "image": 0
        }
      },
      {
        "id": "google/gemini-flash-1.5",
        "name": "Gemini Flash 1.5",
        "description": "Gemini 1.5 Flash is a foundation model that performs well at a variety of multimodal tasks such as visual understanding, classification, summarization, and creating content from image, audio and video. It's adept at processing visual and text inputs such as photographs, documents, infographics, and screenshots.\n\nGemini 1.5 Flash is designed for high-volume, high-frequency tasks where cost and latency matter. On most common tasks, Flash achieves comparable quality to other Gemini Pro models at a significantly reduced cost. Flash is well-suited for applications like chat assistants and on-demand content generation where speed and scale matter.\n\nUsage of Gemini is subject to Google's [Gemini Terms of Use](https://ai.google.dev/terms).\n\n#multimodal",
        "context_length": 1000000,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 7.5e-8,
          "completion": 3e-7,
          "image": 0.00004
        }
      },
      {
        "id": "google/gemini-pro-1.5",
        "name": "Gemini Pro 1.5",
        "description": "Google's latest multimodal model, supports image and video[0] in text or chat prompts.\n\nOptimized for language tasks including:\n\n- Code generation\n- Text generation\n- Text editing\n- Problem solving\n- Recommendations\n- Information extraction\n- Data extraction or generation\n- AI agents\n\nUsage of Gemini is subject to Google's [Gemini Terms of Use](https://ai.google.dev/terms).\n\n* [0]: Video input is not available through OpenRouter at this time.",
        "context_length": 2000000,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 0.00000125,
          "completion": 0.000005,
          "image": 0.0006575
        }
      },
      {
        "id": "google/gemma-7b-it",
        "name": "Gemma 7B",
        "description": "Gemma by Google is an advanced, open-source language model family, leveraging the latest in decoder-only, text-to-text technology. It offers English language capabilities across text generation tasks like question answering, summarization, and reasoning. The Gemma 7B variant is comparable in performance to leading open source models.\n\nUsage of Gemma is subject to Google's [Gemma Terms of Use](https://ai.google.dev/gemma/terms).",
        "context_length": 8192,
        "capabilities": [],
        "pricing": {
          "prompt": 1.5e-7,
          "completion": 1.5e-7,
          "image": 0
        }
      },
      {
        "id": "google/gemini-pro-vision",
        "name": "Gemini Pro Vision 1.0",
        "description": "Google's flagship multimodal model, supporting image and video in text or chat prompts for a text or code response.\n\nSee the benchmarks and prompting guidelines from [Deepmind](https://deepmind.google/technologies/gemini/).\n\nUsage of Gemini is subject to Google's [Gemini Terms of Use](https://ai.google.dev/terms).\n\n#multimodal",
        "context_length": 16384,
        "capabilities": [
          "视觉"
        ],
        "pricing": {
          "prompt": 5e-7,
          "completion": 0.0000015,
          "image": 0.0025
        }
      },
      {
        "id": "google/gemini-pro",
        "name": "Gemini Pro 1.0",
        "description": "Google's flagship text generation model. Designed to handle natural language tasks, multiturn text and code chat, and code generation.\n\nSee the benchmarks and prompting guidelines from [Deepmind](https://deepmind.google/technologies/gemini/).\n\nUsage of Gemini is subject to Google's [Gemini Terms of Use](https://ai.google.dev/terms).",
        "context_length": 32760,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 5e-7,
          "completion": 0.0000015,
          "image": 0.0025
        }
      },
      {
        "id": "google/palm-2-chat-bison-32k",
        "name": "PaLM 2 Chat 32k",
        "description": "PaLM 2 is a language model by Google with improved multilingual, reasoning and coding capabilities.",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000001,
          "completion": 0.000002,
          "image": 0
        }
      },
      {
        "id": "google/palm-2-codechat-bison-32k",
        "name": "PaLM 2 Code Chat 32k",
        "description": "PaLM 2 fine-tuned for chatbot conversations that help with code-related questions.",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000001,
          "completion": 0.000002,
          "image": 0
        }
      },
      {
        "id": "google/palm-2-chat-bison",
        "name": "PaLM 2 Chat",
        "description": "PaLM 2 is a language model by Google with improved multilingual, reasoning and coding capabilities.",
        "context_length": 9216,
        "capabilities": [],
        "pricing": {
          "prompt": 0.000001,
          "completion": 0.000002,
          "image": 0
        }
      },
      {
        "id": "google/palm-2-codechat-bison",
        "name": "PaLM 2 Code Chat",
        "description": "PaLM 2 fine-tuned for chatbot conversations that help with code-related questions.",
        "context_length": 7168,
        "capabilities": [],
        "pricing": {
          "prompt": 0.000001,
          "completion": 0.000002,
          "image": 0
        }
      }
    ]
  },
  "anthropic": {
    "name": "Anthropic",
    "description": "anthropic",
    "models": [
      {
        "id": "anthropic/claude-3.7-sonnet:beta",
        "name": "Claude 3.7 Sonnet (self-moderated)",
        "description": "Claude 3.7 Sonnet is an advanced large language model with improved reasoning, coding, and problem-solving capabilities. It introduces a hybrid reasoning approach, allowing users to choose between rapid responses and extended, step-by-step processing for complex tasks. The model demonstrates notable improvements in coding, particularly in front-end development and full-stack updates, and excels in agentic workflows, where it can autonomously navigate multi-step processes. \n\nClaude 3.7 Sonnet maintains performance parity with its predecessor in standard mode while offering an extended reasoning mode for enhanced accuracy in math, coding, and instruction-following tasks.\n\nRead more at the [blog post here](https://www.anthropic.com/news/claude-3-7-sonnet)",
        "context_length": 200000,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000003,
          "completion": 0.000015,
          "image": 0.0048
        }
      },
      {
        "id": "anthropic/claude-3.7-sonnet",
        "name": "Claude 3.7 Sonnet",
        "description": "Claude 3.7 Sonnet is an advanced large language model with improved reasoning, coding, and problem-solving capabilities. It introduces a hybrid reasoning approach, allowing users to choose between rapid responses and extended, step-by-step processing for complex tasks. The model demonstrates notable improvements in coding, particularly in front-end development and full-stack updates, and excels in agentic workflows, where it can autonomously navigate multi-step processes. \n\nClaude 3.7 Sonnet maintains performance parity with its predecessor in standard mode while offering an extended reasoning mode for enhanced accuracy in math, coding, and instruction-following tasks.\n\nRead more at the [blog post here](https://www.anthropic.com/news/claude-3-7-sonnet)",
        "context_length": 200000,
        "capabilities": [
          "视觉",
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.000003,
          "completion": 0.000015,
          "image": 0.0048
        }
      },
      {
        "id": "anthropic/claude-3.7-sonnet:thinking",
        "name": "Claude 3.7 Sonnet (thinking)",
        "description": "Claude 3.7 Sonnet is an advanced large language model with improved reasoning, coding, and problem-solving capabilities. It introduces a hybrid reasoning approach, allowing users to choose between rapid responses and extended, step-by-step processing for complex tasks. The model demonstrates notable improvements in coding, particularly in front-end development and full-stack updates, and excels in agentic workflows, where it can autonomously navigate multi-step processes. \n\nClaude 3.7 Sonnet maintains performance parity with its predecessor in standard mode while offering an extended reasoning mode for enhanced accuracy in math, coding, and instruction-following tasks.\n\nRead more at the [blog post here](https://www.anthropic.com/news/claude-3-7-sonnet)",
        "context_length": 200000,
        "capabilities": [
          "视觉",
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.000003,
          "completion": 0.000015,
          "image": 0.0048
        }
      },
      {
        "id": "anthropic/claude-3.5-haiku-20241022:beta",
        "name": "Claude 3.5 Haiku (2024-10-22) (self-moderated)",
        "description": "Claude 3.5 Haiku features enhancements across all skill sets including coding, tool use, and reasoning. As the fastest model in the Anthropic lineup, it offers rapid response times suitable for applications that require high interactivity and low latency, such as user-facing chatbots and on-the-fly code completions. It also excels in specialized tasks like data extraction and real-time content moderation, making it a versatile tool for a broad range of industries.\n\nIt does not support image inputs.\n\nSee the launch announcement and benchmark results [here](https://www.anthropic.com/news/3-5-models-and-computer-use)",
        "context_length": 200000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 8e-7,
          "completion": 0.000004,
          "image": 0
        }
      },
      {
        "id": "anthropic/claude-3.5-haiku-20241022",
        "name": "Claude 3.5 Haiku (2024-10-22)",
        "description": "Claude 3.5 Haiku features enhancements across all skill sets including coding, tool use, and reasoning. As the fastest model in the Anthropic lineup, it offers rapid response times suitable for applications that require high interactivity and low latency, such as user-facing chatbots and on-the-fly code completions. It also excels in specialized tasks like data extraction and real-time content moderation, making it a versatile tool for a broad range of industries.\n\nIt does not support image inputs.\n\nSee the launch announcement and benchmark results [here](https://www.anthropic.com/news/3-5-models-and-computer-use)",
        "context_length": 200000,
        "capabilities": [
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 8e-7,
          "completion": 0.000004,
          "image": 0
        }
      },
      {
        "id": "anthropic/claude-3.5-haiku:beta",
        "name": "Claude 3.5 Haiku (self-moderated)",
        "description": "Claude 3.5 Haiku features offers enhanced capabilities in speed, coding accuracy, and tool use. Engineered to excel in real-time applications, it delivers quick response times that are essential for dynamic tasks such as chat interactions and immediate coding suggestions.\n\nThis makes it highly suitable for environments that demand both speed and precision, such as software development, customer service bots, and data management systems.\n\nThis model is currently pointing to [Claude 3.5 Haiku (2024-10-22)](/anthropic/claude-3-5-haiku-20241022).",
        "context_length": 200000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 8e-7,
          "completion": 0.000004,
          "image": 0
        }
      },
      {
        "id": "anthropic/claude-3.5-haiku",
        "name": "Claude 3.5 Haiku",
        "description": "Claude 3.5 Haiku features offers enhanced capabilities in speed, coding accuracy, and tool use. Engineered to excel in real-time applications, it delivers quick response times that are essential for dynamic tasks such as chat interactions and immediate coding suggestions.\n\nThis makes it highly suitable for environments that demand both speed and precision, such as software development, customer service bots, and data management systems.\n\nThis model is currently pointing to [Claude 3.5 Haiku (2024-10-22)](/anthropic/claude-3-5-haiku-20241022).",
        "context_length": 200000,
        "capabilities": [
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 8e-7,
          "completion": 0.000004,
          "image": 0
        }
      },
      {
        "id": "anthropic/claude-3.5-sonnet:beta",
        "name": "Claude 3.5 Sonnet (self-moderated)",
        "description": "New Claude 3.5 Sonnet delivers better-than-Opus capabilities, faster-than-Sonnet speeds, at the same Sonnet prices. Sonnet is particularly good at:\n\n- Coding: Scores ~49% on SWE-Bench Verified, higher than the last best score, and without any fancy prompt scaffolding\n- Data science: Augments human data science expertise; navigates unstructured data while using multiple tools for insights\n- Visual processing: excelling at interpreting charts, graphs, and images, accurately transcribing text to derive insights beyond just the text alone\n- Agentic tasks: exceptional tool use, making it great at agentic tasks (i.e. complex, multi-step problem solving tasks that require engaging with other systems)\n\n#multimodal",
        "context_length": 200000,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000003,
          "completion": 0.000015,
          "image": 0.0048
        }
      },
      {
        "id": "anthropic/claude-3.5-sonnet",
        "name": "Claude 3.5 Sonnet",
        "description": "New Claude 3.5 Sonnet delivers better-than-Opus capabilities, faster-than-Sonnet speeds, at the same Sonnet prices. Sonnet is particularly good at:\n\n- Coding: Scores ~49% on SWE-Bench Verified, higher than the last best score, and without any fancy prompt scaffolding\n- Data science: Augments human data science expertise; navigates unstructured data while using multiple tools for insights\n- Visual processing: excelling at interpreting charts, graphs, and images, accurately transcribing text to derive insights beyond just the text alone\n- Agentic tasks: exceptional tool use, making it great at agentic tasks (i.e. complex, multi-step problem solving tasks that require engaging with other systems)\n\n#multimodal",
        "context_length": 200000,
        "capabilities": [
          "视觉",
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.000003,
          "completion": 0.000015,
          "image": 0.0048
        }
      },
      {
        "id": "anthropic/claude-3.5-sonnet-20240620:beta",
        "name": "Claude 3.5 Sonnet (2024-06-20) (self-moderated)",
        "description": "Claude 3.5 Sonnet delivers better-than-Opus capabilities, faster-than-Sonnet speeds, at the same Sonnet prices. Sonnet is particularly good at:\n\n- Coding: Autonomously writes, edits, and runs code with reasoning and troubleshooting\n- Data science: Augments human data science expertise; navigates unstructured data while using multiple tools for insights\n- Visual processing: excelling at interpreting charts, graphs, and images, accurately transcribing text to derive insights beyond just the text alone\n- Agentic tasks: exceptional tool use, making it great at agentic tasks (i.e. complex, multi-step problem solving tasks that require engaging with other systems)\n\nFor the latest version (2024-10-23), check out [Claude 3.5 Sonnet](/anthropic/claude-3.5-sonnet).\n\n#multimodal",
        "context_length": 200000,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000003,
          "completion": 0.000015,
          "image": 0.0048
        }
      },
      {
        "id": "anthropic/claude-3.5-sonnet-20240620",
        "name": "Claude 3.5 Sonnet (2024-06-20)",
        "description": "Claude 3.5 Sonnet delivers better-than-Opus capabilities, faster-than-Sonnet speeds, at the same Sonnet prices. Sonnet is particularly good at:\n\n- Coding: Autonomously writes, edits, and runs code with reasoning and troubleshooting\n- Data science: Augments human data science expertise; navigates unstructured data while using multiple tools for insights\n- Visual processing: excelling at interpreting charts, graphs, and images, accurately transcribing text to derive insights beyond just the text alone\n- Agentic tasks: exceptional tool use, making it great at agentic tasks (i.e. complex, multi-step problem solving tasks that require engaging with other systems)\n\nFor the latest version (2024-10-23), check out [Claude 3.5 Sonnet](/anthropic/claude-3.5-sonnet).\n\n#multimodal",
        "context_length": 200000,
        "capabilities": [
          "视觉",
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.000003,
          "completion": 0.000015,
          "image": 0.0048
        }
      },
      {
        "id": "anthropic/claude-3-haiku:beta",
        "name": "Claude 3 Haiku (self-moderated)",
        "description": "Claude 3 Haiku is Anthropic's fastest and most compact model for\nnear-instant responsiveness. Quick and accurate targeted performance.\n\nSee the launch announcement and benchmark results [here](https://www.anthropic.com/news/claude-3-haiku)\n\n#multimodal",
        "context_length": 200000,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 2.5e-7,
          "completion": 0.00000125,
          "image": 0.0004
        }
      },
      {
        "id": "anthropic/claude-3-haiku",
        "name": "Claude 3 Haiku",
        "description": "Claude 3 Haiku is Anthropic's fastest and most compact model for\nnear-instant responsiveness. Quick and accurate targeted performance.\n\nSee the launch announcement and benchmark results [here](https://www.anthropic.com/news/claude-3-haiku)\n\n#multimodal",
        "context_length": 200000,
        "capabilities": [
          "视觉",
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 2.5e-7,
          "completion": 0.00000125,
          "image": 0.0004
        }
      },
      {
        "id": "anthropic/claude-3-opus:beta",
        "name": "Claude 3 Opus (self-moderated)",
        "description": "Claude 3 Opus is Anthropic's most powerful model for highly complex tasks. It boasts top-level performance, intelligence, fluency, and understanding.\n\nSee the launch announcement and benchmark results [here](https://www.anthropic.com/news/claude-3-family)\n\n#multimodal",
        "context_length": 200000,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000015,
          "completion": 0.000075,
          "image": 0.024
        }
      },
      {
        "id": "anthropic/claude-3-opus",
        "name": "Claude 3 Opus",
        "description": "Claude 3 Opus is Anthropic's most powerful model for highly complex tasks. It boasts top-level performance, intelligence, fluency, and understanding.\n\nSee the launch announcement and benchmark results [here](https://www.anthropic.com/news/claude-3-family)\n\n#multimodal",
        "context_length": 200000,
        "capabilities": [
          "视觉",
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.000015,
          "completion": 0.000075,
          "image": 0.024
        }
      },
      {
        "id": "anthropic/claude-3-sonnet:beta",
        "name": "Claude 3 Sonnet (self-moderated)",
        "description": "Claude 3 Sonnet is an ideal balance of intelligence and speed for enterprise workloads. Maximum utility at a lower price, dependable, balanced for scaled deployments.\n\nSee the launch announcement and benchmark results [here](https://www.anthropic.com/news/claude-3-family)\n\n#multimodal",
        "context_length": 200000,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000003,
          "completion": 0.000015,
          "image": 0.0048
        }
      },
      {
        "id": "anthropic/claude-3-sonnet",
        "name": "Claude 3 Sonnet",
        "description": "Claude 3 Sonnet is an ideal balance of intelligence and speed for enterprise workloads. Maximum utility at a lower price, dependable, balanced for scaled deployments.\n\nSee the launch announcement and benchmark results [here](https://www.anthropic.com/news/claude-3-family)\n\n#multimodal",
        "context_length": 200000,
        "capabilities": [
          "视觉",
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.000003,
          "completion": 0.000015,
          "image": 0.0048
        }
      },
      {
        "id": "anthropic/claude-2:beta",
        "name": "Claude v2 (self-moderated)",
        "description": "Claude 2 delivers advancements in key capabilities for enterprises—including an industry-leading 200K token context window, significant reductions in rates of model hallucination, system prompts and a new beta feature: tool use.",
        "context_length": 200000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000008,
          "completion": 0.000024,
          "image": 0
        }
      },
      {
        "id": "anthropic/claude-2",
        "name": "Claude v2",
        "description": "Claude 2 delivers advancements in key capabilities for enterprises—including an industry-leading 200K token context window, significant reductions in rates of model hallucination, system prompts and a new beta feature: tool use.",
        "context_length": 200000,
        "capabilities": [
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.000008,
          "completion": 0.000024,
          "image": 0
        }
      },
      {
        "id": "anthropic/claude-2.1:beta",
        "name": "Claude v2.1 (self-moderated)",
        "description": "Claude 2 delivers advancements in key capabilities for enterprises—including an industry-leading 200K token context window, significant reductions in rates of model hallucination, system prompts and a new beta feature: tool use.",
        "context_length": 200000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000008,
          "completion": 0.000024,
          "image": 0
        }
      },
      {
        "id": "anthropic/claude-2.1",
        "name": "Claude v2.1",
        "description": "Claude 2 delivers advancements in key capabilities for enterprises—including an industry-leading 200K token context window, significant reductions in rates of model hallucination, system prompts and a new beta feature: tool use.",
        "context_length": 200000,
        "capabilities": [
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.000008,
          "completion": 0.000024,
          "image": 0
        }
      },
      {
        "id": "anthropic/claude-2.0:beta",
        "name": "Claude v2.0 (self-moderated)",
        "description": "Anthropic's flagship model. Superior performance on tasks that require complex reasoning. Supports hundreds of pages of text.",
        "context_length": 100000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000008,
          "completion": 0.000024,
          "image": 0
        }
      },
      {
        "id": "anthropic/claude-2.0",
        "name": "Claude v2.0",
        "description": "Anthropic's flagship model. Superior performance on tasks that require complex reasoning. Supports hundreds of pages of text.",
        "context_length": 100000,
        "capabilities": [
          "长文本",
          "内容审核"
        ],
        "pricing": {
          "prompt": 0.000008,
          "completion": 0.000024,
          "image": 0
        }
      }
    ]
  },
  "perplexity": {
    "name": "Perplexity",
    "description": "perplexity",
    "models": [
      {
        "id": "perplexity/r1-1776",
        "name": "R1 1776",
        "description": "R1 1776 is a version of DeepSeek-R1 that has been post-trained to remove censorship constraints related to topics restricted by the Chinese government. The model retains its original reasoning capabilities while providing direct responses to a wider range of queries. R1 1776 is an offline chat model that does not use the perplexity search subsystem.\n\nThe model was tested on a multilingual dataset of over 1,000 examples covering sensitive topics to measure its likelihood of refusal or overly filtered responses. [Evaluation Results](https://cdn-uploads.huggingface.co/production/uploads/675c8332d01f593dc90817f5/GiN2VqC5hawUgAGJ6oHla.png) Its performance on math and reasoning benchmarks remains similar to the base R1 model. [Reasoning Performance](https://cdn-uploads.huggingface.co/production/uploads/675c8332d01f593dc90817f5/n4Z9Byqp2S7sKUvCvI40R.png)\n\nRead more on the [Blog Post](https://perplexity.ai/hub/blog/open-sourcing-r1-1776)",
        "context_length": 128000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000002,
          "completion": 0.000008,
          "image": 0
        }
      },
      {
        "id": "perplexity/sonar-reasoning",
        "name": "Sonar Reasoning",
        "description": "Sonar Reasoning is a reasoning model provided by Perplexity based on [DeepSeek R1](/deepseek/deepseek-r1).\n\nIt allows developers to utilize long chain of thought with built-in web search. Sonar Reasoning is uncensored and hosted in US datacenters. ",
        "context_length": 127000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000001,
          "completion": 0.000005,
          "image": 0
        }
      },
      {
        "id": "perplexity/sonar",
        "name": "Sonar",
        "description": "Sonar is lightweight, affordable, fast, and simple to use — now featuring citations and the ability to customize sources. It is designed for companies seeking to integrate lightweight question-and-answer features optimized for speed.",
        "context_length": 127072,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000001,
          "completion": 0.000001,
          "image": 0
        }
      },
      {
        "id": "perplexity/llama-3.1-sonar-small-128k-chat",
        "name": "Llama 3.1 Sonar 8B",
        "description": "Llama 3.1 Sonar is Perplexity's latest model family. It surpasses their earlier Sonar models in cost-efficiency, speed, and performance.\n\nThis is a normal offline LLM, but the [online version](/models/perplexity/llama-3.1-sonar-small-128k-online) of this model has Internet access.",
        "context_length": 131072,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 2e-7,
          "completion": 2e-7,
          "image": 0
        }
      },
      {
        "id": "perplexity/llama-3.1-sonar-large-128k-chat",
        "name": "Llama 3.1 Sonar 70B",
        "description": "Llama 3.1 Sonar is Perplexity's latest model family. It surpasses their earlier Sonar models in cost-efficiency, speed, and performance.\n\nThis is a normal offline LLM, but the [online version](/models/perplexity/llama-3.1-sonar-large-128k-online) of this model has Internet access.",
        "context_length": 131072,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000001,
          "completion": 0.000001,
          "image": 0
        }
      },
      {
        "id": "perplexity/llama-3.1-sonar-large-128k-online",
        "name": "Llama 3.1 Sonar 70B Online",
        "description": "Llama 3.1 Sonar is Perplexity's latest model family. It surpasses their earlier Sonar models in cost-efficiency, speed, and performance.\n\nThis is the online version of the [offline chat model](/models/perplexity/llama-3.1-sonar-large-128k-chat). It is focused on delivering helpful, up-to-date, and factual responses. #online",
        "context_length": 127072,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000001,
          "completion": 0.000001,
          "image": 0
        }
      },
      {
        "id": "perplexity/llama-3.1-sonar-small-128k-online",
        "name": "Llama 3.1 Sonar 8B Online",
        "description": "Llama 3.1 Sonar is Perplexity's latest model family. It surpasses their earlier Sonar models in cost-efficiency, speed, and performance.\n\nThis is the online version of the [offline chat model](/models/perplexity/llama-3.1-sonar-small-128k-chat). It is focused on delivering helpful, up-to-date, and factual responses. #online",
        "context_length": 127072,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 2e-7,
          "completion": 2e-7,
          "image": 0
        }
      }
    ]
  },
  "mistralai": {
    "name": "Mistralai",
    "description": "mistralai",
    "models": [
      {
        "id": "mistralai/mistral-saba",
        "name": "Saba",
        "description": "Mistral Saba is a 24B-parameter language model specifically designed for the Middle East and South Asia, delivering accurate and contextually relevant responses while maintaining efficient performance. Trained on curated regional datasets, it supports multiple Indian-origin languages—including Tamil and Malayalam—alongside Arabic. This makes it a versatile option for a range of regional and multilingual applications. Read more at the blog post [here](https://mistral.ai/en/news/mistral-saba)",
        "context_length": 32000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 2e-7,
          "completion": 6e-7,
          "image": 0
        }
      },
      {
        "id": "mistralai/mistral-small-24b-instruct-2501:free",
        "name": "Mistral Small 3 (free)",
        "description": "Mistral Small 3 is a 24B-parameter language model optimized for low-latency performance across common AI tasks. Released under the Apache 2.0 license, it features both pre-trained and instruction-tuned versions designed for efficient local deployment.\n\nThe model achieves 81% accuracy on the MMLU benchmark and performs competitively with larger models like Llama 3.3 70B and Qwen 32B, while operating at three times the speed on equivalent hardware. [Read the blog post about the model here.](https://mistral.ai/news/mistral-small-3/)",
        "context_length": 32000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "mistralai/mistral-small-24b-instruct-2501",
        "name": "Mistral Small 3",
        "description": "Mistral Small 3 is a 24B-parameter language model optimized for low-latency performance across common AI tasks. Released under the Apache 2.0 license, it features both pre-trained and instruction-tuned versions designed for efficient local deployment.\n\nThe model achieves 81% accuracy on the MMLU benchmark and performs competitively with larger models like Llama 3.3 70B and Qwen 32B, while operating at three times the speed on equivalent hardware. [Read the blog post about the model here.](https://mistral.ai/news/mistral-small-3/)",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 7e-8,
          "completion": 1.4e-7,
          "image": 0
        }
      },
      {
        "id": "mistralai/codestral-2501",
        "name": "Codestral 2501",
        "description": "[Mistral](/mistralai)'s cutting-edge language model for coding. Codestral specializes in low-latency, high-frequency tasks such as fill-in-the-middle (FIM), code correction and test generation. \n\nLearn more on their blog post: https://mistral.ai/news/codestral-2501/",
        "context_length": 256000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 3e-7,
          "completion": 9e-7,
          "image": 0
        }
      },
      {
        "id": "mistralai/mistral-large-2411",
        "name": "Mistral Large 2411",
        "description": "Mistral Large 2 2411 is an update of [Mistral Large 2](/mistralai/mistral-large) released together with [Pixtral Large 2411](/mistralai/pixtral-large-2411)\n\nIt provides a significant upgrade on the previous [Mistral Large 24.07](/mistralai/mistral-large-2407), with notable improvements in long context understanding, a new system prompt, and more accurate function calling.",
        "context_length": 128000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000002,
          "completion": 0.000006,
          "image": 0
        }
      },
      {
        "id": "mistralai/mistral-large-2407",
        "name": "Mistral Large 2407",
        "description": "This is Mistral AI's flagship model, Mistral Large 2 (version mistral-large-2407). It's a proprietary weights-available model and excels at reasoning, code, JSON, chat, and more. Read the launch announcement [here](https://mistral.ai/news/mistral-large-2407/).\n\nIt supports dozens of languages including French, German, Spanish, Italian, Portuguese, Arabic, Hindi, Russian, Chinese, Japanese, and Korean, along with 80+ coding languages including Python, Java, C, C++, JavaScript, and Bash. Its long context window allows precise information recall from large documents.\n",
        "context_length": 128000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000002,
          "completion": 0.000006,
          "image": 0
        }
      },
      {
        "id": "mistralai/pixtral-large-2411",
        "name": "Pixtral Large 2411",
        "description": "Pixtral Large is a 124B parameter, open-weight, multimodal model built on top of [Mistral Large 2](/mistralai/mistral-large-2411). The model is able to understand documents, charts and natural images.\n\nThe model is available under the Mistral Research License (MRL) for research and educational use, and the Mistral Commercial License for experimentation, testing, and production for commercial purposes.\n\n",
        "context_length": 128000,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000002,
          "completion": 0.000006,
          "image": 0.002888
        }
      },
      {
        "id": "mistralai/ministral-8b",
        "name": "Ministral 8B",
        "description": "Ministral 8B is an 8B parameter model featuring a unique interleaved sliding-window attention pattern for faster, memory-efficient inference. Designed for edge use cases, it supports up to 128k context length and excels in knowledge and reasoning tasks. It outperforms peers in the sub-10B category, making it perfect for low-latency, privacy-first applications.",
        "context_length": 128000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 1e-7,
          "completion": 1e-7,
          "image": 0
        }
      },
      {
        "id": "mistralai/ministral-3b",
        "name": "Ministral 3B",
        "description": "Ministral 3B is a 3B parameter model optimized for on-device and edge computing. It excels in knowledge, commonsense reasoning, and function-calling, outperforming larger models like Mistral 7B on most benchmarks. Supporting up to 128k context length, it’s ideal for orchestrating agentic workflows and specialist tasks with efficient inference.",
        "context_length": 128000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 4e-8,
          "completion": 4e-8,
          "image": 0
        }
      },
      {
        "id": "mistralai/pixtral-12b",
        "name": "Pixtral 12B",
        "description": "The first multi-modal, text+image-to-text model from Mistral AI. Its weights were launched via torrent: https://x.com/mistralai/status/1833758285167722836.",
        "context_length": 4096,
        "capabilities": [
          "视觉"
        ],
        "pricing": {
          "prompt": 1e-7,
          "completion": 1e-7,
          "image": 0.0001445
        }
      },
      {
        "id": "mistralai/mistral-nemo:free",
        "name": "Mistral Nemo (free)",
        "description": "A 12B parameter model with a 128k token context length built by Mistral in collaboration with NVIDIA.\n\nThe model is multilingual, supporting English, French, German, Spanish, Italian, Portuguese, Chinese, Japanese, Korean, Arabic, and Hindi.\n\nIt supports function calling and is released under the Apache 2.0 license.",
        "context_length": 128000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "mistralai/mistral-nemo",
        "name": "Mistral Nemo",
        "description": "A 12B parameter model with a 128k token context length built by Mistral in collaboration with NVIDIA.\n\nThe model is multilingual, supporting English, French, German, Spanish, Italian, Portuguese, Chinese, Japanese, Korean, Arabic, and Hindi.\n\nIt supports function calling and is released under the Apache 2.0 license.",
        "context_length": 131072,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 3.5e-8,
          "completion": 8e-8,
          "image": 0
        }
      },
      {
        "id": "mistralai/codestral-mamba",
        "name": "Codestral Mamba",
        "description": "A 7.3B parameter Mamba-based model designed for code and reasoning tasks.\n\n- Linear time inference, allowing for theoretically infinite sequence lengths\n- 256k token context window\n- Optimized for quick responses, especially beneficial for code productivity\n- Performs comparably to state-of-the-art transformer models in code and reasoning tasks\n- Available under the Apache 2.0 license for free use, modification, and distribution",
        "context_length": 256000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 2.5e-7,
          "completion": 2.5e-7,
          "image": 0
        }
      },
      {
        "id": "mistralai/mistral-7b-instruct:free",
        "name": "Mistral 7B Instruct (free)",
        "description": "A high-performing, industry-standard 7.3B parameter model, with optimizations for speed and context length.\n\n*Mistral 7B Instruct has multiple version variants, and this is intended to be the latest version.*",
        "context_length": 8192,
        "capabilities": [],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "mistralai/mistral-7b-instruct",
        "name": "Mistral 7B Instruct",
        "description": "A high-performing, industry-standard 7.3B parameter model, with optimizations for speed and context length.\n\n*Mistral 7B Instruct has multiple version variants, and this is intended to be the latest version.*",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 3e-8,
          "completion": 5.5e-8,
          "image": 0
        }
      },
      {
        "id": "mistralai/mistral-7b-instruct-v0.3",
        "name": "Mistral 7B Instruct v0.3",
        "description": "A high-performing, industry-standard 7.3B parameter model, with optimizations for speed and context length.\n\nAn improved version of [Mistral 7B Instruct v0.2](/models/mistralai/mistral-7b-instruct-v0.2), with the following changes:\n\n- Extended vocabulary to 32768\n- Supports v3 Tokenizer\n- Supports function calling\n\nNOTE: Support for function calling depends on the provider.",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 3e-8,
          "completion": 5.5e-8,
          "image": 0
        }
      },
      {
        "id": "mistralai/mixtral-8x22b-instruct",
        "name": "Mixtral 8x22B Instruct",
        "description": "Mistral's official instruct fine-tuned version of [Mixtral 8x22B](/models/mistralai/mixtral-8x22b). It uses 39B active parameters out of 141B, offering unparalleled cost efficiency for its size. Its strengths include:\n- strong math, coding, and reasoning\n- large context length (64k)\n- fluency in English, French, Italian, German, and Spanish\n\nSee benchmarks on the launch announcement [here](https://mistral.ai/news/mixtral-8x22b/).\n#moe",
        "context_length": 65536,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 9e-7,
          "completion": 9e-7,
          "image": 0
        }
      },
      {
        "id": "mistralai/mistral-large",
        "name": "Mistral Large",
        "description": "This is Mistral AI's flagship model, Mistral Large 2 (version `mistral-large-2407`). It's a proprietary weights-available model and excels at reasoning, code, JSON, chat, and more. Read the launch announcement [here](https://mistral.ai/news/mistral-large-2407/).\n\nIt supports dozens of languages including French, German, Spanish, Italian, Portuguese, Arabic, Hindi, Russian, Chinese, Japanese, and Korean, along with 80+ coding languages including Python, Java, C, C++, JavaScript, and Bash. Its long context window allows precise information recall from large documents.",
        "context_length": 128000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000002,
          "completion": 0.000006,
          "image": 0
        }
      },
      {
        "id": "mistralai/mistral-small",
        "name": "Mistral Small",
        "description": "With 22 billion parameters, Mistral Small v24.09 offers a convenient mid-point between (Mistral NeMo 12B)[/mistralai/mistral-nemo] and (Mistral Large 2)[/mistralai/mistral-large], providing a cost-effective solution that can be deployed across various platforms and environments. It has better reasoning, exhibits more capabilities, can produce and reason about code, and is multiligual, supporting English, French, German, Italian, and Spanish.",
        "context_length": 32000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 2e-7,
          "completion": 6e-7,
          "image": 0
        }
      },
      {
        "id": "mistralai/mistral-tiny",
        "name": "Mistral Tiny",
        "description": "This model is currently powered by Mistral-7B-v0.2, and incorporates a \"better\" fine-tuning than [Mistral 7B](/models/mistralai/mistral-7b-instruct-v0.1), inspired by community work. It's best used for large batch processing tasks where cost is a significant factor but reasoning capabilities are not crucial.",
        "context_length": 32000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 2.5e-7,
          "completion": 2.5e-7,
          "image": 0
        }
      },
      {
        "id": "mistralai/mistral-medium",
        "name": "Mistral Medium",
        "description": "This is Mistral AI's closed-source, medium-sided model. It's powered by a closed-source prototype and excels at reasoning, code, JSON, chat, and more. In benchmarks, it compares with many of the flagship models of other companies.",
        "context_length": 32000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.00000275,
          "completion": 0.0000081,
          "image": 0
        }
      },
      {
        "id": "mistralai/mixtral-8x7b",
        "name": "Mixtral 8x7B (base)",
        "description": "Mixtral 8x7B is a pretrained generative Sparse Mixture of Experts, by Mistral AI. Incorporates 8 experts (feed-forward networks) for a total of 47B parameters. Base model (not fine-tuned for instructions) - see [Mixtral 8x7B Instruct](/models/mistralai/mixtral-8x7b-instruct) for an instruct-tuned model.\n\n#moe",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 6e-7,
          "completion": 6e-7,
          "image": 0
        }
      },
      {
        "id": "mistralai/mixtral-8x7b-instruct",
        "name": "Mixtral 8x7B Instruct",
        "description": "Mixtral 8x7B Instruct is a pretrained generative Sparse Mixture of Experts, by Mistral AI, for chat and instruction use. Incorporates 8 experts (feed-forward networks) for a total of 47 billion parameters.\n\nInstruct model fine-tuned by Mistral. #moe",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 2.4e-7,
          "completion": 2.4e-7,
          "image": 0
        }
      },
      {
        "id": "mistralai/mistral-7b-instruct-v0.1",
        "name": "Mistral 7B Instruct v0.1",
        "description": "A 7.3B parameter model that outperforms Llama 2 13B on all benchmarks, with optimizations for speed and context length.",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 2e-7,
          "completion": 2e-7,
          "image": 0
        }
      }
    ]
  },
  "cognitivecomputations": {
    "name": "Cognitivecomputations",
    "description": "cognitivecomputations",
    "models": [
      {
        "id": "cognitivecomputations/dolphin3.0-r1-mistral-24b:free",
        "name": "Dolphin3.0 R1 Mistral 24B (free)",
        "description": "Dolphin 3.0 R1 is the next generation of the Dolphin series of instruct-tuned models.  Designed to be the ultimate general purpose local model, enabling coding, math, agentic, function calling, and general use cases.\n\nThe R1 version has been trained for 3 epochs to reason using 800k reasoning traces from the Dolphin-R1 dataset.\n\nDolphin aims to be a general purpose reasoning instruct model, similar to the models behind ChatGPT, Claude, Gemini.\n\nPart of the [Dolphin 3.0 Collection](https://huggingface.co/collections/cognitivecomputations/dolphin-30-677ab47f73d7ff66743979a3) Curated and trained by [Eric Hartford](https://huggingface.co/ehartford), [Ben Gitter](https://huggingface.co/bigstorm), [BlouseJury](https://huggingface.co/BlouseJury) and [Cognitive Computations](https://huggingface.co/cognitivecomputations)",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "cognitivecomputations/dolphin3.0-mistral-24b:free",
        "name": "Dolphin3.0 Mistral 24B (free)",
        "description": "Dolphin 3.0 is the next generation of the Dolphin series of instruct-tuned models.  Designed to be the ultimate general purpose local model, enabling coding, math, agentic, function calling, and general use cases.\n\nDolphin aims to be a general purpose instruct model, similar to the models behind ChatGPT, Claude, Gemini. \n\nPart of the [Dolphin 3.0 Collection](https://huggingface.co/collections/cognitivecomputations/dolphin-30-677ab47f73d7ff66743979a3) Curated and trained by [Eric Hartford](https://huggingface.co/ehartford), [Ben Gitter](https://huggingface.co/bigstorm), [BlouseJury](https://huggingface.co/BlouseJury) and [Cognitive Computations](https://huggingface.co/cognitivecomputations)",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "cognitivecomputations/dolphin-mixtral-8x22b",
        "name": "Dolphin 2.9.2 Mixtral 8x22B 🐬",
        "description": "Dolphin 2.9 is designed for instruction following, conversational, and coding. This model is a finetune of [Mixtral 8x22B Instruct](/models/mistralai/mixtral-8x22b-instruct). It features a 64k context length and was fine-tuned with a 16k sequence length using ChatML templates.\n\nThis model is a successor to [Dolphin Mixtral 8x7B](/models/cognitivecomputations/dolphin-mixtral-8x7b).\n\nThe model is uncensored and is stripped of alignment and bias. It requires an external alignment layer for ethical use. Users are cautioned to use this highly compliant model responsibly, as detailed in a blog post about uncensored models at [erichartford.com/uncensored-models](https://erichartford.com/uncensored-models).\n\n#moe #uncensored",
        "context_length": 16000,
        "capabilities": [],
        "pricing": {
          "prompt": 9e-7,
          "completion": 9e-7,
          "image": 0
        }
      },
      {
        "id": "cognitivecomputations/dolphin-mixtral-8x7b",
        "name": "Dolphin 2.6 Mixtral 8x7B 🐬",
        "description": "This is a 16k context fine-tune of [Mixtral-8x7b](/models/mistralai/mixtral-8x7b). It excels in coding tasks due to extensive training with coding data and is known for its obedience, although it lacks DPO tuning.\n\nThe model is uncensored and is stripped of alignment and bias. It requires an external alignment layer for ethical use. Users are cautioned to use this highly compliant model responsibly, as detailed in a blog post about uncensored models at [erichartford.com/uncensored-models](https://erichartford.com/uncensored-models).\n\n#moe #uncensored",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 5e-7,
          "completion": 5e-7,
          "image": 0
        }
      }
    ]
  },
  "meta-llama": {
    "name": "Meta-llama",
    "description": "meta-llama",
    "models": [
      {
        "id": "meta-llama/llama-guard-3-8b",
        "name": "Llama Guard 3 8B",
        "description": "Llama Guard 3 is a Llama-3.1-8B pretrained model, fine-tuned for content safety classification. Similar to previous versions, it can be used to classify content in both LLM inputs (prompt classification) and in LLM responses (response classification). It acts as an LLM – it generates text in its output that indicates whether a given prompt or response is safe or unsafe, and if unsafe, it also lists the content categories violated.\n\nLlama Guard 3 was aligned to safeguard against the MLCommons standardized hazards taxonomy and designed to support Llama 3.1 capabilities. Specifically, it provides content moderation in 8 languages, and was optimized to support safety and security for search and code interpreter tool calls.\n",
        "context_length": 8192,
        "capabilities": [],
        "pricing": {
          "prompt": 2e-7,
          "completion": 2e-7,
          "image": 0
        }
      },
      {
        "id": "meta-llama/llama-3.3-70b-instruct:free",
        "name": "Llama 3.3 70B Instruct (free)",
        "description": "The Meta Llama 3.3 multilingual large language model (LLM) is a pretrained and instruction tuned generative model in 70B (text in/text out). The Llama 3.3 instruction tuned text only model is optimized for multilingual dialogue use cases and outperforms many of the available open source and closed chat models on common industry benchmarks.\n\nSupported languages: English, German, French, Italian, Portuguese, Hindi, Spanish, and Thai.\n\n[Model Card](https://github.com/meta-llama/llama-models/blob/main/models/llama3_3/MODEL_CARD.md)",
        "context_length": 131072,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "meta-llama/llama-3.3-70b-instruct",
        "name": "Llama 3.3 70B Instruct",
        "description": "The Meta Llama 3.3 multilingual large language model (LLM) is a pretrained and instruction tuned generative model in 70B (text in/text out). The Llama 3.3 instruction tuned text only model is optimized for multilingual dialogue use cases and outperforms many of the available open source and closed chat models on common industry benchmarks.\n\nSupported languages: English, German, French, Italian, Portuguese, Hindi, Spanish, and Thai.\n\n[Model Card](https://github.com/meta-llama/llama-models/blob/main/models/llama3_3/MODEL_CARD.md)",
        "context_length": 131072,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 1.2e-7,
          "completion": 3e-7,
          "image": 0
        }
      },
      {
        "id": "meta-llama/llama-3.2-3b-instruct",
        "name": "Llama 3.2 3B Instruct",
        "description": "Llama 3.2 3B is a 3-billion-parameter multilingual large language model, optimized for advanced natural language processing tasks like dialogue generation, reasoning, and summarization. Designed with the latest transformer architecture, it supports eight languages, including English, Spanish, and Hindi, and is adaptable for additional languages.\n\nTrained on 9 trillion tokens, the Llama 3.2 3B model excels in instruction-following, complex reasoning, and tool use. Its balanced performance makes it ideal for applications needing accuracy and efficiency in text generation across multilingual settings.\n\nClick here for the [original model card](https://github.com/meta-llama/llama-models/blob/main/models/llama3_2/MODEL_CARD.md).\n\nUsage of this model is subject to [Meta's Acceptable Use Policy](https://www.llama.com/llama3/use-policy/).",
        "context_length": 131000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 1.5e-8,
          "completion": 2.5e-8,
          "image": 0
        }
      },
      {
        "id": "meta-llama/llama-3.2-1b-instruct:free",
        "name": "Llama 3.2 1B Instruct (free)",
        "description": "Llama 3.2 1B is a 1-billion-parameter language model focused on efficiently performing natural language tasks, such as summarization, dialogue, and multilingual text analysis. Its smaller size allows it to operate efficiently in low-resource environments while maintaining strong task performance.\n\nSupporting eight core languages and fine-tunable for more, Llama 1.3B is ideal for businesses or developers seeking lightweight yet powerful AI solutions that can operate in diverse multilingual settings without the high computational demand of larger models.\n\nClick here for the [original model card](https://github.com/meta-llama/llama-models/blob/main/models/llama3_2/MODEL_CARD.md).\n\nUsage of this model is subject to [Meta's Acceptable Use Policy](https://www.llama.com/llama3/use-policy/).",
        "context_length": 131072,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "meta-llama/llama-3.2-1b-instruct",
        "name": "Llama 3.2 1B Instruct",
        "description": "Llama 3.2 1B is a 1-billion-parameter language model focused on efficiently performing natural language tasks, such as summarization, dialogue, and multilingual text analysis. Its smaller size allows it to operate efficiently in low-resource environments while maintaining strong task performance.\n\nSupporting eight core languages and fine-tunable for more, Llama 1.3B is ideal for businesses or developers seeking lightweight yet powerful AI solutions that can operate in diverse multilingual settings without the high computational demand of larger models.\n\nClick here for the [original model card](https://github.com/meta-llama/llama-models/blob/main/models/llama3_2/MODEL_CARD.md).\n\nUsage of this model is subject to [Meta's Acceptable Use Policy](https://www.llama.com/llama3/use-policy/).",
        "context_length": 131072,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 1e-8,
          "completion": 1e-8,
          "image": 0
        }
      },
      {
        "id": "meta-llama/llama-3.2-90b-vision-instruct",
        "name": "Llama 3.2 90B Vision Instruct",
        "description": "The Llama 90B Vision model is a top-tier, 90-billion-parameter multimodal model designed for the most challenging visual reasoning and language tasks. It offers unparalleled accuracy in image captioning, visual question answering, and advanced image-text comprehension. Pre-trained on vast multimodal datasets and fine-tuned with human feedback, the Llama 90B Vision is engineered to handle the most demanding image-based AI tasks.\n\nThis model is perfect for industries requiring cutting-edge multimodal AI capabilities, particularly those dealing with complex, real-time visual and textual analysis.\n\nClick here for the [original model card](https://github.com/meta-llama/llama-models/blob/main/models/llama3_2/MODEL_CARD_VISION.md).\n\nUsage of this model is subject to [Meta's Acceptable Use Policy](https://www.llama.com/llama3/use-policy/).",
        "context_length": 4096,
        "capabilities": [
          "视觉"
        ],
        "pricing": {
          "prompt": 8e-7,
          "completion": 0.0000016,
          "image": 0.0051456
        }
      },
      {
        "id": "meta-llama/llama-3.2-11b-vision-instruct:free",
        "name": "Llama 3.2 11B Vision Instruct (free)",
        "description": "Llama 3.2 11B Vision is a multimodal model with 11 billion parameters, designed to handle tasks combining visual and textual data. It excels in tasks such as image captioning and visual question answering, bridging the gap between language generation and visual reasoning. Pre-trained on a massive dataset of image-text pairs, it performs well in complex, high-accuracy image analysis.\n\nIts ability to integrate visual understanding with language processing makes it an ideal solution for industries requiring comprehensive visual-linguistic AI applications, such as content creation, AI-driven customer service, and research.\n\nClick here for the [original model card](https://github.com/meta-llama/llama-models/blob/main/models/llama3_2/MODEL_CARD_VISION.md).\n\nUsage of this model is subject to [Meta's Acceptable Use Policy](https://www.llama.com/llama3/use-policy/).",
        "context_length": 131072,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "meta-llama/llama-3.2-11b-vision-instruct",
        "name": "Llama 3.2 11B Vision Instruct",
        "description": "Llama 3.2 11B Vision is a multimodal model with 11 billion parameters, designed to handle tasks combining visual and textual data. It excels in tasks such as image captioning and visual question answering, bridging the gap between language generation and visual reasoning. Pre-trained on a massive dataset of image-text pairs, it performs well in complex, high-accuracy image analysis.\n\nIts ability to integrate visual understanding with language processing makes it an ideal solution for industries requiring comprehensive visual-linguistic AI applications, such as content creation, AI-driven customer service, and research.\n\nClick here for the [original model card](https://github.com/meta-llama/llama-models/blob/main/models/llama3_2/MODEL_CARD_VISION.md).\n\nUsage of this model is subject to [Meta's Acceptable Use Policy](https://www.llama.com/llama3/use-policy/).",
        "context_length": 16384,
        "capabilities": [
          "视觉"
        ],
        "pricing": {
          "prompt": 5.5e-8,
          "completion": 5.5e-8,
          "image": 0
        }
      },
      {
        "id": "meta-llama/llama-3.1-405b",
        "name": "Llama 3.1 405B (base)",
        "description": "Meta's latest class of model (Llama 3.1) launched with a variety of sizes & flavors. This is the base 405B pre-trained version.\n\nIt has demonstrated strong performance compared to leading closed-source models in human evaluations.\n\nTo read more about the model release, [click here](https://ai.meta.com/blog/meta-llama-3/). Usage of this model is subject to [Meta's Acceptable Use Policy](https://llama.meta.com/llama3/use-policy/).",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000002,
          "completion": 0.000002,
          "image": 0
        }
      },
      {
        "id": "meta-llama/llama-3.1-405b-instruct",
        "name": "Llama 3.1 405B Instruct",
        "description": "The highly anticipated 400B class of Llama3 is here! Clocking in at 128k context with impressive eval scores, the Meta AI team continues to push the frontier of open-source LLMs.\n\nMeta's latest class of model (Llama 3.1) launched with a variety of sizes & flavors. This 405B instruct-tuned version is optimized for high quality dialogue usecases.\n\nIt has demonstrated strong performance compared to leading closed-source models including GPT-4o and Claude 3.5 Sonnet in evaluations.\n\nTo read more about the model release, [click here](https://ai.meta.com/blog/meta-llama-3-1/). Usage of this model is subject to [Meta's Acceptable Use Policy](https://llama.meta.com/llama3/use-policy/).",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 8e-7,
          "completion": 8e-7,
          "image": 0
        }
      },
      {
        "id": "meta-llama/llama-3.1-8b-instruct:free",
        "name": "Llama 3.1 8B Instruct (free)",
        "description": "Meta's latest class of model (Llama 3.1) launched with a variety of sizes & flavors. This 8B instruct-tuned version is fast and efficient.\n\nIt has demonstrated strong performance compared to leading closed-source models in human evaluations.\n\nTo read more about the model release, [click here](https://ai.meta.com/blog/meta-llama-3-1/). Usage of this model is subject to [Meta's Acceptable Use Policy](https://llama.meta.com/llama3/use-policy/).",
        "context_length": 131072,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "meta-llama/llama-3.1-8b-instruct",
        "name": "Llama 3.1 8B Instruct",
        "description": "Meta's latest class of model (Llama 3.1) launched with a variety of sizes & flavors. This 8B instruct-tuned version is fast and efficient.\n\nIt has demonstrated strong performance compared to leading closed-source models in human evaluations.\n\nTo read more about the model release, [click here](https://ai.meta.com/blog/meta-llama-3-1/). Usage of this model is subject to [Meta's Acceptable Use Policy](https://llama.meta.com/llama3/use-policy/).",
        "context_length": 131072,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 2e-8,
          "completion": 5e-8,
          "image": 0
        }
      },
      {
        "id": "meta-llama/llama-3.1-70b-instruct",
        "name": "Llama 3.1 70B Instruct",
        "description": "Meta's latest class of model (Llama 3.1) launched with a variety of sizes & flavors. This 70B instruct-tuned version is optimized for high quality dialogue usecases.\n\nIt has demonstrated strong performance compared to leading closed-source models in human evaluations.\n\nTo read more about the model release, [click here](https://ai.meta.com/blog/meta-llama-3-1/). Usage of this model is subject to [Meta's Acceptable Use Policy](https://llama.meta.com/llama3/use-policy/).",
        "context_length": 131072,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 1.2e-7,
          "completion": 3e-7,
          "image": 0
        }
      },
      {
        "id": "meta-llama/llama-3-8b",
        "name": "Llama 3 8B (Base)",
        "description": "Meta's latest class of model (Llama 3) launched with a variety of sizes & flavors. This is the base 8B pre-trained version.\n\nIt has demonstrated strong performance compared to leading closed-source models in human evaluations.\n\nTo read more about the model release, [click here](https://ai.meta.com/blog/meta-llama-3/). Usage of this model is subject to [Meta's Acceptable Use Policy](https://llama.meta.com/llama3/use-policy/).",
        "context_length": 8192,
        "capabilities": [],
        "pricing": {
          "prompt": 5e-8,
          "completion": 8e-8,
          "image": 0
        }
      },
      {
        "id": "meta-llama/llama-3-70b",
        "name": "Llama 3 70B (Base)",
        "description": "Meta's latest class of model (Llama 3) launched with a variety of sizes & flavors. This is the base 70B pre-trained version.\n\nIt has demonstrated strong performance compared to leading closed-source models in human evaluations.\n\nTo read more about the model release, [click here](https://ai.meta.com/blog/meta-llama-3/). Usage of this model is subject to [Meta's Acceptable Use Policy](https://llama.meta.com/llama3/use-policy/).",
        "context_length": 8192,
        "capabilities": [],
        "pricing": {
          "prompt": 5.9e-7,
          "completion": 7.9e-7,
          "image": 0
        }
      },
      {
        "id": "meta-llama/llama-guard-2-8b",
        "name": "LlamaGuard 2 8B",
        "description": "This safeguard model has 8B parameters and is based on the Llama 3 family. Just like is predecessor, [LlamaGuard 1](https://huggingface.co/meta-llama/LlamaGuard-7b), it can do both prompt and response classification.\n\nLlamaGuard 2 acts as a normal LLM would, generating text that indicates whether the given input/output is safe/unsafe. If deemed unsafe, it will also share the content categories violated.\n\nFor best results, please use raw prompt input or the `/completions` endpoint, instead of the chat API.\n\nIt has demonstrated strong performance compared to leading closed-source models in human evaluations.\n\nTo read more about the model release, [click here](https://ai.meta.com/blog/meta-llama-3/). Usage of this model is subject to [Meta's Acceptable Use Policy](https://llama.meta.com/llama3/use-policy/).",
        "context_length": 8192,
        "capabilities": [],
        "pricing": {
          "prompt": 2e-7,
          "completion": 2e-7,
          "image": 0
        }
      },
      {
        "id": "meta-llama/llama-3-8b-instruct:free",
        "name": "Llama 3 8B Instruct (free)",
        "description": "Meta's latest class of model (Llama 3) launched with a variety of sizes & flavors. This 8B instruct-tuned version was optimized for high quality dialogue usecases.\n\nIt has demonstrated strong performance compared to leading closed-source models in human evaluations.\n\nTo read more about the model release, [click here](https://ai.meta.com/blog/meta-llama-3/). Usage of this model is subject to [Meta's Acceptable Use Policy](https://llama.meta.com/llama3/use-policy/).",
        "context_length": 8192,
        "capabilities": [],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "meta-llama/llama-3-8b-instruct",
        "name": "Llama 3 8B Instruct",
        "description": "Meta's latest class of model (Llama 3) launched with a variety of sizes & flavors. This 8B instruct-tuned version was optimized for high quality dialogue usecases.\n\nIt has demonstrated strong performance compared to leading closed-source models in human evaluations.\n\nTo read more about the model release, [click here](https://ai.meta.com/blog/meta-llama-3/). Usage of this model is subject to [Meta's Acceptable Use Policy](https://llama.meta.com/llama3/use-policy/).",
        "context_length": 8192,
        "capabilities": [],
        "pricing": {
          "prompt": 3e-8,
          "completion": 6e-8,
          "image": 0
        }
      },
      {
        "id": "meta-llama/llama-3-70b-instruct",
        "name": "Llama 3 70B Instruct",
        "description": "Meta's latest class of model (Llama 3) launched with a variety of sizes & flavors. This 70B instruct-tuned version was optimized for high quality dialogue usecases.\n\nIt has demonstrated strong performance compared to leading closed-source models in human evaluations.\n\nTo read more about the model release, [click here](https://ai.meta.com/blog/meta-llama-3/). Usage of this model is subject to [Meta's Acceptable Use Policy](https://llama.meta.com/llama3/use-policy/).",
        "context_length": 8192,
        "capabilities": [],
        "pricing": {
          "prompt": 2.3e-7,
          "completion": 4e-7,
          "image": 0
        }
      },
      {
        "id": "meta-llama/llama-2-13b-chat",
        "name": "Llama 2 13B Chat",
        "description": "A 13 billion parameter language model from Meta, fine tuned for chat completions",
        "context_length": 4096,
        "capabilities": [],
        "pricing": {
          "prompt": 2.2e-7,
          "completion": 2.2e-7,
          "image": 0
        }
      },
      {
        "id": "meta-llama/llama-2-70b-chat",
        "name": "Llama 2 70B Chat",
        "description": "The flagship, 70 billion parameter language model from Meta, fine tuned for chat completions. Llama 2 is an auto-regressive language model that uses an optimized transformer architecture. The tuned versions use supervised fine-tuning (SFT) and reinforcement learning with human feedback (RLHF) to align to human preferences for helpfulness and safety.",
        "context_length": 4096,
        "capabilities": [],
        "pricing": {
          "prompt": 9e-7,
          "completion": 9e-7,
          "image": 0
        }
      }
    ]
  },
  "allenai": {
    "name": "Allenai",
    "description": "allenai",
    "models": [
      {
        "id": "allenai/llama-3.1-tulu-3-405b",
        "name": "Llama 3.1 Tulu 3 405B",
        "description": "Tülu 3 405B is the largest model in the Tülu 3 family, applying fully open post-training recipes at a 405B parameter scale. Built on the Llama 3.1 405B base, it leverages Reinforcement Learning with Verifiable Rewards (RLVR) to enhance instruction following, MATH, GSM8K, and IFEval performance. As part of Tülu 3’s fully open-source approach, it offers state-of-the-art capabilities while surpassing prior open-weight models like Llama 3.1 405B Instruct and Nous Hermes 3 405B on multiple benchmarks. To read more, [click here.](https://allenai.org/blog/tulu-3-405B)",
        "context_length": 16000,
        "capabilities": [],
        "pricing": {
          "prompt": 0.000005,
          "completion": 0.00001,
          "image": 0
        }
      }
    ]
  },
  "deepseek": {
    "name": "Deepseek",
    "description": "deepseek",
    "models": [
      {
        "id": "deepseek/deepseek-r1-distill-llama-8b",
        "name": "R1 Distill Llama 8B",
        "description": "DeepSeek R1 Distill Llama 8B is a distilled large language model based on [Llama-3.1-8B-Instruct](/meta-llama/llama-3.1-8b-instruct), using outputs from [DeepSeek R1](/deepseek/deepseek-r1). The model combines advanced distillation techniques to achieve high performance across multiple benchmarks, including:\n\n- AIME 2024 pass@1: 50.4\n- MATH-500 pass@1: 89.1\n- CodeForces Rating: 1205\n\nThe model leverages fine-tuning from DeepSeek R1's outputs, enabling competitive performance comparable to larger frontier models.\n\nHugging Face: \n- [Llama-3.1-8B](https://huggingface.co/meta-llama/Llama-3.1-8B) \n- [DeepSeek-R1-Distill-Llama-8B](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Llama-8B)   |",
        "context_length": 32000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 4e-8,
          "completion": 4e-8,
          "image": 0
        }
      },
      {
        "id": "deepseek/deepseek-r1-distill-qwen-1.5b",
        "name": "R1 Distill Qwen 1.5B",
        "description": "DeepSeek R1 Distill Qwen 1.5B is a distilled large language model based on  [Qwen 2.5 Math 1.5B](https://huggingface.co/Qwen/Qwen2.5-Math-1.5B), using outputs from [DeepSeek R1](/deepseek/deepseek-r1). It's a very small and efficient model which outperforms [GPT 4o 0513](/openai/gpt-4o-2024-05-13) on Math Benchmarks.\n\nOther benchmark results include:\n\n- AIME 2024 pass@1: 28.9\n- AIME 2024 cons@64: 52.7\n- MATH-500 pass@1: 83.9\n\nThe model leverages fine-tuning from DeepSeek R1's outputs, enabling competitive performance comparable to larger frontier models.",
        "context_length": 131072,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 1.8e-7,
          "completion": 1.8e-7,
          "image": 0
        }
      },
      {
        "id": "deepseek/deepseek-r1-distill-qwen-32b",
        "name": "R1 Distill Qwen 32B",
        "description": "DeepSeek R1 Distill Qwen 32B is a distilled large language model based on [Qwen 2.5 32B](https://huggingface.co/Qwen/Qwen2.5-32B), using outputs from [DeepSeek R1](/deepseek/deepseek-r1). It outperforms OpenAI's o1-mini across various benchmarks, achieving new state-of-the-art results for dense models.\n\nOther benchmark results include:\n\n- AIME 2024 pass@1: 72.6\n- MATH-500 pass@1: 94.3\n- CodeForces Rating: 1691\n\nThe model leverages fine-tuning from DeepSeek R1's outputs, enabling competitive performance comparable to larger frontier models.",
        "context_length": 131072,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 1.2e-7,
          "completion": 1.8e-7,
          "image": 0
        }
      },
      {
        "id": "deepseek/deepseek-r1-distill-qwen-14b",
        "name": "R1 Distill Qwen 14B",
        "description": "DeepSeek R1 Distill Qwen 14B is a distilled large language model based on [Qwen 2.5 14B](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-14B), using outputs from [DeepSeek R1](/deepseek/deepseek-r1). It outperforms OpenAI's o1-mini across various benchmarks, achieving new state-of-the-art results for dense models.\n\nOther benchmark results include:\n\n- AIME 2024 pass@1: 69.7\n- MATH-500 pass@1: 93.9\n- CodeForces Rating: 1481\n\nThe model leverages fine-tuning from DeepSeek R1's outputs, enabling competitive performance comparable to larger frontier models.",
        "context_length": 131072,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.0000016,
          "completion": 0.0000016,
          "image": 0
        }
      },
      {
        "id": "deepseek/deepseek-r1-distill-llama-70b:free",
        "name": "R1 Distill Llama 70B (free)",
        "description": "DeepSeek R1 Distill Llama 70B is a distilled large language model based on [Llama-3.3-70B-Instruct](/meta-llama/llama-3.3-70b-instruct), using outputs from [DeepSeek R1](/deepseek/deepseek-r1). The model combines advanced distillation techniques to achieve high performance across multiple benchmarks, including:\n\n- AIME 2024 pass@1: 70.0\n- MATH-500 pass@1: 94.5\n- CodeForces Rating: 1633\n\nThe model leverages fine-tuning from DeepSeek R1's outputs, enabling competitive performance comparable to larger frontier models.",
        "context_length": 128000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "deepseek/deepseek-r1-distill-llama-70b",
        "name": "R1 Distill Llama 70B",
        "description": "DeepSeek R1 Distill Llama 70B is a distilled large language model based on [Llama-3.3-70B-Instruct](/meta-llama/llama-3.3-70b-instruct), using outputs from [DeepSeek R1](/deepseek/deepseek-r1). The model combines advanced distillation techniques to achieve high performance across multiple benchmarks, including:\n\n- AIME 2024 pass@1: 70.0\n- MATH-500 pass@1: 94.5\n- CodeForces Rating: 1633\n\nThe model leverages fine-tuning from DeepSeek R1's outputs, enabling competitive performance comparable to larger frontier models.",
        "context_length": 131072,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 2.3e-7,
          "completion": 6.9e-7,
          "image": 0
        }
      },
      {
        "id": "deepseek/deepseek-r1:free",
        "name": "R1 (free)",
        "description": "DeepSeek R1 is here: Performance on par with [OpenAI o1](/openai/o1), but open-sourced and with fully open reasoning tokens. It's 671B parameters in size, with 37B active in an inference pass.\n\nFully open-source model & [technical report](https://api-docs.deepseek.com/news/news250120).\n\nMIT licensed: Distill & commercialize freely!",
        "context_length": 163840,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "deepseek/deepseek-r1",
        "name": "R1",
        "description": "DeepSeek R1 is here: Performance on par with [OpenAI o1](/openai/o1), but open-sourced and with fully open reasoning tokens. It's 671B parameters in size, with 37B active in an inference pass.\n\nFully open-source model & [technical report](https://api-docs.deepseek.com/news/news250120).\n\nMIT licensed: Distill & commercialize freely!",
        "context_length": 64000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 5.5e-7,
          "completion": 0.00000219,
          "image": 0
        }
      },
      {
        "id": "deepseek/deepseek-chat:free",
        "name": "DeepSeek V3 (free)",
        "description": "DeepSeek-V3 is the latest model from the DeepSeek team, building upon the instruction following and coding abilities of the previous versions. Pre-trained on nearly 15 trillion tokens, the reported evaluations reveal that the model outperforms other open-source models and rivals leading closed-source models.\n\nFor model details, please visit [the DeepSeek-V3 repo](https://github.com/deepseek-ai/DeepSeek-V3) for more information, or see the [launch announcement](https://api-docs.deepseek.com/news/news1226).",
        "context_length": 131072,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "deepseek/deepseek-chat",
        "name": "DeepSeek V3",
        "description": "DeepSeek-V3 is the latest model from the DeepSeek team, building upon the instruction following and coding abilities of the previous versions. Pre-trained on nearly 15 trillion tokens, the reported evaluations reveal that the model outperforms other open-source models and rivals leading closed-source models.\n\nFor model details, please visit [the DeepSeek-V3 repo](https://github.com/deepseek-ai/DeepSeek-V3) for more information, or see the [launch announcement](https://api-docs.deepseek.com/news/news1226).",
        "context_length": 131072,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.00000125,
          "completion": 0.00000125,
          "image": 0
        }
      },
      {
        "id": "deepseek/deepseek-chat-v2.5",
        "name": "DeepSeek V2.5",
        "description": "DeepSeek-V2.5 is an upgraded version that combines DeepSeek-V2-Chat and DeepSeek-Coder-V2-Instruct. The new model integrates the general and coding abilities of the two previous versions. For model details, please visit [DeepSeek-V2 page](https://github.com/deepseek-ai/DeepSeek-V2) for more information.",
        "context_length": 8192,
        "capabilities": [],
        "pricing": {
          "prompt": 0.000002,
          "completion": 0.000002,
          "image": 0
        }
      }
    ]
  },
  "qwen": {
    "name": "Qwen",
    "description": "qwen",
    "models": [
      {
        "id": "qwen/qwen-vl-plus:free",
        "name": "Qwen VL Plus (free)",
        "description": "Qwen's Enhanced Large Visual Language Model. Significantly upgraded for detailed recognition capabilities and text recognition abilities, supporting ultra-high pixel resolutions up to millions of pixels and extreme aspect ratios for image input. It delivers significant performance across a broad range of visual tasks.\n",
        "context_length": 7500,
        "capabilities": [
          "视觉"
        ],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "qwen/qwen-turbo",
        "name": "Qwen-Turbo",
        "description": "Qwen-Turbo, based on Qwen2.5, is a 1M context model that provides fast speed and low cost, suitable for simple tasks.",
        "context_length": 1000000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 5e-8,
          "completion": 2e-7,
          "image": 0
        }
      },
      {
        "id": "qwen/qwen2.5-vl-72b-instruct:free",
        "name": "Qwen2.5 VL 72B Instruct (free)",
        "description": "Qwen2.5-VL is proficient in recognizing common objects such as flowers, birds, fish, and insects. It is also highly capable of analyzing texts, charts, icons, graphics, and layouts within images.",
        "context_length": 131072,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "qwen/qwen2.5-vl-72b-instruct",
        "name": "Qwen2.5 VL 72B Instruct",
        "description": "Qwen2.5-VL is proficient in recognizing common objects such as flowers, birds, fish, and insects. It is also highly capable of analyzing texts, charts, icons, graphics, and layouts within images.",
        "context_length": 32000,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 7e-7,
          "completion": 7e-7,
          "image": 0
        }
      },
      {
        "id": "qwen/qwen-plus",
        "name": "Qwen-Plus",
        "description": "Qwen-Plus, based on the Qwen2.5 foundation model, is a 131K context model with a balanced performance, speed, and cost combination.",
        "context_length": 131072,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 4e-7,
          "completion": 0.0000012,
          "image": 0
        }
      },
      {
        "id": "qwen/qwen-max",
        "name": "Qwen-Max",
        "description": "Qwen-Max, based on Qwen2.5, provides the best inference performance among [Qwen models](/qwen), especially for complex multi-step tasks. It's a large-scale MoE model that has been pretrained on over 20 trillion tokens and further post-trained with curated Supervised Fine-Tuning (SFT) and Reinforcement Learning from Human Feedback (RLHF) methodologies. The parameter count is unknown.",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.0000016,
          "completion": 0.0000064,
          "image": 0
        }
      },
      {
        "id": "qwen/qvq-72b-preview",
        "name": "QvQ 72B Preview",
        "description": "QVQ-72B-Preview is an experimental research model developed by the [Qwen](/qwen) team, focusing on enhancing visual reasoning capabilities.\n\n## Performance\n\n|                | **QVQ-72B-Preview** | o1-2024-12-17 | gpt-4o-2024-05-13 | Claude3.5 Sonnet-20241022 | Qwen2VL-72B |\n|----------------|-----------------|---------------|-------------------|----------------------------|-------------|\n| MMMU(val)      | 70.3            | 77.3          | 69.1              | 70.4                       | 64.5        |\n| MathVista(mini) | 71.4            | 71.0          | 63.8              | 65.3                       | 70.5        |\n| MathVision(full)   | 35.9            | –             | 30.4              | 35.6                       | 25.9        |\n| OlympiadBench  | 20.4            | –             | 25.9              | –                          | 11.2        |\n\n\n## Limitations\n\n1. **Language Mixing and Code-Switching:** The model might occasionally mix different languages or unexpectedly switch between them, potentially affecting the clarity of its responses.\n2. **Recursive Reasoning Loops:**  There's a risk of the model getting caught in recursive reasoning loops, leading to lengthy responses that may not even arrive at a final answer.\n3. **Safety and Ethical Considerations:** Robust safety measures are needed to ensure reliable and safe performance. Users should exercise caution when deploying this model.\n4. **Performance and Benchmark Limitations:** Despite the improvements in visual reasoning, QVQ doesn’t entirely replace the capabilities of [Qwen2-VL-72B](/qwen/qwen-2-vl-72b-instruct). During multi-step visual reasoning, the model might gradually lose focus on the image content, leading to hallucinations. Moreover, QVQ doesn’t show significant improvement over [Qwen2-VL-72B](/qwen/qwen-2-vl-72b-instruct) in basic recognition tasks like identifying people, animals, or plants.\n\nNote: Currently, the model only supports single-round dialogues and image outputs. It does not support video inputs.",
        "context_length": 32000,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 2.5e-7,
          "completion": 5e-7,
          "image": 0
        }
      },
      {
        "id": "qwen/qwq-32b-preview",
        "name": "QwQ 32B Preview",
        "description": "QwQ-32B-Preview is an experimental research model focused on AI reasoning capabilities developed by the Qwen Team. As a preview release, it demonstrates promising analytical abilities while having several important limitations:\n\n1. **Language Mixing and Code-Switching**: The model may mix languages or switch between them unexpectedly, affecting response clarity.\n2. **Recursive Reasoning Loops**: The model may enter circular reasoning patterns, leading to lengthy responses without a conclusive answer.\n3. **Safety and Ethical Considerations**: The model requires enhanced safety measures to ensure reliable and secure performance, and users should exercise caution when deploying it.\n4. **Performance and Benchmark Limitations**: The model excels in math and coding but has room for improvement in other areas, such as common sense reasoning and nuanced language understanding.\n\n",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 1.2e-7,
          "completion": 1.8e-7,
          "image": 0
        }
      },
      {
        "id": "qwen/qwen-2.5-coder-32b-instruct:free",
        "name": "Qwen2.5 Coder 32B Instruct (free)",
        "description": "Qwen2.5-Coder is the latest series of Code-Specific Qwen large language models (formerly known as CodeQwen). Qwen2.5-Coder brings the following improvements upon CodeQwen1.5:\n\n- Significantly improvements in **code generation**, **code reasoning** and **code fixing**. \n- A more comprehensive foundation for real-world applications such as **Code Agents**. Not only enhancing coding capabilities but also maintaining its strengths in mathematics and general competencies.\n\nTo read more about its evaluation results, check out [Qwen 2.5 Coder's blog](https://qwenlm.github.io/blog/qwen2.5-coder-family/).",
        "context_length": 128000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "qwen/qwen-2.5-coder-32b-instruct",
        "name": "Qwen2.5 Coder 32B Instruct",
        "description": "Qwen2.5-Coder is the latest series of Code-Specific Qwen large language models (formerly known as CodeQwen). Qwen2.5-Coder brings the following improvements upon CodeQwen1.5:\n\n- Significantly improvements in **code generation**, **code reasoning** and **code fixing**. \n- A more comprehensive foundation for real-world applications such as **Code Agents**. Not only enhancing coding capabilities but also maintaining its strengths in mathematics and general competencies.\n\nTo read more about its evaluation results, check out [Qwen 2.5 Coder's blog](https://qwenlm.github.io/blog/qwen2.5-coder-family/).",
        "context_length": 33000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 7e-8,
          "completion": 1.6e-7,
          "image": 0
        }
      },
      {
        "id": "qwen/qwen-2.5-7b-instruct",
        "name": "Qwen2.5 7B Instruct",
        "description": "Qwen2.5 7B is the latest series of Qwen large language models. Qwen2.5 brings the following improvements upon Qwen2:\n\n- Significantly more knowledge and has greatly improved capabilities in coding and mathematics, thanks to our specialized expert models in these domains.\n\n- Significant improvements in instruction following, generating long texts (over 8K tokens), understanding structured data (e.g, tables), and generating structured outputs especially JSON. More resilient to the diversity of system prompts, enhancing role-play implementation and condition-setting for chatbots.\n\n- Long-context Support up to 128K tokens and can generate up to 8K tokens.\n\n- Multilingual support for over 29 languages, including Chinese, English, French, Spanish, Portuguese, German, Italian, Russian, Japanese, Korean, Vietnamese, Thai, Arabic, and more.\n\nUsage of this model is subject to [Tongyi Qianwen LICENSE AGREEMENT](https://huggingface.co/Qwen/Qwen1.5-110B-Chat/blob/main/LICENSE).",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 2.5e-8,
          "completion": 5e-8,
          "image": 0
        }
      },
      {
        "id": "qwen/qwen-2.5-72b-instruct",
        "name": "Qwen2.5 72B Instruct",
        "description": "Qwen2.5 72B is the latest series of Qwen large language models. Qwen2.5 brings the following improvements upon Qwen2:\n\n- Significantly more knowledge and has greatly improved capabilities in coding and mathematics, thanks to our specialized expert models in these domains.\n\n- Significant improvements in instruction following, generating long texts (over 8K tokens), understanding structured data (e.g, tables), and generating structured outputs especially JSON. More resilient to the diversity of system prompts, enhancing role-play implementation and condition-setting for chatbots.\n\n- Long-context Support up to 128K tokens and can generate up to 8K tokens.\n\n- Multilingual support for over 29 languages, including Chinese, English, French, Spanish, Portuguese, German, Italian, Russian, Japanese, Korean, Vietnamese, Thai, Arabic, and more.\n\nUsage of this model is subject to [Tongyi Qianwen LICENSE AGREEMENT](https://huggingface.co/Qwen/Qwen1.5-110B-Chat/blob/main/LICENSE).",
        "context_length": 128000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 1.3e-7,
          "completion": 4e-7,
          "image": 0
        }
      },
      {
        "id": "qwen/qwen-2-vl-72b-instruct",
        "name": "Qwen2-VL 72B Instruct",
        "description": "Qwen2 VL 72B is a multimodal LLM from the Qwen Team with the following key enhancements:\n\n- SoTA understanding of images of various resolution & ratio: Qwen2-VL achieves state-of-the-art performance on visual understanding benchmarks, including MathVista, DocVQA, RealWorldQA, MTVQA, etc.\n\n- Understanding videos of 20min+: Qwen2-VL can understand videos over 20 minutes for high-quality video-based question answering, dialog, content creation, etc.\n\n- Agent that can operate your mobiles, robots, etc.: with the abilities of complex reasoning and decision making, Qwen2-VL can be integrated with devices like mobile phones, robots, etc., for automatic operation based on visual environment and text instructions.\n\n- Multilingual Support: to serve global users, besides English and Chinese, Qwen2-VL now supports the understanding of texts in different languages inside images, including most European languages, Japanese, Korean, Arabic, Vietnamese, etc.\n\nFor more details, see this [blog post](https://qwenlm.github.io/blog/qwen2-vl/) and [GitHub repo](https://github.com/QwenLM/Qwen2-VL).\n\nUsage of this model is subject to [Tongyi Qianwen LICENSE AGREEMENT](https://huggingface.co/Qwen/Qwen1.5-110B-Chat/blob/main/LICENSE).",
        "context_length": 4096,
        "capabilities": [
          "视觉"
        ],
        "pricing": {
          "prompt": 4e-7,
          "completion": 4e-7,
          "image": 0.000578
        }
      },
      {
        "id": "qwen/qwen-2-vl-7b-instruct",
        "name": "Qwen2-VL 7B Instruct",
        "description": "Qwen2 VL 7B is a multimodal LLM from the Qwen Team with the following key enhancements:\n\n- SoTA understanding of images of various resolution & ratio: Qwen2-VL achieves state-of-the-art performance on visual understanding benchmarks, including MathVista, DocVQA, RealWorldQA, MTVQA, etc.\n\n- Understanding videos of 20min+: Qwen2-VL can understand videos over 20 minutes for high-quality video-based question answering, dialog, content creation, etc.\n\n- Agent that can operate your mobiles, robots, etc.: with the abilities of complex reasoning and decision making, Qwen2-VL can be integrated with devices like mobile phones, robots, etc., for automatic operation based on visual environment and text instructions.\n\n- Multilingual Support: to serve global users, besides English and Chinese, Qwen2-VL now supports the understanding of texts in different languages inside images, including most European languages, Japanese, Korean, Arabic, Vietnamese, etc.\n\nFor more details, see this [blog post](https://qwenlm.github.io/blog/qwen2-vl/) and [GitHub repo](https://github.com/QwenLM/Qwen2-VL).\n\nUsage of this model is subject to [Tongyi Qianwen LICENSE AGREEMENT](https://huggingface.co/Qwen/Qwen1.5-110B-Chat/blob/main/LICENSE).",
        "context_length": 4096,
        "capabilities": [
          "视觉"
        ],
        "pricing": {
          "prompt": 1e-7,
          "completion": 1e-7,
          "image": 0.0001445
        }
      },
      {
        "id": "qwen/qwen-2-7b-instruct:free",
        "name": "Qwen 2 7B Instruct (free)",
        "description": "Qwen2 7B is a transformer-based model that excels in language understanding, multilingual capabilities, coding, mathematics, and reasoning.\n\nIt features SwiGLU activation, attention QKV bias, and group query attention. It is pretrained on extensive data with supervised finetuning and direct preference optimization.\n\nFor more details, see this [blog post](https://qwenlm.github.io/blog/qwen2/) and [GitHub repo](https://github.com/QwenLM/Qwen2).\n\nUsage of this model is subject to [Tongyi Qianwen LICENSE AGREEMENT](https://huggingface.co/Qwen/Qwen1.5-110B-Chat/blob/main/LICENSE).",
        "context_length": 8192,
        "capabilities": [],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "qwen/qwen-2-7b-instruct",
        "name": "Qwen 2 7B Instruct",
        "description": "Qwen2 7B is a transformer-based model that excels in language understanding, multilingual capabilities, coding, mathematics, and reasoning.\n\nIt features SwiGLU activation, attention QKV bias, and group query attention. It is pretrained on extensive data with supervised finetuning and direct preference optimization.\n\nFor more details, see this [blog post](https://qwenlm.github.io/blog/qwen2/) and [GitHub repo](https://github.com/QwenLM/Qwen2).\n\nUsage of this model is subject to [Tongyi Qianwen LICENSE AGREEMENT](https://huggingface.co/Qwen/Qwen1.5-110B-Chat/blob/main/LICENSE).",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 5.4e-8,
          "completion": 5.4e-8,
          "image": 0
        }
      },
      {
        "id": "qwen/qwen-2-72b-instruct",
        "name": "Qwen 2 72B Instruct",
        "description": "Qwen2 72B is a transformer-based model that excels in language understanding, multilingual capabilities, coding, mathematics, and reasoning.\n\nIt features SwiGLU activation, attention QKV bias, and group query attention. It is pretrained on extensive data with supervised finetuning and direct preference optimization.\n\nFor more details, see this [blog post](https://qwenlm.github.io/blog/qwen2/) and [GitHub repo](https://github.com/QwenLM/Qwen2).\n\nUsage of this model is subject to [Tongyi Qianwen LICENSE AGREEMENT](https://huggingface.co/Qwen/Qwen1.5-110B-Chat/blob/main/LICENSE).",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 9e-7,
          "completion": 9e-7,
          "image": 0
        }
      }
    ]
  },
  "aion-labs": {
    "name": "Aion-labs",
    "description": "aion-labs",
    "models": [
      {
        "id": "aion-labs/aion-1.0",
        "name": "Aion-1.0",
        "description": "Aion-1.0 is a multi-model system designed for high performance across various tasks, including reasoning and coding. It is built on DeepSeek-R1, augmented with additional models and techniques such as Tree of Thoughts (ToT) and Mixture of Experts (MoE). It is Aion Lab's most powerful reasoning model.",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000004,
          "completion": 0.000008,
          "image": 0
        }
      },
      {
        "id": "aion-labs/aion-1.0-mini",
        "name": "Aion-1.0-Mini",
        "description": "Aion-1.0-Mini 32B parameter model is a distilled version of the DeepSeek-R1 model, designed for strong performance in reasoning domains such as mathematics, coding, and logic. It is a modified variant of a FuseAI model that outperforms R1-Distill-Qwen-32B and R1-Distill-Llama-70B, with benchmark results available on its [Hugging Face page](https://huggingface.co/FuseAI/FuseO1-DeepSeekR1-QwQ-SkyT1-32B-Preview), independently replicated for verification.",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 7e-7,
          "completion": 0.0000014,
          "image": 0
        }
      },
      {
        "id": "aion-labs/aion-rp-llama-3.1-8b",
        "name": "Aion-RP 1.0 (8B)",
        "description": "Aion-RP-Llama-3.1-8B ranks the highest in the character evaluation portion of the RPBench-Auto benchmark, a roleplaying-specific variant of Arena-Hard-Auto, where LLMs evaluate each other’s responses. It is a fine-tuned base model rather than an instruct model, designed to produce more natural and varied writing.",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 2e-7,
          "completion": 2e-7,
          "image": 0
        }
      }
    ]
  },
  "liquid": {
    "name": "Liquid",
    "description": "liquid",
    "models": [
      {
        "id": "liquid/lfm-7b",
        "name": "LFM 7B",
        "description": "LFM-7B, a new best-in-class language model. LFM-7B is designed for exceptional chat capabilities, including languages like Arabic and Japanese. Powered by the Liquid Foundation Model (LFM) architecture, it exhibits unique features like low memory footprint and fast inference speed. \n\nLFM-7B is the world’s best-in-class multilingual language model in English, Arabic, and Japanese.\n\nSee the [launch announcement](https://www.liquid.ai/lfm-7b) for benchmarks and more info.",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 1e-8,
          "completion": 1e-8,
          "image": 0
        }
      },
      {
        "id": "liquid/lfm-3b",
        "name": "LFM 3B",
        "description": "Liquid's LFM 3B delivers incredible performance for its size. It positions itself as first place among 3B parameter transformers, hybrids, and RNN models It is also on par with Phi-3.5-mini on multiple benchmarks, while being 18.4% smaller.\n\nLFM-3B is the ideal choice for mobile and other edge text-based applications.\n\nSee the [launch announcement](https://www.liquid.ai/liquid-foundation-models) for benchmarks and more info.",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 2e-8,
          "completion": 2e-8,
          "image": 0
        }
      },
      {
        "id": "liquid/lfm-40b",
        "name": "LFM 40B MoE",
        "description": "Liquid's 40.3B Mixture of Experts (MoE) model. Liquid Foundation Models (LFMs) are large neural networks built with computational units rooted in dynamic systems.\n\nLFMs are general-purpose AI models that can be used to model any kind of sequential data, including video, audio, text, time series, and signals.\n\nSee the [launch announcement](https://www.liquid.ai/liquid-foundation-models) for benchmarks and more info.",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 1.5e-7,
          "completion": 1.5e-7,
          "image": 0
        }
      }
    ]
  },
  "sophosympatheia": {
    "name": "Sophosympatheia",
    "description": "sophosympatheia",
    "models": [
      {
        "id": "sophosympatheia/rogue-rose-103b-v0.2:free",
        "name": "Rogue Rose 103B v0.2 (free)",
        "description": "Rogue Rose demonstrates strong capabilities in roleplaying and storytelling applications, potentially surpassing other models in the 103-120B parameter range. While it occasionally exhibits inconsistencies with scene logic, the overall interaction quality represents an advancement in natural language processing for creative applications.\n\nIt is a 120-layer frankenmerge model combining two custom 70B architectures from November 2023, derived from the [xwin-stellarbright-erp-70b-v2](https://huggingface.co/sophosympatheia/xwin-stellarbright-erp-70b-v2) base.\n",
        "context_length": 4096,
        "capabilities": [],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "sophosympatheia/midnight-rose-70b",
        "name": "Midnight Rose 70B",
        "description": "A merge with a complex family tree, this model was crafted for roleplaying and storytelling. Midnight Rose is a successor to Rogue Rose and Aurora Nights and improves upon them both. It wants to produce lengthy output by default and is the best creative writing merge produced so far by sophosympatheia.\n\nDescending from earlier versions of Midnight Rose and [Wizard Tulu Dolphin 70B](https://huggingface.co/sophosympatheia/Wizard-Tulu-Dolphin-70B-v1.0), it inherits the best qualities of each.",
        "context_length": 4096,
        "capabilities": [],
        "pricing": {
          "prompt": 8e-7,
          "completion": 8e-7,
          "image": 0
        }
      }
    ]
  },
  "minimax": {
    "name": "Minimax",
    "description": "minimax",
    "models": [
      {
        "id": "minimax/minimax-01",
        "name": "MiniMax-01",
        "description": "MiniMax-01 is a combines MiniMax-Text-01 for text generation and MiniMax-VL-01 for image understanding. It has 456 billion parameters, with 45.9 billion parameters activated per inference, and can handle a context of up to 4 million tokens.\n\nThe text model adopts a hybrid architecture that combines Lightning Attention, Softmax Attention, and Mixture-of-Experts (MoE). The image model adopts the “ViT-MLP-LLM” framework and is trained on top of the text model.\n\nTo read more about the release, see: https://www.minimaxi.com/en/news/minimax-01-series-2",
        "context_length": 1000192,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 2e-7,
          "completion": 0.0000011,
          "image": 0
        }
      }
    ]
  },
  "microsoft": {
    "name": "Microsoft",
    "description": "microsoft",
    "models": [
      {
        "id": "microsoft/phi-4",
        "name": "Phi 4",
        "description": "[Microsoft Research](/microsoft) Phi-4 is designed to perform well in complex reasoning tasks and can operate efficiently in situations with limited memory or where quick responses are needed. \n\nAt 14 billion parameters, it was trained on a mix of high-quality synthetic datasets, data from curated websites, and academic materials. It has undergone careful improvement to follow instructions accurately and maintain strong safety standards. It works best with English language inputs.\n\nFor more information, please see [Phi-4 Technical Report](https://arxiv.org/pdf/2412.08905)\n",
        "context_length": 16384,
        "capabilities": [],
        "pricing": {
          "prompt": 7e-8,
          "completion": 1.4e-7,
          "image": 0
        }
      },
      {
        "id": "microsoft/phi-3.5-mini-128k-instruct",
        "name": "Phi-3.5 Mini 128K Instruct",
        "description": "Phi-3.5 models are lightweight, state-of-the-art open models. These models were trained with Phi-3 datasets that include both synthetic data and the filtered, publicly available websites data, with a focus on high quality and reasoning-dense properties. Phi-3.5 Mini uses 3.8B parameters, and is a dense decoder-only transformer model using the same tokenizer as [Phi-3 Mini](/models/microsoft/phi-3-mini-128k-instruct).\n\nThe models underwent a rigorous enhancement process, incorporating both supervised fine-tuning, proximal policy optimization, and direct preference optimization to ensure precise instruction adherence and robust safety measures. When assessed against benchmarks that test common sense, language understanding, math, code, long context and logical reasoning, Phi-3.5 models showcased robust and state-of-the-art performance among models with less than 13 billion parameters.",
        "context_length": 128000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 1e-7,
          "completion": 1e-7,
          "image": 0
        }
      },
      {
        "id": "microsoft/phi-3-mini-128k-instruct:free",
        "name": "Phi-3 Mini 128K Instruct (free)",
        "description": "Phi-3 Mini is a powerful 3.8B parameter model designed for advanced language understanding, reasoning, and instruction following. Optimized through supervised fine-tuning and preference adjustments, it excels in tasks involving common sense, mathematics, logical reasoning, and code processing.\n\nAt time of release, Phi-3 Medium demonstrated state-of-the-art performance among lightweight models. This model is static, trained on an offline dataset with an October 2023 cutoff date.",
        "context_length": 8192,
        "capabilities": [],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "microsoft/phi-3-mini-128k-instruct",
        "name": "Phi-3 Mini 128K Instruct",
        "description": "Phi-3 Mini is a powerful 3.8B parameter model designed for advanced language understanding, reasoning, and instruction following. Optimized through supervised fine-tuning and preference adjustments, it excels in tasks involving common sense, mathematics, logical reasoning, and code processing.\n\nAt time of release, Phi-3 Medium demonstrated state-of-the-art performance among lightweight models. This model is static, trained on an offline dataset with an October 2023 cutoff date.",
        "context_length": 128000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 1e-7,
          "completion": 1e-7,
          "image": 0
        }
      },
      {
        "id": "microsoft/phi-3-medium-128k-instruct:free",
        "name": "Phi-3 Medium 128K Instruct (free)",
        "description": "Phi-3 128K Medium is a powerful 14-billion parameter model designed for advanced language understanding, reasoning, and instruction following. Optimized through supervised fine-tuning and preference adjustments, it excels in tasks involving common sense, mathematics, logical reasoning, and code processing.\n\nAt time of release, Phi-3 Medium demonstrated state-of-the-art performance among lightweight models. In the MMLU-Pro eval, the model even comes close to a Llama3 70B level of performance.\n\nFor 4k context length, try [Phi-3 Medium 4K](/models/microsoft/phi-3-medium-4k-instruct).",
        "context_length": 8192,
        "capabilities": [],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "microsoft/phi-3-medium-128k-instruct",
        "name": "Phi-3 Medium 128K Instruct",
        "description": "Phi-3 128K Medium is a powerful 14-billion parameter model designed for advanced language understanding, reasoning, and instruction following. Optimized through supervised fine-tuning and preference adjustments, it excels in tasks involving common sense, mathematics, logical reasoning, and code processing.\n\nAt time of release, Phi-3 Medium demonstrated state-of-the-art performance among lightweight models. In the MMLU-Pro eval, the model even comes close to a Llama3 70B level of performance.\n\nFor 4k context length, try [Phi-3 Medium 4K](/models/microsoft/phi-3-medium-4k-instruct).",
        "context_length": 128000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000001,
          "completion": 0.000001,
          "image": 0
        }
      },
      {
        "id": "microsoft/wizardlm-2-8x22b",
        "name": "WizardLM-2 8x22B",
        "description": "WizardLM-2 8x22B is Microsoft AI's most advanced Wizard model. It demonstrates highly competitive performance compared to leading proprietary models, and it consistently outperforms all existing state-of-the-art opensource models.\n\nIt is an instruct finetune of [Mixtral 8x22B](/models/mistralai/mixtral-8x22b).\n\nTo read more about the model release, [click here](https://wizardlm.github.io/WizardLM2/).\n\n#moe",
        "context_length": 65536,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 5e-7,
          "completion": 5e-7,
          "image": 0
        }
      },
      {
        "id": "microsoft/wizardlm-2-7b",
        "name": "WizardLM-2 7B",
        "description": "WizardLM-2 7B is the smaller variant of Microsoft AI's latest Wizard model. It is the fastest and achieves comparable performance with existing 10x larger opensource leading models\n\nIt is a finetune of [Mistral 7B Instruct](/models/mistralai/mistral-7b-instruct), using the same technique as [WizardLM-2 8x22B](/models/microsoft/wizardlm-2-8x22b).\n\nTo read more about the model release, [click here](https://wizardlm.github.io/WizardLM2/).\n\n#moe",
        "context_length": 32000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 7e-8,
          "completion": 7e-8,
          "image": 0
        }
      }
    ]
  },
  "sao10k": {
    "name": "Sao10k",
    "description": "sao10k",
    "models": [
      {
        "id": "sao10k/l3.1-70b-hanami-x1",
        "name": "Llama 3.1 70B Hanami x1",
        "description": "This is [Sao10K](/sao10k)'s experiment over [Euryale v2.2](/sao10k/l3.1-euryale-70b).",
        "context_length": 16000,
        "capabilities": [],
        "pricing": {
          "prompt": 0.000003,
          "completion": 0.000003,
          "image": 0
        }
      },
      {
        "id": "sao10k/l3.3-euryale-70b",
        "name": "Llama 3.3 Euryale 70B",
        "description": "Euryale L3.3 70B is a model focused on creative roleplay from [Sao10k](https://ko-fi.com/sao10k). It is the successor of [Euryale L3 70B v2.2](/models/sao10k/l3-euryale-70b).",
        "context_length": 131072,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 7e-7,
          "completion": 8e-7,
          "image": 0
        }
      },
      {
        "id": "sao10k/l3.1-euryale-70b",
        "name": "Llama 3.1 Euryale 70B v2.2",
        "description": "Euryale L3.1 70B v2.2 is a model focused on creative roleplay from [Sao10k](https://ko-fi.com/sao10k). It is the successor of [Euryale L3 70B v2.1](/models/sao10k/l3-euryale-70b).",
        "context_length": 131072,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 7e-7,
          "completion": 8e-7,
          "image": 0
        }
      },
      {
        "id": "sao10k/l3-lunaris-8b",
        "name": "Llama 3 8B Lunaris",
        "description": "Lunaris 8B is a versatile generalist and roleplaying model based on Llama 3. It's a strategic merge of multiple models, designed to balance creativity with improved logic and general knowledge.\n\nCreated by [Sao10k](https://huggingface.co/Sao10k), this model aims to offer an improved experience over Stheno v3.2, with enhanced creativity and logical reasoning.\n\nFor best results, use with Llama 3 Instruct context template, temperature 1.4, and min_p 0.1.",
        "context_length": 8192,
        "capabilities": [],
        "pricing": {
          "prompt": 3e-8,
          "completion": 6e-8,
          "image": 0
        }
      },
      {
        "id": "sao10k/l3-euryale-70b",
        "name": "Llama 3 Euryale 70B v2.1",
        "description": "Euryale 70B v2.1 is a model focused on creative roleplay from [Sao10k](https://ko-fi.com/sao10k).\n\n- Better prompt adherence.\n- Better anatomy / spatial awareness.\n- Adapts much better to unique and custom formatting / reply formats.\n- Very creative, lots of unique swipes.\n- Is not restrictive during roleplays.",
        "context_length": 8192,
        "capabilities": [],
        "pricing": {
          "prompt": 7e-7,
          "completion": 8e-7,
          "image": 0
        }
      },
      {
        "id": "sao10k/fimbulvetr-11b-v2",
        "name": "Fimbulvetr 11B v2",
        "description": "Creative writing model, routed with permission. It's fast, it keeps the conversation going, and it stays in character.\n\nIf you submit a raw prompt, you can use Alpaca or Vicuna formats.",
        "context_length": 4096,
        "capabilities": [],
        "pricing": {
          "prompt": 8e-7,
          "completion": 0.0000012,
          "image": 0
        }
      }
    ]
  },
  "eva-unit-01": {
    "name": "Eva-unit-01",
    "description": "eva-unit-01",
    "models": [
      {
        "id": "eva-unit-01/eva-llama-3.33-70b",
        "name": "EVA Llama 3.33 70B",
        "description": "EVA Llama 3.33 70b is a roleplay and storywriting specialist model. It is a full-parameter finetune of [Llama-3.3-70B-Instruct](https://openrouter.ai/meta-llama/llama-3.3-70b-instruct) on mixture of synthetic and natural data.\n\nIt uses Celeste 70B 0.1 data mixture, greatly expanding it to improve versatility, creativity and \"flavor\" of the resulting model\n\nThis model was built with Llama by Meta.\n",
        "context_length": 16384,
        "capabilities": [],
        "pricing": {
          "prompt": 0.000004,
          "completion": 0.000006,
          "image": 0
        }
      },
      {
        "id": "eva-unit-01/eva-qwen-2.5-72b",
        "name": "EVA Qwen2.5 72B",
        "description": "EVA Qwen2.5 72B is a roleplay and storywriting specialist model. It's a full-parameter finetune of Qwen2.5-72B on mixture of synthetic and natural data.\n\nIt uses Celeste 70B 0.1 data mixture, greatly expanding it to improve versatility, creativity and \"flavor\" of the resulting model.",
        "context_length": 32000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 7e-7,
          "completion": 7e-7,
          "image": 0
        }
      },
      {
        "id": "eva-unit-01/eva-qwen-2.5-32b",
        "name": "EVA Qwen2.5 32B",
        "description": "EVA Qwen2.5 32B is a roleplaying/storywriting specialist model. It's a full-parameter finetune of Qwen2.5-32B on mixture of synthetic and natural data.\n\nIt uses Celeste 70B 0.1 data mixture, greatly expanding it to improve versatility, creativity and \"flavor\" of the resulting model.",
        "context_length": 16384,
        "capabilities": [],
        "pricing": {
          "prompt": 0.0000026,
          "completion": 0.0000034,
          "image": 0
        }
      }
    ]
  },
  "x-ai": {
    "name": "X-ai",
    "description": "x-ai",
    "models": [
      {
        "id": "x-ai/grok-2-vision-1212",
        "name": "Grok 2 Vision 1212",
        "description": "Grok 2 Vision 1212 advances image-based AI with stronger visual comprehension, refined instruction-following, and multilingual support. From object recognition to style analysis, it empowers developers to build more intuitive, visually aware applications. Its enhanced steerability and reasoning establish a robust foundation for next-generation image solutions.\n\nTo read more about this model, check out [xAI's announcement](https://x.ai/blog/grok-1212).",
        "context_length": 32768,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000002,
          "completion": 0.00001,
          "image": 0.0036
        }
      },
      {
        "id": "x-ai/grok-2-1212",
        "name": "Grok 2 1212",
        "description": "Grok 2 1212 introduces significant enhancements to accuracy, instruction adherence, and multilingual support, making it a powerful and flexible choice for developers seeking a highly steerable, intelligent model.",
        "context_length": 131072,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000002,
          "completion": 0.00001,
          "image": 0
        }
      },
      {
        "id": "x-ai/grok-vision-beta",
        "name": "Grok Vision Beta",
        "description": "Grok Vision Beta is xAI's experimental language model with vision capability.\n\n",
        "context_length": 8192,
        "capabilities": [
          "视觉"
        ],
        "pricing": {
          "prompt": 0.000005,
          "completion": 0.000015,
          "image": 0.009
        }
      },
      {
        "id": "x-ai/grok-beta",
        "name": "Grok Beta",
        "description": "Grok Beta is xAI's experimental language model with state-of-the-art reasoning capabilities, best for complex and multi-step use cases.\n\nIt is the successor of [Grok 2](https://x.ai/blog/grok-2) with enhanced context length.",
        "context_length": 131072,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000005,
          "completion": 0.000015,
          "image": 0
        }
      }
    ]
  },
  "cohere": {
    "name": "Cohere",
    "description": "cohere",
    "models": [
      {
        "id": "cohere/command-r7b-12-2024",
        "name": "Command R7B (12-2024)",
        "description": "Command R7B (12-2024) is a small, fast update of the Command R+ model, delivered in December 2024. It excels at RAG, tool use, agents, and similar tasks requiring complex reasoning and multiple steps.\n\nUse of this model is subject to Cohere's [Usage Policy](https://docs.cohere.com/docs/usage-policy) and [SaaS Agreement](https://cohere.com/saas-agreement).",
        "context_length": 128000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 3.75e-8,
          "completion": 1.5e-7,
          "image": 0
        }
      },
      {
        "id": "cohere/command-r-08-2024",
        "name": "Command R (08-2024)",
        "description": "command-r-08-2024 is an update of the [Command R](/models/cohere/command-r) with improved performance for multilingual retrieval-augmented generation (RAG) and tool use. More broadly, it is better at math, code and reasoning and is competitive with the previous version of the larger Command R+ model.\n\nRead the launch post [here](https://docs.cohere.com/changelog/command-gets-refreshed).\n\nUse of this model is subject to Cohere's [Usage Policy](https://docs.cohere.com/docs/usage-policy) and [SaaS Agreement](https://cohere.com/saas-agreement).",
        "context_length": 128000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 1.425e-7,
          "completion": 5.7e-7,
          "image": 0
        }
      },
      {
        "id": "cohere/command-r-plus-08-2024",
        "name": "Command R+ (08-2024)",
        "description": "command-r-plus-08-2024 is an update of the [Command R+](/models/cohere/command-r-plus) with roughly 50% higher throughput and 25% lower latencies as compared to the previous Command R+ version, while keeping the hardware footprint the same.\n\nRead the launch post [here](https://docs.cohere.com/changelog/command-gets-refreshed).\n\nUse of this model is subject to Cohere's [Usage Policy](https://docs.cohere.com/docs/usage-policy) and [SaaS Agreement](https://cohere.com/saas-agreement).",
        "context_length": 128000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000002375,
          "completion": 0.0000095,
          "image": 0
        }
      },
      {
        "id": "cohere/command-r-plus",
        "name": "Command R+",
        "description": "Command R+ is a new, 104B-parameter LLM from Cohere. It's useful for roleplay, general consumer usecases, and Retrieval Augmented Generation (RAG).\n\nIt offers multilingual support for ten key languages to facilitate global business operations. See benchmarks and the launch post [here](https://txt.cohere.com/command-r-plus-microsoft-azure/).\n\nUse of this model is subject to Cohere's [Usage Policy](https://docs.cohere.com/docs/usage-policy) and [SaaS Agreement](https://cohere.com/saas-agreement).",
        "context_length": 128000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.00000285,
          "completion": 0.00001425,
          "image": 0
        }
      },
      {
        "id": "cohere/command-r-plus-04-2024",
        "name": "Command R+ (04-2024)",
        "description": "Command R+ is a new, 104B-parameter LLM from Cohere. It's useful for roleplay, general consumer usecases, and Retrieval Augmented Generation (RAG).\n\nIt offers multilingual support for ten key languages to facilitate global business operations. See benchmarks and the launch post [here](https://txt.cohere.com/command-r-plus-microsoft-azure/).\n\nUse of this model is subject to Cohere's [Usage Policy](https://docs.cohere.com/docs/usage-policy) and [SaaS Agreement](https://cohere.com/saas-agreement).",
        "context_length": 128000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.00000285,
          "completion": 0.00001425,
          "image": 0
        }
      },
      {
        "id": "cohere/command",
        "name": "Command",
        "description": "Command is an instruction-following conversational model that performs language tasks with high quality, more reliably and with a longer context than our base generative models.\n\nUse of this model is subject to Cohere's [Usage Policy](https://docs.cohere.com/docs/usage-policy) and [SaaS Agreement](https://cohere.com/saas-agreement).",
        "context_length": 4096,
        "capabilities": [],
        "pricing": {
          "prompt": 9.5e-7,
          "completion": 0.0000019,
          "image": 0
        }
      },
      {
        "id": "cohere/command-r",
        "name": "Command R",
        "description": "Command-R is a 35B parameter model that performs conversational language tasks at a higher quality, more reliably, and with a longer context than previous models. It can be used for complex workflows like code generation, retrieval augmented generation (RAG), tool use, and agents.\n\nRead the launch post [here](https://txt.cohere.com/command-r/).\n\nUse of this model is subject to Cohere's [Usage Policy](https://docs.cohere.com/docs/usage-policy) and [SaaS Agreement](https://cohere.com/saas-agreement).",
        "context_length": 128000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 4.75e-7,
          "completion": 0.000001425,
          "image": 0
        }
      },
      {
        "id": "cohere/command-r-03-2024",
        "name": "Command R (03-2024)",
        "description": "Command-R is a 35B parameter model that performs conversational language tasks at a higher quality, more reliably, and with a longer context than previous models. It can be used for complex workflows like code generation, retrieval augmented generation (RAG), tool use, and agents.\n\nRead the launch post [here](https://txt.cohere.com/command-r/).\n\nUse of this model is subject to Cohere's [Usage Policy](https://docs.cohere.com/docs/usage-policy) and [SaaS Agreement](https://cohere.com/saas-agreement).",
        "context_length": 128000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 4.75e-7,
          "completion": 0.000001425,
          "image": 0
        }
      }
    ]
  },
  "amazon": {
    "name": "Amazon",
    "description": "amazon",
    "models": [
      {
        "id": "amazon/nova-lite-v1",
        "name": "Nova Lite 1.0",
        "description": "Amazon Nova Lite 1.0 is a very low-cost multimodal model from Amazon that focused on fast processing of image, video, and text inputs to generate text output. Amazon Nova Lite can handle real-time customer interactions, document analysis, and visual question-answering tasks with high accuracy.\n\nWith an input context of 300K tokens, it can analyze multiple images or up to 30 minutes of video in a single input.",
        "context_length": 300000,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 6e-8,
          "completion": 2.4e-7,
          "image": 0.00009
        }
      },
      {
        "id": "amazon/nova-micro-v1",
        "name": "Nova Micro 1.0",
        "description": "Amazon Nova Micro 1.0 is a text-only model that delivers the lowest latency responses in the Amazon Nova family of models at a very low cost. With a context length of 128K tokens and optimized for speed and cost, Amazon Nova Micro excels at tasks such as text summarization, translation, content classification, interactive chat, and brainstorming. It has  simple mathematical reasoning and coding abilities.",
        "context_length": 128000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 3.5e-8,
          "completion": 1.4e-7,
          "image": 0
        }
      },
      {
        "id": "amazon/nova-pro-v1",
        "name": "Nova Pro 1.0",
        "description": "Amazon Nova Pro 1.0 is a capable multimodal model from Amazon focused on providing a combination of accuracy, speed, and cost for a wide range of tasks. As of December 2024, it achieves state-of-the-art performance on key benchmarks including visual question answering (TextVQA) and video understanding (VATEX).\n\nAmazon Nova Pro demonstrates strong capabilities in processing both visual and textual information and at analyzing financial documents.\n\n**NOTE**: Video input is not supported at this time.",
        "context_length": 300000,
        "capabilities": [
          "视觉",
          "长文本"
        ],
        "pricing": {
          "prompt": 8e-7,
          "completion": 0.0000032,
          "image": 0.0012
        }
      }
    ]
  },
  "infermatic": {
    "name": "Infermatic",
    "description": "infermatic",
    "models": [
      {
        "id": "infermatic/mn-inferor-12b",
        "name": "Mistral Nemo Inferor 12B",
        "description": "Inferor 12B is a merge of top roleplay models, expert on immersive narratives and storytelling.\n\nThis model was merged using the [Model Stock](https://arxiv.org/abs/2403.19522) merge method using [anthracite-org/magnum-v4-12b](https://openrouter.ai/anthracite-org/magnum-v4-72b) as a base.\n",
        "context_length": 16384,
        "capabilities": [],
        "pricing": {
          "prompt": 8e-7,
          "completion": 0.0000012,
          "image": 0
        }
      }
    ]
  },
  "raifle": {
    "name": "Raifle",
    "description": "raifle",
    "models": [
      {
        "id": "raifle/sorcererlm-8x22b",
        "name": "SorcererLM 8x22B",
        "description": "SorcererLM is an advanced RP and storytelling model, built as a Low-rank 16-bit LoRA fine-tuned on [WizardLM-2 8x22B](/microsoft/wizardlm-2-8x22b).\n\n- Advanced reasoning and emotional intelligence for engaging and immersive interactions\n- Vivid writing capabilities enriched with spatial and contextual awareness\n- Enhanced narrative depth, promoting creative and dynamic storytelling",
        "context_length": 16000,
        "capabilities": [],
        "pricing": {
          "prompt": 0.0000045,
          "completion": 0.0000045,
          "image": 0
        }
      }
    ]
  },
  "thedrummer": {
    "name": "Thedrummer",
    "description": "thedrummer",
    "models": [
      {
        "id": "thedrummer/unslopnemo-12b",
        "name": "Unslopnemo 12B",
        "description": "UnslopNemo v4.1 is the latest addition from the creator of Rocinante, designed for adventure writing and role-play scenarios.",
        "context_length": 32000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 5e-7,
          "completion": 5e-7,
          "image": 0
        }
      },
      {
        "id": "thedrummer/rocinante-12b",
        "name": "Rocinante 12B",
        "description": "Rocinante 12B is designed for engaging storytelling and rich prose.\n\nEarly testers have reported:\n- Expanded vocabulary with unique and expressive word choices\n- Enhanced creativity for vivid narratives\n- Adventure-filled and captivating stories",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 2.5e-7,
          "completion": 5e-7,
          "image": 0
        }
      }
    ]
  },
  "neversleep": {
    "name": "Neversleep",
    "description": "neversleep",
    "models": [
      {
        "id": "neversleep/llama-3.1-lumimaid-70b",
        "name": "Lumimaid v0.2 70B",
        "description": "Lumimaid v0.2 70B is a finetune of [Llama 3.1 70B](/meta-llama/llama-3.1-70b-instruct) with a \"HUGE step up dataset wise\" compared to Lumimaid v0.1. Sloppy chats output were purged.\n\nUsage of this model is subject to [Meta's Acceptable Use Policy](https://llama.meta.com/llama3/use-policy/).",
        "context_length": 16384,
        "capabilities": [],
        "pricing": {
          "prompt": 0.000003375,
          "completion": 0.0000045,
          "image": 0
        }
      },
      {
        "id": "neversleep/llama-3.1-lumimaid-8b",
        "name": "Lumimaid v0.2 8B",
        "description": "Lumimaid v0.2 8B is a finetune of [Llama 3.1 8B](/models/meta-llama/llama-3.1-8b-instruct) with a \"HUGE step up dataset wise\" compared to Lumimaid v0.1. Sloppy chats output were purged.\n\nUsage of this model is subject to [Meta's Acceptable Use Policy](https://llama.meta.com/llama3/use-policy/).",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 1.875e-7,
          "completion": 0.000001125,
          "image": 0
        }
      },
      {
        "id": "neversleep/llama-3-lumimaid-70b",
        "name": "Llama 3 Lumimaid 70B",
        "description": "The NeverSleep team is back, with a Llama 3 70B finetune trained on their curated roleplay data. Striking a balance between eRP and RP, Lumimaid was designed to be serious, yet uncensored when necessary.\n\nTo enhance it's overall intelligence and chat capability, roughly 40% of the training data was not roleplay. This provides a breadth of knowledge to access, while still keeping roleplay as the primary strength.\n\nUsage of this model is subject to [Meta's Acceptable Use Policy](https://llama.meta.com/llama3/use-policy/).",
        "context_length": 8192,
        "capabilities": [],
        "pricing": {
          "prompt": 0.000003375,
          "completion": 0.0000045,
          "image": 0
        }
      },
      {
        "id": "neversleep/llama-3-lumimaid-8b:extended",
        "name": "Llama 3 Lumimaid 8B (extended)",
        "description": "The NeverSleep team is back, with a Llama 3 8B finetune trained on their curated roleplay data. Striking a balance between eRP and RP, Lumimaid was designed to be serious, yet uncensored when necessary.\n\nTo enhance it's overall intelligence and chat capability, roughly 40% of the training data was not roleplay. This provides a breadth of knowledge to access, while still keeping roleplay as the primary strength.\n\nUsage of this model is subject to [Meta's Acceptable Use Policy](https://llama.meta.com/llama3/use-policy/).",
        "context_length": 24576,
        "capabilities": [],
        "pricing": {
          "prompt": 1.875e-7,
          "completion": 0.000001125,
          "image": 0
        }
      },
      {
        "id": "neversleep/llama-3-lumimaid-8b",
        "name": "Llama 3 Lumimaid 8B",
        "description": "The NeverSleep team is back, with a Llama 3 8B finetune trained on their curated roleplay data. Striking a balance between eRP and RP, Lumimaid was designed to be serious, yet uncensored when necessary.\n\nTo enhance it's overall intelligence and chat capability, roughly 40% of the training data was not roleplay. This provides a breadth of knowledge to access, while still keeping roleplay as the primary strength.\n\nUsage of this model is subject to [Meta's Acceptable Use Policy](https://llama.meta.com/llama3/use-policy/).",
        "context_length": 24576,
        "capabilities": [],
        "pricing": {
          "prompt": 1.875e-7,
          "completion": 0.000001125,
          "image": 0
        }
      },
      {
        "id": "neversleep/noromaid-20b",
        "name": "Noromaid 20B",
        "description": "A collab between IkariDev and Undi. This merge is suitable for RP, ERP, and general knowledge.\n\n#merge #uncensored",
        "context_length": 8192,
        "capabilities": [],
        "pricing": {
          "prompt": 0.0000015,
          "completion": 0.00000225,
          "image": 0
        }
      }
    ]
  },
  "anthracite-org": {
    "name": "Anthracite-org",
    "description": "anthracite-org",
    "models": [
      {
        "id": "anthracite-org/magnum-v4-72b",
        "name": "Magnum v4 72B",
        "description": "This is a series of models designed to replicate the prose quality of the Claude 3 models, specifically Sonnet(https://openrouter.ai/anthropic/claude-3.5-sonnet) and Opus(https://openrouter.ai/anthropic/claude-3-opus).\n\nThe model is fine-tuned on top of [Qwen2.5 72B](https://openrouter.ai/qwen/qwen-2.5-72b-instruct).",
        "context_length": 16384,
        "capabilities": [],
        "pricing": {
          "prompt": 0.000001875,
          "completion": 0.00000225,
          "image": 0
        }
      },
      {
        "id": "anthracite-org/magnum-v2-72b",
        "name": "Magnum v2 72B",
        "description": "From the maker of [Goliath](https://openrouter.ai/models/alpindale/goliath-120b), Magnum 72B is the seventh in a family of models designed to achieve the prose quality of the Claude 3 models, notably Opus & Sonnet.\n\nThe model is based on [Qwen2 72B](https://openrouter.ai/models/qwen/qwen-2-72b-instruct) and trained with 55 million tokens of highly curated roleplay (RP) data.",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000003,
          "completion": 0.000003,
          "image": 0
        }
      }
    ]
  },
  "nvidia": {
    "name": "Nvidia",
    "description": "nvidia",
    "models": [
      {
        "id": "nvidia/llama-3.1-nemotron-70b-instruct:free",
        "name": "Llama 3.1 Nemotron 70B Instruct (free)",
        "description": "NVIDIA's Llama 3.1 Nemotron 70B is a language model designed for generating precise and useful responses. Leveraging [Llama 3.1 70B](/models/meta-llama/llama-3.1-70b-instruct) architecture and Reinforcement Learning from Human Feedback (RLHF), it excels in automatic alignment benchmarks. This model is tailored for applications requiring high accuracy in helpfulness and response generation, suitable for diverse user queries across multiple domains.\n\nUsage of this model is subject to [Meta's Acceptable Use Policy](https://www.llama.com/llama3/use-policy/).",
        "context_length": 131072,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "nvidia/llama-3.1-nemotron-70b-instruct",
        "name": "Llama 3.1 Nemotron 70B Instruct",
        "description": "NVIDIA's Llama 3.1 Nemotron 70B is a language model designed for generating precise and useful responses. Leveraging [Llama 3.1 70B](/models/meta-llama/llama-3.1-70b-instruct) architecture and Reinforcement Learning from Human Feedback (RLHF), it excels in automatic alignment benchmarks. This model is tailored for applications requiring high accuracy in helpfulness and response generation, suitable for diverse user queries across multiple domains.\n\nUsage of this model is subject to [Meta's Acceptable Use Policy](https://www.llama.com/llama3/use-policy/).",
        "context_length": 131000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 1.2e-7,
          "completion": 3e-7,
          "image": 0
        }
      }
    ]
  },
  "inflection": {
    "name": "Inflection",
    "description": "inflection",
    "models": [
      {
        "id": "inflection/inflection-3-pi",
        "name": "Inflection 3 Pi",
        "description": "Inflection 3 Pi powers Inflection's [Pi](https://pi.ai) chatbot, including backstory, emotional intelligence, productivity, and safety. It has access to recent news, and excels in scenarios like customer support and roleplay.\n\nPi has been trained to mirror your tone and style, if you use more emojis, so will Pi! Try experimenting with various prompts and conversation styles.",
        "context_length": 8000,
        "capabilities": [],
        "pricing": {
          "prompt": 0.0000025,
          "completion": 0.00001,
          "image": 0
        }
      },
      {
        "id": "inflection/inflection-3-productivity",
        "name": "Inflection 3 Productivity",
        "description": "Inflection 3 Productivity is optimized for following instructions. It is better for tasks requiring JSON output or precise adherence to provided guidelines. It has access to recent news.\n\nFor emotional intelligence similar to Pi, see [Inflect 3 Pi](/inflection/inflection-3-pi)\n\nSee [Inflection's announcement](https://inflection.ai/blog/enterprise) for more details.",
        "context_length": 8000,
        "capabilities": [],
        "pricing": {
          "prompt": 0.0000025,
          "completion": 0.00001,
          "image": 0
        }
      }
    ]
  },
  "ai21": {
    "name": "Ai21",
    "description": "ai21",
    "models": [
      {
        "id": "ai21/jamba-1-5-large",
        "name": "Jamba 1.5 Large",
        "description": "Jamba 1.5 Large is part of AI21's new family of open models, offering superior speed, efficiency, and quality.\n\nIt features a 256K effective context window, the longest among open models, enabling improved performance on tasks like document summarization and analysis.\n\nBuilt on a novel SSM-Transformer architecture, it outperforms larger models like Llama 3.1 70B on benchmarks while maintaining resource efficiency.\n\nRead their [announcement](https://www.ai21.com/blog/announcing-jamba-model-family) to learn more.",
        "context_length": 256000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000002,
          "completion": 0.000008,
          "image": 0
        }
      },
      {
        "id": "ai21/jamba-1-5-mini",
        "name": "Jamba 1.5 Mini",
        "description": "Jamba 1.5 Mini is the world's first production-grade Mamba-based model, combining SSM and Transformer architectures for a 256K context window and high efficiency.\n\nIt works with 9 languages and can handle various writing and analysis tasks as well as or better than similar small models.\n\nThis model uses less computer memory and works faster with longer texts than previous designs.\n\nRead their [announcement](https://www.ai21.com/blog/announcing-jamba-model-family) to learn more.",
        "context_length": 256000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 2e-7,
          "completion": 4e-7,
          "image": 0
        }
      },
      {
        "id": "ai21/jamba-instruct",
        "name": "Jamba Instruct",
        "description": "The Jamba-Instruct model, introduced by AI21 Labs, is an instruction-tuned variant of their hybrid SSM-Transformer Jamba model, specifically optimized for enterprise applications.\n\n- 256K Context Window: It can process extensive information, equivalent to a 400-page novel, which is beneficial for tasks involving large documents such as financial reports or legal documents\n- Safety and Accuracy: Jamba-Instruct is designed with enhanced safety features to ensure secure deployment in enterprise environments, reducing the risk and cost of implementation\n\nRead their [announcement](https://www.ai21.com/blog/announcing-jamba) to learn more.\n\nJamba has a knowledge cutoff of February 2024.",
        "context_length": 256000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 5e-7,
          "completion": 7e-7,
          "image": 0
        }
      }
    ]
  },
  "aetherwiing": {
    "name": "Aetherwiing",
    "description": "aetherwiing",
    "models": [
      {
        "id": "aetherwiing/mn-starcannon-12b",
        "name": "Starcannon 12B",
        "description": "Starcannon 12B v2 is a creative roleplay and story writing model, based on Mistral Nemo, using [nothingiisreal/mn-celeste-12b](/nothingiisreal/mn-celeste-12b) as a base, with [intervitens/mini-magnum-12b-v1.1](https://huggingface.co/intervitens/mini-magnum-12b-v1.1) merged in using the [TIES](https://arxiv.org/abs/2306.01708) method.\n\nAlthough more similar to Magnum overall, the model remains very creative, with a pleasant writing style. It is recommended for people wanting more variety than Magnum, and yet more verbose prose than Celeste.",
        "context_length": 16384,
        "capabilities": [],
        "pricing": {
          "prompt": 8e-7,
          "completion": 0.0000012,
          "image": 0
        }
      }
    ]
  },
  "nothingiisreal": {
    "name": "Nothingiisreal",
    "description": "nothingiisreal",
    "models": [
      {
        "id": "nothingiisreal/mn-celeste-12b",
        "name": "Mistral Nemo 12B Celeste",
        "description": "A specialized story writing and roleplaying model based on Mistral's NeMo 12B Instruct. Fine-tuned on curated datasets including Reddit Writing Prompts and Opus Instruct 25K.\n\nThis model excels at creative writing, offering improved NSFW capabilities, with smarter and more active narration. It demonstrates remarkable versatility in both SFW and NSFW scenarios, with strong Out of Character (OOC) steering capabilities, allowing fine-tuned control over narrative direction and character behavior.\n\nCheck out the model's [HuggingFace page](https://huggingface.co/nothingiisreal/MN-12B-Celeste-V1.9) for details on what parameters and prompts work best!",
        "context_length": 16384,
        "capabilities": [],
        "pricing": {
          "prompt": 8e-7,
          "completion": 0.0000012,
          "image": 0
        }
      }
    ]
  },
  "alpindale": {
    "name": "Alpindale",
    "description": "alpindale",
    "models": [
      {
        "id": "alpindale/magnum-72b",
        "name": "Magnum 72B",
        "description": "From the maker of [Goliath](https://openrouter.ai/models/alpindale/goliath-120b), Magnum 72B is the first in a new family of models designed to achieve the prose quality of the Claude 3 models, notably Opus & Sonnet.\n\nThe model is based on [Qwen2 72B](https://openrouter.ai/models/qwen/qwen-2-72b-instruct) and trained with 55 million tokens of highly curated roleplay (RP) data.",
        "context_length": 16384,
        "capabilities": [],
        "pricing": {
          "prompt": 0.000001875,
          "completion": 0.00000225,
          "image": 0
        }
      },
      {
        "id": "alpindale/goliath-120b",
        "name": "Goliath 120B",
        "description": "A large LLM created by combining two fine-tuned Llama 70B models into one 120B model. Combines Xwin and Euryale.\n\nCredits to\n- [@chargoddard](https://huggingface.co/chargoddard) for developing the framework used to merge the model - [mergekit](https://github.com/cg123/mergekit).\n- [@Undi95](https://huggingface.co/Undi95) for helping with the merge ratios.\n\n#merge",
        "context_length": 6144,
        "capabilities": [],
        "pricing": {
          "prompt": 0.000009375,
          "completion": 0.000009375,
          "image": 0
        }
      }
    ]
  },
  "01-ai": {
    "name": "01-ai",
    "description": "01-ai",
    "models": [
      {
        "id": "01-ai/yi-large",
        "name": "Yi Large",
        "description": "The Yi Large model was designed by 01.AI with the following usecases in mind: knowledge search, data classification, human-like chat bots, and customer service.\n\nIt stands out for its multilingual proficiency, particularly in Spanish, Chinese, Japanese, German, and French.\n\nCheck out the [launch announcement](https://01-ai.github.io/blog/01.ai-yi-large-llm-launch) to learn more.",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.000003,
          "completion": 0.000003,
          "image": 0
        }
      }
    ]
  },
  "databricks": {
    "name": "Databricks",
    "description": "databricks",
    "models": [
      {
        "id": "databricks/dbrx-instruct",
        "name": "DBRX 132B Instruct",
        "description": "DBRX is a new open source large language model developed by Databricks. At 132B, it outperforms existing open source LLMs like Llama 2 70B and [Mixtral-8x7b](/models/mistralai/mixtral-8x7b) on standard industry benchmarks for language understanding, programming, math, and logic.\n\nIt uses a fine-grained mixture-of-experts (MoE) architecture. 36B parameters are active on any input. It was pre-trained on 12T tokens of text and code data. Compared to other open MoE models like Mixtral-8x7B and Grok-1, DBRX is fine-grained, meaning it uses a larger number of smaller experts.\n\nSee the launch announcement and benchmark results [here](https://www.databricks.com/blog/introducing-dbrx-new-state-art-open-llm).\n\n#moe",
        "context_length": 32768,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": 0.0000012,
          "completion": 0.0000012,
          "image": 0
        }
      }
    ]
  },
  "openchat": {
    "name": "Openchat",
    "description": "openchat",
    "models": [
      {
        "id": "openchat/openchat-7b:free",
        "name": "OpenChat 3.5 7B (free)",
        "description": "OpenChat 7B is a library of open-source language models, fine-tuned with \"C-RLFT (Conditioned Reinforcement Learning Fine-Tuning)\" - a strategy inspired by offline reinforcement learning. It has been trained on mixed-quality data without preference labels.\n\n- For OpenChat fine-tuned on Mistral 7B, check out [OpenChat 7B](/models/openchat/openchat-7b).\n- For OpenChat fine-tuned on Llama 8B, check out [OpenChat 8B](/models/openchat/openchat-8b).\n\n#open-source",
        "context_length": 8192,
        "capabilities": [],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "openchat/openchat-7b",
        "name": "OpenChat 3.5 7B",
        "description": "OpenChat 7B is a library of open-source language models, fine-tuned with \"C-RLFT (Conditioned Reinforcement Learning Fine-Tuning)\" - a strategy inspired by offline reinforcement learning. It has been trained on mixed-quality data without preference labels.\n\n- For OpenChat fine-tuned on Mistral 7B, check out [OpenChat 7B](/models/openchat/openchat-7b).\n- For OpenChat fine-tuned on Llama 8B, check out [OpenChat 8B](/models/openchat/openchat-8b).\n\n#open-source",
        "context_length": 8192,
        "capabilities": [],
        "pricing": {
          "prompt": 5.5e-8,
          "completion": 5.5e-8,
          "image": 0
        }
      }
    ]
  },
  "teknium": {
    "name": "Teknium",
    "description": "teknium",
    "models": [
      {
        "id": "teknium/openhermes-2.5-mistral-7b",
        "name": "OpenHermes 2.5 Mistral 7B",
        "description": "A continuation of [OpenHermes 2 model](/models/teknium/openhermes-2-mistral-7b), trained on additional code datasets.\nPotentially the most interesting finding from training on a good ratio (est. of around 7-14% of the total dataset) of code instruction was that it has boosted several non-code benchmarks, including TruthfulQA, AGIEval, and GPT4All suite. It did however reduce BigBench benchmark score, but the net gain overall is significant.",
        "context_length": 4096,
        "capabilities": [],
        "pricing": {
          "prompt": 1.7e-7,
          "completion": 1.7e-7,
          "image": 0
        }
      }
    ]
  },
  "undi95": {
    "name": "Undi95",
    "description": "undi95",
    "models": [
      {
        "id": "undi95/toppy-m-7b:free",
        "name": "Toppy M 7B (free)",
        "description": "A wild 7B parameter model that merges several models using the new task_arithmetic merge method from mergekit.\nList of merged models:\n- NousResearch/Nous-Capybara-7B-V1.9\n- [HuggingFaceH4/zephyr-7b-beta](/models/huggingfaceh4/zephyr-7b-beta)\n- lemonilia/AshhLimaRP-Mistral-7B\n- Vulkane/120-Days-of-Sodom-LoRA-Mistral-7b\n- Undi95/Mistral-pippa-sharegpt-7b-qlora\n\n#merge #uncensored",
        "context_length": 4096,
        "capabilities": [],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "undi95/toppy-m-7b",
        "name": "Toppy M 7B",
        "description": "A wild 7B parameter model that merges several models using the new task_arithmetic merge method from mergekit.\nList of merged models:\n- NousResearch/Nous-Capybara-7B-V1.9\n- [HuggingFaceH4/zephyr-7b-beta](/models/huggingfaceh4/zephyr-7b-beta)\n- lemonilia/AshhLimaRP-Mistral-7B\n- Vulkane/120-Days-of-Sodom-LoRA-Mistral-7b\n- Undi95/Mistral-pippa-sharegpt-7b-qlora\n\n#merge #uncensored",
        "context_length": 4096,
        "capabilities": [],
        "pricing": {
          "prompt": 7e-8,
          "completion": 7e-8,
          "image": 0
        }
      },
      {
        "id": "undi95/remm-slerp-l2-13b",
        "name": "ReMM SLERP 13B",
        "description": "A recreation trial of the original MythoMax-L2-B13 but with updated models. #merge",
        "context_length": 4096,
        "capabilities": [],
        "pricing": {
          "prompt": 8e-7,
          "completion": 0.0000012,
          "image": 0
        }
      }
    ]
  },
  "openrouter": {
    "name": "Openrouter",
    "description": "openrouter",
    "models": [
      {
        "id": "openrouter/auto",
        "name": "Auto Router",
        "description": "Your prompt will be processed by a meta-model and routed to one of dozens of models (see below), optimizing for the best possible output.\n\nTo see which model was used, visit [Activity](/activity), or read the `model` attribute of the response. Your response will be priced at the same rate as the routed model.\n\nThe meta-model is powered by [Not Diamond](https://docs.notdiamond.ai/docs/how-not-diamond-works). Learn more in our [docs](/docs/model-routing).\n\nRequests will be routed to the following models:\n- [openai/gpt-4o-2024-08-06](/openai/gpt-4o-2024-08-06)\n- [openai/gpt-4o-2024-05-13](/openai/gpt-4o-2024-05-13)\n- [openai/gpt-4o-mini-2024-07-18](/openai/gpt-4o-mini-2024-07-18)\n- [openai/chatgpt-4o-latest](/openai/chatgpt-4o-latest)\n- [openai/o1-preview-2024-09-12](/openai/o1-preview-2024-09-12)\n- [openai/o1-mini-2024-09-12](/openai/o1-mini-2024-09-12)\n- [anthropic/claude-3.5-sonnet](/anthropic/claude-3.5-sonnet)\n- [anthropic/claude-3.5-haiku](/anthropic/claude-3.5-haiku)\n- [anthropic/claude-3-opus](/anthropic/claude-3-opus)\n- [anthropic/claude-2.1](/anthropic/claude-2.1)\n- [google/gemini-pro-1.5](/google/gemini-pro-1.5)\n- [google/gemini-flash-1.5](/google/gemini-flash-1.5)\n- [mistralai/mistral-large-2407](/mistralai/mistral-large-2407)\n- [mistralai/mistral-nemo](/mistralai/mistral-nemo)\n- [deepseek/deepseek-r1](/deepseek/deepseek-r1)\n- [meta-llama/llama-3.1-70b-instruct](/meta-llama/llama-3.1-70b-instruct)\n- [meta-llama/llama-3.1-405b-instruct](/meta-llama/llama-3.1-405b-instruct)\n- [mistralai/mixtral-8x22b-instruct](/mistralai/mixtral-8x22b-instruct)\n- [cohere/command-r-plus](/cohere/command-r-plus)\n- [cohere/command-r](/cohere/command-r)",
        "context_length": 2000000,
        "capabilities": [
          "长文本"
        ],
        "pricing": {
          "prompt": -1,
          "completion": -1,
          "image": -1
        }
      }
    ]
  },
  "jondurbin": {
    "name": "Jondurbin",
    "description": "jondurbin",
    "models": [
      {
        "id": "jondurbin/airoboros-l2-70b",
        "name": "Airoboros 70B",
        "description": "A Llama 2 70B fine-tune using synthetic data (the Airoboros dataset).\n\nCurrently based on [jondurbin/airoboros-l2-70b](https://huggingface.co/jondurbin/airoboros-l2-70b-2.2.1), but might get updated in the future.",
        "context_length": 4000,
        "capabilities": [],
        "pricing": {
          "prompt": 5e-7,
          "completion": 5e-7,
          "image": 0
        }
      }
    ]
  },
  "xwin-lm": {
    "name": "Xwin-lm",
    "description": "xwin-lm",
    "models": [
      {
        "id": "xwin-lm/xwin-lm-70b",
        "name": "Xwin 70B",
        "description": "Xwin-LM aims to develop and open-source alignment tech for LLMs. Our first release, built-upon on the [Llama2](/models/${Model.Llama_2_13B_Chat}) base models, ranked TOP-1 on AlpacaEval. Notably, it's the first to surpass [GPT-4](/models/${Model.GPT_4}) on this benchmark. The project will be continuously updated.",
        "context_length": 8192,
        "capabilities": [],
        "pricing": {
          "prompt": 0.00000375,
          "completion": 0.00000375,
          "image": 0
        }
      }
    ]
  },
  "pygmalionai": {
    "name": "Pygmalionai",
    "description": "pygmalionai",
    "models": [
      {
        "id": "pygmalionai/mythalion-13b",
        "name": "Mythalion 13B",
        "description": "A blend of the new Pygmalion-13b and MythoMax. #merge",
        "context_length": 4096,
        "capabilities": [],
        "pricing": {
          "prompt": 8e-7,
          "completion": 0.0000012,
          "image": 0
        }
      }
    ]
  },
  "mancer": {
    "name": "Mancer",
    "description": "mancer",
    "models": [
      {
        "id": "mancer/weaver",
        "name": "Weaver (alpha)",
        "description": "An attempt to recreate Claude-style verbosity, but don't expect the same level of coherence or memory. Meant for use in roleplay/narrative situations.",
        "context_length": 8000,
        "capabilities": [],
        "pricing": {
          "prompt": 0.0000015,
          "completion": 0.00000225,
          "image": 0
        }
      }
    ]
  },
  "huggingfaceh4": {
    "name": "Huggingfaceh4",
    "description": "huggingfaceh4",
    "models": [
      {
        "id": "huggingfaceh4/zephyr-7b-beta:free",
        "name": "Zephyr 7B (free)",
        "description": "Zephyr is a series of language models that are trained to act as helpful assistants. Zephyr-7B-β is the second model in the series, and is a fine-tuned version of [mistralai/Mistral-7B-v0.1](/models/mistralai/mistral-7b-instruct-v0.1) that was trained on a mix of publicly available, synthetic datasets using Direct Preference Optimization (DPO).",
        "context_length": 4096,
        "capabilities": [],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      }
    ]
  },
  "gryphe": {
    "name": "Gryphe",
    "description": "gryphe",
    "models": [
      {
        "id": "gryphe/mythomax-l2-13b:free",
        "name": "MythoMax 13B (free)",
        "description": "One of the highest performing and most popular fine-tunes of Llama 2 13B, with rich descriptions and roleplay. #merge",
        "context_length": 4096,
        "capabilities": [],
        "pricing": {
          "prompt": 0,
          "completion": 0,
          "image": 0
        }
      },
      {
        "id": "gryphe/mythomax-l2-13b",
        "name": "MythoMax 13B",
        "description": "One of the highest performing and most popular fine-tunes of Llama 2 13B, with rich descriptions and roleplay. #merge",
        "context_length": 4096,
        "capabilities": [],
        "pricing": {
          "prompt": 6.5e-8,
          "completion": 6.5e-8,
          "image": 0
        }
      }
    ]
  }
}
