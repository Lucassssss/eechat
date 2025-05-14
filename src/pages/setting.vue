<script setup lang="ts">
import SidebarSetting from "@/components/setting/SidebarSetting.vue"
import LocalModel from "@/components/setting/LocalModel.vue"
import ApiModel from "@/components/setting/ApiModel.vue"
import Playground from "@/components/setting/Playground.vue" // Asumiendo que este es el componente para área de pruebas
import Appearance from "@/components/setting/Appearance.vue" // Asumiendo que este es el componente de interfaz
import DataSet from "@/components/setting/DataSet.vue" // Asumiendo que este es el componente de datos
import About from "@/components/setting/About.vue" // Asumiendo que este es el componente de acerca de
import { ref, markRaw, onMounted, computed } from "vue"
import { useRoute } from "vue-router"
import { useI18n } from "vue-i18n"
import { useModelStore } from "@/stores/model"
import { ModelProvider } from "@/types/llm"

const { t, locale } = useI18n()
import { watch } from "vue"

interface MenuItem {
  label: string
  icon: string
  key: string
  component: any
  props: Record<string, any>
  titleKey?: string // Clave para obtener el título traducido
}

const route = useRoute()
const modelStore = useModelStore()

// Definición más completa con todas las secciones posibles
const menuItems: Record<string, MenuItem> = {
  LocalModel: {
    label: t('settings.models.localModel'),
    icon: "HardDrive",
    key: "LocalModel",
    component: markRaw(LocalModel),
    props: { providerId: "" },
    titleKey: 'settings.sidebar.localModel'
  },
  ApiModel: {
    label: t('settings.models.apiModel'),
    icon: "Cloud",
    key: "ApiModel",
    component: markRaw(ApiModel),
    props: { providerId: "" },
    titleKey: 'settings.sidebar.apiModel'
  },
  Interface: {
    label: t('settings.sidebar.interface'),
    icon: "Monitor",
    key: "appearance", // Asumiendo que esta es la clave utilizada
    component: markRaw(Appearance),
    props: {},
    titleKey: 'settings.sidebar.interface'
  },
  Data: {
    label: t('settings.sidebar.data'),
    icon: "Database",
    key: "data",
    component: markRaw(DataSet),
    props: {},
    titleKey: 'settings.sidebar.data'
  },
  About: {
    label: t('settings.sidebar.about'),
    icon: "Info",
    key: "about",
    component: markRaw(About),
    props: {},
    titleKey: 'settings.sidebar.about'
  },
  Playground: {
    label: t('settings.sidebar.playground'),
    icon: "Code",
    key: "playground",
    component: markRaw(Playground),
    props: {},
    titleKey: 'settings.sidebar.playground'
  }
}

const activeMenu = ref<MenuItem>(menuItems.LocalModel)

// Título computado que mostrará el título basado en el menú activo
const pageTitle = computed(() => {
  // Si el menú activo tiene una clave de título, úsala
  if (activeMenu.value && activeMenu.value.titleKey) {
    return t(activeMenu.value.titleKey)
  }
  
  // Si no hay clave de título pero hay una clave de menú, intenta determinar el título
  if (activeMenu.value && activeMenu.value.key) {
    // Intentar mapear la clave del menú a una clave de traducción
    const key = activeMenu.value.key.toLowerCase()
    
    if (key === 'localmodel') {
      return t('settings.sidebar.localModel')
    }
    if (key === 'apimodel') {
      return t('settings.sidebar.apiModel')
    }
    if (key === 'appearance') {
      return t('settings.sidebar.interface')
    }
    if (key === 'data') {
      return t('settings.sidebar.data')
    }
    if (key === 'about') {
      return t('settings.sidebar.about')
    }
    if (key === 'playground') {
      return t('settings.sidebar.playground')
    }
  }
  
  // Si todo falla, usar la etiqueta del menú activo
  return activeMenu.value.label
})

const handleChange = (e) => {
  console.log("change", e)
  activeMenu.value = e
}

onMounted(() => {
  const action = route.query.action as string
  if (action) {
    if (action.toLowerCase() === "local") {
      activeMenu.value = menuItems.LocalModel
    } else {
      activeMenu.value = {
        ...menuItems.ApiModel,
        props: { providerId: action },
      }
    }
  }
})

// Observar cambios de idioma para actualizar traducciones
watch(locale, () => {
  // Actualizar las etiquetas de los menú items para cada sección
  Object.keys(menuItems).forEach(key => {
    if (menuItems[key].titleKey) {
      menuItems[key].label = t(menuItems[key].titleKey)
    }
  })
  
  // Forzar actualización del menú activo conservando su clave
  if (activeMenu.value) {
    const currentKey = activeMenu.value.key
    const currentProps = activeMenu.value.props || {}
    
    // Buscar el menú correspondiente a la clave actual
    const matchingMenuItem = Object.values(menuItems).find(item => item.key === currentKey)
    
    if (matchingMenuItem) {
      // Actualizar con el menú actualizado, preservando las props
      activeMenu.value = { ...matchingMenuItem, props: currentProps }
    }
  }
})
</script>

<template>
  <div class="flex relative">
    <SidebarSetting @change="handleChange"></SidebarSetting>
    <div
      class="md:w-[60%] sm:w-full sm:px-4 mx-auto h-[100vh] max-[100vh] flex flex-col overflow-hidden"
    >
      <!-- Mostrar el título basado en el menú activo -->
      <div class="font-bold text-2xl py-6">{{ pageTitle }}</div>
      <component
        class="flex-1"
        :is="activeMenu.component"
        v-bind="activeMenu.props || {}"
      ></component>
    </div>
  </div>
</template>