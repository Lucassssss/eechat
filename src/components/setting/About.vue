<script setup lang="ts">
import { ref } from "vue"
import { Button } from "@/components/ui/button"
import pkg from "../../../package.json"
import { Github, Star, Phone, Mail, Copy, Check } from "lucide-vue-next"
import { useI18n } from "vue-i18n"

const { t } = useI18n()
const version = ref(pkg.version)
const phoneButtonIcon = ref("copy")
const emailButtonIcon = ref("copy")

const github = () => {
  window.ipcRenderer.invoke("open-external", "https://github.com/Lucassssss/xavi9")
}

const copyToClipboard = (text: string, type: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      // 根据复制的内容类型设置对应按钮的图标为 Check
      if (type === "phone") {
        phoneButtonIcon.value = "check"
        // 2秒后恢复为 Copy 图标
        setTimeout(() => {
          phoneButtonIcon.value = "copy"
        }, 2000)
      } else if (type === "邮箱") {
        emailButtonIcon.value = "check"
        // 2秒后恢复为 Copy 图标
        setTimeout(() => {
          emailButtonIcon.value = "copy"
        }, 2000)
      }
    })
    .catch((err) => {
      console.error("复制失败:", err)
    })
}
</script>

<template>
  <div class="h-full space-y-6">
    <div>{{ t("settings.about.description") }}</div>
    <div>v{{ version }}</div>
    <div>
      <Button @click="github" class="flex items-center space-x-1 text-sm">
        <Github></Github>
        <span>{{ t("settings.about.star") }}</span>
        <Star class="fill-yellow-500 text-yellow-500"></Star>
        <span>{{ t("settings.about.accelerate") }}</span>
      </Button>
    </div>
    <div class="font-bold text-lg">{{ t("settings.about.contactTitle") }}</div>
    <div class="flex space-x-6">
      <div>
        <div class="mb-2 text-zinc-500">{{ t("settings.about.wechatGroup") }}</div>
        <img class="size-[200px] border rounded" src="http://8.130.172.245/assets/wechat_g.png" />
      </div>
      <div>
        <div class="mb-2 text-zinc-500">{{ t("settings.about.contactDev") }}</div>
        <img class="size-[200px] border rounded" src="http://8.130.172.245/assets/wechat_a.png" />
      </div>
    </div>
    <div class="font-bold text-lg">{{ t("settings.about.businessTitle") }}</div>
    <div class="flex space-x-4">
      <div class="space-y-2">
        <div class="flex items-center space-x-2">
          <Phone class="text-zinc-500 size-4"></Phone>
          <span class="text-zinc-600">18693098002</span>
          <Button size="sm" variant="outline" @click="copyToClipboard('18693098002', 'phone')">
            <Copy v-if="phoneButtonIcon === 'copy'"></Copy>
            <Check v-else class="text-green-500"></Check>
            {{ t('common.copy') }}
          </Button>
        </div>
        <div class="flex items-center space-x-2">
          <Mail class="text-zinc-500 size-4"></Mail>
          <span class="text-zinc-600">hi@9tharts.com</span>
          <Button size="sm" variant="outline" @click="copyToClipboard('hi@9tharts.com', 'email')">
            <Copy v-if="emailButtonIcon === 'copy'"></Copy>
            <Check v-else class="text-green-500"></Check>
            {{ t('common.copy') }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
