<template>
  <NavBar></NavBar>
  <div>
    <div class="ms-4">
      <BreadCrumbs :items="items"></BreadCrumbs>
    </div>
    <section>
      <h1>EDITA TUS DATOS</h1>
      <!-- botóns per al username -->
      <!-- <div class="d-flex"> -->

      <!-- <button @click="toggleUserNameModifierInput">{{ editMode.username ? 'CANCELAR' : 'EDITAR' }}</button>
      </div>
      <div v-if="modifyUserNameFieldActive" class="d-flex">
        <input  type="name" name="name" id="name" placeholder="Nombre">
        <button @click="sendUserName">ENVIAR</button>
      </div> -->

      <div class="d-flex">

        <input v-model.trim="username" type="name" name="name" id="name" placeholder="Nombre" disabled>
        <img :src="editMode.username ? cancelImage : editImage" type="submit" alt="Edit"
          @click="toggleUserNameModifierInput" />
      </div>
      <div v-if="modifyUserNameFieldActive" class="d-flex">
        <input v-model.trim="userData.username" type="name" name="name" id="name" placeholder="Nombre">
        <img src="@/components/Icons/check.svg" type="submit" alt="Send" @click="sendUserName" />
      </div>

      <!-- botó per al email -->
      <!-- <div class="d-flex">
        <input v-model.trim="userEmail" type="email" name="email" id="email" placeholder="Correo" disabled>
        <button @click="toggleEmailModifierInput"  type="submit">{{ editMode.email ? 'CANCELAR' : 'EDITAR' }}</button>
      </div>
      <div v-if="modifyUserEmailFieldActive" class="d-flex">
        <input  type="name" name="name" id="name" placeholder="Nombre">
        <button type="submit" @click="sendUserEmail">ENVIAR</button>
      </div> -->

      <div class="d-flex">
        <input v-model.trim="userEmail" type="email" name="email" id="email" placeholder="Correo" disabled>
        <img :src="editMode.email ? cancelImage : editImage" type="submit" alt="Edit" @click="toggleEmailModifierInput" />
      </div>
      <div v-if="modifyUserEmailFieldActive" class="d-flex">
        <input v-model.trim="userData.email" type="name" name="name" id="name" placeholder="Nombre">
        <img src="@/components/Icons/check.svg" type="submit" alt="Send" @click="sendUserEmail" />
      </div>
    </section>
  </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import NavBar from '@/components/NavBar.vue';
import { VueFinalModal } from 'vue-final-modal';
import { useAuthStore } from "@/stores/auth";
import ErrorMessages from '@/components/ErrorMessages.vue';
import editImage from '@/components/Icons/pen.svg';
import cancelImage from '@/components/Icons/cancel.svg';
import BreadCrumbs from '@/components/BreadCrumbs.vue';


const modifyUserNameFieldActive = ref(false);
const modifyUserEmailFieldActive = ref(false);

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const authStore = useAuthStore();

const error: Ref<boolean> = ref(false);
const errorMessages: Ref<string[]> = ref([]);

interface RegisterType {
  username: string,
  email: string,
}

const username = ref("");
const userEmail = ref("");

interface TokenType {
  message: string,
  token: string
}

const items = ref([
  { label: 'Home', route: '/' },
  { label: 'Perfil ', route: '/profileManagement' },
  { label: 'Reservas y Compras' }
]);


const toggleEmailModifierInput = () => {
  modifyUserEmailFieldActive.value = !modifyUserEmailFieldActive.value;
  editMode.value.email = !editMode.value.email;
}
const toggleUserNameModifierInput = () => {
  modifyUserNameFieldActive.value = !modifyUserNameFieldActive.value;
  editMode.value.username = !editMode.value.username;
}



const validateRegister = () => {


}

onMounted(() => {
  fetchUserData();
})

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

async function fetchUserData() {
  try {
    const response: Response = await fetch(`${apiEndpoint}/users/getData`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${authStore.token}`
      }
    });

    if (!response.ok) return;

    const userData: { email: string, name: string } = await response.json();

    username.value = userData.name;
    userEmail.value = userData.email;

  } catch (error) {
    console.error(error);
  }
}

const userData: Ref<RegisterType> = ref({
  username: "",
  email: ""
})

async function sendUserEmail() {
  try {
    const response: Response = await fetch(`${apiEndpoint}/users/sendData`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${authStore.token}`
      },
      body: JSON.stringify({
        email: userData.value.email
      })
    });

    if (!response.ok) return;
    fetchUserData();
    toggleEmailModifierInput();

  }
  catch (error) {
    console.error(error);
  }

}

async function sendUserName() {
  try {
    const response: Response = await fetch(`${apiEndpoint}/users/sendData`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${authStore.token}`
      },
      body: JSON.stringify({
        username: userData.value.username
      })
    });

    if (!response.ok) return;
    fetchUserData();
    toggleUserNameModifierInput();

  }
  catch (error) {
    console.error(error);
  }

}



const sendData = async () => {

  errorMessages.value = [];
  error.value = false;
  validateRegister();

  if (error.value) return;

  // try {
  //   const response = await fetch(`${apiEndpoint}/users/register`, {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     },
  //     body: JSON.stringify({
  //       username: formData.value.username,
  //       email: formData.value.email,
  //     })
  //   });

  //   if (!response.ok) {
  //     errorMessages.value.push("Registro inválido , el usuario ya existe.");
  //     error.value = true;
  //     return;
  //   }

  //   const data: TokenType = await response.json();

  //   console.log(data);

  //   authStore.setToken(data.token);
  //   emit('confirm');
  // } catch (err) {
  //   errorMessages.value.push("Ha habido un problema con el servidor. Por favor, inténtalo más tarde.");
  //}
}
interface EditMode {
  username: boolean;
  email: boolean;
}

const editMode = ref<EditMode>({
  username: false,
  email: false,

});


</script>
  
<style scoped>
/* Estilos para el formulario */


h1 {
  color: #9F87F5;
  text-align: center;
  font-family: Roboto;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-bottom: 50px;
}

section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  margin-right: 10px;
}


/* button {
  padding: 0.5rem 1rem;
  width:max-content;
  height: max-content;
  background-color: #9f87f5;
  color: #fff;
  cursor: pointer;
}  */

img {
  padding: 0.5rem 1rem;
  width: 65px;
  height: 65px;
  cursor: pointer;
}
</style>
  



