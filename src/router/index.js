import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Combat from '../views/Combat.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/combat', name: 'Combat', component: Combat }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
