import VueRouter from "vue-router";
import axios from "axios";
import Vue from "vue";


export const router =  new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            component: () => import('../pages/Home.vue'),
        },
        {
            path: '/user',
            component:() => import('../pages/LoginAndRegister.vue'),
            redirect: 'login',
            children:[{
                path: 'login',
                component: () => import('../components/Login.vue')
            },{
                path: 'register',
                component: () => import('../components/Register.vue')
            }]
        }
    ]

})
router.beforeEach((to, from, next) => {
    if (to.path === '/user/login' || to.path === '/user/register') {
        next();
    } else {
        axios.get('/api/user/info').then((res) => {
            if (res.data.code === 200) {
                next();
            } else {
                let that = Vue.prototype;
                next('/user/login');
                that.$message.error({
                    message: '请先登录',
                    type: 'error'
                })
            }
        }).catch((err) => {
            next('/user/login');
        })
    }
 });

router.onError((error) => {
    // 防IE缓存导致找不到js文件
    const pattern = /Loading chunk \d+ failed/g
    const isChunkLoadFailed = error.message.match(pattern)
    if (isChunkLoadFailed) {
        // 用路由的replace方法，并没有相当于F5刷新页面，失败的js文件并没有从新请求，会导致一直尝试replace页面导致死循环，而用 location.reload 方法，相当于触发F5刷新页面，虽然用户体验上来说会有刷新加载察觉，但不会导致页面卡死及死循环，从而曲线救国解决该问题
        location.reload()
        // const targetPath = $router.history.pending.fullPath;
        // $router.replace(targetPath);
    }
})