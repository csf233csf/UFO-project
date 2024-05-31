<template>
    <div>
      <div class="indicator"></div>
      <nav>
        <div>
          <div class="svg-container">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
          </div>
          <!-- 这一块是左上角的title -->
          <div>Globe Express</div>
        </div>
        <div>
          <div class="active">Home</div>
          <div>Holidays</div>
          <div>Destinations</div>
          <div>Flights</div>
          <div>Offers</div>
          <div>Contact</div>
          <div class="svg-container">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <div class="svg-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </nav>
  
      <div id="demo">
        <div v-for="(card, index) in data" :key="index" class="card" :id="'card' + index" :style="{ backgroundImage: 'url(' + card.image + ')' }"></div>
        <div v-for="(card, index) in data" :key="index" class="card-content" :id="'card-content-' + index">
          <div class="content-start"></div>
          <div class="content-place">{{ card.place }}</div>
          <div class="content-title-1">{{ card.title }}</div>
          <div class="content-title-2">{{ card.title2 }}</div>
        </div>
      </div>
  
      <div id="slide-numbers">
        <div v-for="(card, index) in data" :key="index" class="item" :id="'slide-item-' + index">{{ index + 1 }}</div>
      </div>
  
      <div class="pagination" id="pagination">
        <div class="arrow arrow-left">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>
        <div class="arrow arrow-right">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
        <div class="progress-sub-container">
          <div class="progress-sub-background">
            <div class="progress-sub-foreground"></div>
          </div>
        </div>
        <div class="slide-numbers" id="slide-numbers"></div>
      </div>
  
      <div id="details-even" class="details">
        <div class="text"></div>
        <div class="title-1"></div>
        <div class="title-2"></div>
        <div class="desc"></div>
        <div class="cta"></div>
      </div>
      <div id="details-odd" class="details">
        <div class="text"></div>
        <div class="title-1"></div>
        <div class="title-2"></div>
        <div class="desc"></div>
        <div class="cta"></div>
      </div>
  
      <div class="cover"></div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, nextTick } from 'vue';
  import gsap from 'gsap';
  
  export default {
    name: 'App',
    setup() {
      const data = ref([
        {
          place: "Switzerland Alps",
          title: "SAINT",
          title2: "ANTONIEN",
          description: "Tucked away in the Switzerland Alps, Saint Antönien offers an idyllic retreat for those seeking tranquility and adventure alike. It's a hidden gem for backcountry skiing in winter and boasts lush trails for hiking and mountain biking during the warmer months.",
          image: "https://assets.codepen.io/3685267/timed-cards-1.jpg"
        },
        {
          place: "Japan Alps",
          title: "NANGANO",
          title2: "PREFECTURE",
          description: "Nagano Prefecture, set within the majestic Japan Alps, is a cultural treasure trove with its historic shrines and temples, particularly the famous Zenkō-ji. The region is also a hotspot for skiing and snowboarding, offering some of the country's best powder.",
          image: "https://assets.codepen.io/3685267/timed-cards-2.jpg"
        },
        {
          place: "Sahara Desert - Morocco",
          title: "MARRAKECH",
          title2: "MEROUGA",
          description: "The journey from the vibrant souks and palaces of Marrakech to the tranquil, starlit sands of Merzouga showcases the diverse splendor of Morocco. Camel treks and desert camps offer an unforgettable immersion into the nomadic way of life.",
          image: "https://assets.codepen.io/3685267/timed-cards-3.jpg"
        },
        {
          place: "Sierra Nevada - USA",
          title: "YOSEMITE",
          title2: "NATIONAL PARAK",
          description: "Yosemite National Park is a showcase of the American wilderness, revered for its towering granite monoliths, ancient giant sequoias, and thundering waterfalls. The park offers year-round recreational activities, from rock climbing to serene valley walks.",
          image: "https://assets.codepen.io/3685267/timed-cards-4.jpg"
        },
        {
          place: "Tarifa - Spain",
          title: "LOS LANCES",
          title2: "BEACH",
          description: "Los Lances Beach in Tarifa is a coastal paradise known for its consistent winds, making it a world-renowned spot for kitesurfing and windsurfing. The beach's long, sandy shores provide ample space for relaxation and sunbathing, with a vibrant atmosphere of beach bars and cafes.",
          image: "https://assets.codepen.io/3685267/timed-cards-5.jpg"
        },
        {
          place: "Cappadocia - Turkey",
          title: "Göreme",
          title2: "Valley",
          description: "Göreme Valley in Cappadocia is a historical marvel set against a unique geological backdrop, where centuries of wind and water have sculpted the landscape into whimsical formations. The valley is also famous for its open-air museums, underground cities, and the enchanting experience of hot air ballooning.",
          image: "https://assets.codepen.io/3685267/timed-cards-6.jpg"
        }
      ]);
  
      const order = ref([0, 1, 2, 3, 4, 5]);
      const detailsEven = ref(true);
  
      const offsetTop = ref(200);
      const offsetLeft = ref(700);
      const cardWidth = ref(200);
      const cardHeight = ref(300);
      const gap = ref(40);
      const numberSize = ref(50);
      const ease = ref("sine.inOut");
      const clicks = ref(0);
  
      onMounted(() => {
        loadImages().then(() => init());
      });
  
      const loadImage = (src) => {
        return new Promise((resolve, reject) => {
          let img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });
      };
  
      const loadImages = async () => {
        const promises = data.value.map(({ image }) => loadImage(image));
        return Promise.all(promises);
      };
  
      const getCard = (index) => `#card${index}`;
      const getCardContent = (index) => `#card-content-${index}`;
      const getSliderItem = (index) => `#slide-item-${index}`;
  
      const animate = (target, duration, properties) => {
        return new Promise((resolve) => {
          gsap.to(target, {
            ...properties,
            duration: duration,
            onComplete: resolve
          });
        });
      };
  
      const init = async () => {
        await nextTick(); // Ensure the DOM is fully rendered before running gsap
  
        const [active, ...rest] = order.value;
        const detailsActive = detailsEven.value ? "#details-even" : "#details-odd";
        const detailsInactive = detailsEven.value ? "#details-odd" : "#details-even";
        const { innerHeight: height, innerWidth: width } = window;
        offsetTop.value = height - 430;
        offsetLeft.value = width - 830;
  
        gsap.set("#pagination", {
          top: offsetTop.value + 330,
          left: offsetLeft.value,
          y: 200,
          opacity: 0,
          zIndex: 60
        });
        gsap.set("nav", { y: -200, opacity: 0 });
  
        gsap.set(getCard(active), {
          x: 0,
          y: 0,
          width: window.innerWidth,
          height: window.innerHeight
        });
        gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
        gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
        gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
        gsap.set(`${detailsInactive} .text`, { y: 100 });
        gsap.set(`${detailsInactive} .text`, { y: 100 });
      gsap.set(`${detailsInactive} .title-1`, { y: 100 });
      gsap.set(`${detailsInactive} .title-2`, { y: 100 });
      gsap.set(`${detailsInactive} .desc`, { y: 50 });
      gsap.set(`${detailsInactive} .cta`, { y: 60 });

      gsap.set(".progress-sub-foreground", {
        width: 500 * (1 / order.value.length) * (active + 1)
      });

      rest.forEach((i, index) => {
        gsap.set(getCard(i), {
          x: offsetLeft.value + 400 + index * (cardWidth.value + gap.value),
          y: offsetTop.value,
          width: cardWidth.value,
          height: cardHeight.value,
          zIndex: 30,
          borderRadius: 10
        });
        gsap.set(getCardContent(i), {
          x: offsetLeft.value + 400 + index * (cardWidth.value + gap.value),
          zIndex: 40,
          y: offsetTop.value + cardHeight.value - 100
        });
        gsap.set(getSliderItem(i), { x: (index + 1) * numberSize.value });
      });

      gsap.set(".indicator", { x: -window.innerWidth });

      const startDelay = 0.6;

      gsap.to(".cover", {
        x: width + 400,
        delay: 0.5,
        ease: ease.value,
        onComplete: () => {
          setTimeout(() => {
            loop();
          }, 500);
        }
      });
      rest.forEach((i, index) => {
        gsap.to(getCard(i), {
          x: offsetLeft.value + index * (cardWidth.value + gap.value),
          zIndex: 30,
          delay: 0.05 * index,
          ease: ease.value,
          delay: startDelay
        });
        gsap.to(getCardContent(i), {
          x: offsetLeft.value + index * (cardWidth.value + gap.value),
          zIndex: 40,
          delay: 0.05 * index,
          ease: ease.value,
          delay: startDelay
        });
      });
      gsap.to("#pagination", { y: 0, opacity: 1, ease: ease.value, delay: startDelay });
      gsap.to("nav", { y: 0, opacity: 1, ease: ease.value, delay: startDelay });
      gsap.to(detailsActive, { opacity: 1, x: 0, ease: ease.value, delay: startDelay });
    };

    const step = () => {
      return new Promise((resolve) => {
        order.value.push(order.value.shift());
        detailsEven.value = !detailsEven.value;

        const detailsActive = detailsEven.value ? "#details-even" : "#details-odd";
        const detailsInactive = detailsEven.value ? "#details-odd" : "#details-even";

        document.querySelector(`${detailsActive} .text`).textContent =
          data.value[order.value[0]].place;
        document.querySelector(`${detailsActive} .title-1`).textContent =
          data.value[order.value[0]].title;
        document.querySelector(`${detailsActive} .title-2`).textContent =
          data.value[order.value[0]].title2;
        document.querySelector(`${detailsActive} .desc`).textContent =
          data.value[order.value[0]].description;

        gsap.set(detailsActive, { zIndex: 22 });
        gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease: ease.value });
        gsap.to(`${detailsActive} .text`, {
          y: 0,
          delay: 0.1,
          duration: 0.7,
          ease: ease.value
        });
        gsap.to(`${detailsActive} .title-1`, {
          y: 0,
          delay: 0.15,
          duration: 0.7,
          ease: ease.value
        });
        gsap.to(`${detailsActive} .title-2`, {
          y: 0,
          delay: 0.15,
          duration: 0.7,
          ease: ease.value
        });
        gsap.to(`${detailsActive} .desc`, {
          y: 0,
          delay: 0.3,
          duration: 0.4,
          ease: ease.value
        });
        gsap.to(`${detailsActive} .cta`, {
          y: 0,
          delay: 0.35,
          duration: 0.4,
          onComplete: resolve,
          ease: ease.value
        });
        gsap.set(detailsInactive, { zIndex: 12 });

        const [active, ...rest] = order.value;
        const prv = rest[rest.length - 1];

        gsap.set(getCard(prv), { zIndex: 10 });
        gsap.set(getCard(active), { zIndex: 20 });
        gsap.to(getCard(prv), { scale: 1.5, ease: ease.value });

        gsap.to(getCardContent(active), {
          y: offsetTop.value + cardHeight.value - 10,
          opacity: 0,
          duration: 0.3,
          ease: ease.value
        });
        gsap.to(getSliderItem(active), { x: 0, ease: ease.value });
        gsap.to(getSliderItem(prv), { x: -numberSize.value, ease: ease.value });
        gsap.to(".progress-sub-foreground", {
          width: 500 * (1 / order.value.length) * (active + 1),
          ease: ease.value
        });

        gsap.to(getCard(active), {
          x: 0,
          y: 0,
          ease: ease.value,
          width: window.innerWidth,
          height: window.innerHeight,
          borderRadius: 0,
          onComplete: () => {
            const xNew = offsetLeft.value + (rest.length - 1) * (cardWidth.value + gap.value);
            gsap.set(getCard(prv), {
              x: xNew,
              y: offsetTop.value,
              width: cardWidth.value,
              height: cardHeight.value,
              zIndex: 30,
              borderRadius: 10,
              scale: 1
            });

            gsap.set(getCardContent(prv), {
              x: xNew,
              y: offsetTop.value + cardHeight.value - 100,
              opacity: 1,
              zIndex: 40
            });
            gsap.set(getSliderItem(prv), { x: rest.length * numberSize.value });

            gsap.set(detailsInactive, { opacity: 0 });
            gsap.set(`${detailsInactive} .text`, { y: 100 });
            gsap.set(`${detailsInactive} .title-1`, { y: 100 });
            gsap.set(`${detailsInactive} .title-2`, { y: 100 });
            gsap.set(`${detailsInactive} .desc`, { y: 50 });
            gsap.set(`${detailsInactive} .cta`, { y: 60 });
            clicks.value -= 1;
            if (clicks.value > 0) {
              step();
            }
          }
        });

        rest.forEach((i, index) => {
          if (i !== prv) {
            const xNew = offsetLeft.value + index * (cardWidth.value + gap.value);
            gsap.set(getCard(i), { zIndex: 30 });
            gsap.to(getCard(i), {
              x: xNew,
              y: offsetTop.value,
              width: cardWidth.value,
              height: cardHeight.value,
              ease: ease.value,
              delay: 0.1 * (index + 1)
            });

            gsap.to(getCardContent(i), {
              x: xNew,
              y: offsetTop.value + cardHeight.value - 100,
              opacity: 1,
              zIndex: 40,
              ease: ease.value,
              delay: 0.1 * (index + 1)
            });
            gsap.to(getSliderItem(i), { x: (index + 1) * numberSize.value, ease: ease.value });
          }
        });
      });
    };

    const loop = async () => {
      await animate(".indicator", 2, { x: 0 });
      await animate(".indicator", 0.8, { x: window.innerWidth, delay: 0.3 });
      gsap.set(".indicator", { x: -window.innerWidth });
      await step();
      loop();
    };

    return {
      data,
      order,
      detailsEven,
      offsetTop,
      offsetLeft,
      cardWidth,
      cardHeight,
      gap,
      numberSize,
      ease,
      clicks
    };
  }
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@500&display=swap");

$primary-color: #ecad29;
$text-color: #FFFFFFDD;

body {
  margin: 0;
  background-color: #1a1a1a;
  color: $text-color;
  position: relative;
  overflow: hidden;
  font-family: "Inter", sans-serif;
}

.card {
  position: absolute;
  left: 0;
  top: 0;
  background-position: center;
  background-size: cover;
  box-shadow: 6px 6px 10px 2px rgba(0, 0, 0, 0.6);
}

#btn {
  position: absolute;
  top: 690px;
  left: 16px;
  z-index: 99;
}

.card-content {
  position: absolute;
  left: 0;
  top: 0;
  color: $text-color;

  padding-left: 16px;
}

.content-place {
  margin-top: 6px;
  font-size: 13px;
  font-weight: 500;
}
.content-place {
  font-weight: 500;
}

.content-title-1,
.content-title-2 {
  font-weight: 600;
  font-size: 20px;
  font-family: "Oswald", sans-serif;
}

.content-start {
  width: 30px;
  height: 5px;
  border-radius: 99px;
  background-color: $text-color;
}

.details {
  z-index: 22;
  position: absolute;
  top: 240px;
  left: 60px;

  .place-box {
    height: 46px;

    overflow: hidden;
    .text {
      padding-top: 16px;
      font-size: 20px;

      &:before {
        top: 0;
        left: 0;
        position: absolute;
        content: "";
        width: 30px;
        height: 4px;
        border-radius: 99px;
        background-color: white;
      }
    }
  }

  .title-1,
  .title-2 {
    font-weight: 600;
    font-size: 72px;
    font-family: "Oswald", sans-serif;
  }
  .title-box-1,
  .title-box-2 {
    margin-top: 2px;
    height: 100px;
    overflow: hidden;
    // background-color: blue;
  }
  > .desc {
    margin-top: 16px;
    width: 500px;
  }
  > .cta {
    width: 500px;
    margin-top: 24px;
    display: flex;
    align-items: center;
    > .bookmark {
      border: none;
      background-color: $primary-color;
      width: 36px;
      height: 36px;
      border-radius: 99px;
      color: white;
      display: grid;
      place-items: center;
      svg {
        width: 20px;
        height: 20px;
      }
    }
    > .discover {
      border: 1px solid #ffffff;
      background-color: transparent;
      height: 36px;
      border-radius: 99px;
      color: #ffffff;
      padding: 4px 24px;
      font-size: 12px;
      margin-left: 16px;
      text-transform: uppercase;
    }
  }
}

nav {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 36px;
  font-weight: 500;
  svg {
    width: 20px;
    height: 20px;
  }
  .svg-container {
    width: 20px;
    height: 20px;
  }

  > div {
    display: inline-flex;
    align-items: center;
    text-transform: uppercase;
    font-size: 14px;
    &:first-child {
      gap: 10px;
    }
    &:last-child {
      gap: 24px;

      > .active {
        position: relative;
        &:after {
          bottom: -8px;
          left: 0;
          right: 0;
          position: absolute;
          content: "";
          height: 3px;
          border-radius: 99px;
          background-color: $primary-color;
        }
      }
    }
  }
}
.indicator {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 5px;
  z-index: 60;
  background-color: $primary-color;
}

.pagination {
  position: absolute;
  left: 0px;
  top: 0px;
  display: inline-flex;

  > .arrow {
    z-index: 60;
    width: 50px;
    height: 50px;
    border-radius: 999px;
    border: 2px solid #ffffff55;
    display: grid;
    place-items: center;
    &:nth-child(2){
      margin-left: 20px;
    }
    svg {
      width: 24px;
      height: 24px;
      stroke-width: 2;
      color: #ffffff99;
    }
  }

  .progress-sub-container{
    margin-left: 24px;
    z-index: 60;
    width: 500px;
    height: 50px;
    display: flex;
    align-items: center;
    .progress-sub-background{
      width: 500px;
      height: 3px;
      background-color: #ffffff33;
      .progress-sub-foreground{
      height: 3px;
      background-color: $primary-color;
      }
    }
  }

  .slide-numbers{
    width: 50px;
    height: 50px;
    overflow: hidden;
    // background-color: #111111;
    z-index: 60;
    position: relative;
  
    .item{
      width: 50px;
      height: 50px;
      position: absolute;
      // background: rgb(31, 31, 41);
      color: white;
      top: 0;
      left: 0;
      display: grid;
      place-items: center;
      font-size: 32px;
      font-weight: bold;
    }
  }
}


.cover{
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  z-index: 100;
}
</style>
     
  