// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import VueRouter from 'vue-router'
import axios from 'axios'
import store from './vuex/store'
import vuex from 'vuex'
import verify from 'vue-verify-plugin'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '../theme/index.css'

Vue.use(ElementUI);
Vue.use(vuex);
Vue.use(VueRouter);

Vue.config.productionTip = false;
//自定义验证方法
let myRules={
  passv:{
    test:function(){return (this.pwd===this.repassword)},
    message:"两次输入密码不一致"
  },
  full:{
    test:function () {return (this.loginname||this.loginpass)
    },
    message:"请完整填写信息"
  }
};
Vue.use(verify,{
  blur:true,
  rules:myRules
});

/*事件bus，组件间传递事件*/
// Vue.prototype.$eventBus = new Vue({});

//路由拦截
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
      sessionStorage.removeItem('userInfo');
    }
    let user = JSON.parse(sessionStorage.getItem('userInfo'));
    if (!user && to.path !== '/login'&&to.path !== '/register') {
      next(
        {
          path: '/login'
        })
    } else {
      next()
    }
});

//请求拦截 401,退出到登录
axios.interceptors.response.use((response) => {
  if(response.data.status===401){
    setTimeout(()=>{
      sessionStorage.removeItem('userInfo');
      router.replace('/login');
    },2000);
  }
  return response;
}, error => {
  return Promise.reject(error)
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
});
