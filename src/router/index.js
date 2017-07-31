import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/pages/Hello'
import AdLogin from '@/pages/AdLogin'
import AdRegister from '@/pages/AdRegister'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: AdLogin
    },
    {
      path:'/',redirect:'/login'
    },
    {
      path:'/login',
      component:AdLogin
    },
    {
      path:'/register',
      component:AdRegister
    }
  ]
})
