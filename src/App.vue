<template>
    <div :style="{ backgroundColor: backgroundColor, transition: 'background-color 1s ease' }" class="app-container">
      <nav>
        <router-link to="/page1">Page 1</router-link>
        <router-link to="/page2">Page 2</router-link>
        <router-link to="/page3">Page 3</router-link>
      </nav>
      <div class="page-container">
        <router-view v-slot="{ Component, route }">
          <transition
            mode="out-in"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave"
          >
            <component :is="Component" :key="route.fullPath" class="page" />
          </transition>
        </router-view>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, onBeforeUnmount, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { gsap } from 'gsap';
  import { useBackgroundColor } from './useBackgroundImage';
  
  const router = useRouter();
  const route = useRoute();
  const isTransitioning = ref(false);
  const slideDirection = ref(''); // 'left' or 'right'
  
  const { backgroundColor } = useBackgroundColor();
  
  const handleScroll = (event: WheelEvent) => {
    if (!isTransitioning.value) {
      if (event.deltaX > 50) {
        slideDirection.value = 'left';
        navigateNext();
      } else if (event.deltaX < -50) {
        slideDirection.value = 'right';
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
      opacity: 1,
      x: slideDirection.value === 'left' ? '50vw' : '-50vw',
    });
  };
  
  const enter = (el: Element, done: () => void) => {
    const timeline = gsap.timeline({
      onComplete: () => {
        done();
        isTransitioning.value = false;
      }
    });
  
    timeline.to(el, {
      x: '0vw',
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    });
  };
  
  const leave = (el: Element, done: () => void) => {
    const enterElement = document.querySelector('.v-enter') as Element;
  
    const timeline = gsap.timeline({
      onComplete: done
    });
  
    timeline
      .to(el, {
        x: slideDirection.value === 'left' ? '-50vw' : '50vw',
        opacity: 1,
        duration: 1,
        ease: 'power2.in',
      }, 0) // Start at the same time
      .to(enterElement, {
        x: '0vw',
        opacity: 1,
        duration: 0.1,
        ease: 'power2.out',
      }, 0); // Start at the same time
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
  
  .app-container {
    width: 100vw;
    height: 100vh;
    position: relative;
    transition: background-color 1s ease;
  }
  
  .page-container {
    width: 100vw;
    height: 100vh;
    position: relative;
  }
  
  .page {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
  }
  </style>
  