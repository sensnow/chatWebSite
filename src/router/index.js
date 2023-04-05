import VueRouter from "vue-router";


export default new VueRouter({
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
            component:() => import('../pages/Home.vue')

        }
    ]

})