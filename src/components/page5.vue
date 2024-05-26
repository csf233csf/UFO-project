<template>
  <div class="page-container">
    <h1 style="color:aliceblue">PAGE 5 MAIN TITLE</h1>
    <div class="image-container" ref="imageContainer">
      <div class="image-scroller" ref="imageScroller">
        <div
          v-for="(img, index) in images"
          :key="img.id"
          class="scroll-image-container"
          @click="showImageDetails(index)"
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

    <ImageDetail
      v-if="showImageDetail"
      :image="selectedImage"
      :description="selectedImageDescription"
      :comments="selectedImageComments"
      @close="closeImageDetail"
      @addComment="addComment"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebaseConfig';
import { getDatabase, ref as dbRef, set, push, onValue } from 'firebase/database';
import gsap from 'gsap';
import ImageDetail from './ImageDetail.vue';

const images = ref<{ id: string; url: string; description: string }[]>([]);
const imageContainer = ref<HTMLElement | null>(null);
const imageScroller = ref<HTMLElement | null>(null);
const activeIndex = ref<number | null>(null);
const showImageDetail = ref(false);
const selectedImage = ref<string | null>(null);
const selectedImageDescription = ref<string | null>(null);
const selectedImageComments = ref<string[]>([]);
const selectedImageId = ref<string | null>(null);

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
        id: childSnapshot.key,
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
    const containerWidth = imageContainer.value ? imageContainer.value.clientWidth : 0;
    const totalWidth = scrollerWidth + containerWidth;

    const timeline = gsap.timeline({ repeat: -1 });
    timeline.to(imageScroller.value, {
      x: `-=${scrollerWidth}`,
      duration: totalWidth / 50, // 控制滚动速度，50 是每秒的像素数，你可以根据需要调整
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

function showImageDetails(index: number) {
  const img = images.value[index];
  selectedImage.value = img.url;
  selectedImageDescription.value = img.description;
  selectedImageId.value = img.id;
  fetchComments(img.id);
  showImageDetail.value = true;
}

function closeImageDetail() {
  showImageDetail.value = false;
  selectedImage.value = null;
  selectedImageDescription.value = null;
  selectedImageComments.value = [];
  selectedImageId.value = null;
}

async function fetchComments(imageId: string) {
  const commentsRef = dbRef(db, `comments/${imageId}`);
  onValue(commentsRef, (snapshot) => {
    selectedImageComments.value = [];
    snapshot.forEach((childSnapshot) => {
      selectedImageComments.value.push(childSnapshot.val());
    });
  });
}

async function addComment(comment: string) {
  if (selectedImageId.value) {
    const commentsRef = dbRef(db, `comments/${selectedImageId.value}`);
    await push(commentsRef, comment);
  }
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
  transform: translate3d(0, 0, 0); /* 使滚动更平滑 */
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
