<template>
  <nav class="navbar">
    <div class="container">
      <div class="logo-container">
        <template v-if="isProfileManagement">
          <!-- <router-link to="/">
            <BackArrowIcon class="back-arrow" />
          </router-link> -->
        </template>
        <template v-else>
          <img class="logo" src="/imgs/logo-app-2.png" alt="logo" />
          <router-link class="logo-text" to="/">GAMESWAP</router-link>
        </template>
      </div>
      <div class="nav-links">
        <router-link v-tooltip.bottom="'Sube un producto'" v-if="authStore.userIsLoggedIn" class="nav-link"
          to="/protected/uploadPost">
          <PostUploadIcon></PostUploadIcon>
        </router-link>
        <div v-if="authStore.userIsLoggedIn" class="profile-dropdown" @click="toggleDropdown">
          <img src="@/assets/avatar-profile.svg" alt="Profile Image" class="profile-image" />
          <div v-show="showDropdown" class="dropdown-menu">
            <router-link to="/profileManagement">Editar perfil</router-link>
            <router-link to="/postsList">Mis anuncios</router-link>
            <div @click="logOut">Cerrar sesión</div>
          </div>
        </div>

        <button v-else class="button access" @click="open">Acceder</button>
        <router-link v-tooltip.bottom="'Accede al carrito'" v-if="authStore.userIsLoggedIn" class="shopping_cart"
          to="/userProfile/reservations">
          <shoppingCart></shoppingCart>
        </router-link>

      </div>
    </div>
  </nav>
  <Divider></Divider>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useModal } from 'vue-final-modal';
import { useRouter } from "vue-router";
import LoginModal from './Login.vue';
import RegisterModal from './Register.vue';
import { useAuthStore } from "@/stores/auth";
import BackArrowIcon from "@/components/Icons/BackArrow.vue";
import PostUploadIcon from './Icons/PostUploadIcon.vue';
import Divider from 'primevue/divider';
import { usePostsHistoryStore } from '@/stores/postsHistory';
import ShoppingCart from './Icons/ShoppingCart.vue';

const authStore = useAuthStore();
const router = useRouter();
const { reset } = usePostsHistoryStore();
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
  //Clearing posts history
  reset();
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const isProfileManagement = computed(() => {
  return router.currentRoute.value.name === "profileManagement";
});


</script>

<style scoped>
.navbar {
  background-color: white;
  padding: 10px;
}

.nav-links {
  display: flex;
  gap: 10px;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  max-width: 50px;
}

.logo-text {
  margin-left: 10px;
  font-weight: bold;
  text-decoration: none;
  color: #343a40;
  font-size: 1.5rem;
}

.profile-dropdown {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.profile-image {
  max-width: 50px;
  border-radius: 50%;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
  display: none;
}



.dropdown-menu a,
.dropdown-menu div {
  padding: 10px;
  text-decoration: none;
  color: #343a40;
  cursor: pointer;
}

.dropdown-menu a {
  height: 100%;
}

.dropdown-menu a:hover,
.dropdown-menu div:hover {
  background-color: #9F87F5;
}

.profile-dropdown:hover .dropdown-menu {
  display: flex;
}

.button.access {
  background-color: #9F87F5;
  width: 5rem;
  display: flex;
  justify-content: center;

}
</style>
