// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/index.less'
import axios from 'axios'
import Vuex from 'vuex'
import qs from 'qs'
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.qs = qs
Vue.prototype.baseUrl = 'https://' + window.location.host + '/km/'
Vue.use(VueI18n)
Vue.use(ElementUI)
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    isPlayOne: 0,
    username: '',
    useremail: '',
    mobile:'',
    company:''
  },
  mutations: {
    changePlaying (state, msg) {
      state.isPlayOne = msg;
    },
  }
})
const i18n = new VueI18n({
  locale: 'en-US',    // 语言标识
  messages: {
    'zh-CN': require('./common/zh'),   // 中文语言包
    'en-US': require('./common/en')    // 英文语言包
  }
})
// Vue.use(CarouselItem)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
