import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import page4 from '@/components/page4.vue'
import Gallery from '@/components/scroll_gallery/Gallery.vue'
import AlienMap from '@/components/alien_map/AlienMap.vue'
import maptest from '@/components/alien_map/PresetMap.vue'
import main from '@/App.vue'
import modeltest from '@/components/models/model1.vue'
import VR from '@/components/VR.vue'

// 这边修改ROUTE的路径
const routes: Array<RouteRecordRaw> = [
    // Main Page (app.vue)， src/components/main_sections
    { path: '/', name: 'main', component: main },
    // yet to see
    { path: '/page4', name: 'page4', component: page4 },
    // scroll gallery page， src/components/scroll_gallery
    { path: '/gallery', name: 'ScrollGallery', component: Gallery },
    // alien map page, src/components/alien_map
    { path: '/alien_map', name: 'AlienMap', component: AlienMap },
    { path: '/alien_doc', name:'maptest', component: maptest},
    // model test page, /models
    { path: '/modeltest', name: 'modeltest', component: modeltest},
    { path: '/VR_video', name: 'VRvideo', component: VR}
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router