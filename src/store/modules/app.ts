import { Module } from 'vuex'
import * as type from '../mutation-types'
import { useRoute, useRouter } from 'vue-router'
import { setHeaderAuthorization } from '@utils/request'

const app = {
  state: () => ({
    // 是否已经检测用户登录状态
    hasCheckLogin: false,
    // 是否已经登录
    isLogin: false,
    // token 请求会带上的
    token: ""
  }),
  mutations: {
    [type.SET_HAS_CHECK_LOGIN](state) {
      state.hasCheckLogin = true;
    },
    [type.SET_USER_TOKEN](state, payload: string) {
      state.token = payload;
      if (payload) {
        // 保存token到本地
        localStorage.setItem('token', payload);
        // 设置请求头的header-Authorization
        setHeaderAuthorization(payload);
      } else {
        localStorage.removeItem('token');
        // 设置请求头的header-Authorization 为空，清除
        setHeaderAuthorization("");
      }
    },
    [type.SET_USER_IS_LOGIN](state, payload: boolean) {
      state.isLogin = payload
    }
  },
  actions: {
    // 页面进来时候判断用户是否已经登录
    async [type.CHECK_USER_LOGIN]({ commit, state }, payload) {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          let result = await request({
            url: "/user/check-login",
            method: "post",
            data: {
              token
            }
          });
          if (result.success) {
            // 保存token
            commit(type.SET_USER_TOKEN, result.headers.token);
            // 保存用户信息
            commit(type.SET_USER_INFO, result.data);
            // 已经登录
            commit(type.SET_USER_IS_LOGIN, true);
          }
        }
      } catch (e) {

      }

      // 已经判断登录了
      commit(type.SET_HAS_CHECK_LOGIN, true);

    },
    // 用户登录
    async [type.USER_LOGIN]({ commit }, payload) {
      const result = await request({
        url: "/user/login",
        method: "post",
        data: payload,
      });
      if (result.success) {
        // 保存token
        commit(type.SET_USER_TOKEN, result.headers.token);
        // 保存用户信息
        commit(type.SET_USER_INFO, result.data);
        // 已经登录
        commit(type.SET_USER_IS_LOGIN, true);
      }
    },
    // 退出登录
    [type.USER_LOGOUT]({ commit }) {
      commit(type.SET_USER_TOKEN, "");
      commit(type.SET_USER_INFO, {});
      // 已经登录
      commit(type.SET_USER_IS_LOGIN, false);
    }
  }
}
export default app