import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/pages/Hello'
import AdLogin from '@/pages/AdLogin'
import AdRegister from '@/pages/AdRegister'
import index from '../fe-pages/index.vue'
import notFound from '../pages/404.vue'
//account
import accountInfo from '../fe-pages/Account/accountInfo.vue'
import payInfo from '../fe-pages/Account/payInfo.vue'
import payHistory from '../fe-pages/Account/payHistory.vue'
import userLog from '../fe-pages/Account/userLog.vue'
import passModify from '../fe-pages/Account/passModify.vue'
//promote
import promote from '../fe-pages/Promote/promote.vue'
import create from '../fe-pages/Promote/create.vue'
import upload from '../fe-pages/Promote/upload_material.vue'
import adList from '../fe-pages/Promote/adList.vue'
import adSerial from '../fe-pages/Promote/adSerial.vue'
import modifySet from '../fe-pages/Promote/creativeSet_modify.vue'
import modifyCampaign from '../fe-pages/Promote/modifyCampaign.vue'
import segment from '../fe-pages/Promote/segmentList.vue'
import createSegment from '../fe-pages/Promote/createSegment.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {path:'/',redirect:'/login',hidden:true},
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
        {
          path:'/create',name:'广告活动',meta:{id:3},
          component:promote,hidden: false,
        },
        {
          path:'/step1',component:create,hidden:true,meta:{id:3}
        },
        {
          path:'/upload/:campaign_id',component:upload,hidden:true,name:'素材上传',meta:{id:3}
        },
        {
          path:'/adList/:campaign_id',component:adList,hidden:true,name:'广告列表',meta:{id:3}
        },
        {
          path:'/adSerial',component:adSerial,hidden:false,name:'广告系列',meta:{id:3}
        },
        {
          path:'/modifyCreativeSet/:creative_set_id',component:modifySet,hidden:true,name:'修改素材',meta:{id:3}
        },
        {
          path:'/modifyCampaign/:campaign_id',component:modifyCampaign,hidden:true,name:'修改广告系列',meta:{id:3}
        }
      ]
    },
    {
      path:'/Segments',
      name:'人群包',
      hidden:false,
      component:index,
      children:[
        {
          path:'/segments',component:segment,hidden:false,name:'人群包列表',meta:{id:4}
        },
        {
          path:'/createSegmrnt',component:createSegment,hidden:false,name:'创建人群包',meta:{id:4}
        }
      ]
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
          path:'/modifyPass',
          name:'修改密码',
          component:passModify,meta:{id:7},
          hidden: false
        },
        {
          path:'/log',
          name:'操作日志',
          component:userLog,meta:{id:7},
          hidden: false
        },
      ]
    },
    {
      path:'/pay',
      name:'充值',
      component:index,
      hidden: false,
      children:[
        {
          path:'/payInfo',
          name:' 新增充值',
          component:payInfo,
          meta:{id:8},
          hidden: false
        },
        {
          path:'/payHistory',
          name:'充值记录',
          component:payHistory,
          meta:{id:8},
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
    },
    { path: '*', component: notFound,hidden:true }
  ],
  mode: 'history',
  // hashbang: false, history: true
})

