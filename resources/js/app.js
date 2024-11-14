import { computed, createApp } from 'vue';
import './bootstrap'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './router/routes';
import App from '../js/pages/App.vue'
import 'flowbite';
import '../css/index.css'
import store from './store';
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css';


const vuetify = createVuetify({
    components,
    directives,
  })

const router = createRouter({
    history: createWebHistory(),
    routes,
});


createApp(App).use(store).use(router).use(vuetify).mount('#app')
