import axios from 'axios'
import * as _ from './commonMethod'

//axios基本设置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = 'http://api.dsp.echowap.com/';
//在线前台
// axios.defaults.baseURL= 'http://dsp.echowap.com/api/ ';
// axios.defaults.headers.post['Authorization']= 'Bearer '  + sessionStorage.getItem('token');

//POST传参序列化
axios.interceptors.request.use((config) => {
  // if(config.method  === 'post'){
  //   config.data = qs.stringify(config.data);
  // }
  return config;
},(error) =>{
  _.toast("错误的传参",'fail');
  return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) =>{
  // if(res.data.code!=='200'){
  //   // _.toast(res.data.msg);
  //   return Promise.reject(res);
  // }
  return res;
},
  (error) => {
  _.toast("网络异常");

  return Promise.reject(error);
});

export default {
//登录
  Login(params) {
    return axios.post('/login',params)
  },

//注册
  Register(params) {
    return axios.post('/signup',params,{})
  },
  //获取账户信息
  getUserInfo(){
    return axios.get('/v1/account')
  },
  //账户修改
  editAccount(data){
    return axios.post('/v1/account/update',data)
  },
  //修改密码
  resetPass(data){
    return axios.post('/v1/account/password/update',data)
  },
  //新增充值
  addRecharges(data){
    return axios.post('/v1/account/recharges',data)
  },
  //充值记录
  getRecharges(para){
    return axios.get('/v1/account/recharges',{params:para})
  },
  //查询操作记录
  getActions(para){
    return axios.get('v1/actions',{params:para})
  }

}

