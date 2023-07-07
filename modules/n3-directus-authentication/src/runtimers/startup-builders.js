import { defineNuxtPlugin } from '#app'
    
export default defineNuxtPlugin((nuxtApp) => {
  
  nuxtApp.hook('app:beforeMount', () => {
    const { refresh_auth_tokens } = authStore()
    refresh_auth_tokens()
  })

})