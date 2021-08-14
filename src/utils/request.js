import axios from 'axios'
import { PcCookie, Key } from '@/utils/cookie'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 从cookie获取token
    const accessToken = PcCookie.get(Key.accessTokenKey)
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 正常响应
    return response.data
  },

  error => {
    // 非401状态码，则直接提示信息
    if (error.response && error.response.status !== 401) {
      this.$message.error(error.message)
      return Promise.reject(error)
    }

    // 401 未认证或者访问令牌过期，未认证则要通过刷新令牌获取新的认证信息
    let isLock = true // 防止重复发送刷新请求
    if (isLock && PcCookie.get(Key.refreshTokenKey)) {
      isLock = false // 在发送后，将此值 设置为false
      // 实现刷新令牌效果
      window.location.href = '/auth'
    } else {
      // 没有刷新令牌，则跳转到认证客户端进行重新认证
      window.location.href = '/auth'
    }

    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('令牌过期，重新认证')
  }
)

export default service
