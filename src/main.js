import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import './utils/leaflet/leaflet.css'

import L from './utils/leaflet/leaflet'

import axios from 'axios'
axios.defaults.baseURL = ''
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
