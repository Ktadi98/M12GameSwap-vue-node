<template>
  <NavBar></NavBar>
  <div>
    <div class="ms-4">
      <BreadCrumbs :items="items"></BreadCrumbs>
    </div>
    <section>
      <h1>EDITA TUS DATOS</h1>
      <!-- user name -->
      <div class="d-flex">
        <input v-model.trim="username" type="name" name="name" id="name" placeholder="Nombre" disabled>
        <img :src="editMode.username ? cancelImage : editImage" type="submit" alt="Edit"
          @click="toggleUserNameModifierInput" />
      </div>
      <div v-if="modifyUserNameFieldActive" class="d-flex">
        <input v-model.trim="userData.username" type="name" name="name" id="name" placeholder="Nombre">
        <img src="@/components/Icons/check.svg" type="submit" alt="Send" @click="sendUserName" />
      </div> 
      <!-- user email -->
      <div class="d-flex">
        <input v-model.trim="userEmail" type="email" name="email" id="email" placeholder="Correo" disabled>
        <img :src="editMode.email ? cancelImage : editImage" type="submit" alt="Edit" @click="toggleEmailModifierInput" />
      </div>
      <div v-if="modifyUserEmailFieldActive" class="d-flex">
        <input v-model.trim="userData.email" type="name" name="name" id="name" placeholder="Nombre">
        <img src="@/components/Icons/check.svg" type="submit" alt="Send" @click="sendUserEmail" />
      </div>
      <!-- user image -->
      <div class="d-flex">
        <img :src="'./src/assets/avatar-profile.svg'" alt="Current User Photo" />
        <input type="file" accept="image/png, image/jpeg, image/jpg" @change="handleImageUpload">
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
const currentUserPhoto = ref(""); 
const newPhoto = ref<string | null>(null);





const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const authStore = useAuthStore();

const error: Ref<boolean> = ref(false);
const errorMessages: Ref<string[]> = ref([]);

interface RegisterType {
  username: string,
  email: string,
  photo: string[]
}

const username = ref("");
const userEmail = ref("");
const userPhoto = ref<string[]>([]);

interface TokenType {
  message: string,
  token: string
}

const items = ref([
  { label: 'Home', route: '/' },
  { label: 'Perfil ', route: '/profileManagement' },
  { label: 'Editar Perfil' }
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

    const userData: { email: string, name: string, photo: string[] } = await response.json();

    username.value = userData.name;
    userEmail.value = userData.email;
    userPhoto.value.push(userData.photo[0] as string);



  } catch (error) {
    console.error(error);
  }
}

const userData: Ref<any> = ref({
  username: "",
  email: "",
  photo: []
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

async function sendUserPhoto() {
  try {
    const photoData = new FormData();

    photoData.append("userPhoto", userData.value.photo);


    const response: Response = await fetch(`${apiEndpoint}/users/sendPhoto`, 
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${authStore.token}`
      },
      body:photoData
    }
    );

    if (!response.ok) return;
    fetchUserData();

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

}
interface EditMode {
  username: boolean;
  email: boolean;
  photo: boolean;
}

const editMode = ref<EditMode>({
  username: false,
  email: false,
  photo: false,

});

const handleImageUpload = async (event: Event) => {
  const photoInput = event.target as HTMLInputElement | null;

  if (!photoInput) return;

  const file = photoInput.files?.[0];

  if (!file) return;

  try {
    const formData = new FormData();
    formData.append('photo', file);

    const response: Response = await fetch(`${apiEndpoint}/users/uploadPhoto`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${authStore.token}`
      },
      // body: JSON.stringify({
      //   userPhoto: userData.value.userPhoto
    });

    if (!response.ok) {

      return;
    }

    fetchUserData();

    newPhoto.value = URL.createObjectURL(file); 
  } catch (error) {
    console.error(error);
  }
}


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

img {
  padding: 0.5rem 1rem;
  width: 65px;
  height: 65px;
  cursor: pointer;
}
</style>
  



