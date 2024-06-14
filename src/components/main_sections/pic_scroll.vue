<template>
  <div class="page-container">
    <video autoplay muted loop id="background-video">
      <source src="/images/muma.mp4" type="video/mp4">
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
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';

const images = ref([
  { id: '1', url: '/picscroll/11.png', description: 'Image 1', top: 50, left: 0, width: 150, height: 150, speed: 5 },
  { id: '2', url: '/picscroll/111.png', description: 'Image 2', top: 200, left: 100, width: 200, height: 200, speed: 8 },
  { id: '3', url: '/picscroll/1111.png', description: 'Image 3', top: 350, left: 200, width: 100, height: 100, speed: 6 },
  { id: '4', url: '/picscroll/6131.png', description: 'Image 4', top: 100, left: 300, width: 180, height: 180, speed: 7 },
  { id: '5', url: '/picscroll/6132.png', description: 'Image 5', top: 250, left: 400, width: 150, height: 150, speed: 9 },
  { id: '6', url: '/picscroll/6133.png', description: 'Image 6', top: 400, left: 500, width: 120, height: 120, speed: 4 },
  { id: '7', url: '/picscroll/6134.png', description: 'Image 7', top: 150, left: 600, width: 130, height: 130, speed: 10 },
  { id: '8', url: '/picscroll/11111.png', description: 'Image 8', top: 300, left: 700, width: 170, height: 170, speed: 6 }
]);

function startAnimation() {
  images.value.forEach((img) => {
    const imgElement = document.getElementById('image-' + img.id);
    if (imgElement) {
      gsap.to(imgElement, {
        x: `+=${Math.random() * window.innerWidth * (Math.random() > 0.5 ? 1 : -1)}`, // 随机X方向
        duration: img.speed, // 使用指定的速度
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
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
  background-color: rgb(0, 0, 0);
  padding: 20px;
  position: absolute;
  z-index: -1;
}

#background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.images-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.image-wrapper {
  position: absolute;
}

.scroll-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(-6px 6px 10px rgba(82, 255, 0, 0.6));
  transition: transform 0.3s ease;
}

.scroll-image:hover {
  transform: scale(1.1);
}
</style>
