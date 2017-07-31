/**
 * Created by zonst on 2017/7/28.
 */
import api from '../../axios/api'
import * as types from '../types'

const state = {
  // 用户登录状态
  // loginStatus: JSON.parse(localStorage.getItem('loginStatus')) || false,

  // 用户登录信息
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},

  // 用户数据信息
  userData: []
};
const actions = {
  /**
   * 设置用户信息
   */
  setUserInfo({commit}, res) {
    // localStorage.setItem('userInfo', JSON.stringify(res));
    // localStorage.setItem('loginStatus', true);
    commit(types.SET_USER_INFO, res)
    commit(types.SET_LOGIN_STATUS, true)
  },

  /**
   * 请求用户信息
   */
  getUserData({commit}, id) {
    commit(types.COM_LOADING_STATUS, true)
    api.UserInfo(id)
      .then(res => {
        commit(types.COM_LOADING_STATUS, false)
        commit(types.GET_USER_DATA, res.data)
      })
  }
};
const getters = {
  getUserData: state => state.userData,
  loginStatus: state => state.loginStatus,
  userInfo: state => state.userInfo
};
export default{
  state,actions,getters
}
