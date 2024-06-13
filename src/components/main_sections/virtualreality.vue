<template>
  <section class="background-section" ref="backgroundSection" v-if="!page4">
    <!-- @click="showvideos" -->
    <v-btn class="uploadbutton"> View<br></br>Panoramic<br></br>Video</v-btn>
    <img src="/images/VRbg.png" class="background-image" />
  </section>

  <div class="top-right-video-container">
      <video ref="topRightVideo" class="top-right-video" autoplay muted loop>
        <source src="/images/move2.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  <!-- <div v-if="page4" ref="page4Div" class="fade-in">
    <p4>page4</p4>
  </div> -->
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue';
import gsap from 'gsap';
import p4 from '@/components/page4.vue';
import { useRouter } from 'vue-router';

const page4 = ref(false);
const backgroundSection = ref(null);
const page4Div = ref(null);
const router = useRouter()


function jumptonextpage() {
  gsap.to(backgroundSection.value, {
    y: '-100%',
    opacity:0,
    duration: 1,
    onComplete() {  
      page4.value = true;
      nextTick(() => {
        gsap.fromTo(
          page4Div.value,
          { opacity: 0 ,
            y:'100%',
          },
          {
            opacity: 1,
            duration: 1,
            y:'0%',
            // onComplete() {
            //   router.push('/page4');
            // },
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
  /* background-image: url('/images/Slide 16_9 - 17.svg'); */
  background-color: transparent;
  background-size: cover;
  background-position: center;
  display:flex;
  align-items:end;
  justify-content:end;
}

.background-image{
  height:73%;
  width:77%;
  object-fit: cover;
  margin-right: 3%;
}

.fade-in {
  opacity: 1;
}
.jump-button{
  position:absolute;
  left:50%;
  bottom: 10%;
}

.uploadbutton{
  position:absolute;
  top:20px;
  right:0;
  height:60px;
  width:60px;
  margin-right: 3%;
  border-radius: 50%;
  flex-shrink: 0;
  min-width: 32px;
  background-color: #FFF72E;
  font-size:9px;
  letter-spacing: 0.5px;
  color:black;
  min-height:60px;
  z-index:1000000;
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
</style>
