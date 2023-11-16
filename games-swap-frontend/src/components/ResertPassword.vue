<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { VueFinalModal } from 'vue-final-modal';
import { useAuthStore } from "@/stores/auth";

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const authStore = useAuthStore();

const error: Ref<Error | string> = ref("");

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

// OLD FETCH
// const sendData = () => {
//   fetch("http://localhost:8080/users/register", {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify({
//       username: formData.value.username,
//       email: formData.value.email,
//       password: formData.value.password
//     })
//   })
//     .then((res: Response) => {

//       if (!res.ok) {
//         error.value = `Error: ${res.status} `;
//         return;
//       }
//       return res.json() as Promise<TokenType>;
//     }
//     )
//     .then((data) => {
//       error.value = "";
//       console.log(data);
//       //authStore.setToken(data.token)
//       //localStorage.setItem("id", JSON.stringify(data[1]));
//     })
//     .catch((error) => error.value = error as string)
// }

const sendData = async () => {
  try {
    const response = await fetch("http://localhost:8080/users/register", {
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
      error.value = `Error: ${response.status}`;
      return;
    }

    const data: TokenType = await response.json();
    error.value = "";
    console.log(data);

    authStore.setToken(data.token);
  } catch (err) {
    error.value = err as string;
  }
}

</script>

<template>
  <VueFinalModal class="confirm-modal" content-class="confirm-modal-content" overlay-transition="vfm-fade"
    content-transition="vfm-fade">
    <form @submit.prevent="sendData()">
      <h1>RESTABLECER CONTRASEÑA</h1>
      <h2>Introduce nueva contraseña</h2>
      <input v-model="formData.password" type="password" name="password" id="password" placeholder="Contraseña">
      <h2>Repite la contraseña</h2>
      <input v-model="formData.password2" type="password" name="password2" id="password2" placeholder="Repite contraseña">

      <button type="submit">CAMBIAR</button>
    </form>
    <div v-if="error !== ''">{{ error }}</div>
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

</style>