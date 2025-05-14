import { createI18n } from 'vue-i18n';
import enUS from '../locales/en/index.json'
import zhCN from '../locales/zh/index.json'
import esES from '../locales/es/index.json'
import caES from '../locales/ca/index.json'


// Actualizado para incluir todos los idiomas disponibles
export type AvailableLanguages = 'en-US' | 'zh-CN' | 'es-ES' | 'ca-ES'


type AvailableLanguages = 'en-US' | 'zh-CN' | 'es-ES'

const getBrowserLanguage = (): AvailableLanguages => {
  const navigatorLanguage = navigator.language.toLowerCase()
  if (navigatorLanguage.startsWith('zh')) {
    return 'zh-CN'
  }
  if (navigatorLanguage.startsWith('es')) {
    return 'es-ES'
  }
  if (navigatorLanguage.startsWith('ca')) {
    return 'ca-ES'
  }
  return 'en-US'
}

// Obtener el idioma guardado o detectar el del navegador
const getSavedLanguage = (): AvailableLanguages => {
  const savedLang = localStorage.getItem('language') as AvailableLanguages;
  // Verificar que el idioma guardado es uno de los disponibles
  if (savedLang && ['en-US', 'zh-CN', 'es-ES', 'ca-ES'].includes(savedLang)) {
    return savedLang;
  }
  return getBrowserLanguage();
}

const i18n = createI18n({
  legacy: false, // Usar modo Composition API
  locale: getSavedLanguage(),
  fallbackLocale: 'en-US',
  messages: {
    'en-US': enUS,
    'zh-CN': zhCN,
    'es-ES': esES,
    'ca-ES': caES,

  },
})

export const setLanguage = (lang: AvailableLanguages) => {
  i18n.global.locale.value = lang;
  localStorage.setItem('language', lang);
  document.querySelector('html')?.setAttribute('lang', lang.split('-')[0]);
};

export default i18n;
