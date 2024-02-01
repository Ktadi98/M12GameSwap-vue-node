<script setup lang="ts">
import { type Ref, ref, watch } from 'vue';
import { VueFinalModal } from 'vue-final-modal';
import { useAuthStore } from "@/stores/auth";
import ErrorMessages from './ErrorMessages.vue';
import router from '@/router';
import { usePostsHistoryStore } from '@/stores/postsHistory';

const { reset } = usePostsHistoryStore();

const emit = defineEmits<{
  (e: 'confirm'): void,
  (e: 'cancel'): void
}>()

const authStore = useAuthStore();
const error: Ref<boolean> = ref(false);
const errorMessages: Ref<string[]> = ref([]);

interface LoginType {
  email: string,
  password: string,
}

const formData: Ref<LoginType> = ref({
  email: "",
  password: "",
})


interface TokenType {
  message: string,
  token: string
}

watch(formData, () => {
  formData.value.email = formData.value.email.toLowerCase();
})

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

const validateLogin = () => {
  if (
    formData.value.email.length === 0 ||
    !formData.value.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  ) {
    errorMessages.value.push("El email introducido no es válido");
    error.value = true;
  }
  if (formData.value.password.length === 0 || formData.value.password.length < 6 || formData.value.password.length > 20) {
    errorMessages.value.push("La contraseña debe tener entre 6 y 20 carácteres");
    error.value = true;
  }
}

const sendData = async () => {

  errorMessages.value = [];
  error.value = false;
  validateLogin();

  if (error.value) return;
  try {
    const response = await fetch(`${apiEndpoint}/users/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email: formData.value.email,
        password: formData.value.password
      })
    });

    if (!response.ok) {
      errorMessages.value.push("Inicio de sesión erróneo. El usuario no existe en el sistema o la contraseña es incorrecta.");
      error.value = true;
      return;
    }

    const data: TokenType = await response.json();

    console.log(data);

    authStore.setToken(data.token);

    emit("confirm");

    //Clearing posts history
    reset();

    //ADMIN CREDENTIALS
    //Username: admin, Correu: admin@gmail.com, Contraseña:admin2023
    if (formData.value.email === "admin@gmail.com") {
      authStore.isAdmin = true;
      router.push("/controlPanel");
    }
    else {
      router.push("/");
    }

  } catch (err) {
    errorMessages.value.push("Ha habido un problema con el servidor. Por favor, inténtalo más tarde.");
  }
}
</script>

<template>
  <VueFinalModal class="confirm-modal" content-class="confirm-modal-content" overlay-transition="vfm-fade"
    content-transition="vfm-fade">
    <form @submit.prevent="sendData()">
      <h1>INICIO SESIÓN</h1>
      <input v-model.trim="formData.email" type="email" name="email" id="email" placeholder="Correo">
      <input v-model.trim="formData.password" type="password" name="password" id="password" placeholder="Contraseña">
      <button>ENTRAR</button>
    </form>
    <button class="register-btn" @click="emit('cancel')">¿No tienes cuenta? Regístrate</button>
    <ErrorMessages :messages="errorMessages"></ErrorMessages>
  </VueFinalModal>
</template>

<style>
.confirm-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}

.confirm-modal-content {
  display: flex;
  flex-direction: column;
  border-radius: 27px;
  border: 1px solid var(--Color-3, #000);
  background: var(--Color, #F6F6F6);
  padding: 2rem;
  width: 507px;
  height: 438px;

  /*Scrollable content*/
  max-height: calc(100vh - 210px);
  overflow-y: auto;

}

.dark .confirm-modal-content {
  background: #000;
}

h1 {
  color: #9F87F5;
  text-align: center;
  font-family: Roboto;
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

form {
  display: flex;
  flex-direction: column;
}

form input {
  border-radius: 29px;
  border: 3px solid #9F87F5;
  background: #F6F6F6;
  padding: 1rem;
  margin-bottom: 50px;
}

form input #placeholder {
  color: #D3D3D3;
}

button {
  background-color: #9F87F5;
  color: white;
  width: 70%;
  margin: 0 auto;
}

button.register-btn {
  margin-top: 1rem;
  background-color: transparent;
  color: #a2a2a2;
  text-decoration: underline;
  border: none;
}

button.register-btn:hover {
  color: #000;
}
</style>
