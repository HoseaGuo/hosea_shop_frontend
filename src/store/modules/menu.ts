import { Module } from 'vuex'
import * as type from '../mutation-types'
const user = {
  state: () => {
    return {
      // 目录数组
      menuList: [],
    }
  },
  mutations: {
    [type.SET_MENU_LIST](state, payload) {
      state.menuList = payload
    },
  },
  actions: {
    async [type.GET_MENU_LIST](state, payload) {
      let result = await request({
        url: "/menu",
      });
      if (result.success) {
        state.commit(type.SET_MENU_LIST, result.data)
      }
    },
  }
}
export default user