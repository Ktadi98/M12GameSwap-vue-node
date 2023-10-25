//import './assets/main.css'
import 'vue-final-modal/style.css';

import { createApp } from "vue";
import { createVfm } from 'vue-final-modal';

import App from "./App.vue";
import { createPinia } from 'pinia'
import router from "./router";


const app = createApp(App);
const pinia = createPinia();
const vfm = createVfm();

app.use(router);
app.use(pinia);
app.use(vfm);

app.mount("#app");
