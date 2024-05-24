<template>
    <div id="app">
      <nav>
        <router-link to="/page1">Page 1</router-link>
        <router-link to="/page2">Page 2</router-link>
        <router-link to="/page3">Page 3</router-link>
      </nav>
      <router-view v-slot="{ Component }">
        <transition
          mode="out-in"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
        >
          <component :is="Component" :key="$route.fullPath" />
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
  const isTransitioning = ref(false);
  const slideDirection = ref(''); // 'left' or 'right'
  
  const handleScroll = (event: WheelEvent) => {
    if (!isTransitioning.value) {
      if (event.deltaX > 50) {
        slideDirection.value = 'right';
        console.log("left");
        navigateNext();
      } else if (event.deltaX < -50) {
        console.log("right");
        slideDirection.value = 'left';
        navigatePrev();
      }
    }
  };
  
  const navigateNext = () => {
    const routes = router.getRoutes();
    const currentIndex = routes.findIndex(r => r.path === route.path);
    if (currentIndex < routes.length - 1) {
      isTransitioning.value = true;
      router.push(routes[currentIndex + 1].path);
    }
  };
  
  const navigatePrev = () => {
    const routes = router.getRoutes();
    const currentIndex = routes.findIndex(r => r.path === route.path);
    if (currentIndex > 0) {
      isTransitioning.value = true;
      router.push(routes[currentIndex - 1].path);
    }
  };
  
  const beforeEnter = (el: Element) => {
    gsap.set(el, {
      opacity: 0,
      x: slideDirection.value === 'right' ? 100 : -100,
    });
  };
  
  const enter = (el: Element, done: () => void) => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power2.out',
      onComplete: () => {
        done();
        isTransitioning.value = false;
      },
    });
  };
  
  const leave = (el: Element, done: () => void) => {
    gsap.to(el, {
      opacity: 0,
      x: slideDirection.value === 'right' ? -100 : 100,
      duration: 1,
      ease: 'power2.in',
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
  </style>
  