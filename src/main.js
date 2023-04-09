import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import App from './App.vue'
import {router} from "@/router";
import Vuex from 'vuex'
import store from './store'
import vuescroll from "vuescroll";
import vuetify from 'vuetify'
import VueVirtualScroller from 'vue-virtual-scroller'
Vue.config.productionTip = false
import { Message } from 'element-ui'
import axios from "axios";
import Vuetify from "@/plugins/vuetify";
Vue.use(VueVirtualScroller)
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(vuescroll)

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.timeout = 30000;
const vue = new Vue({
  render: h => h(App),
  router: router,
  store,
  Vuetify,
  beforeCreate() {
    Vue.prototype.$bus = this
    this.$store.commit('storeThat', this)
    Vue.prototype.$message = Message
  }
}).$mount('#app')
