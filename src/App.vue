
<script lang="ts" setup>
import { ref, computed } from 'vue';
// import gsap from 'gsap';
// import ScrollTrigger from 'gsap/ScrollTrigger';
// import ScrollToPlugin from 'gsap/ScrollToPlugin';
import page1 from '@/components/page1.vue'
import page2 from '@/components/page2.vue'
import page3 from '@/components/page3.vue'
import {useRoute} from 'vue-router'

// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const sections = ref(null);
const route = useRoute();

const showSections = computed(() => route.path === '/');

</script>



<template>
  <div class="app-container" v-if="showSections">
    <div class="sections" ref="sections">
      <section class="section section1"><page1 /></section>
      <section class="section section2"><page2 /></section>
      <section class="section section3"><page3 /></section>
    </div>
  </div>
  <router-view></router-view>
</template>

<style>
.app-container {
  width: 100vw;
  height: 100vh;
  padding: 0;
  /* overflow: hidden; Hide overflow to prevent unwanted scrolling */
}

.sections {
  display: flex;
  width: 300vw; /* 100vw for each section */
  height: 100vh;
  overflow: hidden; /* Ensure the container can scroll horizontally */
}

.section {
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  color: white;
  position:relative;
}

/* .section1 {
  background-color: #1abc9c;
}

.section2 {
  background-color: #3498db;
}

.section3 {
  background-color: #e74c3c;
} */

</style>
