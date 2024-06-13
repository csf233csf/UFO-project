<template>
    <div class="wrapper">
        <div class="tickerContainer">
            <div class="ticker">
                <div>
                    <span>AR Search for Urban Legends/ Workshop Co-Creating Alien Communities/ Immersive VR Offline
                        Exhibition/ VR Online Exhibition/
                        AR Search for Urban Legends/ Workshop Co-Creating Alien Communities/ Immersive VR Offline
                        Exhibition/ VR Online Exhibition</span>
                    <span>AR Search for Urban Legends/ Workshop Co-Creating Alien Communities/ Immersive VR Offline
                        Exhibition/ VR Online Exhibition/
                        AR Search for Urban Legends/ Workshop Co-Creating Alien Communities/ Immersive VR Offline
                        Exhibition/ VR Online Exhibition</span>
                </div>
            </div>
        </div>

        <div class="background-video-container">
            <div class="content1">
                <img src="/images/lighthouse1.png" alt="Description of the image">
                <br>The
                <br>Lighthouse
            </div>

            <video autoplay loop muted class="background-video" ref="backgroundVideo">
                <source src="/images/loading.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div class="content">
                The project brings such people together, helping them to bond and build an alien community where they
                can
                share stories about aliens and create an ideal utopia together.
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

const texts = [
    'AR Search for Urban Legends',
    'Workshop Co-Creating Alien Communities',
    'Immersive VR Offline Exhibition',
    'VR Online Exhibition'
];

import { ref, onMounted } from 'vue';

const backgroundVideo = ref<HTMLVideoElement | null>(null);

onMounted(() => {
    setVideoPlaybackRate();
    tryAutoPlay();
});

function setVideoPlaybackRate() {
    const video = document.getElementById('background-video') as HTMLVideoElement;
    if (video) {
        video.playbackRate = 0.5;
    }
}

function tryAutoPlay() {
    const video = backgroundVideo.value;
    if (video) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log('Video is playing');
                })
                .catch((error) => {
                    console.log('Video play failed', error);
                });
        }
    }
}

</script>

<style scoped>
.background-video-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    left: 0px;
    align-items: center;
    justify-content: center;
}

.scrolling-text {
    display: flex;
    white-space: nowrap;
    animation: scroll 10s linear infinite;

}

.wrapper {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

@keyframes scroll {
    from {
        transform: translateX(0%);
    }

    to {
        transform: translateX(-50%);
    }
}

body {
    margin: 0
}

.tickerContainer {
    position: absolute;
    overflow: hidden;
    width: 100vw;
    top: 0;
    z-index: 10;
}

.ticker {
    height: 6vh;
    width: 100vw;
    background-color: #000000;
    color: #ffffff;
    text-align: center;
    overflow: hidden;
    /* white-space: nowrap; */
    position: relative;
    font-size: 5vh;
}

.ticker div {
    display: inline-block;
    width: 200%;
    height: 80px;
    position: absolute;
    overflow: hidden;
    animation: ticker 20s linear infinite;
}

.ticker span {
    float: left;
    width: 100%;
}

@keyframes ticker {
    0% {
        left: 0;
    }

    100% {
        left: -100%;
    }
}


.content1 {
    height:100%;
    position: relative;
    text-align: center;
    font-size: 15vh;
    line-height: 1;
    color: #FF00F5;
    background: transparent;
    font-family: 'Jeju', sans-serif;
    pointer-events: none;
}

.content1 img{
    height:100%;
    transform:scale(1.8);
    transform-origin: center;

}

.background-video {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: translate(-50%, -50%);
    z-index: -1;
}

.content {
    position: absolute;
    top: 30vh;
    right: 30px;
    width: 20%;
    text-align: right;
    font-size: 1rem;
    color: #FF00F5;
    background: transparent;
}
</style>