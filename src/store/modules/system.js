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
  toggleSideBar ({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
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
