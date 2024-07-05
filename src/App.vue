<template>
  <div id="loading-screen" class="loading-screen" v-if="isLoading">
    <div class="spinner">
      The Internet is a little slow. Let's watch the dance!
    </div>
    <video autoplay loop muted class="loading-video">
      <source src="/images/loading1.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
  <div>
    <div v-show="route.path !== '/VR_video' || !isLoading">
      <v-btn variant="plain" icon="mdi-chevron-double-down" class="jump-button" v-if="showButton1" @click="
        jumptonextpage(
          '/alien_doc',
          'Workshop Co-Creating Alien Communities',
          'Organise the stories and images of aliens that people in the workshop have about the alien community into an archive format.'
        )
        ">
           Click to See More
        <v-icon
        down
      >
      mdi-chevron-double-down
      </v-icon>
      </v-btn>
      <v-btn variant="plain" icon="mdi-chevron-double-down" class="jump-button" v-if="showButton2" @click="
        jumptonextpage(
          '/gallery',
          'Spaceship Collection',
          'Upload your UFO lights found in the city.'
        )
        ">
        Click to See More
        <v-icon
        down
      >
      mdi-chevron-double-down
      </v-icon>
      </v-btn>
      <v-btn :ripple="true" variant="plain" icon="mdi-chevron-double-down" class="jump-button" v-if="showButton3"
        @click="jumptonextpage('/VR_video', '', '')">
        Click to See More
        <v-icon
        down
      >
      mdi-chevron-double-down
      </v-icon>
      </v-btn>
      <div v-if="showNav" class="gradient-div"></div>
      <div class="gradient-div1"></div>
      <div class="Title">
        <div class="titleWrapper">
          <h1>{{ title }}</h1>
          <p>{{ content }}</p>
        </div>
      </div>
      <div v-if="showNav && route.path ==='/'" class="nav-bar">
        <ul>
          <li :class="{ active: activeLink === 1 }" @click="scrollToSection(0)">
            01 <br /><br /><span class="spaced-text">PROJECTS</span>
          </li>
          <li :class="{ active: activeLink === 2 }" @click="scrollToSection(1)">
            02 <br /><br /><span class="spaced-text">AR</span>
          </li>
          <li :class="{ active: activeLink === 3 }" @click="scrollToSection(2)">
            03 <br /><br /><span class="spaced-text">WORKSHOP</span>
          </li>
          <li :class="{ active: activeLink === 4 }" @click="scrollToSection(3)">
            04 <br /><br /><span class="spaced-text">VR</span>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <div>
        <div class="app-container" v-if="showSections" ref="backgroundSection">
          <!-- <div ref="threeContainer" class="three-container"></div> -->
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
      </div>
      <router-view v-show="route.path !== '/' || !isLoading"></router-view>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {
  nextTick,
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  provide,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import page0 from "./components/main_sections/mainentry.vue";
import page1 from "./components/main_sections/phonespage.vue";
import page3 from "./components/main_sections/virtualreality.vue";
import Cardgallery from "./components/main_sections/pic_scroll.vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const sections = ref<HTMLElement | null>(null);
const route = useRoute();
const router = useRouter();
const showSections = computed(() => route.path === "/");

const startColor = ref("#52FF00");
const endColor = ref("transparent");
const linkColor = ref("transparent");
const titleColor = ref("#FF00F5");

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
const loading = ref(true);
const modelAngle = ref(0);
const isLoading = ref(true);

let title = ref("");
let content = ref("");

function changeTitle(newTitle: string, newContent: string, color: string) {
  title.value = newTitle;
  content.value = newContent;
  titleColor.value = color;
  document.documentElement.style.setProperty("--title-color", titleColor.value);
}

const updateGradient = () => {
  document.documentElement.style.setProperty("--start-color", startColor.value);
  document.documentElement.style.setProperty("--end-color", endColor.value);
  document.documentElement.style.setProperty("--link-color", linkColor.value);
};

watch([startColor, endColor, linkColor], updateGradient, { immediate: true });

const scrollProgress = ref(0);
const previousColor = ref(startColor.value);
const previousColor2 = ref(endColor.value);
const previousColor3 = ref(linkColor.value);

const changeColor = (
  startColorValue: string,
  endColorValue: string,
  linkColorValue: string,
  page: number
) => {
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
  if (scrollProgress.value < 15) {
    gsap.to(blurDiv0.value, { filter: "blur(0px)", duration: 1 });
    gsap.to(blurDiv1.value, { filter: "blur(0px)", duration: 1 });
    gsap.to(blurDiv2.value, { filter: "blur(0px)", duration: 1 });
    gsap.to(blurDiv3.value, { filter: "blur(0px)", duration: 1 });
  } else if (scrollProgress.value >= 15 && scrollProgress.value < 35) {
    gsap.to(blurDiv0.value, { filter: "blur(10px)", duration: 1 });
    gsap.to(blurDiv1.value, { filter: "blur(0px)", duration: 1 });
    gsap.to(blurDiv2.value, { filter: "blur(0px)", duration: 1 });
    gsap.to(blurDiv3.value, { filter: "blur(0px)", duration: 1 });
  } else if (scrollProgress.value >= 35 && scrollProgress.value < 50) {
    gsap.to(blurDiv0.value, { filter: "blur(0px)", duration: 1 });
    gsap.to(blurDiv1.value, { filter: "blur(0px)", duration: 1 });
    gsap.to(blurDiv2.value, { filter: "blur(0px)", duration: 1 });
    gsap.to(blurDiv3.value, { filter: "blur(0px)", duration: 1 });
  } else if (scrollProgress.value >= 50 && scrollProgress.value < 60) {
    gsap.to(blurDiv0.value, { filter: "blur(0px)", duration: 1 });
    gsap.to(blurDiv1.value, { filter: "blur(10px)", duration: 1 });
    gsap.to(blurDiv2.value, { filter: "blur(0px)", duration: 1 });
    gsap.to(blurDiv3.value, { filter: "blur(0px)", duration: 1 });
  } else if (scrollProgress.value >= 60 && scrollProgress.value < 80) {
    gsap.to(blurDiv0.value, { filter: "blur(0px)", duration: 1 });
    gsap.to(blurDiv1.value, { filter: "blur(0px)", duration: 1 });
    gsap.to(blurDiv2.value, { filter: "blur(0px)", duration: 1 });
    gsap.to(blurDiv3.value, { filter: "blur(0px)", duration: 1 });
  } else if (scrollProgress.value >= 80 && scrollProgress.value < 100) {
    gsap.to(blurDiv0.value, { filter: "blur(0px)", duration: 1 });
    gsap.to(blurDiv1.value, { filter: "blur(0px)", duration: 1 });
    gsap.to(blurDiv2.value, { filter: "blur(10px)", duration: 1 });
    gsap.to(blurDiv3.value, { filter: "blur(0px)", duration: 1 });
  }
  if (scrollProgress.value >= 0 && scrollProgress.value < 25) {
    showButton1.value = false;
    showButton2.value = false;
    showButton3.value = false;
    changeColor("transparent", "#5F004A", "#FF00C7", 1);
    changeTitle(
      "",
      "",
      "#FF00F5"
    );
  } else if (scrollProgress.value >= 25 && scrollProgress.value < 50) {
    showButton1.value = false;
    showButton2.value = true;
    showButton3.value = false;
    changeColor("#52FF00", "transparent", "#52FF00", 2);
    changeTitle(
      "AR Search for \u200b \u200b \u200b \u200b \u200b\u200b \u200b \u200b \u200b \u200b\u200b \u200b \u200b \u200b \u200b\u200b  Urban Legends",
      "Posting small adverts on the streets of Beijing's CBD to engage audiences in the search for urban alien legends.",
      "#52FF00"
    );
    gsap.to(blurDiv3.value, { filter: "blur(0px)", duration: 1 });
  } else if (scrollProgress.value >= 50 && scrollProgress.value < 75) {
    showButton1.value = true;
    showButton2.value = false;
    showButton3.value = false;
    changeColor("#00FFFF", "transparent", "#00FFFF", 3);
    changeTitle(
      "Workshop Co-Creating Alien Communities",
      "Workshop brings together-audiences that use their imaginations to fabricate images of aliens to create community stories.",
      "#00FFFF"
    );
  } else if (scrollProgress.value >= 75) {
    showButton1.value = false;
    showButton2.value = false;
    showButton3.value = true;
    changeColor("#FFF72E", "transparent", "#FFF72E", 4);
    changeTitle(
      "Immersive VR OfflineExhibition",
      "Offline exhibitions allow for a more immersive experience of the joy of creation and the viewing of co-constructed utopian communities.",
      "#FFF72E"
    );
  }
};

function changep6() {
  changeColor("#00FFFF", "transparent", "#00FFFF", 3);
  changeTitle(
    "Extraterrestrial file",
    "Organise the stories and images of aliens that people in the workshop have about the alien community into an archive format.",
    "#00FFFF"
  );
  flagleft.value = true;
}

function changep5() {
  changeColor("#52FF00", "transparent", "#52FF00", 2);
  changeTitle(
    "UFO Lighthouse \u200b \u200b \u200b \u200b \u200b\u200b \u200b \u200b \u200b \u200b\u200bPhoto Collection",
    "Upload your UFO lights found in the city.",
    "#52FF00"
  );
}

function changep4() {
  changeColor("#00FFFF", "transparent", "#00FFFF", 3);
  changeTitle(
    "Spaceship Collection",
    "The project brings such people together, helping them to bond and build an alien community where they can share stories about aliens and create an ideal utopia together.",
    "#00FFFF"
  );
}

function changea_maptitle(){
  changeColor("#00FFFF", "transparent", "#00FFFF", 3);
  changeTitle(
    "Participation in \u200b \u200b \u200b \u200b \u200b\u200b \u200b \u200b \u200b \u200b\u200b \u200b \u200b \u200b \u200b\u200bbuilding communities",
    "Join us in an online workshop to build a utopia together, you can draw your aliens and make up stories, use your imagination.",
    "#00FFFF"
  );
}

provide("changep6", changep6);
provide("changep5", changep5);
provide("changep4", changep4);
provide("changea_maptitle", changea_maptitle);

onMounted(() => {
  console.log(window.innerWidth);
  console.log("Mounted: Initial isLoading:", isLoading.value);

  setTimeout(() => {
    fadeOutLoadingScreen();
  }, 3000);

  window.addEventListener("popstate", handleBackNavigation);

  // Check localStorage for target section on page load
  const targetSection = localStorage.getItem("targetSection");
  if (targetSection !== null) {
    localStorage.removeItem("targetSection"); // Clear the stored section number
    sectionNumber.value = parseInt(targetSection, 10);
    nextTick(() => {
      const section = document.getElementById(`section${sectionNumber.value}`);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        // Set loading to false after scroll
        section.addEventListener(
          "scroll",
          () => {
            loading.value = false;
          },
          { once: true }
        );
      } else {
        loading.value = false; // If no section is found, stop loading
      }
    });
  } else {
    loading.value = false; // If no target section, stop loading
  }

  if (route.path === "/") {
    if (sections.value) {
      sections.value.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
      endColor.value = "#FF00F5";
      linkColor.value = "#FF00F5";
    }
  }
  initThreeJS();

});


const fadeOutLoadingScreen = () => {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    console.log(isLoading);
    gsap.to(loadingScreen, {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        isLoading.value = false;
        console.log(
          "fadeOutLoadingScreen: Updated isLoading:",
          isLoading.value
        ); // 更新后的值
      },
    });
  } else {
    // 如果loadingScreen没有找到，立即更新isLoading
    isLoading.value = false;
    console.log(
      "fadeOutLoadingScreen: loadingScreen not found, Updated isLoading:",
      isLoading.value
    );
  }
};

function handleBackNavigation() {
  console.log("User navigated back to this page");
  location.reload();
}

const sectionNumber = ref<number | null>(null);

const scrollToSection = async (sectionNum: number) => {
  sectionNumber.value = sectionNum;
  localStorage.setItem("targetSection", sectionNum.toString()); // Store the section number in localStorage
  if (route.path !== "/") {
    await router.push("/");
    window.location.reload(); // Reload the page
    console.log('page reloaded bc of scrolltosection')
  } else {
    // Use nextTick to wait for the DOM update
    await nextTick();

    const section = document.getElementById(`section${sectionNum}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
};

// Watch for route changes to ensure scroll happens after navigation
watch(
  () => route.path,
  async (newPath) => {
    if (newPath === "/" && sectionNumber.value !== null) {
      await nextTick();
      const section = document.getElementById(`section${sectionNumber.value}`);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
);

let curve: THREE.CubicBezierCurve3;

const initThreeJS = () => {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  const container = document.querySelector(".three-container") as HTMLElement;
  if (container) {
    renderer.setSize(700, 500);
    container.appendChild(renderer.domElement);
  }

  const light = new THREE.DirectionalLight(0xffffff, 5);
  light.position.set(0, 1, 1).normalize();
  scene.add(light);

  const loader = new GLTFLoader();
  let model: THREE.Object3D;

  loader.load(
    "/images/Queen.glb",
    function (gltf) {
      model = gltf.scene;
      model.scale.set(0.1, 0.1, 0.1);
      model.position.set(0, 0, 0);
      scene.add(model);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  camera.position.set(0, 1, 5); // 设置摄像头位置
  camera.rotation.x = THREE.MathUtils.degToRad(-10); // 向下倾斜10度

  const initialPosition = { x: 0, y: 0 };
  gsap.set(container, {
    x: initialPosition.x,
    y: initialPosition.y,
    scale: 1,
  });

  // 创建 GSAP Timeline
  const timeline = gsap.timeline({ paused: true });
  timeline.to(container, {
    duration: 1,
    x: 100,
    y: 100,
    scale: 0.5,
    onUpdate: function () {
      container.style.transform = `translate3d(${this.targets()[0].x}px, ${this.targets()[0].y}px, 0) scale(${this.targets()[0].scale})`;
    },
  })
    .to(container, {
      duration: 1,
      x: 300,
      y: 200,
      scale: 1.5,
      onUpdate: function () {
        container.style.transform = `translate3d(${this.targets()[0].x}px, ${this.targets()[0].y}px, 0) scale(${this.targets()[0].scale})`;
      },
    })
    .to(container, {
      duration: 1,
      x: 500,
      y: 100,
      scale: 1,
      onUpdate: function () {
        container.style.transform = `translate3d(${this.targets()[0].x}px, ${this.targets()[0].y}px, 0) scale(${this.targets()[0].scale})`;
      },
    })
    .to(container, {
      duration: 1,
      x: 700,
      y: 300,
      scale: 0.75,
      onUpdate: function () {
        container.style.transform = `translate3d(${this.targets()[0].x}px, ${this.targets()[0].y}px, 0) scale(${this.targets()[0].scale})`;
      },
    });

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };

  const onScroll = () => {
    const scrollLeft = sections.value!.scrollLeft || 0;
    const scrollWidth = sections.value!.scrollWidth - sections.value!.clientWidth;
    const scrollProgress = scrollLeft / scrollWidth;
    timeline.progress(scrollProgress);
  };

  sections.value!.addEventListener("scroll", onScroll);
  animate();
};

function jumptonextpage(
  path: string,
  newTitle: string = "Default Title",
  newContent: string = "Default Content"
) {
  if (path === "/page4" || "/page5" || "/alien_map") {
    showButton1.value = false;
    showButton2.value = false;
    showButton3.value = false;
  }
  if (path === "/VR_video") {
    showNav.value = false;
  }
  title.value = newTitle;
  content.value = newContent;
  const timeline = gsap.timeline();
  timeline.to(backgroundSection.value, {
    y: "100%",
    opacity: 0,
    duration: 0.5,
  });
  timeline.to(page4Div.value, {
    opacity: 1,
    y: "0%",
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
  cursor: url("/images/censor.png"), auto;
}

.three-container {
  width: 20%;
  height: 30%;
  position: absolute;
  top: 10%;
  left: 5%;
  z-index: 99;
  background: transparent;
  overflow: hidden;
  pointer-events: none;
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
  cursor: url("/images/hover.png"), auto;
}

.nav-bar li {
  padding: 10px;
  margin-bottom: 60px;
  /* font-family: 'Jeju', sans-serif; */
  font-size: 1.5rem;
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
  pointer-events: none;

}

.titleWrapper {
  width: 60vw;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
}

.Title h1 {
  max-width: 440px;
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
  z-index: 98;
}

.blur {
  position: absolute;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(0px);
  z-index: 99;
  transition: backdrop-filter 1s ease;
  pointer-events: none;
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
  z-index: 1001;
  opacity: 80%;
  color: #ffffff;
  cursor: url("/images/hover.png"), auto; 
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
  src: url("/fonts/HelveticaNeue.ttc") format("ttc");
  font-weight: normal;
  font-style: normal;
}

.spaced-text {
  display: inline-block;
  padding-left: 100px;
}

.loading-screen {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: black;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100000;
  /* filter: blur(10px); */
  backdrop-filter: blur(10px);
}

.loading-video {

  width: 30%;
  height: 30%;
  object-fit: cover;
  z-index: 1;
}

.spinner {
  color: #00ffff;
  z-index: 100001;
  font-size: 30px;
  position: relative;
  margin-bottom: 30px;
  /* font-family: 'Jeju', sans-serif; */
}
</style>
