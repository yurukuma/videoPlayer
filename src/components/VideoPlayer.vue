<template>
  <div class="video-container">
    <video ref="videoPlayerRef"
      class="video-js vjs-default-skin vjs-big-play-centered"
      playsinline="true"></video>
  </div>
</template>

<script setup>
import video from 'video.js'
import { getFollowingList } from '@Services/list.js'

const player = ref(null)
const videoPlayerRef = ref(null)
const followingList = ref([])
const currentVideoIndex = ref(0)
const currentVideo = ref({})

const getFollowingData = async () => {
  getFollowingList().then(res => {
    followingList.value = res
    initPlayer()
  })
}
const initPlayer = async () => {
  currentVideo.value = followingList.value[currentVideoIndex.value]
  player.value = video(videoPlayerRef.value, {
  autoplay: true,
  controls: true,
  // fluid: true,
  sources: [
    {
      src: currentVideo.value.play_url,
      type: 'application/x-mpegURL',
    }
  ],
})
  player.value.on('ended', () => {
    nextVideo()
  })
  player.value.on('play', () => {
    player.value.controls(true);
  })
}
const nextVideo = () => {
  if (currentVideoIndex.value < followingList.value.length - 1) {
    currentVideoIndex.value++
    currentVideo.value = followingList.value[currentVideoIndex.value]
    console.log(player.value)
    player.value.src({
      src: currentVideo.value?.play_url,
      type: 'application/x-mpegURL'
    })
    player.value.play()
  } else {
    getFollowingData()
  }
}
onMounted(() => {
  getFollowingData()
})

onBeforeUnmount(() => {
  if (player.value) {
    player.value.dispose()
  }
})
</script>