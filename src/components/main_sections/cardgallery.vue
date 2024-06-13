<template>
  <div class="main-container">
    <div ref="threeContainer1" class="three-container"></div>
    <div ref="threeContainer2" class="three-container"></div>
    <div ref="threeContainer3" class="three-container"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationMixer, Clock } from 'three';

const threeContainer1 = ref<HTMLDivElement | null>(null);
const threeContainer2 = ref<HTMLDivElement | null>(null);
const threeContainer3 = ref<HTMLDivElement | null>(null);
const clock = new Clock();

const createScene = (container: HTMLDivElement | null, modelUrl: string, position: THREE.Vector3, scale: THREE.Vector3) => {
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 8);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5).normalize();
  scene.add(light);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const mixers: AnimationMixer[] = [];

  const loader = new GLTFLoader();
  loader.load(modelUrl, (gltf) => {
    const model = gltf.scene;
    model.scale.copy(scale);
    model.position.copy(position);
    scene.add(model);

    const mixer = new AnimationMixer(model);
    mixers.push(mixer);

    // Play all animations
    gltf.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
      console.log(`Playing animation: ${clip.name}`);
    });
  }, undefined, (error) => {
    console.error(`An error happened while loading model from ${modelUrl}`, error);
  });

  const animate = () => {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    mixers.forEach((mixer) => mixer.update(delta));
    renderer.render(scene, camera);
  };

  animate();
};

onMounted(() => {
  createScene(threeContainer1.value, '/images/move1.glb', new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 1, 1));
  createScene(threeContainer2.value, '/images/6131.glb', new THREE.Vector3(2, 0, 0), new THREE.Vector3(5, 5, 5));
  createScene(threeContainer3.value, '/images/6131.glb', new THREE.Vector3(-2, 0, 0), new THREE.Vector3(5, 5, 5));
});
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column; /* Align containers vertically */
}

.three-container {
  width: 100%;
  height: 33vh; /* Set each container's height to fit the page */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black; /* Optional: For debugging container size */
  margin: 10px 0; /* Space between the containers */
}
</style>
