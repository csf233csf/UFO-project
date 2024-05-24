<template>
    <div id="app">
      <nav>
        <router-link to="/page1">Page 1</router-link>
        <router-link to="/page2">Page 2</router-link>
        <router-link to="/page3">Page 3</router-link>
      </nav>
      <router-view v-slot="{ Component }">
        <transition
          name="slide"
          mode="out-in"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, onBeforeUnmount, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { gsap } from 'gsap';
  
  const router = useRouter();
  const route = useRoute();
  const scrollDirection = ref(0);
  
  const handleScroll = (event: WheelEvent) => {
    if (event.deltaX > 50) { // Threshold to avoid small scrolls
      scrollDirection.value = 1; // Right
      navigateNext();
    } else if (event.deltaX < -50) { // Threshold to avoid small scrolls
      scrollDirection.value = -1; // Left
      navigatePrev();
    }
  };
  
  const navigateNext = () => {
    const routes = router.getRoutes().map(route => route.path);
    const currentIndex = routes.indexOf(route.path);
    if (currentIndex < routes.length - 1) {
      router.push(routes[currentIndex + 1]);
    }
  };
  
  const navigatePrev = () => {
    const routes = router.getRoutes().map(route => route.path);
    const currentIndex = routes.indexOf(route.path);
    if (currentIndex > 0) {
      router.push(routes[currentIndex - 1]);
    }
  };
  
  const beforeEnter = (el: Element) => {
    const direction = scrollDirection.value;
    gsap.set(el, {
      opacity: 0,
      x: direction === 1 ? 100 : -100,
    });
  };
  
  const enter = (el: Element, done: () => void) => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 1,
      onComplete: done,
    });
  };
  
  const leave = (el: Element, done: () => void) => {
    const direction = scrollDirection.value;
    gsap.to(el, {
      opacity: 0,
      x: direction === 1 ? -100 : 100,
      duration: 1,
      onComplete: done,
    });
  };
  
  onMounted(() => {
    window.addEventListener('wheel', handleScroll);
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener('wheel', handleScroll);
  });
  </script>
  
  <style>
  nav {
    padding: 1em;
  }
  nav a {
    margin: 0 10px;
    text-decoration: none;
    color: #42b983;
  }
  
  .slide-enter-active, .slide-leave-active {
    transition: opacity 0.5s, transform 0.5s;
  }
  .slide-enter, .slide-leave-to {
    opacity: 0;
  }
  </style>
  