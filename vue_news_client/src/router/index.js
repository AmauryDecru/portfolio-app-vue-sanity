import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from "@/store";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/announcement/:id',
    name: 'announcement',
    component: () => import('../views/AnnouncementDetailView.vue')
  },
  {
    path: '/operations',
    name: 'operations',
    component: () => import('../views/OperationsView.vue')
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('../views/NewsView.vue')
  },
  {
    path: '/members',
    name:'member',
    component: () => import('../views/MemberView')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to, from) => {
  if(from .name){
    document.documentElement.scrollTop = 0
    store.dispatch('CloseMenu')
  }
})

export default router
