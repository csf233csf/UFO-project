<template>
  <div class="map-container" @click="handleMapClick">
    <DrawApp v-if="showDrawApp" :xPos="xPos" :yPos="yPos" @close="closeDrawApp" />
    <div v-for="(img, index) in images" :key="index" class="image-button" :style="{ top: img.xPos + 'px', left: img.yPos + 'px' }">
      <button @mouseover="showImage(img.url)" @mouseleave="hideImage">
        Image {{ index + 1 }}
      </button>
    </div>
    <div v-if="hoveredImage" class="hover-image">
      <img :src="hoveredImage" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { database } from '@/firebaseConfig';  // Import the database
import { ref as dbRef, onValue } from 'firebase/database';
import DrawApp from './DrawApp.vue';

const xPos = ref(0);
const yPos = ref(0);
const showDrawApp = ref(false);
const hoveredImage = ref<string | null>(null);
const images = ref<{ xPos: number; yPos: number; url: string }[]>([]);

const handleMapClick = (event: MouseEvent) => {
  xPos.value = event.offsetX;
  yPos.value = event.offsetY;
  showDrawApp.value = true;
};

const showImage = (url: string) => {
  hoveredImage.value = url;
};

const hideImage = () => {
  hoveredImage.value = null;
};

const closeDrawApp = () => {
  showDrawApp.value = false;
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
  top: 0;
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
</style>
