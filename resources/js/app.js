import { computed, createApp } from 'vue';
import './bootstrap'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './router/routes';
import App from '../js/pages/App.vue'
import 'flowbite';
import '../css/index.css'
import store from './store';

const router = createRouter({
    history: createWebHistory(),
    routes,
});


createApp(App).use(store).use(router).mount('#app')
