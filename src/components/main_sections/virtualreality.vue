<template>
  <section class="background-section" ref="backgroundSection" v-if="!page4">
    <v-btn class="uploadbutton" @click="showDialog">View<br>Panoramic<br>Video</v-btn>
    <img src="/images/VRbg.png" class="background-image" />
  </section>

  <div class="top-right-video-container">
    <video ref="topRightVideo" class="top-right-video" autoplay muted loop>
      <source src="/images/move2.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
<div class="wrapper">
  <v-overlay v-model="dialogVisible">
    <div class="custom-dialog">
      <video ref="dialogVideo" class="dialog-video" autoplay controls @loadedmetadata="updateDialogSize">
        <source src="/images/output.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <v-btn class="close-button" @click="closeDialog">x</v-btn>
    </div>
  </v-overlay>
</div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue';
import gsap from 'gsap';
import { useRouter } from 'vue-router';

const page4 = ref(false);
const backgroundSection = ref(null);
const page4Div = ref(null);
const dialogVisible = ref(false);
const dialogVideo = ref<HTMLVideoElement | null>(null);
const dialogWidth = ref<string | number>('600px');  // 默认宽度
const dialogHeight = ref<string | number>('auto');  // 默认高度

const router = useRouter();

function showDialog() {
  dialogVisible.value = true;
  nextTick(() => {
    if (dialogVideo.value) {
      dialogVideo.value.play();
    }
  });
}

function closeDialog() {
  if (dialogVideo.value) {
    dialogVideo.value.pause();
  }
  dialogVisible.value = false;
}

function updateDialogSize() {
  if (dialogVideo.value) {
    dialogWidth.value = dialogVideo.value.videoWidth + 'px';
    dialogHeight.value = dialogVideo.value.videoHeight + 'px';
  }
}

function jumptonextpage() {
  gsap.to(backgroundSection.value, {
    y: '-100%',
    opacity: 0,
    duration: 1,
    onComplete() {  
      page4.value = true;
      nextTick(() => {
        gsap.fromTo(
          page4Div.value,
          { opacity: 0, y: '100%' },
          {
            opacity: 1,
            duration: 1,
            y: '0%',
          }
        );
      });
    },
  });
}
</script>

<style scoped>
.background-section {
  width: 100%;
  height: 100vh;
  background-color: transparent;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: end;
  justify-content: end;
}

.background-image {
  height: 73%;
  width: 77%;
  object-fit: cover;
  margin-right: 3%;
}

.uploadbutton {
  position: absolute;
  top: 20px;
  right: 0;
  height: 60px;
  width: 60px;
  margin-right: 3%;
  border-radius: 50%;
  flex-shrink: 0;
  min-width: 32px;
  background-color: #FFF72E;
  font-size: 9px;
  letter-spacing: 0.5px;
  color: black;
  min-height: 60px;
  z-index: 1000000;
}

.top-right-video-container {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 400px;
  height: 400px;
  z-index: -1;
}

.top-right-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(0.7);
}


.custom-dialog {
  position: relative;

  width: 80%;
   /* You can adjust the max-width as needed */
  /* margin: 10%; */
margin-left: 10%;
margin-top: 5%;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.dialog-video {
  width: 100%;
  height: auto;
}

.close-button {
  position: absolute;
  min-width: 40px;
  min-height: 40px;
  
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.163);
  color: white;
  padding: 5px 10px;
  border-radius: 50%;
}
</style>
