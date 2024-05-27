<template>
    <div class="draw-app">
      <div class="toolbar">
        <input type="color" v-model="penColor" />
        <button @click="setEraser">Eraser</button>
        <button @click="setPen">Pen</button>
        <label>
          Pixel Size:
          <input type="number" v-model="pixelSize" min="1" max="50" />
        </label>
      </div>
      <canvas ref="canvas" :width="canvasSize" :height="canvasSize"></canvas>
      <button @click="saveDrawing" :disabled="isUploading">Save Drawing</button>
      <button @click="clearCanvas">Clear Canvas</button>
      <button @click="closeDrawApp">Close</button>
      <div v-if="isUploading" class="spinner"></div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { watch, ref, onMounted } from 'vue';
  import { getStorage, ref as storageRef, uploadString, getDownloadURL } from 'firebase/storage';
  import { getDatabase, ref as dbRef, set } from 'firebase/database';
  
  const props = defineProps<{ xPos: number; yPos: number }>();
  const canvas = ref<HTMLCanvasElement | null>(null);
  const ctx = ref<CanvasRenderingContext2D | null>(null);
  const penColor = ref('#000000');
  const pixelSize = ref(10);
  const isUploading = ref(false);
  const canvasSize = 500;
  const emit = defineEmits(['close']);
  let drawing = false;
  
  const setEraser = () => {
    if (ctx.value) {
      ctx.value.strokeStyle = '#FFFFFF';
    }
  };
  
  const setPen = () => {
    if (ctx.value) {
      ctx.value.strokeStyle = penColor.value;
    }
  };
  
  const startDrawing = (event: MouseEvent) => {
    if (ctx.value) {
      drawing = true;
      ctx.value.beginPath();
      ctx.value.moveTo(event.offsetX, event.offsetY);
      draw(event); // Start drawing immediately
    }
  };
  
  const stopDrawing = () => {
    if (ctx.value) {
      drawing = false;
      ctx.value.closePath();
    }
  };
  
  const draw = (event: MouseEvent) => {
    if (!drawing) return;
    if (ctx.value) {
      ctx.value.lineTo(event.offsetX, event.offsetY);
      ctx.value.stroke();
    }
  };
  
  const saveDrawing = async () => {
    if (canvas.value) {
      isUploading.value = true;
      const dataUrl = canvas.value.toDataURL();
      const storage = getStorage();
      const imageRef = storageRef(storage, `${props.xPos}_${props.yPos}.png`);
      await uploadString(imageRef, dataUrl, 'data_url');
      const url = await getDownloadURL(imageRef);
  
      const db = getDatabase();
      const imageDbRef = dbRef(db, `images_map/${props.xPos}_${props.yPos}`);
      await set(imageDbRef, { xPos: props.xPos, yPos: props.yPos, url });
  
      alert('Drawing saved!');
      isUploading.value = false;
    }
  };
  
  const clearCanvas = () => {
    if (ctx.value && canvas.value) {
      ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
    }
  };
  
  const closeDrawApp = () => {
    clearCanvas();
    ctx.value = null;
    canvas.value = null;
    isUploading.value = false;
    emit('close');
  };
  
  onMounted(() => {
    if (canvas.value) {
      ctx.value = canvas.value.getContext('2d');
      ctx.value!.strokeStyle = penColor.value;
      ctx.value!.lineWidth = pixelSize.value;
      canvas.value.addEventListener('mousedown', startDrawing);
      canvas.value.addEventListener('mouseup', stopDrawing);
      canvas.value.addEventListener('mouseleave', stopDrawing);
      canvas.value.addEventListener('mousemove', draw);
    }
  });
  
  watch(penColor, (newColor) => {
    if (ctx.value) {
      ctx.value.strokeStyle = newColor;
    }
  });
  
  watch(pixelSize, (newSize) => {
    if (ctx.value) {
      ctx.value.lineWidth = newSize;
    }
  });
  </script>
  
  <style scoped>
  .draw-app {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 10px;
    border: 1px solid black;
    z-index: 1000;
  }
  canvas {
    border: 1px solid black;
  }
  .toolbar {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-left-color: #09f;
    animation: spin 1s ease infinite;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  