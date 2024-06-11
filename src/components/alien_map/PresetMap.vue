<template>
  <div class="wrapper">
  <div v-if="overlayVisible" class="overlay" @click="hideAllComponents"></div>
  <div class="map-container">
     <!-- <img src="/images/mapbg.jpg"/> -->
     <div class="comwrapper">
      <button v-show="overlayVisible" class="close-button" @click="hideAllComponents">
      <img src="/images/close.svg" alt="Close Icon" class="svg-icon" />
    </button>
      <component class='components' v-for="(visible, key) in componentsVisibility" :is="components[key]" :key="key"
      v-show="visible.value" @click.stop>
    </component>
     </div>
   
    
    <div class="image-button" v-for="(component, index) in componentList" :key="component">
      <button @click="showComponent(component)" :class="'button-style'" :style="buttonStyle(index, component)"></button>
    </div>
  </div>
  <v-btn class="nav-button" @click="navigateToNextPage">
    <span>Add<br>Your<br>Alien</span>
  </v-btn>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref, onMounted, inject } from 'vue'; // 导入模型组件
import YellowDog from '@/components/models/model1.vue';
import Bigmouth from '@/components/models/model2.vue';
import AnotherComponent from '@/components/models/model3.vue';
import Frogman from '@/components/models/model4.vue';
import Singer from '@/components/models/model5.vue';
import router from '@/router/index';
import Hearted from '@/components/models/model6.vue';
const inject_func_map = inject('changep6') as () => void

onMounted(()=>{
  inject_func_map()
})

// 哈希模型组件
const componentList = ['YellowDog', 'AnotherComponent','Bigmouth','Frogman','Singer','Hearted'];
const componentsVisibility: Record<string, Ref<boolean>> = {
  YellowDog: ref(false),
  AnotherComponent: ref(false),
  Bigmouth: ref(false),
  Frogman: ref(false),
  Singer: ref(false),
  Hearted: ref(false),
};

// 储存模型组件列表
const components: Record<string, any> = {
  YellowDog,
  AnotherComponent,
  Bigmouth,
  Frogman,
  Singer,
  Hearted
};

// 按钮的位置
const positions: Record<string, { top: number; left: number }> = {
  YellowDog: { top: 250, left: 250 },
  AnotherComponent: { top: 400, left: 400 },
  Bigmouth: { top: 300, left: 600 },
  Frogman: { top: 500, left: 500 },
  Singer: { top: 300, left: 1000 },
  Hearted: { top: 400, left: 500 },
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

function navigateToNextPage() {
  router.push('/alien_map'); // Replace '/next-page' with your desired route
  
}
</script>

<style scoped>
.wrapper {
  align-items: center;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: contain;
  width: 100%;
  height: 100vh;
  /* background-image: url('/images/mapbg.jpg'); */
  background-repeat: no-repeat;
 background-position: 25%;
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
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  animation: glow var(--animation-duration) ease-in infinite;
  animation-delay: var(--animation-delay);
}

.button-style:hover {
  transform: scale(1.1);
  /* 放大 */
  box-shadow: 0 0 20px var(--button-color);
  /* 添加阴影 */
}

.button-style::before {
  background: var(--button-color);
  border-radius: inherit;
  content: '';
  filter: blur(10px);
  opacity: .75;
  position: absolute;
  transition: all .3s ease-in-out;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  z-index: -1;
  animation: glow var(--animation-duration) ease-in infinite;
  animation-delay: var(--animation-delay);
}

.button-style:hover::before {
  filter: blur(20px);
  opacity: 1;
  animation: none;
  /* 移除动画 */
}

.map-container {
  width: 80vw;
  height: 80vh;
  position: relative;
  margin: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-size: cover;
  background-position: center;
  opacity: 1;
  display: flex;
  background-image: url('/images/mapbg.jpg');
  justify-content: center;
}

.map-container img {
  position: absolute;
  top:0;
  scale:0.7;

}

.close-button {
  position: absolute;
  top: 6px;
  right: 0px;
  background: transparent;
  /* color: rgb(255, 34, 34); */
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1010;
  transition: opacity 0.3s; /* 添加透明度变化的过渡效果 */
  opacity: 0.9;
}

.comwrapper{
  position: relative;
  height:auto;
  width:auto;


}

.close-button:hover {
  opacity: 0.3;
}


.close-button img.svg-icon {
  /* margin-right: 8px; */
  width: 10px;  /* 调整SVG图标宽度 */
  height: 10px; /* 调整SVG图标高度 */
  
}

@keyframes glow {
  0% {
    background: var(--button-color);
  }

  25% {
    background: var(--button-color-transparent);
    /* 使用透明颜色 */
  }

  100% {
    background: var(--button-color);
  }
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
  z-index: 1000;
  box-shadow: 0 0px 20px rgba(255, 255, 255, 0.684); /* 白色阴影 */
  /* sheight: 600px; */
  height:100%;
  width: auto;
  background-size: cover;
  background: trans;
}

.image-button button {
  position: absolute;
  padding: 0px;
  border: 0;
  cursor: pointer;
  width: 15px;
  /* 设置按钮宽度 */
  height: 15px;
  /* 设置按钮高度 */
  border-radius: 50%;
  /* 将按钮形状设置为圆形 */
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  /* 添加阴影 */
  transition: transform 0.2s, box-shadow 0.2s;
  /* 添加过渡效果 */
  z-index: 99;
  /* Ensure buttons are above overlay */
}

.nav-button {
  position: fixed;
  top: 5%;
  right: 5%;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  font-size:9px;
  flex-shrink: 0;
  min-width: 32px;
  background-color: #00FFFF;
  font-size: 10px;
  z-index: 10000000;

}
</style>
