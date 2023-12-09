import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';


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
      component: () => import('@/views/UploadPostView.vue'),
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
      path: '/adDetail/:id',
      name: 'adDetail',
      component: () => import('@/views/AdDetail.vue'),

    },
    {
      path: '/adsCategory/:id',
      name: 'adsCategory',
      component: () => import('@/views/AdsCategoryView.vue'),
    },
    {
      path: '/controlPanel',
      name: 'controlPanel',
      component: () => import('@/views/ControlPanel.vue'),
    },
    {
      path: '/postsList',
      name: 'postsList',
      component: () => import('@/views/PostsListView.vue'),
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
      path: '/searchResults',
      name: 'searchResults',
      component: () => import('../views/SearchedResultsView.vue')
    },
    {
      path: '/updatePost',
      name: 'updatePost',
      component: () => import('@/views/UpdatePostView.vue'),
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
      path: '/editUserData',
      name: 'editUserData',
      component: () => import('@/views/EditUserData.vue')
    },
    {
      path: '/vendor/:id',
      name: 'vendor',
      component: () => import('@/views/VendorView.vue'),
      props: route => ({ ...route.params, id: parseInt(route.params.id as string) })
    }
  ]
})

export default router
