const state = {
  sidebarOpen: false,
  activeNav: ''
}
const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebarOpen = !state.sidebarOpen
  },
  SET_ACTIVE: (state, data) => {
    state.activeNav = data
  }
}

const actions = {
  /**
   * 侧边栏是否展开
   * @param commit
   */
  toggleSideBar ({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  /**
   * 保存当前路由
   * @param commit
   * @param data
   */
  saveActiveNav ({ commit }, data) {
    commit('SET_ACTIVE', data)
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}
