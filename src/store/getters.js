const getters = {
  // 用户信息
  userInfo: state => state.auth.userInfo,
  accessToken: state => state.auth.accessToken,
  refreshToken: state => state.auth.refreshToken,
  init: state => state.auth.init,
  // 菜单列表
  menuList: state => state.auth.menuList,
  // 按钮列表
  buttonList: state => state.auth.buttonList,
  // 侧边栏是否展开
  sidebarOpen: state => state.system.sidebarOpen
}

export default getters
