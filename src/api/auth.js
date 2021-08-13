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
