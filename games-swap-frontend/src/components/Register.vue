<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { VueFinalModal } from 'vue-final-modal';
import { useAuthStore } from "@/stores/auth";

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const authStore = useAuthStore();

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

const sendData = () => {
  fetch("http://localhost:8080/users/register", {
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
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      //authStore.setToken() TODO
      //localStorage.setItem("id", JSON.stringify(data[1]));
    })
    .catch(error => console.error(error))
}

</script>

<template>
  <VueFinalModal class="confirm-modal" content-class="confirm-modal-content" overlay-transition="vfm-fade"
    content-transition="vfm-fade">
    <form @submit.prevent="sendData()">
      <h1>DATE DE ALTA</h1>

      <input v-model="formData.username" type="name" name="name" id="name" placeholder="Nombre">
      <input v-model="formData.email" type="email" name="email" id="email" placeholder="Correo">
      <input v-model="formData.password" type="password" name="password" id="password" placeholder="Contraseña">
      <input v-model="formData.password2" type="password" name="password2" id="password2" placeholder="Repite contraseña">

      <div class="terms">
        <input v-model="formData.checkbox" type="checkbox" name="conditions" id="conditions-text">
        <label for="conditions" id="conditions">He leído y acepto las <u>Condiciones de uso</u> y la <u>Política de
            privacidad de GameSwap</u>.
          Ver +info sobre protección de datos</label>
      </div>
      <button type="submit">REGISTRARSE </button>
    </form>
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
  margin-bottom: 2rem;
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