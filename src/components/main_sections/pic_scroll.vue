<template>
  <div class="page-container">
    <video autoplay muted loop id="background-video">
      <source src="/images/bg.mp4" type="video/mp4">
      Your browser does not support HTML5 video.
    </video>
    <div class="images-container">
      <div
        v-for="img in images"
        :key="img.id"
        class="image-wrapper"
        :id="'image-' + img.id"
        :style="{
          top: img.top + 'px',
          left: img.left + 'px',
          width: img.width + 'px',
          height: img.height + 'px'
        }"
      >
        <img :src="img.url" class="scroll-image" />
      </div>
    </div>
  </div>
  <div class="top-right-video-container">
      <video ref="topRightVideo" class="top-right-video" autoplay muted loop>
        <source src="/images/move3.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';

const images = ref([
  { id: '1', url: '/picscroll/workshop1.png', description: 'Image 1', top: 50, left: 0, width: 150, height: 150, speed: 10, direction: 'left' },
  { id: '2', url: '/picscroll/workshop2.png', description: 'Image 2', top: 200, left: 100, width: 200, height: 200, speed: 12, direction: 'right' },
  { id: '3', url: '/picscroll/workshop3.png', description: 'Image 3', top: 350, left: 200, width: 100, height: 100, speed: 17, direction: 'right' },
  { id: '4', url: '/picscroll/workshop4.png', description: 'Image 4', top: 100, left: 300, width: 180, height: 180, speed: 16, direction: 'right' },
  { id: '5', url: '/picscroll/workshop5.png', description: 'Image 5', top: 250, left: 1300, width: 150, height: 150, speed: 14, direction: 'left' },
  { id: '6', url: '/picscroll/workshop6.png', description: 'Image 6', top: 500, left: 1500, width: 120, height: 120, speed: 14, direction: 'left' },
  { id: '7', url: '/picscroll/workshop7.png', description: 'Image 7', top: 150, left: 600, width: 130, height: 130, speed: 14, direction: 'left' },
  { id: '8', url: '/picscroll/workshop8.png', description: 'Image 8', top: 400, left: 700, width: 170, height: 170, speed: 10, direction: 'left' },
  { id: '9', url: '/picscroll/workshop12.jpg', description: 'Image 4', top: 190, left: 1060, width: 180, height: 180, speed: 16, direction: 'right' },
  { id: '10', url: '/picscroll/workshop9.jpg', description: 'Image 5', top: 850, left: 500, width: 150, height: 150, speed: 14, direction: 'right' },
  { id: '11', url: '/picscroll/workshop10.jpg', description: 'Image 6', top: 400, left: 700, width: 120, height: 120, speed: 14, direction: 'right' },
  { id: '12', url: '/picscroll/workshop11.jpg', description: 'Image 7', top: 350, left: 350, width: 130, height: 130, speed: 14, direction: 'right' },
  { id: '13', url: '/picscroll/workshop13.jpg', description: 'Image 8', top: 600, left: 890, width: 170, height: 170, speed: 10, direction: 'left' }
]);

function startAnimation() {
  images.value.forEach((img) => {
    const imgElement = document.getElementById('image-' + img.id);
    if (imgElement) {
      let animationProps = {};
      switch (img.direction) {
        case 'left':
          animationProps = { x: `-=${window.innerWidth/2}px` };
          break;
        case 'right':
          animationProps = { x: `+=${window.innerWidth/2}px` };
          break;
        case 'up':
          animationProps = { y: `-=${window.innerHeight}px` };
          break;
        case 'down':
          animationProps = { y: `+=${window.innerHeight}px` };
          break;
      }

      gsap.to(imgElement, {
        ...animationProps,
        duration: img.speed,
        repeat: -1,
        yoyo: false,
        ease: 'linear'
      });
    }
  });
}

onMounted(() => {
  startAnimation();
});
</script>
<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: transparent;
  padding: 20px;
  position: absolute;
  z-index: 1;
}

#background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  transform: scale(0.6);
}

.images-container {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
}

.image-wrapper {
  position: absolute;
}

.scroll-image {
  position:absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(-6px 6px 10px rgba(0, 255, 247, 0.6));
  transition: transform 0.3s ease;
  z-index:2
 
}

.scroll-image:hover {
  transform: scale(1.1);
}

.top-right-video-container {
  position: absolute;
  top: -40px;
  right: -100px;
  width: 400px;
  height: 400px;
  z-index: 0;
}

.top-right-video {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(0.7);
  z-index: -1;

}
</style>
