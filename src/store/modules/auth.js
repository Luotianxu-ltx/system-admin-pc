import { login, logout, refreshToken, getUserMenuList } from '@/api/auth'
import { PcCookie, Key } from '@/utils/cookie'

const state = {
  userInfo: PcCookie.get(Key.userInfoKey) ? JSON.parse(PcCookie.get(Key.userInfoKey)) : null, // 用户基本信息
  accessToken: PcCookie.get(Key.accessTokenKey), // 访问令牌
  refreshToken: PcCookie.get(Key.refreshTokenKey), // 刷新令牌
  init: false, // 是否已加载用户权限信息
  menuList: [], // 当前用户拥有的菜单权限
  buttonList: [] // 用户所拥有的按钮权限
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
  },
  // 权限列表
  SET_SYSTEM_MENU (state, data) {
    state.init = true
    state.menuList = data.menuTreeList
    sessionStorage.setItem('menuList', JSON.stringify(data.menuTreeList))
    state.buttonList = data.buttonList
    sessionStorage.setItem('buttonList', data.buttonList)
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
  },

  UserLogout ({ state, commit }) {
    logout(state.accessToken).then(response => {
      commit('RESET_USER_STATE')
    }).catch(() => {
      commit('RESET_USER_STATE')
    })
  },

  SendRefreshToken ({ state, commit }) {
    return new Promise((resolve, reject) => {
      if (!state.refreshToken) {
        commit('RESET_USER_STATE')
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('没有刷新令牌')
      }

      refreshToken(state.refreshToken).then(response => {
        commit('SET_USER_STATE', response.data)
        resolve()
      }).catch(error => {
        commit('RESET_USER_STATE')
        reject(error)
      })
    })
  },
  // 获取用户菜单和按钮权限
  GetUserMenu ({ state, commit }) {
    return new Promise((resolve, reject) => {
      const userId = PcCookie.get(Key.userInfoKey) ? JSON.parse(PcCookie.get(Key.userInfoKey)).uid : null
      if (userId) {
        getUserMenuList(userId).then(response => {
          commit('SET_SYSTEM_MENU', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      }
    })
  }
}

export default {
  state,
  mutations,
  actions
}
