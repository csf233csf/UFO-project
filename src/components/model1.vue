<template>
  <div id="container"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const container = ref<HTMLDivElement | null>(null);

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let model: THREE.Group;

const initThreeJS = () => {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.value?.appendChild(renderer.domElement);

  const light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);

  const loader = new GLTFLoader();
  loader.load(
    'Cozy workspace1.glb', // Replace this with the path to your GLB file
    (gltf) => {
      model = gltf.scene;
      scene.add(model);
      animate();
    },
    undefined,
    (error) => {
      console.error('An error happened', error);
    }
  );
};

const animate = () => {
  requestAnimationFrame(animate);

  if (model) {
    model.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
};

onMounted(() => {
  initThreeJS();
});

onUnmounted(() => {
  if (renderer) {
    renderer.dispose();
  }
});
</script>

<style scoped>
#container {
  width: 20%;
  height: 20%; /* Set the desired height */
  display: block;
  overflow: hidden;
  position: fixed;
  top:0;
  left:0;
  background-color: white
}
</style>
