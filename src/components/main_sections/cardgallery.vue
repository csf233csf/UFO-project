<template>
  <div ref="three" class="three-container"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationMixer, Clock } from 'three';

const three = ref<HTMLDivElement | null>(null);
const clock = new Clock();

onMounted(() => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 8);
  const renderer = new THREE.WebGLRenderer({ antialias: true , alpha:true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (three.value) {
    three.value.appendChild(renderer.domElement);
  }

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5).normalize();
  scene.add(light);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 0.5是光的强度
  scene.add(ambientLight);

  const mixers: AnimationMixer[] = [];

  const loader = new GLTFLoader();
  let model1: THREE.Object3D | null = null;
  let model2: THREE.Object3D | null = null;
  let model3: THREE.Object3D | null = null;

  // 加载第一个模型
  loader.load('/images/move1.glb', (gltf) => {
    model1 = gltf.scene;
    model1.scale.set(1, 1, 1);
    model1.position.set(-2, -2, 0); // 将模型放置在不同位置
    scene.add(model1);

    const mixer1 = new AnimationMixer(model1);
    mixers.push(mixer1);
    const animationName1 = 'Action.003'; // 替换为你的动画名称
    const clip1 = THREE.AnimationClip.findByName(gltf.animations, animationName1);
    if (clip1) {
      const action1 = mixer1.clipAction(clip1);
      action1.play();
      console.log(`Playing animation for model1: ${animationName1}`);
    } else {
      console.error(`Animation ${animationName1} not found for model1`);
    }
  }, undefined, (error) => {
    console.error('An error happened while loading model1', error);
  });

  // 加载第二个模型
  loader.load('/images/movegaga.glb', (gltf) => {
    model2 = gltf.scene;
    model2.scale.set(5, 5, 5);
    model2.position.set(10, -2, 0); // 将模型放置在不同位置
    scene.add(model2);
    const mixer2 = new AnimationMixer(model2);
    mixers.push(mixer2);
    const animationName2 = 'Action.003'; // 替换为你的动画名称
    const clip2 = THREE.AnimationClip.findByName(gltf.animations, animationName2);
    if (clip2) {
      const action2 = mixer2.clipAction(clip2);
      action2.play();
      console.log(`Playing animation for model2: ${animationName2}`);
    } else {
      console.error(`Animation ${animationName2} not found for model2`);
    }
  }, undefined, (error) => {
    console.error('An error happened while loading model2', error);
  });

  // 加载第三个模型
  loader.load('/images/movegaga.glb', (gltf) => {
    model3 = gltf.scene;
    model3.scale.set(5, 5, 5);
    model3.position.set(10, -2, 0); // 将模型放置在不同位置
    scene.add(model3);
    const mixer3 = new AnimationMixer(model3);
    mixers.push(mixer3);
    const animationName3 = 'Action.003'; // 替换为你的动画名称
    const clip3 = THREE.AnimationClip.findByName(gltf.animations, animationName3);
    if (clip3) {
      const action3 = mixer3.clipAction(clip3);
      action3.play();
      console.log(`Playing animation for model3: ${animationName3}`);
    } else {
      console.error(`Animation ${animationName3} not found for model3`);
    }
  }, undefined, (error) => {
    console.error('An error happened while loading model3', error);
  });

  const animate = () => {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    mixers.forEach((mixer) => mixer.update(delta));
    renderer.render(scene, camera);
  };

  animate();
});
</script>

<style scoped>
.three-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
