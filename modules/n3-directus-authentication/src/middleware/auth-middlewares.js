// plugins/auth.js
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {

  nuxtApp.hook('app:beforeMount', async () => {
    
  })

  addRouteMiddleware('is-user-logged-in', async (to, from) => {

    const { is_user_logged_in } = userStore()
    // let maxCountExceeded = false

    // await new Promise((resolve) => {
    //   let count = 0

    //   const count_interval = setInterval(() => {

    //     if (is_user_logged_in.value) {
    //       clearInterval(count_interval)
    //       resolve()
    //     }

    //     if (count > 5) {
    //       clearInterval(count_interval)
    //       maxCountExceeded = true
    //       resolve()
    //     }

    //     count++
    //   }, 1000)
    // })

    if (!is_user_logged_in.value) {
      return navigateTo('/')
    }
  })
})
