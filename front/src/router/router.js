import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import SignIn from '../views/SigninView.vue'

const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: Home
    },
    {
        path: '/signin',
        name: 'SigninView',
        component: SignIn
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
