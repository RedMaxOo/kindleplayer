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
import BannerEdit from '@/view/edit/edit'
import ActiveUser from '@/view/my/active-user'
import Myinfo from '@/view/my/information'
import Case from '@/view/case/case'
import Change from '@/view/my/change'

Vue.use(Router)
export default new Router({
  // mode: 'history',
  base: 'kindlemusic',
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
        {
          path: '/case',
          name: 'case',
          component: Case
        },
        {
          path: '/change',
          name: 'change',
          component: Change
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
