import { createI18n } from 'vue-i18n';
import enUS from '../locales/en/index.json'
import zhCN from '../locales/zh/index.json'

// 检测用户首选语言
// const getBrowserLanguage = () => {
//   const navigatorLanguage = navigator.language.toLowerCase();
//   if (navigatorLanguage.startsWith('zh')) {
//     return 'zh';
//   }
//   return 'en';
// };

type AvailableLanguages = 'en-US' | 'zh-CN'

// 从本地存储获取用户设置的语言
const getBrowserLanguage = (): AvailableLanguages => {
  const navigatorLanguage = navigator.language.toLowerCase()
  if (navigatorLanguage.startsWith('zh')) {
    return 'zh-CN'
  }
  return 'en-US'
}

const getSavedLanguage = (): AvailableLanguages => {
  return (
    (localStorage.getItem('language') as AvailableLanguages) ||
    getBrowserLanguage()
  )
}

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: getSavedLanguage(),
  fallbackLocale: 'en-US',
  messages: {
    'en-US': enUS,
    'zh-CN': zhCN,
  },
})

export const setLanguage = (lang: AvailableLanguages) => {
  i18n.global.locale.value = lang;
  localStorage.setItem('language', lang);
  document.querySelector('html')?.setAttribute('lang', lang);
};

export default i18n;