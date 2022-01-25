import { Module } from 'vuex'
import * as type from '../mutation-types'
const user = {
  state: () => ({
    // 用户登录信息
    info: {},
  }),
  mutations: {
    [type.SET_USER_INFO](state, payload) {
      state.info = payload
    },
  },
  actions: {

  }
}
export default user