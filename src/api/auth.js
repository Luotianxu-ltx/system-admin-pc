import service from '@/utils/request'
import qs from 'qs'

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

const auth = {
  username: 'system-admin',
  password: '123456'
}

export function login (data) {
  return service.request({
    headers,
    auth: auth,
    method: 'post',
    url: '/auth/login',
    data: qs.stringify(data)
  })
}

export function getUserByUsername (username) {
  return service.request({
    method: 'get',
    url: `/system/api/user/username/${username}`
  })
}

export function registerUser (data) {
  return service.request({
    method: 'post',
    url: '/system/api/user/register',
    data: data
  })
}

export function logout (accessToken) {
  return service.request({
    method: 'get',
    url: '/auth/logout',
    params: {
      accessToken
    }
  })
}

export function refreshToken (refreshToken) {
  return service.request({
    headers,
    auth: auth,
    method: 'get',
    url: '/auth/user/refreshToken',
    params: {
      refreshToken
    }
  })
}

export function getUserMenuList (userId) {
  return service.request({
    method: 'get',
    url: `/system/menu/user/${userId}`
  })
}
