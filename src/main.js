import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import setAxios from './setaxios'
import notice from './components/notice.js'

setAxios()
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$notice = notice

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
