import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// 导入所有Vuex模块
const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters,
  // Vuex 数据持久化
  plugins: [
    persistedState({ storage: window.sessionStorage })
  ]
})

export default store
