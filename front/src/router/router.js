import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import SignIn from '../views/SigninView.vue'
import PostView from "@/views/PostView.vue";
import PostCreateView from "@/views/PostCreateView.vue";
import store from "@/store";

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
    {
        path: '/post/:id',
        name: 'PostView',
        component: PostView
    },
    {
        path: '/post',
        name: 'PostCreateView',
        component: PostCreateView,
        meta: { requiresAuth: true }
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.getUserLogin) {
            next({ path: '/signin' });
        } else {
            next(); // Proceed to route
        }
    } else {
        next(); // Make sure to always call next()
    }
});
export default router
