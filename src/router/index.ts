/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import CostInfo from '@/pages/CostInfo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: setupLayouts,
})

router.addRoute({
  path: "/costinfo/:id",
  name: "costInfo",
  component: CostInfo,
})

export default router
