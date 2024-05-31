import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import page1 from '@/components/page1.vue'
import page2 from '@/components/page2.vue'
import page4 from '@/components/page4.vue'
import page3 from '@/components/page3.vue'
import Gallery from '@/components/Gallery.vue'
import page6 from '@/components/page6.vue'
import main from '@/App.vue'
import cardgallery from '@/components/cardgallery.vue'
import modeltest from '@/components/models/model1.vue'

// 这边修改ROUTE的路径
const routes: Array<RouteRecordRaw> = [
    {
        path:'/',
        name: 'main',
        component: main
    },
    {
        path: '/page1',
        name: 'page1',
        component: page1
    },
    {
        path: '/page2',
        name: 'page2',
        component: page2
    },
    {
        path: '/page3',
        name: 'page3',
        component: page3,
    },
    {
        path: '/page4',
        name: 'page4',
        component: page4
    },
    {
        path: '/gallery',
        name: 'page5',
        component: Gallery
    },
    {
        path: '/page6',
        name: 'page6',
        component: page6
    },
    {
        path:'/cardgallery',
        name:'cardgallery',
        component: cardgallery
    },
    // {
    //     path:'/cardgaltypescript',
    //     name:'cardgalts',
    //     component: cardgal2
    // }
    {
        path:'/modeltest',
        name:'modeltest',
        component:modeltest
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router