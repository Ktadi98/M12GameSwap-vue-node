<script setup lang="ts">
import { useModal } from 'vue-final-modal';
import { useRouter } from "vue-router";
import LoginModal from './Login.vue';
import RegisterModal from './Register.vue';
import { ref } from 'vue';
import PostListIcon from './Icons/PostListIcon.vue';
import PostUploadIcon from './Icons/PostUploadIcon.vue';
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();
const showDropdown = ref(false);

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
});

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
});

const logOut = () => {
  authStore.deleteToken();
  router.push("/");
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

</script>

<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid d-flex align-items-center">
      <div class="d-flex col-12 col-md-9 align-items-center justify-content-center justify-content-md-start">
        <img class="logo-app" src="/imgs/logo-app-2.png" alt="logo" />
        <router-link class="logo ms-2 font-weight-bold" to="/">GAMESWAP</router-link>
      </div>

      <div class="col-md-3 d-sm-none d-md-flex navbar-nav mb-2 justify-content-end">
        <router-link v-if="authStore.userIsLoggedIn" class="uploadPost" to="/protected/uploadPost">
          <PostUploadIcon></PostUploadIcon>
        </router-link>

        <div class="profile-link" v-if="authStore.userIsLoggedIn">
          <div class="profile-info" @click="toggleDropdown">
            <div class="profile-image">
              <img src="@/assets/avatar-profile.svg" alt="Profile Image">
            </div>
          </div>
          <div class="dropdown" v-show="showDropdown">
            <router-link to="/editProfile">Editar perfil</router-link>
            <router-link to="/">Mis anuncios</router-link>
            <div @click="logOut">Cerrar sesión</div>
          </div>
        </div>
        <button v-if="!authStore.userIsLoggedIn" class="button access" @click="open">Acceder</button>
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
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: 0;
  align-items: center;
}

.logo-app {
  max-height: 50px;
}

.logo {
  color: #9f87f5;
  font-size: 2rem; /* Ajustar tamaño del logo */
  margin-right: 10px; /* Añadido margen para separar el logo del nombre */
}

.profile-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: auto; /* Mueve el perfil a la derecha */
}

.profile-info:hover .profile-image img {
  border: 2px solid #745cf3;
}

.profile-image img {
  width: 40px; /* Ajustar tamaño de la imagen del perfil */
  height: 40px;
  border-radius: 50%;
  transition: border 0.3s ease;
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  display: none;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-link:hover .dropdown {
  display: block;
}

.dropdown a, .dropdown div {
  padding: 8px;
  color: #333;
  text-decoration: none;
  display: block;
  transition: background-color 0.3s ease;
}

.dropdown a:hover, .dropdown div:hover {
  background-color: #f0f0f0;
}

.button.access, .uploadPost {
  background-color: #745cf3;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button.access:hover, .uploadPost:hover {
  background-color: #5538a1;
}
</style>


