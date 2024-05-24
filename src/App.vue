<template>
    <div id="app">
      <nav>
        <router-link to="/page1">Page 1</router-link>
        <router-link to="/page2">Page 2</router-link>
        <router-link to="/page3">Page 3</router-link>
      </nav>
      <transition name="fade" mode="out-in">
        <router-view :key="$route.fullPath"></router-view>
      </transition>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, onBeforeUnmount, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  
  const router = useRouter();
  const route = useRoute();
  const lastScrollLeft = ref(0);
  
  const handleScroll = (event: WheelEvent) => {
    const currentScrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    if (event.deltaX > 0) {
      navigateNext();
    } else if (event.deltaX < 0) {
      navigatePrev();
    }
    lastScrollLeft.value = currentScrollLeft <= 0 ? 0 : currentScrollLeft;
  };
  
  const navigateNext = () => {
    const routes = router.getRoutes();
    const currentIndex = routes.findIndex(r => r.path === route.path);
    if (currentIndex < routes.length - 1) {
      router.push(routes[currentIndex + 1].path);
    }
  };
  
  const navigatePrev = () => {
    const routes = router.getRoutes();
    const currentIndex = routes.findIndex(r => r.path === route.path);
    if (currentIndex > 0) {
      router.push(routes[currentIndex - 1].path);
    }
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
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }
  </style>
  