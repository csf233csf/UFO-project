<template>
  <div v-if="overlayVisible" class="overlay" @click="hideAllComponents"></div>
  <div class="map-container">
    <component
      class='components'
      v-for="(visible, key) in componentsVisibility"
      :is="components[key]"
      :key="key"
      v-show="visible.value"
      @click.stop
    ></component>
    <div class="image-button" v-for="(component, index) in componentList" :key="component">
      <button 
        @click="showComponent(component)"
        :class="'button-style'"
        :style="buttonStyle(index, component)"
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
  YellowDog: { top: 50, left: 350 },
  AnotherComponent: { top: 100, left: 500 },
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

function buttonStyle(index: number, component: string) {
  const color = colors[index % colors.length];
  const duration = (Math.random() * 3 + 0.5).toFixed(2) + 's'; // 动态生成闪烁持续时间
  const delay = (Math.random() * 2).toFixed(2) + 's'; // 动态生成闪烁延迟时间
  return {
    '--button-color': color,
    '--button-color-transparent': `${color}80`, // 添加透明度的颜色值
    '--animation-duration': duration,
    '--animation-delay': delay,
    top: positions[component].top + 'px',
    left: positions[component].left + 'px',
  };
}
</script>

<style scoped>
body {
  align-items: center;
  background: #212121;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
}

.button-style {
  background: var(--button-color);
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1.25em;
  letter-spacing: .1em;
  outline: none;
  padding: .75em 2em;
  position: relative;
  text-transform: uppercase;
  transition: all .3s ease-in-out;
  animation: glow var(--animation-duration) ease-in infinite;
  animation-delay: var(--animation-delay);
}

.button-style:hover {
  transform: scale(1.1); /* 放大 */
  animation: none; /* 移除动画 */
  box-shadow: 0 0 20px var(--button-color); /* 添加阴影 */
}

.button-style::before {
  animation: glow var(--animation-duration) ease-in infinite;
  animation-delay: var(--animation-delay);
  background: var(--button-color);
  border-radius: inherit;
  content: '';
  filter: blur(10px);
  opacity: .90;
  position: absolute;
  transition: all .3s ease-in-out;
  width: 120%;
  height: 120%;
  top: 0;
  right: 0;
  z-index: -1;
}

.button-style:hover::before {
  filter: blur(20px);
  opacity: 1;
  animation: none; /* 移除动画 */
}


@keyframes glow {
  0% {
    background: var(--button-color);
  }
  25% {
    background: var(--button-color-transparent); /* 使用透明颜色 */
  }
  100% {
    background: var(--button-color);
  }
}

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
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: transparent;
  z-index: 5;
}

.components {
  position: relative;
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
  z-index: 15; /* Ensure buttons are above overlay */
}
</style>
