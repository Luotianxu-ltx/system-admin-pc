import Vue from 'vue'
import VueRouter from 'vue-router'
import { PcCookie, Key } from '@/utils/cookie'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/auth'
  },
  {
    path: '/auth',
    name: 'Login',
    component: () => import('@/components/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/components/Register')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

/**
 * 挂在路由导航守卫
 * to 将要访问的路径
 * from 代表从哪个路径跳转而来
 * next 放行 next() next('/login')
 */
router.beforeEach((to, from, next) => {
  if (to.path === '/auth') return next()
  const userInfo = PcCookie.get(Key.userInfoKey) ? JSON.parse(PcCookie.get(Key.userInfoKey)) : null
  if (!userInfo) return next('/auth')
  next()
})

export default router
