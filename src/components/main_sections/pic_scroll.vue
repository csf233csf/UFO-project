<template>
  <div class="page-container">
    <video class="background-video" autoplay muted loop>
      <source src="/images/bg.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="images-container">
      <div v-for="(img, index) in images" :key="img.id" class="image-wrapper" :style="{ top: img.top + 'px', left: img.left + 'px' }">
        <img :src="img.url" class="scroll-image" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';

const images = ref([
  { id: '1', url: '/picscroll/11.png', left: 0, top: 100, direction: 'left' },
  { id: '2', url: '/picscroll/111.png', left: 100, top: 800, direction: 'right' },
  { id: '3', url: '/picscroll/1111.png', left: 200, top: 150, direction: 'left' },
  { id: '4', url: '/picscroll/6131.png', left: 400, top: 800, direction: 'right' },
  { id: '5', url: '/picscroll/6132.png', left: 400, top: 400, direction: 'left' },
  { id: '6', url: '/picscroll/6133.png', left: 900, top: 600, direction: 'right' },
  { id: '7', url: '/picscroll/6134.png', left: 800, top: 900, direction: 'left' },
  { id: '8', url: '/picscroll/11111.png', left: 700, top: 660, direction: 'right' }
]);

function startScrolling() {
  images.value.forEach((img, index) => {
    const imgElement = document.querySelectorAll('.image-wrapper')[index];
    if (imgElement) {
      gsap.to(imgElement, {
        x: img.direction === 'left' ? '-100vw' : '100vw',
        duration: 10,
        ease: 'linear',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => {
            const parsedX = parseFloat(x);
            return img.direction === 'left'
              ? (parsedX % window.innerWidth) + 'px'
              : (parsedX % window.innerWidth) - window.innerWidth + 'px';
          })
        }
      });
    }
  });
}

onMounted(() => {
  startScrolling();
});
</script>

<style scoped>
.page-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: -1;
  transform: scale(0.7);
}

.images-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.image-wrapper {
  position: absolute;
  transform: translateY(-50%);
}

.scroll-image {
  height: 100px;
  width: auto;
}
</style>
