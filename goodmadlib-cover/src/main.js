import Vue from 'vue'
import App from './App.vue'

import { routes } from './routes'

import VueRouter from 'vue-router'
import axios from 'axios'

Vue.use(VueRouter)

const router = new VueRouter({ routes })

axios.defaults.baseURL = 'https://cors-anywhere.herokuapp.com/https://good-mad-library.herokuapp.com/'
axios.defaults.headers.common['Origin'] = 'https://mavilam.github.io/good-mad-library'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
