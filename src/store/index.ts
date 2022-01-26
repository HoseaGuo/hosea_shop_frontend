import { createStore, Store } from "vuex"
import app from './modules/app'
import user from './modules/user'
import menu from './modules/menu'

const store: Store<any> = createStore({
  modules: {
    app,
    user,
    menu
  }
})

export default store;