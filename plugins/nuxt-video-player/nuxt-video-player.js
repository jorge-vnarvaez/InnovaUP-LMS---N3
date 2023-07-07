// plugins/nuxt-video-player.ts
import { defineNuxtPlugin } from '#app'
import VueVideoPlayer from 'nuxt-video-player'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vue.use(VueVideoPlayer)
})
