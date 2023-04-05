import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import App from './App.vue'
import router from "@/router";
import Vuex from 'vuex'
import store from './store'
import vuescroll from "vuescroll";

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(vuescroll)

new Vue({
  render: h => h(App),
  router: router,
  store
}).$mount('#app')
