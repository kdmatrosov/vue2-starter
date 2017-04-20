import Vue from 'vue';
import Router from 'vue-router';
import Test from '@/components/Test.vue';
import NotFoundComponent from '@/common/NotFoundComponent.vue';
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/404', component: NotFoundComponent
        },
        {
            path: '/',
            name: 'index',
            component: Test
        },
        {
            path: '*', redirect: '/404'
        }
    ]
})
