<template>
  <div>
    <div v-if="showDrawApp">
      <DrawApp :xPos="xPos" :yPos="yPos" @close="closeDrawApp" />
      <div class="overlay"></div>
    </div>
    <div class="map-container" v-show="!loading" @click.self="handleMapClick">
      <div class='commentapp' v-if="showCommentApp && selectedXPos !== null && selectedYPos !== null">
        <CommentApp :xPos="selectedXPos" :yPos="selectedYPos" @close="closeCommentApp" />
        <div class="overlay"></div>
      </div>
      <div v-for="(img, index) in images" :key="index" class="image-button"
        :style="{ left: img.xPos + 'px', top: img.yPos + 'px' }">
        <button :style="{ backgroundColor: img.color }" @click.stop="openCommentApp(img.xPos, img.yPos)"
          @mouseover="showImage(img.url, $event)"
          @mouseleave="hideImage">
        </button>
      </div>
      <div v-if="hoveredImage" class="hover-image" :style="{ top: hoverY + 'px', left: hoverX + 'px' }">
        <v-img :src="hoveredImage" :width="200" :height="200" cover />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, inject } from 'vue';
import { database } from '@/firebaseConfig';
import { ref as dbRef, onValue } from 'firebase/database';
import DrawApp from './DrawApp.vue';
import CommentApp from './CommentApp.vue';
import { gsap } from 'gsap';

const xPos = ref(0);
const yPos = ref(0);
const showDrawApp = ref(false);
const showCommentApp = ref(false);
const selectedXPos = ref<number | null>(null);
const selectedYPos = ref<number | null>(null);
const hoveredImage = ref<string | null>(null);
const hoverX = ref(0);
const hoverY = ref(0);
const images = ref<{ xPos: number; yPos: number; url: string; color: string }[]>([]);
const colors = ['#FF9900', '#FF00C7', '#52FF00', '#FFF72E', '#00FFFF', '#7000FF'];
const loading = ref(true);

const injected_func = inject('changep6') as () => void;


function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

const closeDrawApp = () => {
  showDrawApp.value = false;
};

const closeCommentApp = () => {
  showCommentApp.value = false;
  selectedXPos.value = null;
  selectedYPos.value = null;
};

const handleMapClick = (event: MouseEvent) => {
  xPos.value = event.offsetX;
  yPos.value = event.offsetY;
  showDrawApp.value = true;
};

const openCommentApp = (x: number, y: number) => {
  selectedXPos.value = x;
  selectedYPos.value = y;
  showCommentApp.value = true;
};

const showImage = (url: string, event: MouseEvent) => {
  hoveredImage.value = url;
  const buttonRect = (event.target as HTMLElement).getBoundingClientRect();
  hoverX.value = buttonRect.left + window.scrollX - 100; // Add window scroll position to make it accurate
  hoverY.value = buttonRect.top + window.scrollY - 70; // Adjust the value based on the image height
};

const hideImage = () => {
  hoveredImage.value = null;
};

onMounted(() => {
  injected_func();
  const imagesRef = dbRef(database, 'images_map');
  onValue(imagesRef, (snapshot) => {
    images.value = [];
    const promises: Promise<void>[] = [];

    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      const color = getRandomColor();
      data.color = color;
      images.value.push(data);

      // Preload image
      const img = new Image();
      img.src = data.url;
      promises.push(new Promise<void>((resolve) => {
        img.onload = () => resolve();
      }));
    });

    Promise.all(promises).then(() => {
      loading.value = false; // Mark loading as complete once all images are preloaded
      // GSAP fade-in effect
      gsap.fromTo('.map-container', { opacity: 0 }, { opacity: 1, duration: 0.4 });
    });
  });
});
</script>

<style scoped>
.map-container {
  width: 80vw;
  height: 80vh;
  position: relative;
  margin-left:10vw;
  margin-right:10vw;
  top: 10vh;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url('/images/mapbg.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0; /* Initial opacity for fade-in effect */
}

.image-button {
  position: absolute;
  z-index: 6;
}
.image-button button {
  position: absolute;
  padding: 0px;
  border: 0;
  cursor: pointer;
  width: 15px; /* 设置按钮宽度 */
  height: 15px; /* 设置按钮高度 */
  border-radius: 50%; /* 将按钮形状设置为圆形 */
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4); /* 添加阴影 */
  transition: transform 0.2s, box-shadow 0.2s; /* 添加过渡效果 */
  z-index: 6;
  /* animation: blink 1s infinite; */
}


@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.hover-image {
  position: absolute;
  z-index: 7;
  border: 1px solid #ccc;
  background-color: rgb(0, 0, 0);
  padding: 5px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  cursor: not-allowed;
}

.wrapper {
  position: relative;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3; /* 灰色边框 */
  border-top: 4px solid #3498db; /* 蓝色边框 */
  border-radius: 50%;
  animation: spin 1s linear infinite; /* 旋转动画 */
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.commentapp {
  z-index: 10000000;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s; /* 过渡效果 */
}

.fade-enter,
.fade-leave-to {
  opacity: 0; /* 初始透明度为0 */
}
</style>
