<template>
    <v-container fluid class="page-container">
      <v-row class="images-row">
        <v-col cols="12" class="image-container" ref="imageContainer1">
          <v-row class="image-scroller" ref="imageScroller1" no-gutters>
            <v-col
              v-for="(img, index) in images1"
              :key="img.id"
              class="scroll-image-container"
              @click="showImageDetails(index, 1)"
            >
              <v-img
                :src="img.url"
                class="scroll-image"
                aspect-ratio="1"
              ></v-img>
              <v-card v-if="activeIndex1 === index" class="description" flat>
                <v-card-text>{{ img.description }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
  
        <v-col cols="12" class="image-container" ref="imageContainer2">
          <v-row class="image-scroller" ref="imageScroller2" no-gutters>
            <v-col
              v-for="(img, index) in images2"
              :key="img.id"
              class="scroll-image-container"
              @click="showImageDetails(index, 2)"
            >
              <v-img
                :src="img.url"
                class="scroll-image"
                aspect-ratio="1"
              ></v-img>
              <v-card v-if="activeIndex2 === index" class="description" flat>
                <v-card-text>{{ img.description }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
  
        <v-col cols="12" class="image-container" ref="imageContainer3">
          <v-row class="image-scroller" ref="imageScroller3" no-gutters>
            <v-col
              v-for="(img, index) in images3"
              :key="img.id"
              class="scroll-image-container"
              @click="showImageDetails(index, 3)"
            >
              <v-img
                :src="img.url"
                class="scroll-image"
                aspect-ratio="1"
              ></v-img>
              <v-card v-if="activeIndex3 === index" class="description" flat>
                <v-card-text>{{ img.description }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
  
      <v-btn @click="showUploadDialog = true" class="uploadbutton" color="primary">Upload Image</v-btn>
  
      <v-dialog v-model="showUploadDialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Upload Image</span>
          </v-card-title>
          <v-card-text>
            <v-file-input v-model="selectedFile" label="Select Image" @change="previewImage"></v-file-input>
            <v-img v-if="previewUrl" :src="previewUrl" max-height="300"></v-img>
            <v-text-field v-model="description" label="Description" placeholder="Enter image description"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="uploadImage">Upload</v-btn>
            <v-btn color="grey darken-1" text @click="showUploadDialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted, type Ref } from 'vue';
  import { getDatabase, ref as dbRef, set, push, onValue } from 'firebase/database';
  import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
  import gsap from 'gsap';
  import { storage } from '@/firebaseConfig';
  
  const images1 = ref<{ id: string; url: string; description: string }[]>([]);
  const images2 = ref<{ id: string; url: string; description: string }[]>([]);
  const images3 = ref<{ id: string; url: string; description: string }[]>([]);
  const imageContainer1 = ref<HTMLElement | null>(null);
  const imageContainer2 = ref<HTMLElement | null>(null);
  const imageContainer3 = ref<HTMLElement | null>(null);
  const imageScroller1 = ref<HTMLElement | null>(null);
  const imageScroller2 = ref<HTMLElement | null>(null);
  const imageScroller3 = ref<HTMLElement | null>(null);
  const activeIndex1 = ref<number | null>(null);
  const activeIndex2 = ref<number | null>(null);
  const activeIndex3 = ref<number | null>(null);
  const showUploadDialog = ref(false);
  const selectedFile = ref<File | null>(null);
  const previewUrl = ref<string | null>(null);
  const description = ref('');
  
  const db = getDatabase();
  
  async function fetchImages() {
    const imagesRef = dbRef(db, 'images');
    onValue(imagesRef, (snapshot) => {
      const allImages: { id: string; url: string; description: string }[] = [];
      snapshot.forEach((childSnapshot) => {
        const imageData = childSnapshot.val();
        allImages.push({
          id: childSnapshot.key,
          url: imageData.url,
          description: imageData.description,
        });
      });
  
      // Randomly sort images
      const shuffledImages = allImages.sort(() => Math.random() - 0.5);
  
      // Distribute images to three containers
      images1.value = [];
      images2.value = [];
      images3.value = [];
      for (let i = 0; i < shuffledImages.length; i++) {
        if (i % 3 === 0) {
          images1.value.push(shuffledImages[i]);
        } else if (i % 3 === 1) {
          images2.value.push(shuffledImages[i]);
        } else {
          images3.value.push(shuffledImages[i]);
        }
      }
  
      startScrolling();
    });
  }
  
  function previewImage(event: Event) {
    if (selectedFile.value) {
      previewUrl.value = URL.createObjectURL(selectedFile.value);
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
  
    showUploadDialog.value = false;
    description.value = '';
    selectedFile.value = null;
    previewUrl.value = null;
  }
  
  function startScrolling() {
    startContainerScrolling(imageScroller1, imageContainer1);
    startContainerScrolling(imageScroller2, imageContainer2);
    startContainerScrolling(imageScroller3, imageContainer3);
  }
  
  function startContainerScrolling(scroller: Ref<HTMLElement | null>, container: Ref<HTMLElement | null>) {
    if (scroller.value && container.value) {
      const containerWidth = container.value.clientWidth;
      const scrollerWidth = scroller.value.scrollWidth;
      const totalWidth = scrollerWidth + containerWidth;
      gsap.fromTo(
        scroller.value,
        { x: containerWidth }, // Start from the end of the container width
        {
          x: -scrollerWidth, // Scroll to the negative of the scroller width
          duration: totalWidth / 100, // Adjust speed as needed
          ease: 'linear',
          repeat: -1, // Loop indefinitely
          modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x)), // Ensure the unit is correctly applied
          },
        }
      );
    }
  }
  
  function showImageDetails(index: number, container: number) {
    const images = container === 1 ? images1 : container === 2 ? images2 : images3;
    const img = images.value[index];
    activeIndex1.value = container === 1 ? index : null;
    activeIndex2.value = container === 2 ? index : null;
    activeIndex3.value = container === 3 ? index : null;
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
    width: 100vw;
    overflow: hidden;
    background-color: rgb(255, 255, 255); /* Light background for better contrast */
    padding: 20px;
  }
  
  .images-row {
    display: flex;
    flex-direction: column; /* Arrange containers in a column */
    width: 100vw;
    height: 100vh;
    background-color: rgb(0, 0, 0);
    padding: 20px;
  }
  
  .image-container {
    width: 100%; /* Ensure the containers fit within the column */
    height: 33.3%;
    overflow: hidden;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 20px; /* Add space between containers */
  }
  
  .image-scroller {
    display: flex;
    flex-wrap: nowrap; /* Prevent line breaks */
    width: 100%;
    transform: translate3d(0, 0, 0); /* Smooth scrolling */
  }
  
  .scroll-image-container {
    flex: 0 0 auto; /* Prevent shrinking */
    height: 200px; /* Ensure image container height */
    margin-right: 100px; /* Spacing between images */
    position: relative;
    align-items: flex-start; /* Align along the top */
  }
  
  .scroll-image {
    max-height: 100%; /* Image max height */
    width: auto; /* Maintain aspect ratio */
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.3));
  }
  
  .scroll-image-container:hover .scroll-image {
    transform: scale(1.05); /* Slight zoom on hover */
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.0));
  }
  
  .description {
    position: absolute;
    bottom: 10px;
    left: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff; /* Make text color visible */
    padding: 5px;
    border-radius: 5px;
  }
  
  .uploadbutton {
    position: absolute;
    top: 10%;
    right: 5%;
  }
  </style>
  