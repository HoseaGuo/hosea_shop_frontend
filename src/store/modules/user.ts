import { Module } from 'vuex'
import * as type from '../mutation-types'
import { buildTree } from "@utils/index";

interface state {
  info: {
    menus: any[],
    [key: string]: any
  },
  authPaths: string[],
  menuTreeData: any[]
}

const defaultState = {
  // 用户登录信息
  info: {
    menus: []
  },
  // 授权path数组
  authPaths: [],
  // 侧边栏的目录数据
  menuTreeData: []
}

const user: Module<state, any> = {
  state: () => (Object.assign({}, defaultState)),
  mutations: {
    [type.SET_USER_INFO](state, payload) {
      state.info = payload
      // 根据目录树，来获得可以访问的路由
      const menuTreeData = buildTree(payload.menus);
      state.menuTreeData = menuTreeData;
      state.authPaths = getAuthPaths(menuTreeData);
    },
    [type.RESET_USER](state) {
      Object.assign(state, defaultState)
    }
  },
  actions: {

  }
}

function getAuthPaths(treeData: any[]) {
  let paths: string[] = [];
  treeData.forEach(item => {
    paths.push(item.path);
    if (item.children) paths = paths.concat(getAuthPaths(item.children));
  })
  return paths;
}

export default user