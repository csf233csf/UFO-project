<template>
    <div class="container">
      <img src="/images/profile.jpg" class="background-image" />
      <div ref="canvasContainer" class="canvas-container"></div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import * as THREE from 'three';
  import { GLTFLoader } from 'three-stdlib';

  const canvasContainer = ref<HTMLDivElement | null>(null);
  const rotationSpeed = ref(0.03); // Initial rotation speed
  
  onMounted(() => {
    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let model: any , requestID: number;
  
    const init = () => {
      // Scene
      scene = new THREE.Scene();
    //   scene.background = new THREE.Color(); // Make the background transparent
  
      // Camera
      camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Aspect ratio set to 1 for square
      camera.position.set(1.3, 2, 9.2);
  
      // Renderer
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); // Enable alpha for transparency
      renderer.setClearColor( 0x000000, 0 ); // the default
      const size = 500
      renderer.setSize(size, size); // Size matching the red box
      if (canvasContainer.value) {
        canvasContainer.value.appendChild(renderer.domElement);
      }
  
      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 3.5);
      scene.add(ambientLight);
  
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5).normalize();
      scene.add(directionalLight);
  
      // Load GLB model
      const loader = new GLTFLoader();
      loader.load(
        'alien11.glb',
        (gltf : any) => {
          model = gltf.scene;
  
          // Center the model
          const scale = 1.1
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          model?.position.sub(center); // Reposition the model to the center
  
          model?.scale.set(scale, scale, scale); // Scale the model if necessary
          scene.add(model);
        },
        undefined,
        (error: any) => {
          console.error('An error occurred while loading the model:', error);
        }
      );
    };
  
    const animate = () => {
      requestID = requestAnimationFrame(animate);
  
      // Rotate the model around its center horizontally (around the y-axis)
      if (model) {
        model.rotation.y += rotationSpeed.value; // Continuous rotation speed
      }
  
      renderer.render(scene, camera);
    };
  
    init();
    animate();
  
    // Clean up
    onBeforeUnmount(() => {
      cancelAnimationFrame(requestID);
      if (canvasContainer.value) {
        canvasContainer.value.removeChild(renderer.domElement);
      }
    });
  });
  </script>
  
  <style scoped>
  .container {
    position: relative;
    height: 800px;
    width: 560px
   
  }
  
  .background-image {
    align-self: center;
    object-fit: cover;
    z-index: 1;
    height: 800px;
    width: 560px
  }
  
  .canvas-container {
    position: absolute;
    top: 74px; /* Adjust according to the red box position */
    right: -170px; /* Adjust according to the red box position */
    pointer-events: none; /* Ensure the canvas doesn't block pointer events */
    z-index: 2;
  }
  </style>
  