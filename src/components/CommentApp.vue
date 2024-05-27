<template>
  <div class="comment-app">
    <div class="image-container">
      <img :src="imageUrl || ''" alt="Image" />
    </div>
    <div class="comments">
      <div v-for="(comment, index) in comments" :key="index" class="comment">
        <p>{{ comment }}</p>
      </div>
    </div>
    <textarea v-model="newComment" placeholder="Add a comment..."></textarea>
    <button @click="addComment">Add Comment</button>
    <button @click="closeCommentApp">Close</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { getDatabase, ref as dbRef, set, push, onValue } from 'firebase/database';

const props = defineProps<{ xPos: number; yPos: number }>();
const emit = defineEmits(['close']);

const newComment = ref('');
const comments = ref<string[]>([]);
const database = getDatabase();
const imageUrl = ref<string | null>(null);

onMounted(() => {
  const imageRef = dbRef(database, `images_map/${props.xPos}_${props.yPos}`);
  onValue(imageRef, (snapshot) => {
    const data = snapshot.val();
    if (data && data.url) {
      imageUrl.value = data.url;
    }
  });

  const commentsRef = dbRef(database, `comment_map/${props.xPos}_${props.yPos}`);
  onValue(commentsRef, (snapshot) => {
    comments.value = [];
    snapshot.forEach((childSnapshot) => {
      const comment = childSnapshot.val();
      comments.value.push(comment);
    });
  });
});

const closeCommentApp = () => {
  emit('close');
};

const addComment = async () => {
  if (newComment.value.trim() !== '') {
    const commentsRef = dbRef(database, `comment_map/${props.xPos}_${props.yPos}`);
    await push(commentsRef, newComment.value.trim());
    newComment.value = '';
  }
};
</script>

<style scoped>
.comment-app {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border: 1px solid black;
  z-index: 1000;
  width: 400px;
}

.image-container img {
  max-width: 100%;
}

.comments {
  max-height: 200px;
  overflow-y: auto;
  margin-top: 10px;
}

.comment {
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

textarea {
  width: 100%;
  height: 60px;
  margin-top: 10px;
}

button {
  margin-top: 10px;
}
</style>
