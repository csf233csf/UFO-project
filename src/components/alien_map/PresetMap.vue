<template>
  <div v-if="overlayVisible" class="overlay" @click="hideAllComponents"></div>
  <div class="map-container">
    <component
      class = 'components'
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

// 导入模型组件
import YellowDog from '@/components/models/model1.vue';
import AnotherComponent from '@/components/models/model2.vue';

// 哈希模型组件
const componentList = ['YellowDog', 'AnotherComponent'];
const componentsVisibility: Record<string, Ref<boolean>> = {
  YellowDog: ref(false),
  AnotherComponent: ref(false),
};

// 储存模型组件列表
const components: Record<string, any> = {
  YellowDog,
  AnotherComponent,
};

// 按钮的位置
const positions: Record<string, { top: number; left: number }> = {
  YellowDog: { top: 50, left: 50 },
  AnotherComponent: { top: 100, left: 100 },
};

// 按钮的颜色
const colors = ['#FF9900', '#FF00C7', '#52FF00', '#FFF72E', '#00FFFF', '#7000FF'];
const overlayVisible = ref(false);

function showComponent(component: string) {
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
  opacity: 1; 
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: transparent;
  z-index: 10;
}
.components{
  z-index: 10000;
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
