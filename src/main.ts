import { createApp } from 'vue'
import App from './App.vue'

import './scss/app.scss';

import router from './router';
import './router/before-each-guard';

import { pinia } from './stores';


createApp(App).use(pinia).use(router).mount('#app')
