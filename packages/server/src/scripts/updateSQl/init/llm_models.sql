/*
 Navicat Premium Dump SQL

 Source Server         : database
 Source Server Type    : SQLite
 Source Server Version : 3045000 (3.45.0)
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3045000 (3.45.0)
 File Encoding         : 65001

 Date: 18/03/2025 19:07:46
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for llm_models
-- ----------------------------
DROP TABLE IF EXISTS "llm_models";
CREATE TABLE "llm_models" (
  "id" VARCHAR(255),
  "provider_id" VARCHAR(255) NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "group_name" VARCHAR(255),
  "state" TINYINT(1) DEFAULT 0,
  "sort" INTEGER DEFAULT '0',
  "created_at" DATETIME NOT NULL,
  "updated_at" DATETIME NOT NULL,
  "deleted_at" DATETIME,
  PRIMARY KEY ("id"),
  UNIQUE ("id" ASC)
);

-- ----------------------------
-- Records of llm_models
-- ----------------------------
INSERT INTO "llm_models" VALUES ('aihubmix:aihubmix-Llama-3-3-70B-Instruct', 'aihubmix', 'Llama-3.3-70b', 'Llama 3.3', 1, 0, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('aihubmix:Qwen/QVQ-72B-Preview', 'aihubmix', 'Qwen/QVQ-72B', 'Qwen', 1, 1, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('aihubmix:gpt-4o', 'aihubmix', 'GPT-4o', 'GPT-4o', 1, 2, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('aihubmix:gemini-2.0-flash-exp-search', 'aihubmix', 'Gemini 2.0 Flash Exp Search', 'Gemini 2.0', 1, 3, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('o3:o1-mini', 'o3', 'o1-mini', 'OpenAI', 0, 4, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('o3:gpt-4o', 'o3', 'GPT-4o', 'OpenAI', 1, 7, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('o3:claude-3-5-haiku-20241022', 'o3', 'claude-3-5-haiku-20241022', 'Anthropic', 0, 8, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('o3:claude-3-opus-20240229', 'o3', 'claude-3-opus-20240229', 'Anthropic', 1, 9, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('o3:claude-3-haiku-20240307', 'o3', 'claude-3-haiku-20240307', 'Anthropic', 1, 10, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('aihubmix:claude-3-5-sonnet-latest', 'aihubmix', 'Claude 3.5 Sonnet', 'Claude 3.5', 0, 11, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('o3:claude-3-5-sonnet-20240620', 'o3', 'claude-3-5-sonnet-20240620', 'Anthropic', 0, 12, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('o3:deepseek-reasoner', 'o3', 'deepseek-reasoner', 'DeepSeek', 0, 13, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('o3:o3-mini-high', 'o3', 'o3-mini-high', 'OpenAI', 0, 5, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('o3:o1-preview', 'o3', 'o1-preview', 'OpenAI', 0, 15, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('o3:deepseek-ai/Deepseek-R1', 'o3', 'DeepSeek R1', 'DeepSeek', 1, 16, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('o3:text-embedding-ada-002', 'o3', 'text-embedding-ada-002', '嵌入模型', 0, 18, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('aihubmix:deepseek-chat', 'aihubmix', 'DeepSeek Chat', 'DeepSeek Chat', 1, 6, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('o3:claude-3-7-sonnet-20250219', 'o3', 'claude-3-7-sonnet-20250219', 'Anthropic', 0, 20, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('o3:o3-mini', 'o3', 'o3-mini', 'OpenAI', 0, 14, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('o3:deepseek-chat', 'o3', 'deepseek-chat', 'DeepSeek', 1, 19, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('o3:deepseek-ai/DeepSeek-V3', 'o3', 'DeepSeek V3', 'DeepSeek', 1, 23, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('o3:Doubao-embedding', 'o3', 'Doubao-embedding', '嵌入模型', 0, 21, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('o3:Doubao-embedding-large', 'o3', 'Doubao-embedding-large', '嵌入模型', 0, 22, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('silicon:meta-llama/Llama-3.3-70B-Instruct', 'silicon', 'meta-llama/Llama-3.3-70B-Instruct', 'meta-llama', 1, 26, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('silicon:BAAI/bge-m3', 'silicon', 'BAAI/bge-m3', 'BAAI', 0, 27, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('silicon:deepseek-ai/DeepSeek-V3', 'silicon', 'deepseek-ai/DeepSeek-V3', 'deepseek-ai', 1, 25, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('o3:text-embedding-3-small', 'o3', 'text-embedding-3-small', '嵌入模型', 0, 17, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ppio:deepseek/deepseek-v3', 'ppio', 'DeepSeek V3', 'deepseek', 1, 30, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('o3:text-embedding-v2', 'o3', 'text-embedding-v2', '嵌入模型', 0, 31, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ppio:deepseek/deepseek-r1/community', 'ppio', 'DeepSeek: DeepSeek R1 (Community)', 'deepseek', 1, 28, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('silicon:deepseek-ai/DeepSeek-R1', 'silicon', 'deepseek-ai/DeepSeek-R1', 'deepseek-ai', 1, 33, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ppio:meta-llama/llama-3.1-70b-instruct', 'ppio', 'Llama-3.1-70B-Instruct', 'meta-llama', 1, 34, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ppio:qwen/qwen2.5-32b-instruct', 'ppio', 'Qwen2.5-32B-Instruct', 'qwen', 0, 35, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ppio:deepseek/deepseek-v3/community', 'ppio', 'DeepSeek: DeepSeek V3 (Community)', 'deepseek', 1, 32, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ppio:deepseek/deepseek-r1', 'ppio', 'DeepSeek R1', 'deepseek', 1, 29, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ppio:meta-llama/llama-3.1-8b-instruct', 'ppio', 'Llama-3.1-8B-Instruct', 'meta-llama', 1, 36, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ppio:01-ai/yi-1.5-9b-chat', 'ppio', 'Yi-1.5-9B-Chat', '01-ai', 0, 40, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('silicon:Qwen/Qwen2.5-7B-Instruct', 'silicon', 'Qwen2.5-7B-Instruct', 'Qwen', 0, 38, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('openai:gpt-4o-mini', 'openai', ' GPT-4o-mini', 'GPT 4o', 1, 39, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('openai:o1-preview', 'openai', ' o1-preview', 'o1', 0, 43, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ppio:01-ai/yi-1.5-34b-chat', 'ppio', 'Yi-1.5-34B-Chat', '01-ai', 0, 37, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gemini:gemini-1.5-flash', 'gemini', 'Gemini 1.5 Flash', 'Gemini 1.5', 1, 45, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('openai:gpt-4.5-preview', 'openai', ' gpt-4.5-preview', 'gpt-4.5', 1, 42, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('azure-openai:gpt-4o', 'azure-openai', ' GPT-4o', 'GPT 4o', 1, 47, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('openai:o1-mini', 'openai', ' o1-mini', 'o1', 0, 41, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('anthropic:claude-3-7-sonnet-20250219', 'anthropic', 'Claude 3.7 Sonnet', 'Claude 3.7', 0, 49, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gemini:gemini-2.0-flash', 'gemini', 'Gemini 2.0 Flash', 'Gemini 2.0', 1, 50, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gemini:gemini-1.5-flash-8b', 'gemini', 'Gemini 1.5 Flash (8B)', 'Gemini 1.5', 1, 51, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('anthropic:claude-3-5-sonnet-20240620', 'anthropic', 'Claude 3.5 Sonnet (Legacy)', 'Claude 3.5', 0, 52, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('anthropic:claude-3-5-haiku-20241022', 'anthropic', 'Claude 3.5 Haiku', 'Claude 3.5', 0, 53, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ppio:qwen/qwen-2.5-72b-instruct', 'ppio', 'Qwen2.5-72B-Instruct', 'qwen', 1, 44, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gitee-ai:DeepSeek-R1-Distill-Qwen-32B', 'gitee-ai', 'DeepSeek-R1-Distill-Qwen-32B', 'DeepSeek', 1, 55, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('anthropic:claude-3-haiku-20240307', 'anthropic', 'Claude 3 Haiku', 'Claude 3', 1, 56, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gitee-ai:DeepSeek-R1-Distill-Qwen-1.5B', 'gitee-ai', 'DeepSeek-R1-Distill-Qwen-1.5B', 'DeepSeek', 1, 57, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('azure-openai:gpt-4o-mini', 'azure-openai', ' GPT-4o-mini', 'GPT 4o', 1, 48, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gitee-ai:DeepSeek-V3', 'gitee-ai', 'DeepSeek-V3', 'DeepSeek', 1, 59, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('openai:gpt-4o', 'openai', ' GPT-4o', 'GPT 4o', 1, 46, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gitee-ai:Qwen2.5-72B-Instruct', 'gitee-ai', 'Qwen2.5-72B-Instruct', 'Qwen', 1, 61, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gemini:gemini-1.5-pro', 'gemini', 'Gemini 1.5 Pro', 'Gemini 1.5', 1, 62, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gitee-ai:deepseek-coder-33B-instruct', 'gitee-ai', 'deepseek-coder-33B-instruct', 'DeepSeek', 1, 63, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gitee-ai:Qwen2.5-32B-Instruct', 'gitee-ai', 'Qwen2.5-32B-Instruct', 'Qwen', 0, 64, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('anthropic:claude-3-opus-20240229', 'anthropic', 'Claude 3 Opus', 'Claude 3', 1, 54, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('o3:claude-3-5-sonnet-20241022', 'o3', 'claude-3-5-sonnet-20241022', 'Anthropic', 0, 58, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gitee-ai:Qwen2.5-14B-Instruct', 'gitee-ai', 'Qwen2.5-14B-Instruct', 'Qwen', 0, 67, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gitee-ai:QwQ-32B-Preview', 'gitee-ai', 'QwQ-32B-Preview', 'Qwen', 0, 68, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gitee-ai:Qwen2-7B-Instruct', 'gitee-ai', 'Qwen2-7B-Instruct', 'Qwen', 0, 69, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gitee-ai:codegeex4-all-9b', 'gitee-ai', 'codegeex4-all-9b', 'THUDM', 0, 70, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gitee-ai:DeepSeek-R1-Distill-Qwen-14B', 'gitee-ai', 'DeepSeek-R1-Distill-Qwen-14B', 'DeepSeek', 1, 71, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('anthropic:claude-3-5-sonnet-20241022', 'anthropic', 'Claude 3.5 Sonnet', 'Claude 3.5', 0, 60, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gitee-ai:InternVL2.5-78B', 'gitee-ai', 'InternVL2.5-78B', 'OpenGVLab', 0, 73, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gitee-ai:Qwen2-VL-72B', 'gitee-ai', 'Qwen2-VL-72B', 'Qwen', 0, 74, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gitee-ai:InternVL2.5-26B', 'gitee-ai', 'InternVL2.5-26B', 'OpenGVLab', 0, 75, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gitee-ai:DeepSeek-R1', 'gitee-ai', 'DeepSeek-R1', 'DeepSeek', 1, 65, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gitee-ai:glm-4-9b-chat', 'gitee-ai', 'glm-4-9b-chat', 'THUDM', 0, 77, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('deepseek:deepseek-chat', 'deepseek', 'DeepSeek Chat', 'DeepSeek Chat', 1, 78, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gitee-ai:bge-m3', 'gitee-ai', 'bge-m3', 'BAAI', 0, 79, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gitee-ai:DeepSeek-R1-Distill-Qwen-7B', 'gitee-ai', 'DeepSeek-R1-Distill-Qwen-7B', 'DeepSeek', 1, 80, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('deepseek:deepseek-reasoner', 'deepseek', 'DeepSeek Reasoner', 'DeepSeek Reasoner', 1, 81, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gitee-ai:InternVL2-8B', 'gitee-ai', 'InternVL2-8B', 'OpenGVLab', 0, 72, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('together:google/gemma-2-27b-it', 'together', 'gemma-2-27b-it', 'Gemma', 0, 83, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gitee-ai:Qwen2-72B-Instruct', 'gitee-ai', 'Qwen2-72B-Instruct', 'Qwen', 0, 66, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('together:google/gemma-2-9b-it', 'together', 'gemma-2-9b-it', 'Gemma', 0, 85, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gitee-ai:bge-small-zh-v1.5', 'gitee-ai', 'bge-small-zh-v1.5', 'BAAI', 0, 76, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ocoolai:deepseek-chat', 'ocoolai', 'deepseek-chat', 'DeepSeek', 1, 87, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('together:meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo', 'together', 'Llama-3.2-90B-Vision', 'Llama-3.2', 1, 84, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gitee-ai:bge-large-zh-v1.5', 'gitee-ai', 'bge-large-zh-v1.5', 'BAAI', 0, 82, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ocoolai:deepseek-reasoner', 'ocoolai', 'deepseek-reasoner', 'DeepSeek', 0, 86, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ocoolai:ocoolAI/DeepSeek-R1', 'ocoolai', 'ocoolAI/DeepSeek-R1', 'DeepSeek', 1, 88, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gitee-ai:bce-embedding-base_v1', 'gitee-ai', 'bce-embedding-base_v1', 'netease-youdao', 0, 89, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ocoolai:gpt-4o-mini', 'ocoolai', 'gpt-4o-mini', 'OpenAI', 1, 93, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ocoolai:gpt-4o-all', 'ocoolai', 'gpt-4o-all', 'OpenAI', 1, 91, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ocoolai:o1-preview', 'ocoolai', 'o1-preview', 'OpenAI', 0, 95, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ocoolai:o1-mini', 'ocoolai', 'o1-mini', 'OpenAI', 0, 96, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ocoolai:claude-3-5-sonnet-20240620', 'ocoolai', 'claude-3-5-sonnet-20240620', 'Anthropic', 0, 97, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ocoolai:claude-3-5-haiku-20241022', 'ocoolai', 'claude-3-5-haiku-20241022', 'Anthropic', 0, 98, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ocoolai:gemini-pro', 'ocoolai', 'gemini-pro', 'Gemini', 0, 99, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ocoolai:gemini-1.5-pro', 'ocoolai', 'gemini-1.5-pro', 'Gemini', 1, 100, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ocoolai:deepseek-ai/DeepSeek-R1', 'ocoolai', 'deepseek-ai/DeepSeek-R1', 'DeepSeek', 1, 90, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ocoolai:meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo', 'ocoolai', 'Llama-3.2-11B-Vision-Instruct-Turbo', 'Llama-3.2', 1, 102, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ocoolai:meta-llama/Llama-3.2-3B-Vision-Instruct-Turbo', 'ocoolai', 'Llama-3.2-3B-Vision-Instruct-Turbo', 'Llama-3.2', 1, 103, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ocoolai:meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo', 'ocoolai', 'Llama-3.2-90B-Vision-Instruct-Turbo', 'Llama-3.2', 1, 101, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ocoolai:gpt-4', 'ocoolai', 'gpt-4', 'OpenAI', 1, 94, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('together:meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo', 'together', 'Llama-3.2-11B-Vision', 'Llama-3.2', 1, 92, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ocoolai:text-embedding-3-small', 'ocoolai', 'text-embedding-3-small', 'Embedding', 0, 107, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ocoolai:google/gemma-2-9b-it', 'ocoolai', 'gemma-2-9b-it', 'Gemma', 0, 108, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ocoolai:google/gemma-2-27b-it', 'ocoolai', 'gemma-2-27b-it', 'Gemma', 0, 105, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ocoolai:HiSpeed/DeepSeek-R1', 'ocoolai', 'HiSpeed/DeepSeek-R1', 'DeepSeek', 1, 106, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('gitee-ai:Yi-34B-Chat', 'gitee-ai', 'Yi-34B-Chat', '01-ai', 0, 104, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ocoolai:Doubao-embedding', 'ocoolai', 'Doubao-embedding', 'Doubao', 0, 112, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('github:gpt-4o', 'github', 'OpenAI GPT-4o', 'OpenAI', 1, 110, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('yi:yi-lightning', 'yi', 'Yi Lightning', 'yi-lightning', 1, 111, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('zhipu:glm-4-plus', 'zhipu', 'GLM-4-Plus', 'GLM-4', 0, 115, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ocoolai:text-embedding-v2', 'ocoolai', 'text-embedding-v2', 'Embedding', 0, 109, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('zhipu:glm-4-0520', 'zhipu', 'GLM-4-0520', 'GLM-4', 0, 113, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('yi:yi-vision-v2', 'yi', 'Yi Vision v2', 'yi-vision', 0, 114, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('zhipu:glm-4-airx', 'zhipu', 'GLM-4-AirX', 'GLM-4', 0, 119, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ocoolai:gpt-4o', 'ocoolai', 'gpt-4o', 'OpenAI', 1, 117, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('zhipu:glm-zero-preview', 'zhipu', 'GLM-Zero-Preview', 'GLM-Zero', 0, 118, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ocoolai:Azure/DeepSeek-R1', 'ocoolai', 'Azure/DeepSeek-R1', 'DeepSeek', 1, 116, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('zhipu:glm-4-flash', 'zhipu', 'GLM-4-Flash', 'GLM-4', 0, 120, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('ocoolai:text-embedding-3-large', 'ocoolai', 'text-embedding-3-large', 'Embedding', 0, 124, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('zhipu:glm-4-alltools', 'zhipu', 'GLM-4-AllTools', 'GLM-4-AllTools', 0, 122, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('moonshot:moonshot-v1-auto', 'moonshot', 'moonshot-v1-auto', 'moonshot-v1', 0, 126, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('baichuan:Baichuan4', 'baichuan', 'Baichuan4', 'Baichuan4', 0, 127, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('zhipu:glm-4-long', 'zhipu', 'GLM-4-Long', 'GLM-4', 0, 121, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('zhipu:glm-4v-plus', 'zhipu', 'GLM-4V-Plus', 'GLM-4v', 0, 125, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('zhipu:glm-4-flashx', 'zhipu', 'GLM-4-FlashX', 'GLM-4', 0, 123, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('modelscope:deepseek-ai/DeepSeek-R1', 'modelscope', 'deepseek-ai/DeepSeek-R1', 'deepseek-ai', 1, 131, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('baichuan:Baichuan3-Turbo', 'baichuan', 'Baichuan3 Turbo', 'Baichuan3', 0, 132, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('zhipu:glm-4-air', 'zhipu', 'GLM-4-Air', 'GLM-4', 0, 133, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('zhipu:glm-4v', 'zhipu', 'GLM 4V', 'GLM-4v', 0, 128, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('bailian:qwen-coder-plus', 'bailian', 'qwen-coder-plus', 'qwen-coder', 0, 135, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('modelscope:Qwen/Qwen2.5-Coder-32B-Instruct', 'modelscope', 'Qwen/Qwen2.5-Coder-32B-Instruct', 'Qwen', 0, 130, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('bailian:qwen-plus', 'bailian', 'qwen-plus', 'qwen-plus', 0, 137, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('bailian:qwen-max', 'bailian', 'qwen-max', 'qwen-max', 0, 138, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('stepfun:step-1-8k', 'stepfun', 'Step 1 8K', 'Step 1', 0, 139, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('stepfun:step-1-flash', 'stepfun', 'Step 1 Flash', 'Step 1', 0, 140, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('modelscope:Qwen/Qwen2.5-VL-72B-Instruct', 'modelscope', 'Qwen/Qwen2.5-VL-72B-Instruct', 'Qwen', 0, 129, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('modelscope:deepseek-ai/DeepSeek-V3', 'modelscope', 'deepseek-ai/DeepSeek-V3', 'deepseek-ai', 1, 136, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('minimax:abab5.5s-chat', 'minimax', 'abab5.5s', 'abab5', 0, 143, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('bailian:qwen-turbo', 'bailian', 'qwen-turbo', 'qwen-turbo', 1, 141, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('bailian:qwen-vl-plus', 'bailian', 'qwen-vl-plus', 'qwen-vl', 0, 142, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('zhipu:embedding-3', 'zhipu', 'Embedding-3', 'Embedding', 0, 134, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('hyperbolic:mistralai/Pixtral-12B-2409', 'hyperbolic', 'Pixtral-12B-2409', 'Pixtral', 0, 147, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('minimax:abab6.5s-chat', 'minimax', 'abab6.5s', 'abab6', 0, 144, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('grok:grok-vision-beta', 'grok', 'Grok Vision Beta', 'Grok', 0, 149, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('grok:grok-beta', 'grok', 'Grok Beta', 'Grok', 0, 150, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('modelscope:Qwen/Qwen2.5-72B-Instruct', 'modelscope', 'Qwen/Qwen2.5-72B-Instruct', 'Qwen', 1, 151, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('minimax:minimax-text-01', 'minimax', 'minimax-01', 'minimax-01', 0, 145, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('mistral:ministral-3b-latest', 'mistral', 'Mistral 3B [Free]', 'Mistral Mini', 0, 153, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('minimax:abab6.5t-chat', 'minimax', 'abab6.5t', 'abab6', 0, 148, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('mistral:codestral-latest', 'mistral', 'Mistral Codestral', 'Mistral Code', 0, 155, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('hyperbolic:Qwen/Qwen2-VL-7B-Instruct', 'hyperbolic', 'Qwen2-VL-7B-Instruct', 'Qwen2-VL', 0, 156, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('hyperbolic:Qwen/Qwen2-VL-72B-Instruct', 'hyperbolic', 'Qwen2-VL-72B-Instruct', 'Qwen2-VL', 0, 146, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('mistral:ministral-8b-latest', 'mistral', 'Mistral 8B [Free]', 'Mistral Mini', 0, 158, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('baichuan:Baichuan3-Turbo-128k', 'baichuan', 'Baichuan3 Turbo 128k', 'Baichuan3', 0, 159, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('mistral:pixtral-12b-2409', 'mistral', 'Pixtral 12B [Free]', 'Pixtral', 0, 152, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('mistral:mistral-embed', 'mistral', 'Mistral Embedding', 'Mistral Embed', 0, 161, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('minimax:abab6.5g-chat', 'minimax', 'abab6.5g', 'abab6', 0, 154, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('mistral:pixtral-large-latest', 'mistral', 'Pixtral Large', 'Pixtral', 0, 163, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('mistral:mistral-large-latest', 'mistral', 'Mistral Large', 'Mistral Chat', 0, 157, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('mistral:mistral-small-latest', 'mistral', 'Mistral Small', 'Mistral Chat', 0, 162, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('jina:jina-embeddings-v2-base-zh', 'jina', 'jina-embeddings-v2-base-zh', 'Jina Embeddings V2', 0, 166, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('jina:jina-embeddings-v2-base-es', 'jina', 'jina-embeddings-v2-base-es', 'Jina Embeddings V2', 0, 167, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('hyperbolic:meta-llama/Meta-Llama-3.1-405B', 'hyperbolic', 'Meta-Llama-3.1-405B', 'Meta-Llama-3.1', 1, 168, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('fireworks:accounts/fireworks/models/mythomax-l2-13b', 'fireworks', 'mythomax-l2-13b', 'Gryphe', 0, 169, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('fireworks:accounts/fireworks/models/llama-v3-70b-instruct', 'fireworks', 'Llama-3-70B-Instruct', 'Llama3', 1, 170, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('jina:jina-embeddings-v2-base-en', 'jina', 'jina-embeddings-v2-base-en', 'Jina Embeddings V2', 0, 171, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('mistral:open-mistral-nemo', 'mistral', 'Mistral Nemo', 'Mistral Chat', 0, 160, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('hunyuan:hunyuan-pro', 'hunyuan', 'hunyuan-pro', 'Hunyuan', 0, 173, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('jina:jina-embeddings-v2-base-de', 'jina', 'jina-embeddings-v2-base-de', 'Jina Embeddings V2', 0, 165, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('jina:jina-clip-v2', 'jina', 'jina-clip-v2', 'Jina Clip', 0, 175, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('jina:jina-embeddings-v3', 'jina', 'jina-embeddings-v3', 'Jina Embeddings V3', 0, 172, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('jina:jina-clip-v1', 'jina', 'jina-clip-v1', 'Jina Clip', 0, 164, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('zhinao:360gpt-turbo', 'zhinao', '360gpt-turbo', '360Gpt', 0, 174, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('jina:jina-embeddings-v2-base-code', 'jina', 'jina-embeddings-v2-base-code', 'Jina Embeddings V2', 0, 179, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('hunyuan:hunyuan-vision', 'hunyuan', 'hunyuan-vision', 'Hunyuan', 0, 177, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('hunyuan:hunyuan-standard', 'hunyuan', 'hunyuan-standard', 'Hunyuan', 0, 181, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('zhinao:360gpt-pro', 'zhinao', '360gpt-pro', '360Gpt', 0, 176, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('hunyuan:hunyuan-lite', 'hunyuan', 'hunyuan-lite', 'Hunyuan', 0, 183, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('hunyuan:hunyuan-standard-256k', 'hunyuan', 'hunyuan-standard-256k', 'Hunyuan', 0, 184, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('hunyuan:hunyuan-embedding', 'hunyuan', 'hunyuan-embedding', 'Embedding', 0, 182, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('hunyuan:hunyuan-role', 'hunyuan', 'hunyuan-role', 'Hunyuan', 0, 180, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('openrouter:meta-llama/llama-3-8b-instruct:free', 'openrouter', 'Meta: Llama 3 8B Instruct', 'Llama3', 1, 187, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('hunyuan:hunyuan-turbo', 'hunyuan', 'hunyuan-turbo', 'Hunyuan', 0, 185, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('nvidia:01-ai/yi-large', 'nvidia', 'yi-large', 'Yi', 1, 186, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('nvidia:meta/llama-3.1-405b-instruct', 'nvidia', 'llama-3.1-405b-instruct', 'llama-3.1', 1, 190, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('openrouter:microsoft/phi-3-mini-128k-instruct:free', 'openrouter', 'Phi-3 Mini 128K Instruct', 'Phi', 0, 191, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('hunyuan:hunyuan-turbos-latest', 'hunyuan', 'hunyuan-turbos-latest', 'Hunyuan', 0, 189, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('hunyuan:hunyuan-code', 'hunyuan', 'hunyuan-code', 'Hunyuan', 0, 178, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('openrouter:google/gemma-2-9b-it:free', 'openrouter', 'Google: Gemma 2 9B', 'Gemma', 0, 188, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('groq:gemma-7b-it', 'groq', 'Gemma 7B', 'Gemma', 0, 192, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('groq:llama3-8b-8192', 'groq', 'LLaMA3 8B', 'Llama3', 0, 196, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('groq:llama3-70b-8192', 'groq', 'LLaMA3 70B', 'Llama3', 0, 194, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('baidu-cloud:ernie-4.0-turbo-8k-latest', 'baidu-cloud', 'ERNIE 4.0 Trubo', 'ERNIE', 0, 198, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('baidu-cloud:ernie-lite-8k', 'baidu-cloud', 'ERNIE Lite', 'ERNIE', 0, 199, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('openrouter:mistralai/mistral-7b-instruct:free', 'openrouter', 'Mistral: Mistral 7B Instruct', 'Mistral', 0, 193, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('baidu-cloud:ernie-4.0-8k-latest', 'baidu-cloud', 'ERNIE-4.0', 'ERNIE', 0, 197, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('baidu-cloud:deepseek-v3', 'baidu-cloud', 'DeepSeek V3', 'DeepSeek', 1, 195, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('dmxapi:THUDM/glm-4-9b-chat', 'dmxapi', 'THUDM/glm-4-9b-chat', '免费模型', 0, 203, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('dmxapi:glm-4-flash', 'dmxapi', 'glm-4-flash', '免费模型', 0, 204, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('dmxapi:ERNIE-Speed-128K', 'dmxapi', 'ERNIE-Speed-128K', '免费模型', 0, 202, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('baidu-cloud:bge-large-zh', 'baidu-cloud', 'BGE Large ZH', 'Embedding', 0, 200, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('dmxapi:gpt-4o-mini', 'dmxapi', 'gpt-4o-mini', 'OpenAI', 1, 207, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('dmxapi:DMXAPI-DeepSeek-R1', 'dmxapi', 'DMXAPI-DeepSeek-R1', 'DeepSeek', 1, 208, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('dmxapi:gpt-4o', 'dmxapi', 'gpt-4o', 'OpenAI', 1, 209, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('groq:mixtral-8x7b-32768', 'groq', 'Mixtral 8x7B', 'Mixtral', 0, 201, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('dmxapi:DMXAPI-DeepSeek-V3', 'dmxapi', 'DMXAPI-DeepSeek-V3', 'DeepSeek', 1, 211, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('dmxapi:hunyuan-lite', 'dmxapi', 'hunyuan-lite', '免费模型', 0, 206, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('dmxapi:claude-3-5-sonnet-20241022', 'dmxapi', 'claude-3-5-sonnet-20241022', 'Claude', 0, 210, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('dmxapi:Qwen/Qwen2.5-7B-Instruct', 'dmxapi', 'Qwen/Qwen2.5-7B-Instruct', '免费模型', 0, 205, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('baidu-cloud:ernie-speed-8k', 'baidu-cloud', 'ERNIE Speed', 'ERNIE', 0, 215, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('infini:deepseek-r1', 'infini', 'deepseek-r1', 'DeepSeek', 1, 216, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('infini:deepseek-r1-distill-qwen-32b', 'infini', 'deepseek-r1-distill-qwen-32b', 'DeepSeek', 1, 217, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('openrouter:microsoft/phi-3-medium-128k-instruct:free', 'openrouter', 'Phi-3 Medium 128K Instruct', 'Phi', 0, 218, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('dmxapi:gemini-2.0-flash', 'dmxapi', 'gemini-2.0-flash', 'Gemini', 1, 219, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('perplexity:sonar-pro', 'perplexity', 'sonar-pro', 'Sonar', 0, 214, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('baidu-cloud:deepseek-r1', 'baidu-cloud', 'DeepSeek R1', 'DeepSeek', 1, 212, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('infini:qwen2.5-14b-instruct', 'infini', 'qwen2.5-14b-instruct', 'Qwen', 0, 222, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('perplexity:sonar', 'perplexity', 'sonar', 'Sonar', 0, 223, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('infini:qwen2.5-7b-instruct', 'infini', 'qwen2.5-7b-instruct', 'Qwen', 0, 224, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('infini:qwq-32b-preview', 'infini', 'qwq-32b-preview', 'Qwen', 0, 225, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('infini:qwen2.5-72b-instruct', 'infini', 'qwen2.5-72b-instruct', 'Qwen', 1, 220, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('infini:llama-3.3-70b-instruct', 'infini', 'llama-3.3-70b-instruct', 'Llama', 1, 227, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('perplexity:sonar-reasoning-pro', 'perplexity', 'sonar-reasoning-pro', 'Sonar', 0, 213, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('infini:qwen2.5-coder-32b-instruct', 'infini', 'qwen2.5-coder-32b-instruct', 'Qwen', 0, 226, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('infini:gemma-2-27b-it', 'infini', 'gemma-2-27b-it', 'Gemma', 0, 230, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('infini:jina-embeddings-v2-base-code', 'infini', 'jina-embeddings-v2-base-code', 'Jina', 0, 231, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('infini:jina-embeddings-v2-base-zh', 'infini', 'jina-embeddings-v2-base-zh', 'Jina', 0, 232, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('baidu-cloud:bge-large-en', 'baidu-cloud', 'BGE Large EN', 'Embedding', 0, 233, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('infini:qwen2.5-32b-instruct', 'infini', 'qwen2.5-32b-instruct', 'Qwen', 0, 221, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('infini:bge-m3', 'infini', 'bge-m3', 'BAAI', 0, 235, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('infini:qwen2-72b-instruct', 'infini', 'qwen2-72b-instruct', 'Qwen', 0, 228, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('infini:deepseek-v3', 'infini', 'deepseek-v3', 'DeepSeek', 1, 237, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('tencent-cloud-ti:deepseek-r1', 'tencent-cloud-ti', 'DeepSeek R1', 'DeepSeek', 1, 234, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('tencent-cloud-ti:deepseek-v3', 'tencent-cloud-ti', 'DeepSeek V3', 'DeepSeek', 1, 236, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);
INSERT INTO "llm_models" VALUES ('perplexity:sonar-reasoning', 'perplexity', 'sonar-reasoning', 'Sonar', 0, 229, '2025-03-04T14:37:12.932Z', '2025-03-04T14:37:12.932Z', NULL);

PRAGMA foreign_keys = true;
