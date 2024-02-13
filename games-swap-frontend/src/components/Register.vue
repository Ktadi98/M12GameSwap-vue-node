<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { VueFinalModal } from 'vue-final-modal';
import { useAuthStore } from "@/stores/auth";
import ErrorMessages from './ErrorMessages.vue';

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const authStore = useAuthStore();

const error: Ref<boolean> = ref(false);
const errorMessages: Ref<string[]> = ref([]);

interface RegisterType {
  username: string,
  email: string,
  password: string,
  password2: string,
  checkbox: boolean
}

const formData: Ref<RegisterType> = ref({
  username: "",
  email: "",
  password: "",
  password2: "",
  checkbox: false
})

interface TokenType {
  message: string,
  token: string
}

const validateRegister = () => {

  if (formData.value.username.length === 0 || formData.value.username.length < 3 || formData.value.username.length > 20) {
    errorMessages.value.push("El nombre de usuario debe tener entre 3 y 20 carácteres.");
    error.value = true;
  }
  if (
    formData.value.email.length === 0 ||
    !formData.value.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  ) {
    errorMessages.value.push("El email introducido no es válido.");
    error.value = true;
  }
  if (formData.value.password.length === 0 || formData.value.password.length < 6 || formData.value.password.length > 20) {
    errorMessages.value.push("La contraseña debe tener entre 6 y 20 carácteres.");
    error.value = true;
  }
  if (formData.value.password !== formData.value.password2) {
    errorMessages.value.push("Las constrseñas no coinciden.");
    error.value = true;
  }
  if (!formData.value.checkbox) {
    errorMessages.value.push("Debes aceptar las condiciones de uso y la Política de Provacidad.");
    error.value = true;
  }
}

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

const sendData = async () => {

  errorMessages.value = [];
  error.value = false;
  validateRegister();

  if (error.value) return;

  try {
    const response = await fetch(`${apiEndpoint}/users/register`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: formData.value.username,
        email: formData.value.email,
        password: formData.value.password
      })
    });

    if (!response.ok) {
      errorMessages.value.push("Registro inválido , el usuario ya existe.");
      error.value = true;
      return;
    }

    const data: TokenType = await response.json();

    console.log(data);

    authStore.setToken(data.token);
    emit('confirm');
  } catch (err) {
    errorMessages.value.push("Ha habido un problema con el servidor. Por favor, inténtalo más tarde.");
  }
}

</script>

<template>
  <VueFinalModal class="confirm-modal" content-class="confirm-modal-content" overlay-transition="vfm-fade"
    content-transition="vfm-fade">
    <form @submit.prevent="sendData()">
      <h1>DATE DE ALTA</h1>

      <input v-model.trim="formData.username" type="name" name="name" id="name" placeholder="Nombre" maxlength="20">
      <p>{{ formData.username.length }} / 20</p>
      <input v-model.trim="formData.email" type="email" name="email" id="email" placeholder="Correo">
      <input v-model.trim="formData.password" type="password" name="password" id="password" placeholder="Contraseña"
        maxlength="20">
      <p>{{ formData.password.length }} / 20</p>
      <input v-model.trim="formData.password2" type="password" name="password2" id="password2"
        placeholder="Repite contraseña" maxlength="20">
      <p>{{ formData.password2.length }} / 20</p>

      <div class="terms">
        <input v-model="formData.checkbox" type="checkbox" name="conditions" id="conditions-text">
        <label for="conditions" id="conditions">He leído y acepto las <u>Condiciones de uso</u> y la <u>Política de
            privacidad de GameSwap</u>.
          Ver +info sobre protección de datos</label>
      </div>
      <button type="submit">REGISTRARSE </button>
    </form>
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
  height: auto;
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
  font-size: 1.5rem;
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
  padding: 0.75rem;
  margin-bottom: 1rem;
}

form input #placeholder {
  color: #D3D3D3;
}

button {
  background-color: #9F87F5;
  color: white;
  margin: 0 auto;
  width: 70%;
}

.terms {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
</style>