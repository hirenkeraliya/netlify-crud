import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = () => import('../components/auth/Login.vue')
const GuestContainer = () => import('./GuestContainer.vue')
const PageNotFound = () => import('../components/PageNotFound.vue')

const router = new Router({
    mode: 'history',
    linkActiveClass: 'open active',
    routes: [{
        path: '/',
        redirect: '/login',
        component: GuestContainer,
        children: [{
            path: '/login',
            name: 'Login',
            component: Login
        }],
    }, {
        path: '*',
        component: PageNotFound
    }]
});

export default router