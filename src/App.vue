<template>
    <div class="App">
        <h1>这里是主APP界面</h1>
    </div>
    <RouterLink to="/page1">page1</RouterLink>
    <RouterLink to="/page2">page2</RouterLink>
    <RouterLink to="/page3">page3</RouterLink>
    <h2>切换</h2>
    <div>
        <RouterView/>
    </div>
</template>

<script lang="ts" setup>
    import { RouterView, RouterLink } from 'vue-router';
</script>

<style scoped>

</style>