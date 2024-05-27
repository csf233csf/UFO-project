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
import { ref, onMounted } from 'vue';
import { ref as dbRef, push, onValue } from 'firebase/database';
import {database} from '@/firebaseConfig';
// 接收来自page6的xpos ypos
const props = defineProps<{ xPos: number; yPos: number }>();
const emit = defineEmits(['close']);

const newComment = ref('');
const comments = ref<string[]>([]);
const imageUrl = ref<string | null>(null);

onMounted(() => {
  // 上传database picture url和xpos-ypos值
  const imageRef = dbRef(database, `images_map/${props.xPos}_${props.yPos}`);
  onValue(imageRef, (snapshot) => {
    const data = snapshot.val();
    if (data && data.url) {
      imageUrl.value = data.url;
    }
  });
  // 通过database的xpos_ypos去创建一个独特的comment_map评论区
  const commentsRef = dbRef(database, `comment_map/${props.xPos}_${props.yPos}`);
  onValue(commentsRef, (snapshot) => {
    comments.value = [];
    snapshot.forEach((childSnapshot) => {
      const comment = childSnapshot.val();
      comments.value.push(comment);
    });
  });
});

// 记得emit的对饮检查，关闭commentapp
const closeCommentApp = () => {
  emit('close');
};

// 评论，aync异步
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

.button {
  margin-top: 10px;
}
</style>
