import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/home/home'
import Index from '@/view/home/index'
import Search from '@/view/search/index'
import Login from '@/view/my/login'
import Register from '@/view/my/register'
import RegisterSuccess from '@/view/my/regsuccess'
import Retrieve from '@/view/my/retrieve'
import Reset from '@/view/my/reset'
import BannerEdit from '@/view/edit/index'
import ActiveUser from '@/view/my/active-user'
import Myinfo from '@/view/my/information'

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
        },
        {
          path: '/register',
          name: 'register',
          component: Register
        },
        {
          path: '/register-success',
          name: 'regsuccess',
          component: RegisterSuccess
        },
        {
          path: '/retrieve',
          name: 'retrieve',
          component: Retrieve
        },
        {
          path: '/reset',
          name: 'reset',
          component: Reset
        },
        {
          path: '/banner-edit',
          name: 'banner-edit',
          component: BannerEdit
        },
        {
          path: '/active-user',
          name: 'activeuser',
          component: ActiveUser
        },
        {
          path: '/myinfo',
          name: 'myinfo',
          component: Myinfo
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
