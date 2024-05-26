<template>
  <div class="image-detail" v-if="image && description">
    <div class="image-detail-header">
      <button @click="$emit('close')">Close</button>
    </div>
    <div class="image-detail-content">
      <img :src="image" class="detail-image" />
      <p>{{ description }}</p>
      <div class="comments-section">
        <h3>Comments</h3>
        <ul>
          <li v-for="(comment, index) in comments" :key="index">{{ comment }}</li>
        </ul>
        <input v-model="newComment" placeholder="Add a comment" />
        <button @click="submitComment">Submit</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
  image: string | null;
  description: string | null;
  comments: string[];
}>();
const emit = defineEmits(['close', 'addComment']);

const newComment = ref('');

function submitComment() {
  if (newComment.value.trim()) {
    emit('addComment', newComment.value.trim());
    newComment.value = '';
  }
}
</script>

<style scoped>
.image-detail {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.image-detail-header {
  position: absolute;
  top: 10px;
  right: 10px;
}

.image-detail-header button {
  background-color: #61dafb;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}

.image-detail-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.detail-image {
  width: 300px;
  height: 300px;
  object-fit: cover;
  margin-bottom: 20px;
}

.comments-section {
  text-align: left;
}

.comments-section ul {
  list-style-type: none;
  padding: 0;
}

.comments-section li {
  background-color: #f0f0f0;
  padding: 5px;
  margin: 5px 0;
  border-radius: 5px;
}

.comments-section input {
  width: calc(100% - 22px);
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.comments-section button {
  padding: 5px 10px;
  border: none;
  background-color: #61dafb;
  color: #282c34;
  cursor: pointer;
  border-radius: 5px;
}
</style>
