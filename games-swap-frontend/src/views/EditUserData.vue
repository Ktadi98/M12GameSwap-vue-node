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

// interface RegisterType {
//   username: string,
//   email: string,
//   photo: string[]
// }

const username = ref<string>("");
const userEmail = ref<string>("");
const userPhoto = ref<string>("");
const error = ref<boolean>(false);
const errorMessages: Ref<string[]> = ref([]);
const userData: Ref<any> = ref({
  username: "",
  email: "",
  photo: []
})

const uploadedImages: Ref<any> = ref([]);

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

const validateUserName = () => {

  if (username.value === userData.value.username) {
    error.value = true;
    errorMessages.value.push("El nuevo nombre intoducido es el que tienes actualmente !Debería ser diferente!");
  }

  if (userData.value.username.length < 2 || userData.value.username.length > 20) {
    error.value = true;
    errorMessages.value.push("El nombre de usuario debe tener como mínimo 2 carácteres y como máximo 20");
  }

}

const validateEmail = () => {
  if (userEmail.value === userData.value.email) {
    error.value = true;
    errorMessages.value.push("El nuevo correo introducido es el que tienes actualmente !Debería ser diferente!");
  }
  if (
    userData.value.email.length === 0 ||
    !userData.value.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ||
    userData.value.email.length > 150
  ) {
    errorMessages.value.push("El email introducido no es válido (debe contener como máximo 150 carácteres)");
    error.value = true;
  }
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

    const userData: { email: string, name: string, photo: string } = await response.json();

    username.value = userData.name;
    userEmail.value = userData.email;
    userPhoto.value = userData.photo;
  } catch (error) {
    console.error(error);
  }
}

async function sendUserEmail() {
  error.value = false;
  errorMessages.value = [];

  validateEmail();

  if (error.value) return;

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
  catch (err) {
    console.error(err);
    error.value = false;
    errorMessages.value.push("Error de validación: el email ya existe en el sistema o el servidor ha caído)");
  }

}

async function sendUserName() {

  error.value = false;
  errorMessages.value = [];

  validateUserName();

  if (error.value) return;

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
  catch (err) {
    console.error(err);
    error.value = false;
    errorMessages.value.push("Error de validación: el usuario ya existe en el sistema o el servidor ha caído)");
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
          "Accept": "application/json",
          "Authorization": `Bearer ${authStore.getToken()}`
        },
        body: photoData
      }
    );

    if (!response.ok) return;
    fetchUserData();

  }
  catch (error) {
    console.error(error);
  }

}

async function getPhotosPosted() {
  try {
    const postImages = new FormData();
    uploadedImages.value = [];
    postImages.append('userPhoto', userData.value.photo);

    const response = await fetch(`${apiEndpoint}/users/userPhoto`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${authStore.getToken()}`
      },
      body: postImages
    }
    );

    if (!response.ok) {
      errorMessages.value.push("Ha habido un problema al colgar tu foto. Por favor, inténtalo más tarde.");
      error.value = true;
      return;
    }

    const data: any = await response.json();

    console.log(data);
    uploadedImages.value.push(data.file);

  } catch (error) {
    errorMessages.value.push("Ha habido un problema con el servidor. Por favor, inténtalo más tarde.");
  }
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

const handleImageUpload = (event: any) => {
  userData.value.photo = event.target.files[0];
  if (!userData.value.photo) return;
  getPhotosPosted();
}


</script>
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
        <input v-model.trim="userData.username" max="20" type="name" name="name" id="name" placeholder="Nombre">
        <img src="@/components/Icons/check.svg" type="submit" alt="Send" @click="sendUserName" />

      </div>
      <p v-if="modifyUserNameFieldActive" class="counter ms-5">{{ userData.username.length }} / 20</p>
      <!-- user email -->
      <div class="d-flex">
        <input v-model.trim="userEmail" type="email" name="email" id="email" placeholder="Correo" disabled>
        <img :src="editMode.email ? cancelImage : editImage" type="submit" alt="Edit" @click="toggleEmailModifierInput" />
      </div>
      <div v-if="modifyUserEmailFieldActive" class="d-flex">
        <input v-model.trim="userData.email" type="name" name="name" id="name" placeholder="Correo">
        <img src="@/components/Icons/check.svg" type="submit" alt="Send" @click="sendUserEmail" />
      </div>
      <p v-if="modifyUserEmailFieldActive" class="counter ms-5">{{ userData.username.length }} / 150</p>
      <!-- user image -->
      <div class="d-flex">
        <input type="file" accept="image/png, image/jpeg, image/jpg" name="userPhoto" id="userPhoto"
          @change="handleImageUpload" placeholder="Sube tu nueva foto de pefil">
        <img :src="userPhoto" alt="Current User Photo" />
      </div>
      <template v-for="image in userData.images">
        <p>{{ image.name }}</p>
      </template>
      <div class="row">
        <div v-for="image in uploadedImages" :key="image" class="col-">
          <figure>
            <img class="img-class" :src="image" alt="product_photo">
          </figure>
        </div>
        <div class="upload-btn">
          <button form="post-form" @click="sendUserPhoto">Subir foto
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-upload" width="24" height="24"
              viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
              <path d="M7 9l5 -5l5 5"></path>
              <path d="M12 4l0 12"></path>
            </svg>
          </button>
        </div>
      </div>
      <ErrorMessages :messages="errorMessages"></ErrorMessages>
    </section>
  </div>
</template>
  
<style scoped>
.counter {
  margin: 0;
}


.upload-btn {
  width: 50%;
  text-align: right;
}


.upload-btn>button {
  width: max-content;
}

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

.img-class {
  width: 225px;
  height: 225px;
  overflow: hidden;
  border-radius: 50%;
}
</style>
  



