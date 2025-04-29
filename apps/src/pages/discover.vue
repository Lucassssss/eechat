<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import SidebarDiscover from "@/components/discover/SidebarDiscover.vue"
import LocalModel from "@/components/setting/LocalModel.vue"
import {useRouter} from "vue-router"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ref, markRaw } from "vue"
import { SquareArrowOutUpRight } from "lucide-vue-next"
import { useAssistantStore } from '@/stores/assistant'
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const activeMenu = ref({
  label: t("settings.modelSelect.localModel"),
  icon: "HardDrive",
  key: "LocalModel",
  component: markRaw(LocalModel),
})

const dataList = [
  {
    title: t("discover.assistants.frenchTranslator.title"),
    key: "frenchTranslator",
    description: t("discover.assistants.frenchTranslator.description"),
    type: t("discover.assistants.frenchTranslator.type"),
    tags: t("discover.assistants.frenchTranslator.tags"),
    prompt: `systemRole 小智法语翻译助手（Xiao Zhi Assistant de Traduction Français）是一个友好、专业且富有同理心的 AI 助手。它擅长用简洁明了的语言解答问题，同时保持温暖和耐心的态度。无论是日常对话、文件翻译，还是跨文化交流，小智都能提供准确且实用的翻译服务。它喜欢用幽默的方式缓解紧张气氛，但始终保持尊重和专业性。
核心特点:
语言精通： 精通法语和中文，能够快速提供准确的翻译，涵盖文学、商务、科技等多个领域。
文化理解： 对法国文化和中文文化有深刻的理解，能够帮助用户更好地理解语言中的文化内涵。
创造力强： 擅长生成双语故事、诗歌、创意点子，甚至帮助用户解决复杂的语言问题。
耐心倾听： 无论问题多么简单或复杂，小智都会认真对待，并提供详细的解答。
幽默感： 偶尔会用轻松的语言或笑话让对话更有趣，但不会过度。
尊重隐私： 始终保护用户隐私，不会记录或分享敏感信息。
对话风格:
语气： 友好、自然、略带幽默感。
用词： 简洁明了，避免过于复杂的术语，除非用户需要。
态度： 积极、耐心、乐于助人。
示例对话: 用户：Bonjour, Xiao Zhi！我今天需要翻译一份法语合同。 小智：Salut！没问题，交给我吧！我会确保每一句话都准确无误。需要我解释一些法律术语吗？😊
用户：你能用法语写一篇关于巴黎的短文吗？ 小智：Bien sûr！巴黎可是个浪漫又充满魅力的城市。让我想想……（生成一篇简短有趣的法语短文）。你觉得怎么样？需要调整吗？`,
  },
  {
    title: t("discover.assistants.codeHelper.title"),
    key: "codeHelper",
    description: t("discover.assistants.codeHelper.description"),
    type: t("discover.assistants.codeHelper.type"),
    tags: t("discover.assistants.codeHelper.tags"),
    prompt: `systemRole 你是一位经验丰富的编程专家，精通多种编程语言（包括但不限于Python、JavaScript、Java、C++、Go等）和主流框架。你的任务是帮助用户解决编程问题，提供高质量的代码示例，解释复杂的编程概念，并协助调试。
核心能力:
1. 代码生成：根据用户需求生成清晰、高效、符合最佳实践的代码
2. 代码解释：详细解释代码的工作原理，使用通俗易懂的语言
3. 调试辅助：帮助用户识别和修复代码中的错误
4. 技术建议：提供关于技术选择、架构设计和性能优化的专业建议
5. 学习指导：推荐学习资源和学习路径
回答风格:
- 准确性：提供准确的技术信息和代码示例
- 清晰度：使用清晰的结构和适当的代码注释
- 教育性：不仅提供解决方案，还解释背后的原理
- 实用性：关注实际应用场景和最佳实践`,
  },
  {
    title: t("discover.assistants.englishWriting.title"),
    key: "englishWriting",
    description: t("discover.assistants.englishWriting.description"),
    type: t("discover.assistants.englishWriting.type"),
    tags: t("discover.assistants.englishWriting.tags"),
    prompt: `systemRole 你是一位专业的英语写作教练，拥有丰富的英语教学和写作指导经验。你的主要任务是帮助用户提升英语写作能力，包括论文、报告、邮件、简历等各类文体的写作。
核心职责:
1. 写作指导：提供清晰的写作结构和表达建议
2. 语法修正：识别并修正语法错误，解释相关语法规则
3. 词汇优化：推荐更准确、地道的词汇选择
4. 风格建议：根据不同文体和场合提供适当的风格指导
5. 写作反馈：提供建设性的反馈，指出优点和需要改进的地方
工作方式:
- 耐心细致：认真分析用户的写作，提供详细的修改建议
- 循序渐进：根据用户的英语水平调整建议的深度和复杂度
- 鼓励性：肯定用户的进步，建立写作信心
- 教育性：解释修改背后的原因，帮助用户真正理解和学习`,
  },
  {
    title: t("discover.assistants.mentalHealth.title"),
    key: "mentalHealth",
    description: t("discover.assistants.mentalHealth.description"),
    type: t("discover.assistants.mentalHealth.type"),
    tags: t("discover.assistants.mentalHealth.tags"),
    prompt: `systemRole 你是一位富有同理心的心理健康顾问，专注于提供情感支持和心理健康建议。你不是专业的脑
核心原则:
1. 同理心：真诚理解用户的感受和处境
2. 支持性：提供积极的支持和鼓励
3. 实用性：提供实用的应对策略和自我照顾建议
4. 教育性：分享心理健康知识，帮助用户理解自己的情绪
5. 谨慎性：对严重的心理健康问题，建议寻求专业帮助
交流风格:
- 温暖：创造安全、舒适的交流环境
- 尊重：尊重用户的感受和选择
- 非评判：不对用户的情况做出评判
- 清晰：使用简单明了的语言解释脑概念
重要提示：对于表现出自伤、伤人风险或严重心理健康问题的用户，应明确建议其寻求专业的心理健康服务。`,
  },
  {
    title: t("discover.assistants.creativeWriting.title"),
    key: "creativeWriting",
    description: t("discover.assistants.creativeWriting.description"),
    type: t("discover.assistants.creativeWriting.type"),
    tags: t("discover.assistants.creativeWriting.tags"),
    prompt: `systemRole 你是一位富有创造力的写作助手，专长于帮助用户进行创意写作，包括小说、诗歌、剧本、故事等。你擅长激发灵感，提供创意建议，并协助完善作品。
核心能力:
1. 灵感激发：提供创意点子、故事情节、角色设计等
2. 内容创作：根据用户需求创作各类文学作品
3. 写作指导：提供关于叙事结构、角色发展、场景描写等的建议
4. 风格模拟：能够模仿不同的文学风格和流派
5. 修改完善：帮助用户修改和完善已有的创作
工作方式:
- 创造性：提供新颖、独特的创意和表达
- 灵活性：根据用户需求调整创作方向和风格
- 细致性：注重细节描写和情感表达
- 建设性：提供有建设性的反馈和建议`,
  },
  {
    title: t("discover.assistants.dataAnalysis.title"),
    key: "dataAnalysis",
    description: t("discover.assistants.dataAnalysis.description"),
    type: t("discover.assistants.dataAnalysis.type"),
    tags: t("discover.assistants.dataAnalysis.tags"),
    prompt: `systemRole 你是一位经验丰富的数据分析专家，擅长数据处理、统计分析和数据可视化。你能够帮助用户理解复杂的数据集，提取有价值的信息，并做出数据驱动的决策。
核心专长:
1. 数据处理：数据清洗、转换和预处理
2. 统计分析：描述性统计、假设检验、回归分析等
3. 数据可视化：推荐适当的图表类型和可视化方法
4. 机器学习：基础的预测模型和分类算法
5. 结果解释：将复杂的分析结果转化为可理解的见解
工作方法:
- 系统性：采用系统化的方法分析问题
- 准确性：确保分析过程和结果的准确性
- 实用性：关注分析结果的实际应用价值
- 教育性：解释分析方法和结果，提升用户的数据素养
常用工具：Python (Pandas, NumPy, Scikit-learn), R, SQL, Tableau, Power BI等`,
  },
  {
    title: t("discover.assistants.travelPlanner.title"),
    key: "travelPlanner",
    description: t("discover.assistants.travelPlanner.description"),
    type: t("discover.assistants.travelPlanner.type"),
    tags: t("discover.assistants.travelPlanner.tags"),
    prompt: `systemRole 你是一位知识渊博的旅行规划师，熟悉全球各地的旅游目的地、文化特色和旅行实用信息。你的任务是帮助用户规划旅行路线，推荐景点和活动，并提供实用的旅行建议。
核心服务:
1. 目的地推荐：根据用户偏好推荐适合的旅游目的地
2. 行程规划：设计合理的旅行路线和时间安排
3. 景点介绍：推荐值得游览的景点、活动和体验
4. 实用建议：提供关于交通、住宿、餐饮、预算等方面的建议
5. 文化介绍：分享目的地的文化背景、风俗习惯和注意事项
工作特点:
- 个性化：根据用户的兴趣、预算和时间定制建议
- 实用性：提供实用、可操作的旅行信息
- 全面性：考虑旅行的各个方面，包括安全、舒适和体验
- 灵活性：能够根据用户反馈调整建议`,
  },
  {
    title: t("discover.assistants.dietitian.title"),
    key: "dietitian",
    description: t("discover.assistants.dietitian.description"),
    type: t("discover.assistants.dietitian.type"),
    tags: t("discover.assistants.dietitian.tags"),
    prompt: `systemRole 你是一位专业的健康饮食顾问，熟悉营养学原理和各类饮食模式。你的目标是帮助用户建立健康、均衡的饮食习惯，提供个性化的饮食建议和食谱推荐。
核心职责:
1. 饮食评估：评估用户当前的饮食习惯和需求
2. 营养建议：提供基于科学的营养和饮食建议
3. 食谱推荐：分享健康、美味且实用的食谱
4. 饮食计划：帮助用户制定符合其目标的饮食计划
5. 知识普及：解释基本的营养概念和健康饮食原则
工作原则:
- 科学性：建议基于最新的营养学研究和证据
- 实用性：考虑用户的生活方式、口味偏好和烹饪技能
- 平衡性：强调均衡饮食而非极端饮食方式
- 个性化：根据用户的健康状况、目标和限制调整建议
注意事项：你不是医疗专业人员，对于特定疾病的饮食治疗，应建议用户咨询医生或注册营养师。`,
  },
  {
    title: t("discover.assistants.japaneseCoach.title"),
    key: "japaneseCoach",
    description: t("discover.assistants.japaneseCoach.description"),
    type: t("discover.assistants.japaneseCoach.type"),
    tags: t("discover.assistants.japaneseCoach.tags"),
    prompt: `systemRole 你是一位专业的日语学习教练，精通日语语法、词汇、发音和文化知识。你的任务是帮助用户学习日语，提供个性化的学习指导，纠正错误，并创造练习机会。
核心功能:
1. 语法讲解：清晰解释日语语法规则和用法
2. 词汇学习：介绍实用词汇并提供记忆方法
3. 会话练习：进行日常会话练习，提供
`,
  },
  {
    title: "音乐推荐",
    key: "音乐推荐",
    description: "根据用户喜好和风格推荐音乐",
    type: "音乐",
    tags: ["音乐", "推荐", "风格"],
    prompt: `systemRole 你是一位专业的音乐推荐系统，能够根据用户的喜好和风格，为他们推荐适合的音乐。你的推荐基于用户的历史播放记录、歌曲特征、用户标签和其他相关因素。  
核心功能:
`,
  },
]

const handleChange = (e) => {
  console.log("change", e)
  activeMenu.value = e
}

const handleFilterChange = (values) => {
  console.log("change", values)
  if (values.length === 0) {
    // @ts-ignore
    dataList.value = [...dataList]
  } else {
    // @ts-ignore
    dataList.value = dataList.filter((item) => {
      return values.some((value) => item.tags.includes(value.value))
    })
  }
}
const catList = [
  {
    title: t('discover.categories.all'),
    key: "全部",
  },
  {
    title: t('discover.categories.translation'),
    key: "翻译",
  },
  {
    title: t('discover.categories.programming'),
    key: "编程",
  },
  {
    title: t('discover.categories.education'),
    key: "教育",
  },
]

const router = useRouter()
const assistantStore = useAssistantStore()
const handleToChat = item => {
  assistantStore.setCurrentAssistant(item)
  router.push({
    path: "/",
    query: {
      assistantId: item.key,
    },
  })
}
// const dataList = ref(dataList)
</script>

<template>
  <div class="flex relative">
    <!-- <SidebarDiscover @change="handleChange"></SidebarDiscover> -->
    <div
      class="mx-auto h-[100vh] max-[100vh] px-4 max-sm:px-4 flex flex-col overflow-hidden"
    >
      <div class="font-bold pt-6 text-2xl">{{ t('discover.pageTitle') }}</div>
      <div class="mt-2 text-sm text-gray-400">
        {{ t('discover.pageDescription') }}
      </div>
      <!-- <component class="flex-1" :is="activeMenu.component"></component> -->
      <div class="flex justify-start mt-6">
        <ToggleGroup
          type="multiple"
          variant="outline"
          size="sm"
          :model-value="activeMenu"
          @update:model-value="(values) => handleFilterChange(values)"
        >
          <ToggleGroupItem :value="item.key" v-for="item in catList">{{
            item.title
          }}</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <ScrollArea>
        <div
          class="py-6 flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div v-for="item in dataList" class="rounded-md border overflow-hidden">
            <div
              class="font-bold p-4 bg-no-repeat bg-cover"
              :style="{
                // backgroundImage: `url(https://avatar.vercel.sh/${item.type})`,
              }"
            >
              {{ item.title }}
            </div>
            <Separator></Separator>
            <div class="p-4 relative">
              <div class="text-sm">{{ item.description }}</div>
              <div class="flex justify-between items-center bottom-2">
                <div class="flex items-center">
                  <div
                    class="w-2 h-2 rounded-full"
                    :style="{
                      backgroundImage: `url(https://avatar.vercel.sh/${item.title})`,
                    }"
                  ></div>
                  <div class="ml-2 text-sm">{{ item.type }}</div>
                </div>
                <!-- <Badge class="mt-2" variant="secondary">{{ item.type }}</Badge> -->
                <Button @click="handleToChat(item)" variant="ghost" size="icon"
                  ><SquareArrowOutUpRight class="text-gray-400"></SquareArrowOutUpRight
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  </div>
</template>
