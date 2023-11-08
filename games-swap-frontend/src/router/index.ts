import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import UploadPostViewVue from '@/views/UploadPostView.vue';
import AdDetail from '@/views/AdDetail.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        // Verificar si el usuario tiene un token válido
        if (authStore.userIsLoggedIn) {
          next();
        } else {
          next('/'); // Redirigir al usuario a la página de inicio 
        }
      }
    },
    {
      path: '/profileManagement',
      name: 'profileManagement',
      component: () => import('../views/ProfileManagement.vue'),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        // Verificar si el usuario tiene un token válido
        if (authStore.userIsLoggedIn) {
          next();
        } else {
          next('/'); // Redirigir al usuario a la página de inicio 
        }
      }
    },
    {
      path: '/protected/uploadPost',
      name: 'uploadPost',
      component: UploadPostViewVue,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        // Verificar si el usuario tiene un token válido
        if (authStore.userIsLoggedIn) {
          next();
        } else {
          next('/'); // Redirigir al usuario a la página de inicio 
        }
      }
    },
    {
      path: '/adsCategoryView',
      name: 'adsCategoryView',
      component: () => import('../views/AdsCategoryView.vue'),
      // beforeEnter: (to, from, next) => {
      //   const authStore = useAuthStore();
      //   // Verificar si el usuario tiene un token válido
      //   if (authStore.userIsLoggedIn) {
      //     next();
      //   } else {
      //     next('/'); // Redirigir al usuario a la página de inicio 
      //   }
      // }
    },
    {
      path: '/adDetail',
      name: 'adDetail',
      component: AdDetail,

      //     next('/home'); // Redirigir al usuario a la página de inicio 
      //   }
      // }
    }
  ]
})

export default router
