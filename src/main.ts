import { createApp } from 'vue';
import App from './App.vue';

import 'swiper/css';
import 'swiper/css/navigation';
import './style/index.css';

import router from './router';
import './router/before-each-guard';

import { pinia } from './stores';

createApp(App).use(pinia).use(router).mount('#app');
