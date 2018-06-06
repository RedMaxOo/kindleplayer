import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Player from '@/components/Home/player'
import Home from '@/components/Home/Home'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/player',
      name: 'Player',
      component: Player
    }
  ]
})
