<template>
  <div class="title">Drag your mouse to switch viewpoint</div>
  <div>
    <a-scene>
      <a-assets>
        <video id="vr-video" autoplay loop crossorigin="anonymous" src="/images/VR.mp4" playsinline></video>
      </a-assets>
      <a-videosphere src="#vr-video" rotation="0 -90 0" material="shader: flat;"></a-videosphere>
      <a-camera wasd-controls-enabled="true" look-controls-enabled="true"></a-camera>
    </a-scene>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

// 引入 aframe
import 'aframe'

onMounted(() => {
  const video = document.getElementById('vr-video') as any
  if (video) {
    video.addEventListener('canplay', () => {
      console.log('Video can play')
    })

    video.addEventListener('error', (e: any) => {
      console.error('Error loading video', e)
    })

    // 确保视频以最高质量播放
    video.playbackQuality = 'high'
  } else {
    console.error('Video element not found')
  }
})
</script>

<style>

.title{
  color:white;
  width:100vw;
  font-size:30px;
  align-self: center;
  justify-self: center;
  text-align: center;
  position:absolute;
  z-index:10;
  bottom:10px;
  left:10px;
  background-color: #0000002a;

}
/* 覆盖 A-Frame 默认的加载屏幕样式 */
a-loading-screen {
  background: #000 !important; /* 设置加载页面背景为黑色 */
  color: #fff !important; /* 设置加载文本颜色为白色 */
}

/* 保持 a-scene 的样式 */
a-scene {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
