<template>
    <div class="map-container">
        <yellowdog v-show="monie1"></yellowdog>
        <div class="image-button" >
        <button @click="showmonie('monie1')" style="background-color:aquamarine"></button> 
        </div>
    </div>
</template>

<script lang="ts" setup>
import yellowdog from '@/components/models/model1.vue'
import {ref} from 'vue'

const monie1 = ref(false)
const hashmonie = {'monie1': monie1}
const colors = ['#FF9900', '#FF00C7', '#52FF00','#FFF72E','#00FFFF','#7000FF'];

function showmonie(monie: string){
  const boolmonie = hashmonie[monie];
  boolmonie.value = true
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
}

</style>