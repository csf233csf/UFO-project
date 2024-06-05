<template>
  <div>
    <v-btn variant="plain" icon="mdi-chevron-double-down" class="jump-button" v-if="showButton1"
      @click="jumptonextpage('/alien_doc', 'Spaceship Collection', 'The project brings such people together, helping them to bond and build an alien community where they can share stories about aliens and create an ideal utopia together.')">
    </v-btn>
    <v-btn variant="plain" icon="mdi-chevron-double-down" class="jump-button" v-if="showButton2"
      @click="jumptonextpage('/gallery', 'Spaceship Collection', 'The project brings such people together, helping them to bond and build an alien community where they can share stories about aliens and create an ideal utopia together.')"> 
    </v-btn>
    <v-btn :ripple="true" variant="plain" icon="mdi-chevron-double-down" class="jump-button" v-if="showButton3"
      @click="jumptonextpage('/VR_video', '', '')">
    </v-btn>
    <div v-if="showNav" class="gradient-div" ></div>
    <div class="gradient-div1"></div>
    <div class="Title">
      <div class="titleWrapper">
        <h1>{{ title }}</h1>
        <p>{{ content }}</p>
      </div>
    </div>
    <div v-if="showNav" class="nav-bar" >
      <ul>
        <li :class="{ active: activeLink === 1 }" @click="scrollToSection(0)">01 <br><br><span class="spaced-text">PROJECTS</span></li>
        <li :class="{ active: activeLink === 2 }" @click="scrollToSection(1)">02 <br><br><span class="spaced-text">AR</span></li>
        <li :class="{ active: activeLink === 3 }" @click="scrollToSection(2)">03 <br><br><span class="spaced-text">WORKSHOP</span></li>
        <li :class="{ active: activeLink === 4 }" @click="scrollToSection(3)">04 <br><br><span class="spaced-text">VR</span></li>
      </ul>
    </div>
  </div>

  <div class="app-container" v-if="showSections" ref="backgroundSection">
    <div class="sections" ref="sections">
      <section id="section0" class="section section0">
        <div v-if="blurover" class="blur" ref="blurDiv0"></div>
        <page0 />
      </section>
      <section id="section1" class="section section1">
        <div v-if="blurover" class="blur" ref="blurDiv1"></div>
        <page1 />
      </section>
      <section id="section2" class="section section2">
        <div v-if="blurover" class="blur" ref="blurDiv2"></div>
        <Cardgallery />
      </section>
      <section id="section3" class="section section3">
        <div v-if="blurover" class="blur" ref="blurDiv3"></div>
        <page3 />
      </section>
    </div>
  </div>
  <router-view v-if="route.path !== '/'"></router-view>
</template>


<script lang="ts" setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, provide } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import page0 from './components/main_sections/mainentry.vue';
import page1 from './components/main_sections/phonespage.vue';
import page3 from './components/main_sections/virtualreality.vue';
import Cardgallery from './components/main_sections/cardgallery.vue';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const sections = ref<HTMLElement | null>(null);
const route = useRoute();
const router = useRouter();
const showSections = computed(() => route.path === '/');

const startColor = ref('#52FF00');
const endColor = ref('transparent');
const linkColor = ref('transparent');
const titleColor = ref('#FF00F5');

const pageNumber = ref(1);
const showButton1 = ref(false);
const showButton2 = ref(false);
const showButton3 = ref(false);
const showNav = ref(true);

const blurover = ref(true);
const blurDiv0 = ref<HTMLElement | null>(null);
const blurDiv1 = ref<HTMLElement | null>(null);
const blurDiv2 = ref<HTMLElement | null>(null);
const blurDiv3 = ref<HTMLElement | null>(null);

const page4 = ref(false);
const backgroundSection = ref(null);
const page4Div = ref(null);
const activeLink = ref(0);
const flagleft = ref(false);

let title = ref('Initial Title');
let content = ref('Initial Content');

function changeTitle(newTitle: string, newContent: string, color: string) {
  title.value = newTitle;
  content.value = newContent;
  titleColor.value = color;
  document.documentElement.style.setProperty('--title-color', titleColor.value);
}

const updateGradient = () => {
  document.documentElement.style.setProperty('--start-color', startColor.value);
  document.documentElement.style.setProperty('--end-color', endColor.value);
  document.documentElement.style.setProperty('--link-color', linkColor.value);
};

watch([startColor, endColor, linkColor], updateGradient, { immediate: true });

const scrollProgress = ref(0);
const previousColor = ref(startColor.value);
const previousColor2 = ref(endColor.value);
const previousColor3 = ref(linkColor.value);

const changeColor = (startColorValue: string, endColorValue: string, linkColorValue: string, page: number) => {
  pageNumber.value = page;
  activeLink.value = page;

  gsap.to([previousColor, previousColor2, previousColor3], {
    value: (i: number) => {
      if (i === 0) return startColorValue;
      if (i === 1) return endColorValue;
      return linkColorValue;
    },
    duration: 1,
    onUpdate: () => {
      startColor.value = previousColor.value;
      endColor.value = previousColor2.value;
      linkColor.value = previousColor3.value;
      updateGradient();
    },
  });
};

const checkScrollPosition = () => {
  const scrollLeft = sections.value!.scrollLeft || 0;
  const scrollWidth = sections.value!.scrollWidth - sections.value!.clientWidth;
  scrollProgress.value = (scrollLeft / scrollWidth) * 100;
  console.log(scrollProgress.value);
  if ( scrollProgress.value < 15){
    gsap.to(blurDiv0.value, { filter: 'blur(0px)', duration: 1 });
    gsap.to(blurDiv1.value, { filter: 'blur(0px)', duration: 1 });
    gsap.to(blurDiv2.value, { filter: 'blur(0px)', duration: 1 });
    gsap.to(blurDiv3.value, { filter: 'blur(0px)', duration: 1 });
  }
  else if (scrollProgress.value >= 15 && scrollProgress.value < 35){
    gsap.to(blurDiv0.value, { filter: 'blur(10px)', duration: 1 });
    gsap.to(blurDiv1.value, { filter: 'blur(0px)', duration: 1 });
    gsap.to(blurDiv2.value, { filter: 'blur(0px)', duration: 1 });
    gsap.to(blurDiv3.value, { filter: 'blur(0px)', duration: 1 });
  }
  else if(scrollProgress.value >= 35 && scrollProgress.value < 50){
    gsap.to(blurDiv0.value, { filter: 'blur(0px)', duration: 1 });
    gsap.to(blurDiv1.value, { filter: 'blur(0px)', duration: 1 });
    gsap.to(blurDiv2.value, { filter: 'blur(0px)', duration: 1 });
    gsap.to(blurDiv3.value, { filter: 'blur(0px)', duration: 1 });
  }
  else if (scrollProgress.value >= 50 && scrollProgress.value < 60){
    gsap.to(blurDiv0.value, { filter: 'blur(0px)', duration: 1 });
    gsap.to(blurDiv1.value, { filter: 'blur(10px)', duration: 1 });
    gsap.to(blurDiv2.value, { filter: 'blur(0px)', duration: 1 });
    gsap.to(blurDiv3.value, { filter: 'blur(0px)', duration: 1 });
  }
  else if(scrollProgress.value >= 60 && scrollProgress.value < 80){
    gsap.to(blurDiv0.value, { filter: 'blur(0px)', duration: 1 });
    gsap.to(blurDiv1.value, { filter: 'blur(0px)', duration: 1 });
    gsap.to(blurDiv2.value, { filter: 'blur(0px)', duration: 1 });
    gsap.to(blurDiv3.value, { filter: 'blur(0px)', duration: 1 });
  }
  else if (scrollProgress.value >= 80 && scrollProgress.value < 100){
    gsap.to(blurDiv0.value, { filter: 'blur(0px)', duration: 1 });
    gsap.to(blurDiv1.value, { filter: 'blur(0px)', duration: 1 });
    gsap.to(blurDiv2.value, { filter: 'blur(10px)', duration: 1 });
    gsap.to(blurDiv3.value, { filter: 'blur(0px)', duration: 1 });
  }

  if (scrollProgress.value >= 0 && scrollProgress.value < 25) {
    showButton1.value = false;
    showButton2.value = false;
    showButton3.value = false;
    changeColor('transparent', '#5F004A', '#FF00C7', 1);
    changeTitle('The Lighthouse Project', 'The project brings such people together, helping them to bond and build an alien community where they can share stories about aliens and create an ideal utopia together.', '#FF00F5');
    
  } else if (scrollProgress.value >= 25 && scrollProgress.value < 50) {
    showButton1.value = false;
    showButton2.value = true;
    showButton3.value = false;
    changeColor('#52FF00', 'transparent', '#52FF00', 2);
    changeTitle('AR Search for Urban Legends.', 'The project brings such people together, helping them to bond and build an alien community where they can share stories about aliens and create an ideal utopia together.', '#52FF00');
    gsap.to(blurDiv3.value, { filter: 'blur(0px)', duration: 1 });
  } else if (scrollProgress.value >= 50 && scrollProgress.value < 75) {
    showButton1.value = true;
    showButton2.value = false;
    showButton3.value = false;
    changeColor('#00FFFF', 'transparent', '#00FFFF', 3);
    changeTitle('Workshop Co-Creating Alien Communities', 'The project brings such people together, helping them to bond and build an alien community where they can share stories about aliens and create an ideal utopia together.', '#00FFFF');
  } else if (scrollProgress.value >= 75) {
    showButton1.value = false;
    showButton2.value = false;
    showButton3.value = true;
    changeColor('#FFF72E', 'transparent', '#FFF72E', 4);
    changeTitle('Immersive VR Offline Exhibition', 'The project brings such people together, helping them to bond and build an alien community where they can share stories about aliens and create an ideal utopia together.', '#FFF72E');
  }
};

function changep6() {
  changeColor('#FFF72E', 'transparent', '#FFF72E', 4);
  changeTitle('Immersive VR Offline Exhibition', 'The project brings such people together, helping them to bond and build an alien community where they can share stories about aliens and create an ideal utopia together.', '#FFF72E');
  flagleft.value = true;
}

function changep5() {
  changeColor('#52FF00', 'transparent', '#52FF00', 2);
  changeTitle('Spaceship Collection', 'The project brings such people together, helping them to bond and build an alien community where they can share stories about aliens and create an ideal utopia together.', '#52FF00');
}

function changep4() {
  changeColor('#00FFFF', 'transparent', '#00FFFF', 3);
  changeTitle('Spaceship Collection', 'The project brings such people together, helping them to bond and build an alien community where they can share stories about aliens and create an ideal utopia together.', '#00FFFF');
}

provide('changep6', changep6);
provide('changep5', changep5);
provide('changep4', changep4);

onMounted(() => {
  window.addEventListener('popstate', handleBackNavigation);
  if (route.path === '/') {
    if (sections.value) {
      sections.value.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
      endColor.value = "#FF00F5";
      linkColor.value = '#FF00F5';
    }
  }
});

function handleBackNavigation() {
  console.log('User navigated back to this page');
  location.reload();
}

const scrollToSection = (sectionNumber: number) => {
  const section = document.getElementById(`section${sectionNumber}`);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

function jumptonextpage(path: string, newTitle: string = 'Default Title', newContent: string = 'Default Content') {
  if (path === '/page4' || '/page5' || '/alien_map') {
    showButton1.value = false;
    showButton2.value = false;
    showButton3.value = false;
  }
  if (path === '/VR_video') {
    showNav.value = false;
  }
  title.value = newTitle;
  content.value = newContent;
  const timeline = gsap.timeline();
  timeline.to(backgroundSection.value, {
    y: '100%',
    opacity: 0,
    duration: 0.5,
  });
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
.body {
  font-family: "HelveticaNeue", sans-serif !important; 
}

.app-container {
  width: 100vw;
  height: 100vh;
  padding: 0;
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
  margin-bottom: 70px;
}

.nav-bar li:hover {
  font-weight: bold;
}

.nav-bar li.active {
  font-weight: bold;
  color: var(--link-color);
}

.Title {
  position: fixed;
  top: 0px;
  width: 100%;
  color: var(--title-color);
  z-index: 99;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px;
  margin-left: 0px;
}

.titleWrapper {
  width: 60vw;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
}

.Title h1 {
  max-width: 300px;
  line-height: 1.3;
  font-size: 40px;
}

.Title p {
  width: 400px;
  margin-top: 10px;
}

.sections {
  display: flex;
  width: 100vw;
  height: 100vh;
  position: absolute;
  overflow-x: auto;
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
  overflow: hidden;
}

.blur {
  position: absolute;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(0px);
  z-index: 98;
  transition: backdrop-filter 1s ease;
}

.gradient-div {
  width: 100%;
  height: 20%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: linear-gradient(to top, var(--start-color), transparent);
  z-index: 99;
}

.gradient-div1 {
  width: 15%;
  height: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: linear-gradient(to right, var(--end-color), transparent);
  z-index: 99;
}

.text-div {
  width: 100px;
  height: 20%;
  position: fixed;
  top: 0;
  right: 10vw;
  color: aliceblue;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
}

.jump-button {
  position: absolute;
  left: 50%;
  bottom: 6%;
  transform: translateX(-50%);
  z-index: 1000001;
  opacity: 40%;
}

.sections::-webkit-scrollbar {
  display: none;
}

.sections {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@font-face {
  font-family: "HelveticaNeue";
  src: url('/fonts/HelveticaNeue.ttc') format('ttc');
  font-weight: normal;
  font-style: normal;
}

.spaced-text {
  display: inline-block;
  padding-left: 100px;
}
</style>
