import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/home/home'
import Index from '@/view/home/index'
import Search from '@/view/search/index'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: '/search',
          name: 'search',
          component: Search
        }
      ]
    }
  ]
})
