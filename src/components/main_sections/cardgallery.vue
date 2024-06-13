<template>
  <div class="grid-container">
    <div v-for="index in 9" :key="index" class="grid-item">
      <template v-if="index === 1 || index === 5 || index === 9">
        <video 
          :class="getVideoClass(index)"
          @mouseover="playVideo($event)" 
          @mouseleave="pauseVideo($event)" 
          loop muted>
          <source :src="getVideoSource(index)" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </template>
      <template v-else-if="index !== 1 && index !== 7">
        <!-- <img :class="getImageClass(index)" :src="getImageSource(index)" alt="Grid image" /> -->
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const getVideoSource = (index: number) => {
  if (index === 1) return '/images/move1.mp4';
  if (index === 5) return '/images/move2.mp4';
  if (index === 9) return '/images/move3.mp4';
  return '';
};

const getImageSource = (index: number) => {
  switch(index) {
    case 2: return '/images/221.png';
    case 3: return '/images/frogman.jpg';
    case 8: return '/images/frogman.jpg';
    case 9: return '/images/frogman.jpg';
    default: return '';
  }
};

const getVideoClass = (index: number) => {
  switch(index) {
    case 4: return 'video-style-1';
    case 5: return 'video-style-2';
    case 6: return 'video-style-3';
    default: return '';
  }
};

const getImageClass = (index: number) => {
  switch(index) {
    case 2: return 'image-style-1';
    case 3: return 'image-style-2';
    case 8: return 'image-style-3';
    case 9: return 'image-style-4';
    default: return '';
  }
};

const playVideo = (event: Event) => {
  const video = event.target as HTMLVideoElement;
  video.play();
};

const pauseVideo = (event: Event) => {
  const video = event.target as HTMLVideoElement;
  video.pause();
};
</script>

<style scoped>
.grid-container {
  position:absolute;
  right:10vw;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 80vw;
  height: 100vh;
}

.grid-item {
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid rgb(255, 255, 255); Optional: For debugging grid layout */
  overflow: hidden;
}

video, img {
  width: auto;
  height: 100%;
  object-fit: cover; /* Ensure the content covers the grid item without distortion */
}

/* Specific styles for each video */
.video-style-1 {
  transform: scale(1.5);
  /* Add specific styles for video 1 here */
}

.video-style-2 {
  /* Add specific styles for video 2 here */
}

.video-style-3 {
  /* Add specific styles for video 3 here */
}

/* Specific styles for each image */
.image-style-1 {
  /* Add specific styles for image 1 here */
}

.image-style-2 {
  /* Add specific styles for image 2 here */
}

.image-style-3 {
  /* Add specific styles for image 3 here */
}

.image-style-4 {
  /* Add specific styles for image 4 here */
}
</style>
