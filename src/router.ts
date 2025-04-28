import { createWebHistory, createWebHashHistory, createRouter } from 'vue-router'

import Chat from '@/pages/chat.vue'
import KnowledgeBase from '@/pages/knowledgeBase.vue'
import Discover from '@/pages/discover.vue'
import Setting from '@/pages/setting.vue'
import Mcp from '@/pages/mcp.vue'
import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'

/* Initialize analytics */
const analytics = Analytics({
  app: 'ee-chat-app-name',
  version: 100,
  plugins: [
    googleAnalytics({
      measurementIds: ['G-SX8YF600ZG'],
    }),
  ],
})

const routes = [
  { path: '/', component: Chat },
  { path: '/knowledgeBase', component: KnowledgeBase },
  { path: '/discover', component: Discover },
  { path: '/setting', component: Setting },
  { path: '/mcp', component: Mcp },
  // { path: '/about', component: AboutView },
]

// Use hash mode for Electron production builds to avoid path issues
const isElectron = window.navigator.userAgent.includes('Electron');
const router = createRouter({
  history: isElectron ? createWebHashHistory() : createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to, from) => {
  analytics.page()
})
export default router
