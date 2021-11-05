// import { createApp } from 'vue'
import App from './App.vue'
import routes from './routes'
import viteSSR from 'vite-ssr'
import "../styles/reset.scss"

export default viteSSR(App, { routes }, async ({app, router}) => {
  /* Vite SSR main hook for custom logic */
  /* const { app, router, initialState, ... } = context */
  // router.beforeEach(async (to, from) => {

  //   console.log(to)

  //   console.log(import.meta.env.SSR)


  //   /* if (to.meta.state) {
  //     return // Already has state
  //   }

  //   const response = await fetch('my/api/data/' + to.name)

  //   // This will modify initialState
  //   to.meta.state = await response.json() */
  // })
})
