import Vue from 'vue'
import Router from 'vue-router'
import netlifyIdentity from 'netlify-identity-widget'

Vue.use(Router)

const PageNotFound = () => import('../components/PageNotFound.vue')
const Login = () => import('../components/auth/Login.vue')
const GuestContainer = () => import('./GuestContainer.vue')
const DefaultContainer = () => import('./DefaultContainer.vue')
const StudentsList = () => import('../components/students/StudentsList.vue')
const StudentsForm = () => import('../components/students/StudentsForm.vue')

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
            component: Login,
            meta: {
                public: true,
                onlyWhenLoggedOut: true
            }
        }],
    }, {
        path: '',
        redirect: '/students',
        component: DefaultContainer,
        children: [
            {
                path: '/students',
                name: 'StudentsList',
                component: StudentsList,
                meta: {
                    label: 'Students',
                }
            }, {
                path: '/students/add',
                name: 'StudentsAdd',
                component: StudentsForm,
                meta: {
                    label: 'Add New Student',
                }
            }, {
                path: '/students/:student',
                name: 'StudentsEdit',
                component: StudentsForm,
                props: true,
                meta: {
                    label: 'Edit Student',
                }
            }
        ],
    }, {
        path: '*',
        component: PageNotFound
    }]
});

router.beforeEach((to, from, next) => {
    netlifyIdentity.init({
        APIUrl: 'https://romantic-raman-ba0084.netlify.app/.netlify/identity'
    });

    const isPublic = to.matched.some(record => record.meta.public)
    const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)

    const loggedIn = true;

    if (! isPublic && ! loggedIn) {
        return next({
            name: 'Login'
        });
    }

    // Do not allow user to visit login page or register page if they are logged in
    if (loggedIn && onlyWhenLoggedOut) {
        return next({
            name: 'StudentsList'
        })
    }

    next();
})

export default router