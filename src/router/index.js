import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/pages/Hello'
import AdLogin from '@/pages/AdLogin'
import AdRegister from '@/pages/AdRegister'
import index from '../fe-pages/index.vue'
//account
import accountInfo from '../fe-pages/Account/accountInfo.vue'
import payInfo from '../fe-pages/Account/payInfo.vue'
import payHistory from '../fe-pages/Account/payHistory.vue'
import userLog from '../fe-pages/Account/userLog.vue'
import passModify from '../fe-pages/Account/passModify.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {path:'/',redirect:'/register',hidden:true},
    {
      path:'/Dashboard',
      name:'展示',
      component:index,
      hidden: false,
      children:[
        {
          path:'/charts',name:'charts',meta:{id:1}
        }
      ]
    },
    {
      path:'',
      name:'',
      hidden:true
    },
    {
      path:'/Promote',
      name:'广告',
      component:index,
      hidden: false,
      children:[
        {path:'/plans',name:'plans',meta:{id:3},hidden: false}
      ]
    },
    {
      path:'',
      name:'',
      hidden:true
    },

    {
      path:'/Docs',
      name:'文件',
      component:index,
      hidden: false,
      children:[
        {
          path:'/doc',
          name:'Documents',meta:{id:5},
          hidden: false
        }
      ]
    },
    {
      path:'',
      name:'',
      hidden:true
    },
    {
      path:'/Account',
      name:'账户',
      component:index,
      hidden: false,
      children:[
        {
          path:'/userInfo',
          name:'账户信息',
          component:accountInfo,meta:{id:7},
          hidden: false
        },
        {
          path:'/invoice',
          name:'开票信息',
          component:passModify,meta:{id:7},
          hidden: false
        },
        {
          path:'/log',
          name:'操作日志',
          component:userLog,meta:{id:7},
          hidden: false
        },
        {
          path:'/modifyPass',
          name:'修改密码',
          component:passModify,meta:{id:7},
          hidden: false
        }
      ]
    },
    {
      path:'/pay',
      name:'充值',
      hidden: false,
      children:[
        {
          path:'/payInfo',
          name:'充值',
          component:payInfo,
          hidden: false
        },
        {
          path:'/payHistory',
          name:'充值记录',
          component:payHistory,
          hidden: false
        }
      ]
    },

    {
      path:'/login',
      component:AdLogin,
      hidden: true
    },
    {
      path:'/register',
      component:AdRegister,
      hidden: true
    }
  ]
})

