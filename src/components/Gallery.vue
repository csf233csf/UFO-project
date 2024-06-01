<template>
  <div class="images-row">
    <div class="image-container" ref="imageContainer1">
      <div class="image-scroller" ref="imageScroller1">
        <div
          v-for="(img, index) in images1"
          :key="img.id"
          class="scroll-image-container"
          @click="showImageDetails(index, 1)" 
        >
          <img :src="img.url" class="scroll-image" />
          <div v-if="activeIndex1 === index" class="description">
            {{ img.description }}
          </div>
        </div>
      </div>
    </div>
    <div class="image-container" ref="imageContainer2">
      <div class="image-scroller" ref="imageScroller2">
        <div
          v-for="(img, index) in images2"
          :key="img.id"
          class="scroll-image-container"
          @click="showImageDetails(index, 2)"
        >
          <img :src="img.url" class="scroll-image" />
          <div v-if="activeIndex2 === index" class="description">
            {{ img.description }}
          </div>
        </div>
      </div>
    </div>
    <div class="image-container" ref="imageContainer3">
      <div class="image-scroller" ref="imageScroller3">
        <div
          v-for="(img, index) in images3"
          :key="img.id"
          class="scroll-image-container"
          @click="showImageDetails(index, 3)"
        >
          <img :src="img.url" class="scroll-image" />
          <div v-if="activeIndex3 === index" class="description">
            {{ img.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <v-btn class="uploadbutton" @click="triggerFileUpload">
      <template v-if="uploadButtonText === 'Upload UFO photo'">
        <span>Upload<br>UFO<br>photo</span>
      </template>
      <template v-else>
        <span>{{ uploadButtonText }}</span>
      </template>
    </v-btn>
    <input 
      type="file" 
      ref="fileInput" 
      @change="handleFileUpload" 
      accept="image/*" 
      style="display: none;"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, type Ref, inject } from 'vue';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, set, push, onValue } from 'firebase/database';
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
const showImageDetail = ref(false);
const selectedImage = ref<string | null>(null);
const selectedImageDescription = ref<string | null>(null);
const selectedImageComments = ref<string[]>([]);
const selectedImageId = ref<string | null>(null);
const showUploadDialog = ref(false);
const previewUrl = ref<string | null>(null);

const db = getDatabase();
const showDescriptionInput = ref(false);
const selectedFile = ref<File | null>(null);
const description = ref('');
const uploadButtonText = ref('Upload UFO photo');

const speed = ref();

const currentIndex = ref(0);
let intervalId = null;

let timeline1: gsap.core.Timeline | null = null;
let timeline2: gsap.core.Timeline | null = null;
let timeline3: gsap.core.Timeline | null = null;

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
    console.log(images1, images2, images3)

    startScrolling();
  });
}

function startScrolling() {
  // 正值表示向右移动，负值表示向左移动
  startContainerScrolling(imageScroller1, imageContainer1, timeline1, 400); // 向右移动
  startContainerScrolling(imageScroller2, imageContainer2, timeline2, -350); // 向左移动
  startContainerScrolling(imageScroller3, imageContainer3, timeline3, 500); // 向右移动
}

function startContainerScrolling(scroller: Ref<HTMLElement | null>, container: Ref<HTMLElement | null>, timeline: gsap.core.Timeline | null, speed: number) {
  if (scroller.value && container.value) {
    const containerWidth = container.value.clientWidth;
    const scrollerWidth = scroller.value.scrollWidth;
    const totalWidth = scrollerWidth + containerWidth;
    if (timeline) {
      timeline.kill();
    }
    timeline = gsap.timeline({ repeat: -1 });
    timeline.fromTo(
      scroller.value,
      { x: speed > 0 ? containerWidth : (-scrollerWidth+500) },
      {
        x: speed > 0 ? (-scrollerWidth+500) : containerWidth,
        duration: totalWidth / Math.abs(speed / 5),
        ease: "slow(0.7, 0.7, false)",
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x)),
        },
      }
    );

    // 暂停动画，注释
    // Add event listeners to pause/resume on hover
    // container.value.addEventListener('mouseenter', () => {
    //   timeline?.pause();
    // });
    // container.value.addEventListener('mouseleave', () => {
    //   timeline?.resume();
    // });

  }
}

function showImageDetails(index: number, container: number) {
  const images = container === 1 ? images1 : container === 2 ? images2 : images3;
  const img = images.value[index];
  selectedImage.value = img.url;
  selectedImageDescription.value = img.description;
  selectedImageId.value = img.id;
  fetchComments(img.id);
  showImageDetail.value = true;
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

const inject_inst = inject('changep5') as () => void

const fileInput = ref<HTMLInputElement | null>(null);
const triggerFileUpload = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (files && files.length > 0) {
    selectedFile.value = files[0];
    await uploadImage();
  }
};

const uploadImage = async () => {
  if (!selectedFile.value) return;

  const file = selectedFile.value;
  const storageReference = storageRef(storage, 'images/' + file.name);
  await uploadBytes(storageReference, file);
  const url = await getDownloadURL(storageReference);

  const newImageRef = push(dbRef(db, 'images'));
  console.log('uploaded to db')
  await set(newImageRef, { url, description: description.value });

  showDescriptionInput.value = false;
  description.value = '';
  selectedFile.value = null;
  uploadButtonText.value = 'Uploaded';
};

onMounted(() => {
  fetchImages();
  inject_inst();
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
  background-color: white; /* Light background for better contrast */
  padding: 20px;
  overflow: hidden;
}

.images-row {
  display: flex;
  flex-direction: column; /* Arrange containers in a column */
  position: relative;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  margin-bottom: 20px;
}

.image-container {
  width: 100%; /* Ensure the containers fit within the column */
  height: 33.3%;
  overflow: hidden;
  background-color: transparent;
  border-radius: 10px;
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
  height: 200px; /* Ensure the height of the image container */
  margin-right: 100px; /* Space between images */
  position: relative;
  align-items: flex-start; /* Align to the top */
}

.scroll-image {
  max-height: 100%; /* Max height of the image */
  width: auto; /* Auto adjust width to maintain aspect ratio */
  border-radius: 0; /* No border radius */
  align-self: flex-end;
  filter:drop-shadow(-6px 6px 10px   rgba(82, 255, 0, 0.6));
  /*   filter: drop-shadow(-10px 5px 5px rgba(82, 255, 0, 0.3)); main merged*/ 
  
}

.scroll-image:hover {
  max-height: 100%; /* Max height of the image */
  width: auto; /* Auto adjust width to maintain aspect ratio */
  border-radius: 0; /* No border radius */
  align-self: flex-end;
}

.scroll-image-container:hover .scroll-image {
  transform: scale(1.05); /* Slight zoom on hover */
  filter: drop-shadow(5px 5px 5px rgb(0, 0, 0, .0));
}

.description {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px;
  border-radius: 5px;
}

.description-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.description-input input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
}

.description-input button {
  padding: 10px 20px;
  border: none;
  background-color: #61dafb;
  color: #282c34;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.description-input button:hover {
  background-color: #21a1f1; /* Darker blue on hover */
}

.uploadbutton {
  position: fixed;
  top: 5%;
  right: 5%;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  font-size:9px;
  flex-shrink: 0;
  min-width: 32px;
  background-color: #52ff00;
  font-size: 10px;
  z-index: 10000000;
}
</style>
