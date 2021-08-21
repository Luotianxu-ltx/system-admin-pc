const state = {
  sidebarOpen: false
}
const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebarOpen = !state.sidebarOpen
  }
}

const actions = {
  toggleSideBar ({ commit }) {
    commit('TOGGLE_SIDEBAR')
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}
