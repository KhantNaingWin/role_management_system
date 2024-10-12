import { createApp } from 'vue';
import './bootstrap'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './router/routes';
import App from '../js/pages/App.vue'
import 'flowbite';
import '../css/index.css'
import store from './store';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(store).use(router).use(VueSweetalert2).mount('#app')
