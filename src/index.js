import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import rest from './rest';
import axios from 'axios';
import "./styles/main.pcss";


Vue.prototype.$http = rest;
Vue.prototype.axios = axios;

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: {App}
});

