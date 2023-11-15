<script setup lang="ts">
import { useModal } from 'vue-final-modal';
import { RouterLink, useRouter } from "vue-router";
import LoginModal from './Login.vue';
import RegisterModal from './Register.vue';
import { ref } from 'vue';
import PostListIcon from './Icons/PostListIcon.vue';
import PostUploadIcon from './Icons/PostUploadIcon.vue';

import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();

const { open, close } = useModal({
  component: LoginModal,
  attrs: {
    onConfirm() {
      close()
    },
    onCancel() {
      close()
      openRegister()
    },
  }
})

const { open: openRegister, close: closeRegister } = useModal({
  component: RegisterModal,
  attrs: {
    onConfirm() {
      closeRegister()
    },
    onCancel() {
      closeRegister()
    },
  }
})

const logOut = () => {
  authStore.deleteToken();
  router.push("/");
}

</script>
<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="row container-fluid d-flex align-items-center">
      <div class="d-flex col-12 col-md-9 align-items-center justify-content-center justify-content-md-start">
        <div>
          <img class="logo-app d-block overflow-hidden w-100" src="/imgs/logo-app-2.png" alt="logo" />
        </div>

        <router-link class="logo ms-2 font-weight-bold" to="/">GAMESWAP</router-link>
      </div>

      <div class="col-md-3 d-sm-none d-md-flex navbar-nav mb-2 justify-content-end">
        <button v-if="!authStore.userIsLoggedIn" class="button access" @click="open">Acceder</button>
        <router-link to="/profileManagement" role="button" class="button access"
          v-if="authStore.userIsLoggedIn">Configuración
          Perfil</router-link>
        <router-link to="/protected/uploadPost" v-if="authStore.userIsLoggedIn">
          <PostUploadIcon></PostUploadIcon>
        </router-link>
        <router-link v-if="authStore.userIsLoggedIn" to="/postsList">
          <PostListIcon></PostListIcon>
        </router-link>
        <button @click="logOut" v-if="authStore.userIsLoggedIn">Cerrar sesión</button>

      </div>
    </div>
  </nav>
</template>
<style scoped>
@media (max-width: 568px) {
  .button {
    display: none;
  }
}

nav {
  border-bottom: 0.2px solid #e4e1e1;
  padding: 5px 20px 5px 20px;
  background-color: white !important;
  position: sticky;
  top: 0px;
  z-index: 10;
}

nav .logo {
  color: #9f87f5;
  font-size: 2.5rem;
}

.access {
  margin-top: 5px;
}

.logo {
  font-size: 30px;
}

.logo-app {
  height: 50px;
  min-height: 50px;
  min-width: 50px;
}

/* header {
    line-height: 1.5;
    max-height: 100vh;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
    }
} */
</style>
