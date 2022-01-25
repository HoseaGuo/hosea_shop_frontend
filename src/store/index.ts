import { createStore, Store } from "vuex"
import app from './modules/app'
import user from './modules/user'

const store: Store<any> = createStore({
  modules: {
    app,
    user
  }
})

export default store;