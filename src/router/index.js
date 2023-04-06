import VueRouter from "vue-router";
import axios from "axios";
import Vue from "vue";


export const router =  new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () => import('../pages/LoginAndRegister.vue'),
            redirect: 'login',
            children: [
                {
                    path: 'login',
                    component: () => import('../components/Login.vue')
                },
                {
                    path: 'register',
                    component: () => import('../components/Register.vue')
                }
            ],
        },
        {
            path: '/home',
            component: () => import('../pages/Home.vue')

        }
    ]

})
router.beforeEach((to, from, next) => {
    if (to.path === '/login' || to.path === '/register') {
        next();
    } else {
        axios.get('/api/user/info').then((res) => {
            if (res.data.data !== null) {
                next();
            } else {
                console.log('未登录')
                let that = Vue.prototype;
                next('/login');
                that.$message.error({
                    message: '请先登录',
                    type: 'error'
                })
            }
        }).catch((err) => {
            next('/login');
        })
    }
});