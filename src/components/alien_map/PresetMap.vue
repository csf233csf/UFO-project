<template>
  <div class="map-container">
    <div v-if="overlayVisible" class="overlay" @click="hideAllComponents"></div>
    <component
      v-for="(visible, key) in componentsVisibility"
      :is="components[key]"
      :key="key"
      v-show="visible.value"
      @click.stop
    ></component>
    <div class="image-button" v-for="(component, index) in componentList" :key="component">
      <button 
        @click="showComponent(component)"
        :style="{
          backgroundColor: colors[index % colors.length],
          top: positions[component].top + 'px',
          left: positions[component].left + 'px'
        }"
      ></button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue';

// Import components
import YellowDog from '@/components/models/model1.vue';
import AnotherComponent from '@/components/models/model2.vue'; // Make sure this path is correct

// Define components
const componentList = ['YellowDog', 'AnotherComponent'];
const componentsVisibility: Record<string, Ref<boolean>> = {
  YellowDog: ref(false),
  AnotherComponent: ref(false),
};

// Register components dynamically
const components: Record<string, any> = {
  YellowDog,
  AnotherComponent,
};

// Button positions
const positions: Record<string, { top: number; left: number }> = {
  YellowDog: { top: 50, left: 50 },
  AnotherComponent: { top: 100, left: 100 },
};

const colors = ['#FF9900', '#FF00C7', '#52FF00', '#FFF72E', '#00FFFF', '#7000FF'];
const overlayVisible = ref(false);

function showComponent(component: string) {
  // Hide other components before showing the clicked one
  hideAllComponents();
  const visible = componentsVisibility[component];
  visible.value = true;
  overlayVisible.value = true; // Show overlay
}

function hideAllComponents() {
  for (const key in componentsVisibility) {
    if (componentsVisibility[key]) {
      componentsVisibility[key].value = false;
    }
  }
  overlayVisible.value = false; // Hide overlay
}
</script>


<style scoped>
.map-container {
  width: 80vw;
  height: 80vh;
  position: relative;
  margin: auto;
  top: 10vh;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url('/images/mapbg.jpg');
  background-size: cover;
  background-position: center;
  opacity: 1; /* Initial opacity for fade-in effect */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.image-button button {
  position: absolute;
  padding: 0px;
  border: 0;
  cursor: pointer;
  width: 20px; /* 设置按钮宽度 */
  height: 20px; /* 设置按钮高度 */
  border-radius: 50%; /* 将按钮形状设置为圆形 */
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4); /* 添加阴影 */
  transition: transform 0.2s, box-shadow 0.2s; /* 添加过渡效果 */
  z-index: 20; /* Ensure buttons are above overlay */
}
</style>
