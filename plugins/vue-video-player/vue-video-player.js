import Vue from 'vue'
import VideoPlayer from 'vue-video-player'

Vue.component('video-player', {
  components: {
    VideoPlayer
  },
  mounted() {
    // Load the video.js CSS file locally for the video-player component
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/video-js.css'
    document.head.appendChild(link)
  },
  render() {
    return <VideoPlayer {...this.$attrs} />
  }
})
