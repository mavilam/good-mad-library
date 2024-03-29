import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import { routes } from './routes'

import VueRouter from 'vue-router'
import axios from 'axios'

import './assets/css/tailwind.css'

Vue.use(VueRouter)

const router = new VueRouter({ routes })

axios.defaults.baseURL = 'https://clean-fly-headscarf.cyclic.app/'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
