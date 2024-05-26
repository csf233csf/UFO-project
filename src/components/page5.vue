<template>
    <div class="page-container">
      <h1 style="color:aliceblue">PAGE 5 MAIN TITLE</h1>
      <div class="image-container" ref="imageContainer">
        <div class="image-scroller" ref="imageScroller">
          <img v-for="(img, index) in images" :src="img" :key="index" class="scroll-image" />
        </div>
      </div>
      <input type="file" @change="uploadImage" />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
  import { storage } from '@/firebaseConfig';
  import { getDatabase, ref as dbRef, set, push, onValue } from 'firebase/database';
  import gsap from 'gsap';
  
  const images = ref<string[]>([]);
  const imageContainer = ref<HTMLElement | null>(null);
  const imageScroller = ref<HTMLElement | null>(null);
  
  const db = getDatabase();
  
  // 从database里面获取响应式图片url
  async function fetchImages() {
    const imagesRef = dbRef(db, 'images');
    onValue(imagesRef, (snapshot) => {
      images.value = [];
      snapshot.forEach((childSnapshot) => {
        const imageUrl = childSnapshot.val();
        images.value.push(imageUrl);
      });
      startScrolling();
    });
  }
  
  // Function to upload image
  async function uploadImage(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const storageReference = storageRef(storage, 'images/' + file.name);
      await uploadBytes(storageReference, file);
      const url = await getDownloadURL(storageReference);
      
      // Add image URL to Realtime Database
      const newImageRef = push(dbRef(db, 'images'));
      await set(newImageRef, url);
  
      images.value.push(url);
      startScrolling();
    }
  }
  
  // Function to start scrolling images
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
  
  // Fetch images when component is mounted
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
  
  .scroll-image {
    width: 200px; /* Fixed width to ensure square shape */
    height: 200px; /* Fixed height to ensure square shape */
    object-fit: cover;
    margin-right: 20px;
  }
  </style>
  