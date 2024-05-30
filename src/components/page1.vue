<template>
  <div class="container">
    <div class="iPhoneContainer" @mouseover="showVideo(video1)" @mouseleave="hideVideo(video1)">
      <img class="img1" src="/images/iPhone1.png">
      <img class="img2" src="/images/iPhone.png">
      <video ref="video1" class="hover-video" muted loop>
        <source src="/images/0514.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="iPhoneContainer" @mouseover="showVideo(video2)" @mouseleave="hideVideo(video2)">
      <img class="img1" src="/images/iPhone2.png">
      <img class="img2" src="/images/iPhone.png">
      <video ref="video2" class="hover-video" muted loop>
        <source src="/images/0514.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="iPhoneContainer" @mouseover="showVideo(video3)" @mouseleave="hideVideo(video3)">
      <img class="img1" src="/images/iPhone3.png">
      <img class="img2" src="/images/iPhone.png">
      <video ref="video3" class="hover-video" muted loop>
        <source src="/images/0514.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, type Ref } from 'vue';

const video1 = ref<HTMLVideoElement | null>(null);
const video2 = ref<HTMLVideoElement | null>(null);
const video3 = ref<HTMLVideoElement | null>(null);

const showVideo = (videoRef: Ref<HTMLElement | null>) => {
  const videoElement = videoRef;
  if (videoElement) {
    videoElement.style.display = 'block';
    videoElement.play().catch(error => {
      console.error('Error trying to play video:', error);
    });
  } else {
    console.error('Video element is null');
  }
};

const hideVideo = (videoRef: Ref<HTMLElement | null>) => {
  const videoElement = videoRef;
  if (videoElement) {
    videoElement.pause();
    videoElement.style.display = 'none';
  } else {
    console.error('Video element is null');
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  width: 60vw;
}

.container .iPhoneContainer {
  background-color: transparent;
}

img {
  height: 400px;
}

.iPhoneContainer {
  display: flex;
  justify-content: center;
  position: relative;
}

.img1 {
  z-index: 1;
}

.img2 {
  position: absolute;
  z-index: 2;
}

.hover-video {
  height: 300px;
  position: absolute;
  z-index: 3;
  width: auto;
  display: none; /* Hide video by default */
  top: 20px;
}
</style>
