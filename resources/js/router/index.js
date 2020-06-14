import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// const Home = () => import('../views/Home.vue')
const Calendar = () => import('../views/Calendar.vue')

const routes = [
    {
        path: '*',
        name: 'Invalid',
        redirect: '/calendar'
    },
    // {
    //     path: '/',
    //     name: 'Home',
    //     component: Home
    // },
    {
        path: '/calendar',
        name: 'Calendar',
        component: Calendar
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
