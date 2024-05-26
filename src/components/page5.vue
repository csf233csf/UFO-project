<template>
  <h1>Page5</h1>
  <div class="images-row">
    <div class="image-container" ref="imageContainer1">
      <div class="image-scroller" ref="imageScroller1">
        <div
          v-for="(img, index) in images1"
          :key="img.id"
          class="scroll-image-container"
          @click="showImageDetails(index, 1)"
        >
          <img
            :src="img.url"
            class="scroll-image"
            @mouseover="showDescription(index, 1)"
            @mouseleave="hideDescription(1)"
          />
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
          <img
            :src="img.url"
            class="scroll-image"
            @mouseover="showDescription(index, 2)"
            @mouseleave="hideDescription(2)"
          />
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
          <img
            :src="img.url"
            class="scroll-image"
            @mouseover="showDescription(index, 3)"
            @mouseleave="hideDescription(3)"
          />
          <div v-if="activeIndex3 === index" class="description">
            {{ img.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, type Ref } from 'vue';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, set, push, onValue } from 'firebase/database';
import gsap from 'gsap';
import ImageDetail from './ImageDetail.vue';
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

const db = getDatabase();
const showDescriptionInput = ref(false);
const selectedFile = ref<File | null>(null);
const description = ref('');

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
  startContainerScrolling(imageScroller1, imageContainer1, timeline1);
  startContainerScrolling(imageScroller2, imageContainer2, timeline2);
  startContainerScrolling(imageScroller3, imageContainer3, timeline3);
}
function startContainerScrolling(scroller: Ref<HTMLElement | null>, container: Ref<HTMLElement | null>, timeline: gsap.core.Timeline | null) {
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
      { x: 0 }, // Start from the current position
      {
        x: -scrollerWidth, // Scroll to the end
        duration: totalWidth / 300, // Adjust speed as needed
        ease: 'linear',
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % totalWidth),
        },
      }
    );
  }
}

function showDescription(index: number, container: number) {
  const activeIndex = container === 1 ? activeIndex1 : container === 2 ? activeIndex2 : activeIndex3;
  activeIndex.value = index;

  const timeline = container === 1 ? timeline1 : container === 2 ? timeline2 : timeline3;
  if (timeline) {
    timeline.pause(); // 暂停动画
  }

  const scroller = container === 1 ? imageScroller1 : container === 2 ? imageScroller2 : imageScroller3;
  const target = scroller.value?.children[index] as HTMLElement;
  if (target) gsap.to(target.querySelector('img'), { scale: 1.1, duration: 0.3 }); // 图片放大
}

function hideDescription(container: number) {
  const activeIndex = container === 1 ? activeIndex1 : container === 2 ? activeIndex2 : activeIndex3;
  const scroller = container === 1 ? imageScroller1 : container === 2 ? imageScroller2 : imageScroller3;
  const target = scroller.value?.children[activeIndex.value!] as HTMLElement;
  if (target) gsap.to(target.querySelector('img'), { scale: 1, duration: 0.3 }); // 恢复图片大小

  const timeline = container === 1 ? timeline1 : container === 2 ? timeline2 : container === 3 ? timeline3 : null;
  if (timeline) {
    timeline.resume(); // 恢复动画
  }

  activeIndex.value = null;
}

function showImageDetails(index: number, container: number) {
  const images = container === 1 ? images1 : container === 2 ? images2 : images3;
  const img = images.value[index];
  selectedImage.value = img.url;
  selectedImageDescription.value = img.description;
  selectedImageId.value =img.id;
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
  background-color: #f0f0f0; /* Light background for better contrast */
  padding: 20px;
}

.images-row {
  display: flex;
  flex-direction: column; /* Arrange containers in a column */
  position: absolute;
  left:15%;
  width: 80%;
  max-width: 1200px; /* Limit the max width for better layout */
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  padding: 20px;
  margin-bottom: 20px;
}

.image-container {
  width: 100%; /* Ensure the containers fit within the column */
  height: 200px;
  overflow: hidden;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for each container */
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
  overflow: hidden;
  transform: translate3d(0, 0, 0); /* Smooth scrolling */
}

.scroll-image-container {
  flex: 0 0 auto; /* Prevent shrinking */
  margin-right: 10px;
  width: 200px; /* Ensure images fit within the container */
  transition: transform 0.3s ease; /* Add transition effect */
  position: relative;
}

.scroll-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px; /* Rounded corners for images */
}

.scroll-image-container:hover .scroll-image {
  transform: scale(1.05); /* Slight zoom on hover */
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

</style>
