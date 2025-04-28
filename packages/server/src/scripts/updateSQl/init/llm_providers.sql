/*
 Navicat Premium Dump SQL

 Source Server         : database
 Source Server Type    : SQLite
 Source Server Version : 3045000 (3.45.0)
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3045000 (3.45.0)
 File Encoding         : 65001

 Date: 14/03/2025 22:00:21
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for llm_providers
-- ----------------------------
DROP TABLE IF EXISTS "llm_providers";
CREATE TABLE "llm_providers" (
  "id" VARCHAR(255),
  "name" VARCHAR(255) NOT NULL,
  "api_url" VARCHAR(255),
  "official_url" VARCHAR(255),
  "api_key_url" VARCHAR(255),
  "docs_url" VARCHAR(255),
  "models_url" VARCHAR(255),
  "state" TINYINT(1) DEFAULT 1,
  "sort" INTEGER DEFAULT '99',
  "created_at" DATETIME NOT NULL,
  "updated_at" DATETIME NOT NULL,
  "deleted_at" DATETIME,
  "description" TEXT,
  PRIMARY KEY ("id"),
  UNIQUE ("id" ASC)
);

-- ----------------------------
-- Records of llm_providers
-- ----------------------------
INSERT INTO "llm_providers" VALUES ('openai', 'Openai', 'https://api.openai.com', 'https://openai.com/', 'https://platform.openai.com/api-keys', 'https://platform.openai.com/docs', 'https://platform.openai.com/docs/models', 1, 0, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('o3', 'O3', 'https://api.o3.fan', 'https://o3.fan', 'https://o3.fan/token', 'https://docs.o3.fan', 'https://docs.o3.fan/models', 0, 5, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('anthropic', 'Anthropic', 'https://api.anthropic.com/', 'https://anthropic.com/', 'https://console.anthropic.com/settings/keys', 'https://docs.anthropic.com/en/docs', 'https://docs.anthropic.com/en/docs/about-claude/models', 0, 2, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('silicon', 'Silicon', 'https://api.siliconflow.cn', 'https://www.siliconflow.cn/', 'https://cloud.siliconflow.cn/account/ak?referrer=clxty1xuy0014lvqwh5z50i88', 'https://docs.siliconflow.cn/', 'https://docs.siliconflow.cn/docs/model-names', 0, 7, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('ocoolai', 'Ocoolai', 'https://api.ocoolai.com', 'https://one.ocoolai.com/', 'https://one.ocoolai.com/token', 'https://docs.ocoolai.com/', 'https://api.ocoolai.com/info/models/', 0, 9, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('together', 'Together', 'https://api.tohgether.xyz', 'https://www.together.ai/', 'https://api.together.ai/settings/api-keys', 'https://docs.together.ai/docs/introduction', 'https://docs.together.ai/docs/chat-models', 0, 10, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('gemini', 'Gemini', 'https://generativelanguage.googleapis.com', 'https://gemini.google.com/', 'https://aistudio.google.com/app/apikey', 'https://ai.google.dev/gemini-api/docs', 'https://ai.google.dev/gemini-api/docs/models/gemini', 0, 4, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('perplexity', 'Perplexity', 'https://api.perplexity.ai/', 'https://perplexity.ai/', 'https://www.perplexity.ai/settings/api', 'https://docs.perplexity.ai/home', 'https://docs.perplexity.ai/guides/model-cards', 0, 12, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('infini', 'Infini', 'https://cloud.infini-ai.com/maas', 'https://cloud.infini-ai.com/', 'https://cloud.infini-ai.com/iam/secret/key', 'https://docs.infini-ai.com/gen-studio/api/maas.html#/operations/chatCompletions', 'https://cloud.infini-ai.com/genstudio/model', 0, 13, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('github', 'Github', 'https://models.inference.ai.azure.com/', 'https://github.com/marketplace/models', 'https://github.com/settings/tokens', 'https://docs.github.com/en/github-models', 'https://github.com/marketplace/models', 0, 14, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('ppio', 'Ppio', 'https://api.ppinfra.com/v3/openai', 'https://ppinfra.com/model-api/product/llm-api?utm_source=github_cherry-studio&utm_medium=github_readme&utm_campaign=link', 'https://ppinfra.com/settings/key-management', 'https://ppinfra.com/docs/model-api/reference/llm/llm.html', 'https://ppinfra.com/model-api/product/llm-api?utm_source=github_cherry-studio&utm_medium=github_readme&utm_campaign=link', 0, 6, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('deepseek', 'Deepseek', 'https://api.deepseek.com', 'https://deepseek.com/', 'https://platform.deepseek.com/api_keys', 'https://platform.deepseek.com/api-docs/', 'https://platform.deepseek.com/api-docs/', 1, 1, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('moonshot', 'Moonshot', 'https://api.moonshot.cn', 'https://moonshot.ai/', 'https://platform.moonshot.cn/console/api-keys', 'https://platform.moonshot.cn/docs/', 'https://platform.moonshot.cn/docs/intro#%E6%A8%A1%E5%9E%8B%E5%88%97%E8%A1%A8', 0, 17, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('modelscope', 'Modelscope', 'https://api-inference.modelscope.cn/v1/', 'https://modelscope.cn', 'https://modelscope.cn/my/myaccesstoken', 'https://modelscope.cn/docs/model-service/API-Inference/intro', 'https://modelscope.cn/models', 0, 19, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('gitee-ai', 'Gitee Ai', 'https://ai.gitee.com', 'https://ai.gitee.com/', 'https://ai.gitee.com/dashboard/settings/tokens', 'https://ai.gitee.com/docs/openapi/v1#tag/%E6%96%87%E6%9C%AC%E7%94%9F%E6%88%90/POST/chat/completions', 'https://ai.gitee.com/serverless-api', 0, 8, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('yi', 'Yi', 'https://api.lingyiwanwu.com', 'https://platform.lingyiwanwu.com/', 'https://platform.lingyiwanwu.com/apikeys', 'https://platform.lingyiwanwu.com/docs', 'https://platform.lingyiwanwu.com/docs#%E6%A8%A1%E5%9E%8B', 0, 15, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('azure-openai', 'Azure Openai', '', 'https://azure.microsoft.com/en-us/products/ai-services/openai-service', 'https://portal.azure.com/#view/Microsoft_Azure_ProjectOxford/CognitiveServicesHub/~/OpenAI', 'https://learn.microsoft.com/en-us/azure/ai-services/openai/', 'https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/models', 0, 3, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('stepfun', 'Stepfun', 'https://api.stepfun.com', 'https://platform.stepfun.com/', 'https://platform.stepfun.com/interface-key', 'https://platform.stepfun.com/docs/overview/concept', 'https://platform.stepfun.com/docs/llm/text', 0, 22, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('doubao', 'Doubao', 'https://ark.cn-beijing.volces.com/api/v3/', 'https://console.volcengine.com/ark/', 'https://www.volcengine.com/experience/ark?utm_term=202502dsinvite&ac=DSASUQY5&rc=DB4II4FC', 'https://www.volcengine.com/docs/82379/1182403', 'https://console.volcengine.com/ark/region:ark+cn-beijing/endpoint', 0, 23, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('xirang', 'Xirang', 'https://wishub-x1.ctyun.cn', 'https://www.ctyun.cn', 'https://huiju.ctyun.cn/service/serviceGroup', 'https://www.ctyun.cn/products/ctxirang', 'https://huiju.ctyun.cn/modelSquare/', 0, 20, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('dashscope', 'Dashscope', 'https://dashscope.aliyuncs.com/compatible-mode/v1/', 'https://www.aliyun.com/product/bailian', 'https://bailian.console.aliyun.com/?apiKey=1#/api-key', 'https://help.aliyun.com/zh/model-studio/getting-started/', 'https://bailian.console.aliyun.com/model-market#/model-market', 0, 21, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('groq', 'Groq', 'https://api.groq.com/openai', 'https://groq.com/', 'https://console.groq.com/keys', 'https://console.groq.com/docs/quickstart', 'https://console.groq.com/docs/models', 0, 27, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('minimax', 'Minimax', 'https://api.minimax.chat/v1/', 'https://platform.minimaxi.com/', 'https://platform.minimaxi.com/user-center/basic-information/interface-key', 'https://platform.minimaxi.com/document/Announcement', 'https://platform.minimaxi.com/document/Models', 0, 24, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('baichuan', 'Baichuan', 'https://api.baichuan-ai.com', 'https://www.baichuan-ai.com/', 'https://platform.baichuan-ai.com/console/apikey', 'https://platform.baichuan-ai.com/docs', 'https://platform.baichuan-ai.com/price', 0, 18, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('openrouter', 'Openrouter', 'https://openrouter.ai/api/v1/', 'https://openrouter.ai/', 'https://openrouter.ai/settings/keys', 'https://openrouter.ai/docs/quick-start', 'https://openrouter.ai/docs/models', 0, 26, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('hyperbolic', 'Hyperbolic', 'https://api.hyperbolic.xyz', 'https://app.hyperbolic.xyz', 'https://app.hyperbolic.xyz/settings', 'https://docs.hyperbolic.xyz', 'https://app.hyperbolic.xyz/models', 0, 31, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('ollama', 'Ollama', 'http://localhost:11434', 'https://ollama.com/', '', 'https://github.com/ollama/ollama/tree/main/docs', 'https://ollama.com/library', 0, 28, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('dmxapi', 'Dmxapi', 'https://www.dmxapi.cn', 'https://www.dmxapi.cn/register?aff=bwwY', 'https://www.dmxapi.cn/register?aff=bwwY', 'https://dmxapi.cn/models.html#code-block', 'https://www.dmxapi.cn/pricing', 0, 11, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('zhipu', 'Zhipu', 'https://open.bigmodel.cn/api/paas/v4/', 'https://open.bigmodel.cn/', 'https://open.bigmodel.cn/usercenter/apikeys', 'https://open.bigmodel.cn/dev/howuse/introduction', 'https://open.bigmodel.cn/modelcenter/square', 0, 16, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('aihubmix', 'Aihubmix', 'https://aihubmix.com', 'https://aihubmix.com?aff=SJyh', 'https://aihubmix.com?aff=SJyh', 'https://doc.aihubmix.com/', 'https://aihubmix.com/models', 0, 34, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('jina', 'Jina', 'https://api.jina.ai', 'https://jina.ai', 'https://jina.ai/', 'https://jina.ai', 'https://jina.ai', 0, 33, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('lmstudio', 'Lmstudio', 'http://localhost:1234', 'https://lmstudio.ai/', '', 'https://lmstudio.ai/docs', 'https://lmstudio.ai/models', 0, 29, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('graphrag-kylin-mountain', 'Graphrag Kylin Mountain', '', '', '', '', '', 0, 25, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('mistral', 'Mistral', 'https://api.mistral.ai', 'https://mistral.ai', 'https://console.mistral.ai/api-keys/', 'https://docs.mistral.ai', 'https://docs.mistral.ai/getting-started/models/models_overview', 0, 32, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('grok', 'Grok', 'https://api.x.ai', 'https://x.ai/', '', 'https://docs.x.ai/', 'https://docs.x.ai/docs#getting-started', 0, 30, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('nvidia', 'Nvidia', 'https://integrate.api.nvidia.com', 'https://build.nvidia.com/explore/discover', 'https://build.nvidia.com/meta/llama-3_1-405b-instruct', 'https://docs.api.nvidia.com/nim/reference/llm-apis', 'https://build.nvidia.com/nim', 0, 38, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('baidu-cloud', 'Baidu Cloud', 'https://qianfan.baidubce.com/v2/', 'https://cloud.baidu.com/', 'https://console.bce.baidu.com/iam/#/iam/apikey/list', 'https://cloud.baidu.com/doc/index.html', 'https://cloud.baidu.com/doc/WENXINWORKSHOP/s/Fm2vrveyu', 0, 39, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('tencent-cloud-ti', 'Tencent Cloud Ti', 'https://api.lkeap.cloud.tencent.com', 'https://cloud.tencent.com/product/ti', 'https://console.cloud.tencent.com/lkeap/api', 'https://cloud.tencent.com/document/product/1772', 'https://console.cloud.tencent.com/tione/v2/aimarket', 0, 40, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('hunyuan', 'Hunyuan', 'https://api.hunyuan.cloud.tencent.com', 'https://cloud.tencent.com/product/hunyuan', 'https://console.cloud.tencent.com/hunyuan/api-key', 'https://cloud.tencent.com/document/product/1729/111007', 'https://cloud.tencent.com/document/product/1729/104753', 0, 37, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('fireworks', 'Fireworks', 'https://api.fireworks.ai/inference', 'https://fireworks.ai/', 'https://fireworks.ai/account/api-keys', 'https://docs.fireworks.ai/getting-started/introduction', 'https://fireworks.ai/dashboard/models', 0, 35, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');
INSERT INTO "llm_providers" VALUES ('zhinao', 'Zhinao', 'https://api.360.cn', 'https://ai.360.com/', 'https://ai.360.com/platform/keys', 'https://ai.360.com/platform/docs/overview', 'https://ai.360.com/platform/limit', 0, 36, '2025-03-05T11:32:40.037Z', '2025-03-05T11:32:40.037Z', NULL, 'description');

PRAGMA foreign_keys = true;
