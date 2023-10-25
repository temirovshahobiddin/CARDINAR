import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import InfoView from '@/views/InfoView.vue';
import ShopView from '@/views/Shop.vue';
import StoresView from '@/views/StoresView.vue';
import Login from '@/views/Login.vue';
import UserPlace from '@/views/UserPlace.vue';
import Register from '@/views/Register.vue';
import ThreeView from '@/views/Three.vue';
import Constructor from '@/views/Constructor.vue';
import VerifyOrderView from '../views/VerifyOrderView.vue';
import Contacts from '@/views/Contacts.vue';
import ResetPassword from '@/views/ResetPassword.vue';
import Logout from '@/views/Logout.vue';


Vue.use(VueRouter);

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/logout/',
        name: 'logout',
        component: Logout,
    },
    {
        path: '/login/',
        name: 'login',
        component: Login,
    },
    {
        path: '/user/',
        name: 'user',
        component: UserPlace,
        beforeEnter: (to, from, next) => {
            if (hasValidToken()) {
                next();
            } else {
                next('/login');
            }
        }
    },
    {
        path: '/register/',
        name: 'register',
        component: Register,
    },
    {
        path: '/users/reset_password/reset/:uidb/:token',
        name: 'resetpassword',
        component: ResetPassword,
    },
    {
        path: '/shop/',
        name: 'shop',
        component: ShopView,
    },

    {
        path: '/shop/:id/',
        name: 'category',
        component: ShopView,
        props: true

    },
    {
        path: '/shop/:name/',
        name: 'title',
        component: ShopView,
        props: true

    },
    {
        path: '/shop/product/:id/',
        name: 'product',
        component: InfoView,
        props: true
    },
    {
        path: '/stores/',
        name: 'stores',
        component: StoresView,
    },
    {
        path: '/three',
        name: 'three',
        component: ThreeView
    },
    {
        path: '/constructor/:id?',
        name: 'constructor',
        component: Constructor
    },
    {
        path: '/contacts',
        name: 'contacts',
        component: Contacts
    },
    {
        path: '/verify-order',
        name: 'verify-order',
        component: VerifyOrderView,
    },
];

function hasValidToken() {
    const token = localStorage.getItem('token');
    return !!token;
}
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        };
    },
});




/* ... */

export default router;