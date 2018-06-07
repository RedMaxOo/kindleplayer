import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home/home'
import Index from '@/view/Home/index'
Vue.use(Router)
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      // name: 'index',
      component: Index,
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        }
      ]
    }
  ]
})
