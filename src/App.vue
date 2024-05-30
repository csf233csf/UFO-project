<template>
  <v-btn variant="tonal" class="jump-button" v-if="showButton1" @click="jumptonextpage('/page4')">跳转下个页面</v-btn>
  <v-btn variant="tonal" class="jump-button" v-if="showButton2" @click="jumptonextpage('/page5')">跳转下个页面</v-btn>
  <v-btn :ripple="true" variant="tonal" class="jump-button" v-if="showButton3"
    @click="jumptonextpage('/page6')">跳转下个页面</v-btn>

  <div class="gradient-div">
  </div>

  <div class="Title">
    <div class="titleWrapper">
    <h1>{{ title }}</h1>
    <p>{{ content }},</p>
    </div>
  </div>

  <div class="nav-bar">
    <ul>
      <li :class="{ active: activeLink === 1 }" @click="scrollToSection(1)">Page 1</li>
      <li :class="{ active: activeLink === 2 }" @click="scrollToSection(2)">Page 2</li>
      <li :class="{ active: activeLink === 3 }" @click="scrollToSection(3)">Page 3</li>
    </ul>
  </div>


  <div class="app-container" v-if="showSections" ref="backgroundSection">
    <v-btn variant="tonal" class="jump-button" v-if="showButton1" @click="jumptonextpage('/page4')">跳转下个页面</v-btn>
    <v-btn variant="tonal" class="jump-button" v-if="showButton2" @click="jumptonextpage('/page5')">跳转下个页面</v-btn>
    <v-btn :ripple="true" variant="tonal" class="jump-button" v-if="showButton3"
      @click="jumptonextpage('/page6')">跳转下个页面</v-btn>
    <div class="sections" ref="sections">
      <div class="text-div">
        <p>{{ pageNumber }}</p>
      </div> -->
      <div class="gradient-div">
      </div>
      <section id="section1" class="section section1">
        <page1 />
      </section>
      <section id="section2" class="section section2">
        <page2 />
      </section>
      <section id="section3" class="section section3">
        <page3 />
      </section>
    </div>
  </div>
  <div v-if="page4" ref="page4Div" class="fade-in">
    <p4>page4</p4>
  </div>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, onUpdated } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { useRoute, useRouter } from 'vue-router';
import page1 from '@/components/page1.vue';
import page2 from '@/components/page2.vue';
import page3 from '@/components/page3.vue';
// import Page4 from '@/components/page4.vue';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const sections = ref<HTMLElement | null>(null);
const route = useRoute();
const router = useRouter();
const showSections = computed(() => route.path === '/');

const startColor = ref('#52FF00');
const endColor = ref('transparent');
const linkColor = ref('#000000');
const pageNumber = ref(1);
const showButton1 = ref(false);
const showButton2 = ref(false);
const showButton3 = ref(false);

const page4 = ref(false);
const backgroundSection = ref(null);
const page4Div = ref(null);
const activeLink = ref(0);

let title = ref('Initial Title');
let content = ref('Initial Content');

// const changeTitle = (newTitle: string) => {
//   console.log("wij");
//   title.value = newTitle;
// };
function changeTitle(newTitle: string,newContent: string){
  title.value = newTitle;
  content.value = newTitle;
}

const updateGradient = () => {
  document.documentElement.style.setProperty('--start-color', startColor.value);
  document.documentElement.style.setProperty('--end-color', endColor.value);
  document.documentElement.style.setProperty('--link-color', linkColor.value);

};

watch([startColor, endColor, linkColor], updateGradient, { immediate: true });



const scrollProgress = ref(0);
const previousColor = ref(startColor.value);

const changeColor = (color: string, page: number) => {
  pageNumber.value = page;
  activeLink.value = page;
  gsap.to(previousColor, {
    value: color,
    duration: 1,
    onUpdate: () => {
      startColor.value = previousColor.value;
      linkColor.value = previousColor.value;
      updateGradient();
    },
  });
};

const checkScrollPosition = () => {
  const scrollLeft = sections.value!.scrollLeft || 0;
  const scrollWidth = sections.value!.scrollWidth - sections.value!.clientWidth;
  scrollProgress.value = (scrollLeft / scrollWidth) * 100;
  if (scrollProgress.value >= 0 && scrollProgress.value < 33.33) {
    showButton1.value = true;
    showButton2.value = false;
    showButton3.value = false;
    changeColor('#52FF00', 1); // Change to the desired color for 0% to 33.33%
    changeTitle('Title1','Content1');
  } else if (scrollProgress.value >= 33.33 && scrollProgress.value < 66.66) {
    showButton1.value = false;
    showButton2.value = true;
    showButton3.value = false;
    changeColor('#00FFFF', 2); // Change to the desired color for 33.33% to 66.66%
    changeTitle('Title2','Content2');
  } else if (scrollProgress.value >= 66.66) {
    showButton1.value = false;
    showButton2.value = false;
    showButton3.value = true;
    changeColor('#FFF72E', 3); // Change to the desired color for 66.66% to 100%
    changeTitle('Title3','Content3');
  }
};
onMounted(() => {
  sections.value!.addEventListener('scroll', checkScrollPosition);
  checkScrollPosition();
  router.afterEach((to) => {
        if (to.name === "/") {
          sections.value!.addEventListener('scroll', checkScrollPosition);
          checkScrollPosition();
        }
      });
});

const scrollToSection = (sectionNumber: number) => {
  console.log("sectionNumber")
  const section = document.getElementById(`section${sectionNumber}`);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

function jumptonextpage(path: string) {
  const timeline = gsap.timeline();
  // 移出 backgroundSection
  timeline.to(backgroundSection.value, {
    y: '100%',
    opacity: 0,
    duration: 0.5,
  });
  // page4Div 出现
  timeline.to(page4Div.value, {
    opacity: 1,
    y: '0%',
    duration: 0.5,
    onComplete() {
      page4.value = true;
      router.push(path);
    },
  });
}




</script>

<style scoped>
.app-container {
  width: 100vw;
  height: 100vh;
  padding: 0;
  /* overflow-x: hidden; */
  display: flex;
  overflow-x: hidden;
}

.nav-bar {
  background-color: transparent;
  height: 100%;
  color: white;
  display: flex;
  position: fixed;
  left: 0%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 10px;
}

.nav-bar ul {
  list-style-type: none;
  padding: 0;
}

.nav-bar li {
  padding: 10px;
  cursor: pointer;
  margin-bottom: 100px;
}

.nav-bar li:hover {
  background-color: #555;
}

.nav-bar li.active {
  font-weight: bold;
  font-size: 1.2em;
  color: var(--link-color);
  /* Customize the active link color */
}

.Title{
  position:fixed;
  top:0px;
  width:100%;
  color: var(--start-color);
  z-index:1000000;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin:20px;
  margin-left: 0px;
}

.titleWrapper{
  width:60vw;
  /* border-color: azure; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  
}

.Title h1{


}

.Title p{

 padding-right: 100px;
}
.sections {
  display: flex;
  width: 100vw;
  /* Adjust for nav bar width */
  /* width: calc(100vw - 200px);  */
  height: 100vh;
  position: absolute;
  overflow-x: auto;
  /* Ensure the container can scroll horizontally */
}

.section {
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  color: white;
  position: relative;
}

.gradient-div {
  width: 100%;
  /* Adjust for nav bar width */
  height: 20%;
  position: fixed;
  bottom: 0;
  left: 0;
  /* Adjust for nav bar width */
  background: linear-gradient(to top, var(--start-color), var(--end-color));
  z-index: 1000000;
}

.text-div {
  /* width: calc(100vw - 200px); Adjust for nav bar width */
  width: 100px;
  height: 20%;
  position: fixed;
  top: 0;
  right: 10vw;
  /* Adjust for nav bar width */
  color: aliceblue;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
}

.jump-button {
  position: absolute;
  left: 50%;
  bottom: 10%;
  transform: translateX(-50%);
  z-index: 1000001;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.sections::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.sections {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>
