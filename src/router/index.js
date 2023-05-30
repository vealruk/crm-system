import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView'),
    meta: {
      layout: 'auth',
      auth: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView'),
    meta: {
      layout: 'auth',
      auth: false
    }
  },
  {
    path: '/home',
    name: 'home',
    alias: '/',
    component: () => import('@/views/HomeView'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('@/views/CategoriesView'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('@/views/HistoryView'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('@/views/DetailRecordView'),
    props: true,
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/planning',
    name: 'planning',
    component: () => import('@/views/PlanningView'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/record',
    name: 'record',
    component: () => import('@/views/RecordView'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/:notFound(.*)',
    name: 'notFound',
    component: () => import('@/views/NotFoundView'),
    meta: {
      layout: 'auth',
      auth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth

  if (requireAuth && store.getters['auth/isAuthenticated']) {
    next()
  } else if (requireAuth && !store.getters['auth/isAuthenticated']) {
    next('/login?message=auth')
  } else {
    next()
  }
})

export default router
