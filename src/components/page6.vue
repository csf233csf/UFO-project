<template>
  <div>
    <div v-if="showDrawApp">
      <DrawApp :xPos="xPos" :yPos="yPos" @close="closeDrawApp" />
      <div class="overlay"></div>
    </div>
    <div class="map-container" @click.self="handleMapClick">
      <div v-if="showCommentApp && selectedXPos !== null && selectedYPos !== null">
        <CommentApp :xPos="selectedXPos" :yPos="selectedYPos" @close="closeCommentApp" />
        <div class="overlay"></div>
      </div>
      <div v-for="(img, index) in images" :key="index" class="image-button"
        :style="{ top: img.xPos + 'px', left: img.yPos + 'px' }">
        <button @click.stop="openCommentApp(img.xPos, img.yPos)" @mouseover="showImage(img.url)"
          @mouseleave="hideImage">
          Image {{ index + 1 }}
        </button>
      </div>
      <div v-if="hoveredImage" class="hover-image">
        <img :src="hoveredImage" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { database } from '@/firebaseConfig';
import { ref as dbRef, onValue } from 'firebase/database';
import DrawApp from './DrawApp.vue';
import CommentApp from './CommentApp.vue';

const xPos = ref(0);
const yPos = ref(0);
const showDrawApp = ref(false);
const showCommentApp = ref(false);
const selectedXPos = ref<number | null>(null);
const selectedYPos = ref<number | null>(null);
const hoveredImage = ref<string | null>(null);
const images = ref<{ xPos: number; yPos: number; url: string }[]>([]);

const closeDrawApp = () => {
  showDrawApp.value = false;
};

const closeCommentApp = () => {
  showCommentApp.value = false;
  selectedXPos.value = null;
  selectedYPos.value = null;
};

const handleMapClick = (event: MouseEvent) => {
  xPos.value = event.clientX;
  yPos.value = event.clientY;
  showDrawApp.value = true;
};

const openCommentApp = (x: number, y: number) => {
  selectedXPos.value = x;
  selectedYPos.value = y;
  showCommentApp.value = true;
};

const showImage = (url: string) => {
  hoveredImage.value = url;
};

const hideImage = () => {
  hoveredImage.value = null;
};

onMounted(() => {
  const imagesRef = dbRef(database, 'images_map');
  onValue(imagesRef, (snapshot) => {
    images.value = [];
    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      images.value.push(data);
    });
  });
});
</script>

<style scoped>
.map-container {
  width: 80vw;
  height: 80vh;
  position: relative;
  margin: auto;
  top: 10vh;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
}

.image-button {
  position: absolute;
}

.image-button button {
  padding: 5px 10px;
  cursor: pointer;
}

.hover-image {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000;
  border: 1px solid #ccc;
  background-color: white;
  padding: 5px;
}

.hover-image img {
  max-width: 200px;
  max-height: 200px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  /* Ensure it covers all other elements */
  cursor: not-allowed;
}
</style>
