import Vue from 'vue'
import App from './App'
import store from './store'

import api from './utils/Request.js'
Vue.prototype.$api=api

import system from './utils/System.js'
Vue.prototype.$system=system

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
