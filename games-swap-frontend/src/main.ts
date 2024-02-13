//import './assets/main.css'
import 'primevue/resources/themes/lara-light-teal/theme.css'
import 'vue-final-modal/style.css';

import { createApp } from "vue";
import { createVfm } from 'vue-final-modal';
import PrimeVue from 'primevue/config'

import App from "./App.vue";
import { createPinia } from 'pinia'
import router from "./router";
import { useAuthStore } from './stores/auth';
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import Tooltip from 'primevue/tooltip';

const app = createApp(App);
const pinia = createPinia();
const vfm = createVfm();

app.use(router);

//To show tooltips when we hover on a element (global scope). 
app.directive('tooltip', Tooltip);

//We call the auth store to recover the auth state of the application (via LocalStorage) when we refresh the page. 
const storedToken = localStorage.getItem('token');
if (storedToken) {
    useAuthStore(pinia).setToken(storedToken);
    const authStore = useAuthStore();
    authStore.fetchUserData();
}

app.use(pinia);
app.use(vfm);
app.use(PrimeVue);
app.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true
});


app.mount("#app");
