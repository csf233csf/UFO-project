<template>
  <div class="app-container">
    <div class="page-transition">
      <img :src="currentPage.backgroundImage" :key="currentPage.path" alt="" class="image">
      <div class="page-transition__red"></div>
      <div class="page-transition__black"></div>
      <div class="transition__logo">I'M LOGO</div>
    </div>
    <nav>
      <router-link to="/page1">Page 1</router-link>
      <router-link to="/page2">Page 2</router-link>
      <router-link to="/page3">Page 3</router-link>
    </nav>
    <div class="page-container">
      <router-view v-slot="{ Component, route }">
        <transition @enter="enter" @leave="leave">
          <component :is="Component" :key="route.fullPath" class="page" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { gsap } from 'gsap';

const router = useRouter();
const route = useRoute();

const currentPage = ref({
  path: route.path,
  backgroundImage: route.meta.backgroundImage,
});

const enter = (el: Element, done: () => void) => {
  const tl = gsap.timeline({ onComplete: done });

  tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 });
};

const leave = (el: Element, done: () => void) => {
  const tl = gsap.timeline({ onComplete: done });

  tl.fromTo(el, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.5 });
};

watch(
  () => route.path,
  () => {
    const tl = gsap.timeline();

    tl.fromTo('.page-transition__red', { scaleX: 0 }, { scaleX: 1, duration: 1.1, transformOrigin: 'left', ease: 'power4.inOut' })
      .fromTo('.page-transition__black', { scaleX: 0 }, { scaleX: 1, duration: 1.1, transformOrigin: 'left', ease: 'power4.inOut' }, '-=1')
      .fromTo('.transition__logo', { xPercent: -100, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.8, ease: 'power4.inOut' }, '-=0.8')
      .set('.page-transition__red', { scaleX: 0 })
      .set('.image', { autoAlpha: 0 })
      .to('.page-transition__black', { scaleX: 0, duration: 1.1, transformOrigin: 'right', ease: 'power4.inOut' })
      .to('.transition__logo', { autoAlpha: 0, duration: 0.2 }, '-=0.6')
      .set('.image', { autoAlpha: 1 })
      .set(currentPage, {
        path: route.path,
        backgroundImage: route.meta.backgroundImage,
      });
  }
);
</script>

<style>
/* ... (same as before) */

.page-transition__black {
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background: #000;
  transform: scaleX(0);
}

.page-transition__red {
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background: red;
  transform: scaleX(0);
}

.transition__logo {
  text-transform: uppercase;
  font-family: sans-serif;
  font-size: 60px;
  position: absolute;
  z-index: 1;
  color: #fff;
  font-weight: bold;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  opacity: 0;
}
</style>