<template>
  <!-- <h1>Page5</h1> -->
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
          <!-- <div v-if="activeIndex1 === index" class="description">
            {{ img.description }}
          </div> -->
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
          <!-- <div v-if="activeIndex2 === index" class="description">
            {{ img.description }}
          </div> -->
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
          <!-- <div v-if="activeIndex3 === index" class="description">
            {{ img.description }}
          </div> -->
        </div>
      </div>
    </div>
  </div>

  <button class="uploadbutton" @click="uploadImage">Upload</button>
  <!-- <div v-if="showDescriptionInput" class="description-input">
      <input v-model="description" placeholder="Enter image description" />
      
  </div> -->
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
    //startAutoPlay();
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
  startContainerScrolling(imageScroller1, imageContainer1, timeline1,100);
  startContainerScrolling(imageScroller2, imageContainer2, timeline2,0);
  startContainerScrolling(imageScroller3, imageContainer3, timeline3,100);
}
function startContainerScrolling(scroller: Ref<HTMLElement | null>, container: Ref<HTMLElement | null>, timeline: gsap.core.Timeline | null, speed:number) {
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
      { x: -scrollerWidth-speed }, // Start from the negative of the scroller width
      {
        x: totalWidth, // Scroll to the beginning
        duration: totalWidth / 50, // Adjust speed as needed
        ease: 'linear',
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) ),
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
  //const target = scroller.value?.children[index] as HTMLElement;
  //if (target) gsap.to(target.querySelector('img'), { scale: 1.1, duration: 0.3 }); // 图片放大
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
  /* left:15%; */
  width: 100vw;
  height:100vh;
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
}

.image-container {
  width: 100%; /* Ensure the containers fit within the column */
  height: 33.3%;
  overflow: hidden;
  background-color: transparent;
  border-radius: 10px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);  */
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
  /* overflow: hidden; */
  transform: translate3d(0, 0, 0); /* Smooth scrolling */
}

.scroll-image-container {
  flex: 0 0 auto; /* 防止收缩 */
  height: 200px; /* 确保图片容器的宽度 */
  margin-right: 100px; /* 图片之间的间距 */
  position: relative;
  align-items: flex-start; /* 沿顶部对齐 */
}

.scroll-image {
  max-height: 100%; /* 图片最大宽度为容器宽度 */
  width: auto; /* 自动调整高度以保持原始比例 */
  border-radius: 0; /* 图片圆角 */
  align-self: flex-end;
  filter:drop-shadow(5px 5px 5px rgb(0, 0, 0, .3))
  
}

.scroll-image:hover {
  max-height: 100%; /* 图片最大宽度为容器宽度 */
  width: auto; /* 自动调整高度以保持原始比例 */
  border-radius: 0; /* 图片圆角 */
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
  color: transparent;
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

.uploadbutton{
  position:absolute;
  top:10%;
  right:5%;
  
  
}

</style>
