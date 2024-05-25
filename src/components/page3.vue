<template>
    <section class="background-section" ref="backgroundSection" v-if="!page4">
      <button @click="jumptonextpage">跳转下个button</button>
    </section>
    <div v-if="page4" ref="page4Div" class="fade-in">
      <p4></p4>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, nextTick } from 'vue';
  import gsap from 'gsap';
  import p4 from '@/components/page4.vue';
  
  const page4 = ref(false);
  const backgroundSection = ref(null);
  const page4Div = ref(null);
  
  function jumptonextpage() {
    gsap.to(backgroundSection.value, {
      y: '-100%',
      duration: 1,
      onComplete() {
        page4.value = true;
        nextTick(() => {
          gsap.fromTo(
            page4Div.value,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 1,
              onComplete() {
                if (backgroundSection.value) {
                }
              },
            }
          );
        });
      },
    });
  }
  </script>
  
  <style scoped>
  .background-section {
    width: 100%;
    height: 100vh;
    background-image: url('/images/Slide 16_9 - 17.svg');
    background-color: transparent;
    background-size: cover;
    background-position: center;
  }
  
  .fade-in {
    opacity: 1;
  }
  </style>
  