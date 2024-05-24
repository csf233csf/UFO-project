<template>
    <div class="App" @touchstart="handleTouchStart" @touchmove="handleTouchMove">
        <h1>这里是主APP界面</h1>
    </div>
    <RouterLink to="/page1">page1</RouterLink>
    <RouterLink to="/page2">page2</RouterLink>
    <RouterLink to="/page3">page3</RouterLink>
    
    <RouterView/>
    
</template>
<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    let startX = 0

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX
    }

    const handleTouchMove = (e) => {
      const moveX = e.touches[0].clientX
      const diffX = moveX - startX

      if (diffX < -50) { // Swipe left
        router.push('/page1');
        console.log("page1"); // Replace with your desired route
      } else if (diffX > 50) { // Swipe right
        router.push('/page2') // Replace with your desired route
      }
    }

    return {
      handleTouchStart,
      handleTouchMove
    }
  }
}
</script>

<style>
/* Add your styles here */
</style>