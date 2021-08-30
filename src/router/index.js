import Vue from 'vue'
import VueRouter from 'vue-router'
import { PcCookie, Key } from '@/utils/cookie'

import baseComponent from '../layout/baseLayout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/auth'
  },
  {
    path: '/auth',
    name: 'Login',
    component: () => import('@/views/login/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/login/Register')
  },
  // 用户中心
  {
    path: '/info',
    component: baseComponent,
    redirect: '/info/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/dashboard')
      },
      {
        path: 'user',
        component: () => import('@/views/user/user')
      }
    ]
  },
  // 系统管理
  {
    path: '/system',
    component: baseComponent,
    redirect: '/system/user',
    children: [
      {
        path: 'user',
        component: () => import('@/views/system/user/user')
      },
      {
        path: 'role',
        component: () => import('@/views/system/role/role')
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/system/menu/menu')
      }
    ]
  },
  // 地图
  {
    path: '/map',
    component: baseComponent,
    redirect: '/map/testMap',
    children: [
      {
        path: 'testMap',
        component: () => import('@/views/map/mapTest')
      }
    ]
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
