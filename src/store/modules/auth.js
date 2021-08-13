import { login } from '@/api/auth'
import { PcCookie, Key } from '@/utils/cookie'

const state = {
  userInfo: PcCookie.get(Key.userInfoKey) ? JSON.parse(PcCookie.get(Key.userInfoKey)) : null, // 用户基本信息
  accessToken: PcCookie.get(Key.accessTokenKey), // 访问令牌
  refreshToken: PcCookie.get(Key.refreshTokenKey) // 刷新令牌
}

const mutations = {
  // 赋值用户状态
  SET_USER_STATE (state, data) {
    // eslint-disable-next-line camelcase
    const { userInfo, access_token, refresh_token } = data
    state.userInfo = JSON.stringify(userInfo)
    // eslint-disable-next-line camelcase
    state.accessToken = access_token
    // eslint-disable-next-line camelcase
    state.refreshToken = refresh_token

    PcCookie.set(Key.userInfoKey, JSON.stringify(userInfo))
    PcCookie.set(Key.accessTokenKey, access_token)
    PcCookie.set(Key.refreshTokenKey, refresh_token)
  },
  // 重置用户状态
  RESET_USER_STATE (state) {
    state.userInfo = null
    state.accessToken = null
    state.refreshToken = null

    PcCookie.remove(Key.userInfoKey)
    PcCookie.remove(Key.accessTokenKey)
    PcCookie.remove(Key.refreshTokenKey)
  }
}

const actions = {
  UserLogin ({ commit }, userData) {
    const { username, password } = userData

    const loginData = {
      username: username.trim(),
      password: password
    }

    return new Promise((resolve, reject) => {
      login(loginData).then(response => {
        const { code, data } = response
        if (code === 20000) {
          commit('SET_USER_STATE', data)
        }
        resolve(response)
      }).catch(error => {
        commit('RESET_USER_STATE')
        reject(error)
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
