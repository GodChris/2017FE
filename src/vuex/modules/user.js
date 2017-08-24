/**
 * Created by zonst on 2017/7/28.
 */
import api from '../../axios/api'
import * as types from '../mutation-types'

const state = {
  // 用户登录状态
  loginStatus: JSON.parse(sessionStorage.getItem('loginStatus')) || false,
  // 用户登录信息 email
  userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {},
  comdata1:{}

  // // 用户数据信息
  // userData: []

};
const actions = {
  //用户登录
  setUserInfo({commit}, res) {
    sessionStorage.setItem('userInfo', JSON.stringify(res.data.data));
    sessionStorage.setItem('loginStatus', true);
    commit(types.SET_USER_INFO, res.data.data);
    commit(types.SET_LOGIN_STATUS, true);
  },


  //注销
  setSignOut({ commit }) {
    sessionStorage.removeItem('loginStatus');
    sessionStorage.removeItem('userInfo');

    commit(types.SET_LOGIN_STATUS, false);
    commit(types.SET_USER_INFO, {});

  }
};
const getters = {
  // getUserData: state => state.userData,
  loginStatus: state => state.loginStatus,
  userInfo: state => state.userInfo,

};
const mutations={
  // [types.GET_USER_DATA](state, res) {
  //   state.userData = res
  // },
  [types.SET_LOGIN_STATUS](state, status) {
    state.loginStatus = status
  },
  [types.SET_USER_INFO](state, res) {
    state.userInfo = res
  }
};
export default{
  state,actions,getters,mutations
}
