/**
 * Created by zonst on 2017/7/28.
 */
/**
 * Created by zonst on 2017/7/28.
 */

import axios from 'axios'
import qs from 'qs'
import * as _ from './commonMethod'

axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = 'http://www.guinaben.com:8070';
// axios.defaults.baseURL = 'http://192.168.1.129:8383';

//POST传参序列化
axios.interceptors.request.use((config) => {
  if(config.method  === 'post'){
    config.data = qs.stringify(config.data);
  }
  return config;
},(error) =>{
  _.toast("错误的传参",'fail');
  return Promise.reject(error);
});
//返回状态判断
axios.interceptors.response.use((res) =>{
  if(!res.data.success){
    // _.toast(res.data.msg);
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  _.toast("网络异常");
  return Promise.reject(error);
});

export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export default {
//登录
  Login(params) {
    return fetch('#', params)
  },

//注册
  Register(params) {
    return fetch('#', params)
  },

//获取用户信息
  UserInfo(id) {
    return fetch('#', {userId: id})
  },
}
