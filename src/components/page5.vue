<template>
  <div class="page-container">
    <h1 style="color:aliceblue">PAGE 5 MAIN TITLE</h1>
    <div class="image-container" ref="imageContainer">
      <div class="image-scroller" ref="imageScroller">
        <div
          v-for="(img, index) in images"
          :key="index"
          class="scroll-image-container"
        >
          <img
            :src="img.url"
            class="scroll-image"
            @mouseover="showDescription(index)"
            @mouseleave="hideDescription"
          />
          <div v-if="activeIndex === index" class="description">
            {{ img.description }}
          </div>
        </div>
      </div>
    </div>
    <input type="file" @change="onFileChange" />
    <div v-if="showDescriptionInput" class="description-input">
      <input v-model="description" placeholder="Enter image description" />
      <button @click="uploadImage">Upload</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebaseConfig';
import { getDatabase, ref as dbRef, set, push, onValue } from 'firebase/database';
import gsap from 'gsap';

const images = ref<{ url: string; description: string }[]>([]);
const imageContainer = ref<HTMLElement | null>(null);
const imageScroller = ref<HTMLElement | null>(null);
const activeIndex = ref<number | null>(null);

const db = getDatabase();
const showDescriptionInput = ref(false);
const selectedFile = ref<File | null>(null);
const description = ref('');

async function fetchImages() {
  const imagesRef = dbRef(db, 'images');
  onValue(imagesRef, (snapshot) => {
    images.value = [];
    snapshot.forEach((childSnapshot) => {
      const imageData = childSnapshot.val();
      images.value.push({
        url: imageData.url,
        description: imageData.description,
      });
    });
    startScrolling();
  });
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0];
    showDescriptionInput.value = true;
  }
}

async function uploadImage() {
  if (!selectedFile.value) return;

  const file = selectedFile.value;
  const storageReference = storageRef(storage, 'images/' + file.name);
  await uploadBytes(storageReference, file);
  const url = await getDownloadURL(storageReference);

  const newImageRef = push(dbRef(db, 'images'));
  await set(newImageRef, { url, description: description.value });

  showDescriptionInput.value = false;
  description.value = '';
  selectedFile.value = null;
}


function startScrolling() {
  if (imageScroller.value && images.value.length > 1) {
    const scrollerWidth = imageScroller.value.scrollWidth;
    gsap.to(imageScroller.value, {
      x: `+=${scrollerWidth}`,
      duration: 20,
      repeat: -1,
      ease: 'linear',
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % scrollerWidth)
      }
    });
  }
}

function showDescription(index: number) {
  activeIndex.value = index;
}

function hideDescription() {
  activeIndex.value = null;
}

onMounted(fetchImages);
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #282c34;
}

.image-container {
  width: 80%;
  height: 200px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  margin-bottom: 20px;
}

.image-scroller {
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.scroll-image-container {
  position: relative;
  margin-right: 20px;
}

.scroll-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
}

.description {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 5px;
  border-radius: 5px;
}

.description-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.description-input input {
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.description-input button {
  padding: 5px 10px;
  border: none;
  background-color: #61dafb;
  color: #282c34;
  cursor: pointer;
  border-radius: 5px;
}
</style>
