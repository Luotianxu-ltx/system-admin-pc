import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

// 引入全局组件
import Icon from '@/components/Icon'

// 阿里图标
import './assets/icon/iconfont.css'
// 地图样式
import './utils/leaflet/leaflet.css'
// 地图js
import L from './utils/leaflet/leaflet'

import axios from 'axios'
axios.defaults.baseURL = ''
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('Icon', Icon)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
