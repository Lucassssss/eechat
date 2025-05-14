import { createWebHistory, createWebHashHistory, createRouter } from 'vue-router'

import Chat from '@/pages/chat.vue'
import Discover from '@/pages/discover.vue'
import Setting from '@/pages/setting.vue'
import Mcp from '@/pages/mcp.vue'
import Email from '@/pages/email.vue'
import Calendar from '@/pages/calendar.vue'
import Todo from '@/pages/todo.vue'
import Rag from '@/pages/rag.vue'
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
  { path: '/rag', component: Rag },
  { path: '/discover', component: Discover },
  { path: '/setting', component: Setting },
  { path: '/mcp', component: Mcp },
  { path: '/email', component: Email },
  { path: '/calendar', component: Calendar },
  { path: '/todo', component: Todo },

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
