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
      },
    },
    {
      path: '/FavoritesList',
      name: 'FavoritesList',
      component: () => import('@/views/FavoritesList.vue'),
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
      component: () => import('@/views/EditUserData.vue'),
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
      path: '/vendor/:id',
      name: 'vendor',
      component: () => import('@/views/VendorView.vue'),
      props: route => ({ ...route.params, id: parseInt(route.params.id as string) }),
      children: [
        {
          path: '',
          name: 'vendor_posts',
          component: () => import('@/views/VendorPostsView.vue'),
          props: route => ({ ...route.params, id: parseInt(route.params.id as string) })
        },
        {
          path: 'posts',
          name: 'vendor_posts',
          component: () => import('@/views/VendorPostsView.vue'),
          props: route => ({ ...route.params, id: parseInt(route.params.id as string) })
        },
        {
          path: 'reviews',
          name: 'vendor_reviews',
          component: () => import('@/views/VendorReviewsView.vue'),
          props: route => ({ ...route.params, id: parseInt(route.params.id as string) })
        }
      ]
    },
    {
      path: '/userProfile',
      name: 'user_profile',
      component: () => import('@/views/UserProfileView.vue'),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        // Verificar si el usuario tiene un token válido
        if (authStore.userIsLoggedIn) {
          next();
        } else {
          next('/'); // Redirigir al usuario a la página de inicio 
        }
      },
      children: [
        {
          path: 'purchases',
          name: 'purchases',
          component: () => import('@/views/UserPurchasesView.vue'),
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
          path: 'sells',
          name: 'sells',
          component: () => import('@/views/UserSellsView.vue'),
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
          path: 'reservations',
          name: 'reservations',
          component: () => import("@/views/UserReservations.vue"),
          beforeEnter: (to, from, next) => {
            const authStore = useAuthStore();
            // Verificar si el usuario tiene un token válido
            if (authStore.userIsLoggedIn) {
              next();
            } else {
              next('/'); // Redirigir al usuario a la página de inicio 
            }
          }
        }
      ]
    },
    {
      path: '/review/:postId',
      name: 'review',
      component: () => import('@/views/WriteReviewView.vue'),
      props: route => ({ ...route.params, ...route.query, postName: route.query.postName, postId: parseInt(route.params.id as string) }),
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
      path: '/:pathMatch(.*)*', component: () => import('../views/PageNotFound.vue')
    }
  ]
})

export default router
