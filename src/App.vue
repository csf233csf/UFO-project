<script lang="ts" setup>
import { onMounted, ref, computed, watch } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import page1 from '@/components/page1.vue';
import page2 from '@/components/page2.vue';
import page3 from '@/components/page3.vue';
import { useRoute } from 'vue-router';
import Page4 from './components/page4.vue';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const sections = ref(null);
const route = useRoute();
const showSections = computed(() => route.path !== '/');

const startColor = ref('#52FF00');
const endColor = ref('transparent');
const pageNumber = ref(1);

const updateGradient = () => {
  document.documentElement.style.setProperty('--start-color', startColor.value);
  document.documentElement.style.setProperty('--end-color', endColor.value);
};
watch([startColor, endColor], updateGradient, { immediate: true });

const scrollProgress = ref(0);
const previousColor = ref(startColor.value);

const changeColor = (color: string) => {
  gsap.to(previousColor, {
    value: color,
    duration: 1,
    onUpdate: () => {
      startColor.value = previousColor.value;
      updateGradient();
    }
  });
};

const checkScrollPosition = () => {
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
  const scrollWidth = document.documentElement.scrollWidth - window.innerWidth;
  scrollProgress.value = (scrollLeft / scrollWidth) * 100;

  if (scrollProgress.value >= 0 && scrollProgress.value < 50) {
    console.log('Scroll progress reached one-third of the page');
    changeColor('#52FF00'); // Change to the desired color for 0% to 33.33%
    pageNumber.value = 1;
  } else if (scrollProgress.value >= 50 && scrollProgress.value < 100) {
    console.log('Scroll progress reached two-thirds of the page');
    changeColor('#00FFFF'); // Change to the desired color for 33.33% to 66.66%
    pageNumber.value = 2;
  } else if (scrollProgress.value >= 100) {
    console.log('Scroll progress reached three-thirds of the page');
    changeColor('#FFF72E'); // Change to the desired color for 66.66% to 100%
    pageNumber.value = 3;
  }
};

onMounted(() => {
  window.addEventListener('scroll', checkScrollPosition);
  checkScrollPosition();
});
</script>

<template>
  <div class="app-container" v-if="showSections">
    <div class="sections" ref="sections">
      <div class="text-div">
        <p>{{ pageNumber }}</p>
      </div>
      <div class="gradient-div"></div>
      <section id="section1" class="section section1">
        <page1 />
      </section>
      <section id="section2" class="section section2">
        <page2 />
      </section>
      <section id="section3" class="section section3">
        <page3 />
      </section>
    </div>
  </div>
  <router-view></router-view>
</template>

<style>
.app-container {
  width: 100vw;
  height: 100vh;
  padding: 0;
  /* overflow-x: hidden; */
}

.sections {
  display: flex;
  width: 300vw; /* Adjust as needed for testing */
  height: 100vh;
  overflow-x: auto; /* Ensure the container can scroll horizontally */
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
  position: relative;
}

.gradient-div {
  width: 100vw;
  height: 20%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: linear-gradient(to top, var(--start-color), var(--end-color));
}

.text-div {
  width: 100vw;
  height: 20%;
  padding-left: 30px;
  position: fixed;
  top: 0;
  left: 0;
  color:aliceblue;
}
</style>
