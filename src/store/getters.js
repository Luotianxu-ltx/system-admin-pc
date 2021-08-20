const getters = {
  userInfo: state => state.auth.userInfo,
  accessToken: state => state.auth.accessToken,
  refreshToken: state => state.auth.refreshToken,
  init: state => state.auth.init,
  menuList: state => state.auth.menuList,
  buttonList: state => state.auth.buttonList
}

export default getters
