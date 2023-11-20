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
    <div class="container-fluid d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center">
        <img class="logo-app" src="/imgs/logo-app-2.png" alt="logo" />
        <router-link class="logo ms-2 font-weight-bold" to="/">GAMESWAP</router-link>
      </div>

      <div class="d-flex align-items-center">
        <router-link v-if="authStore.userIsLoggedIn" class="nav-link" to="/protected/uploadPost">
          <PostUploadIcon></PostUploadIcon>
        </router-link>

        <div class="profile-link" v-if="authStore.userIsLoggedIn">
          <div class="profile-info" @click="toggleDropdown">
            <div class="profile-image">
              <img src="@/assets/avatar-profile.svg" alt="Profile Image">
            </div>
          </div>
          <div>
            <router-link to="/editProfile">Editar perfil</router-link>
            <router-link to="/postsList">Mis anuncios</router-link>
          <div class="dropdown" v-show="showDropdown">
            <router-link to="/profileManagement">Editar perfil</router-link>
            <router-link to="/postsList">Mis anuncios</router-link>
            <div @click="logOut">Cerrar sesión</div>
          </div>
        </div>

        <button v-if="!authStore.userIsLoggedIn" class="button access" @click="open">Acceder</button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #f8f9fa;
  /* Cambia el color de fondo según tu preferencia */
  padding: 10px;
}

.container-fluid {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-app {
  max-width: 50px;
  /* Ajusta el tamaño del logo según tus necesidades */
}

.logo {
  margin-left: 10px;
  font-weight: bold;
  text-decoration: none;
  color: #343a40;
  /* Cambia el color del texto según tu preferencia */
  font-size: 1.5rem;
  /* Ajusta el tamaño del texto según tus necesidades */
}

.navbar-nav {
  display: flex;
  align-items: center;
  gap: 10px;
}

.uploadPost {
  text-decoration: none;
  color: #007bff;
  /* Cambia el color del enlace según tu preferencia */
}

.profile-link {
  display: flex;
  align-items: center;
}

.profile-info {
  cursor: pointer;
}

.profile-image img {
  max-width: 30px;
  /* Ajusta el tamaño de la imagen del perfil según tus necesidades */
  border-radius: 50%;
  /* Añade bordes redondeados a la imagen del perfil */
}

.dropdown {
  flex-direction: column;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #ffffff;
  /* Cambia el color de fondo según tu preferencia */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  /* Añade una sombra al menú desplegable */
  z-index: 1;
  display: none;
}

.dropdown a,
.dropdown div {
  padding: 10px;
  text-decoration: none;
  color: #343a40;
  /* Cambia el color del texto según tu preferencia */
  cursor: pointer;
}

.profile-link:hover .dropdown {
  display: flex;
}

.button {
  background-color: #28a745;
  /* Cambia el color de fondo del botón según tu preferencia */
  color: #ffffff;
  /* Cambia el color del texto del botón según tu preferencia */
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button.access:hover,
.uploadPost:hover {
  background-color: #5538a1;
}</style>


