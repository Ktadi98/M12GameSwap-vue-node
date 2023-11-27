<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import AppBar from '@/components/AppBar.vue';
import { type Ref, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';
import { useToast, POSITION } from "vue-toastification";
import ErrorMessages from '@/components/ErrorMessages.vue';


interface PostType {
    title: string,
    description: string,
    category: string,
    genre: string,
    price: number,
    images: any[],
    state: string
}

const toast = useToast();
const authStore = useAuthStore();

const route = useRoute();
const router = useRouter();


function triggerToast() {
    toast.success("¡Producto actualizado con éxito!", {
        position: POSITION.BOTTOM_RIGHT,
        timeout: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        draggablePercent: 0.6,
        showCloseButtonOnHover: true,
        hideProgressBar: false,
        closeButton: false,
        icon: "fas fa-rocket",
        rtl: false
    });
}

const platforms = ["PS5", "PS4", "PS3", "Nintendo Switch", "Xbox One", "Xbox Series X/S", "Retro"];
const genres = ["Acción", "Aventura", "Plataformas", "RPG", "Puzzle", "Indie", "Lucha"];
const states = ["Nuevo", "Bueno", "Satisfactorio"];

const error: Ref<boolean> = ref(false);
const errorMessages: Ref<string[]> = ref([]);

const validatePost = () => {
    if (formState.value.title.length === 0 || formState.value.title.length > 50) {
        errorMessages.value.push("El título del anuncio debe tener entre 3 y 50 carácteres.");
        error.value = true;
    }
    if (formState.value.description.length === 0 || formState.value.description.length > 80) {
        errorMessages.value.push("La descripción del anuncio debe tener entre 5 y 80 carácteres.");
        error.value = true;
    }
    if (!platforms.includes(formState.value.category)) {
        errorMessages.value.push("La categoría del producto debe ser de las plataformas disponibles");
        error.value = true;
    }
    if (formState.value.price <= 0) {
        errorMessages.value.push("El precio mínimo del producto debe ser de 1€");
        error.value = true;
    }
    if (!genres.includes(formState.value.genre)) {
        errorMessages.value.push("El género debe ser el de los géneros disponibles");
        error.value = true;
    }
    if (formState.value.images.length === 0) {
        errorMessages.value.push("Debes subir una foto de tu producto");
        error.value = true;
    }
    if (!states.includes(formState.value.state)) {
        errorMessages.value.push("El estado del producto debe ser el de los estados disponibles");
        error.value = true;
    }
}

const formState: Ref<any> = ref({
    title: route.query.title,
    description: route.query.description,
    category: route.query.platform,
    genre: "",
    price: Number(route.query.price),
    images: [],
    state: route.query.state
})

const uploadedImages: Ref<any> = ref([]);

function selectFile(event: any) {
    formState.value.images = event.target.files[0];
    getPhotosPosted();
}

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

async function getPhotosPosted() {
    try {
        const postImages = new FormData();
        uploadedImages.value = [];
        postImages.append("images", formState.value.images);

        const response = await fetch(`${apiEndpoint}/posts/images`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${authStore.token}`
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

async function sendPost() {

    errorMessages.value = [];
    error.value = false;

    validatePost();
    if (error.value) return;

    const postFormData = new FormData();

    postFormData.append("title", formState.value.title);
    postFormData.append("description", formState.value.description);
    postFormData.append("platform", formState.value.category);
    postFormData.append("genre", formState.value.genre);
    postFormData.append("price", formState.value.price);
    postFormData.append("images", formState.value.images);
    postFormData.append("state", formState.value.state);

    //console.log(formState.value.images);

    console.log(postFormData);

    const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
    try {
        const response = await fetch(`${apiEndpoint}/posts/update/${route.query.id}`, {
            method: 'PATCH',
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${authStore.getToken()}`
            },
            body: postFormData
        }
        );

        if (!response.ok) {
            errorMessages.value.push("Ha habido un problema al actualizar tu anuncio. Por favor, inténtalo de nuevo más tarde.");
            error.value = true;
            return;
        }

        const data: any = await response.json();
        triggerToast();
        router.back();
        console.log(data);

    } catch (err: any) {
        errorMessages.value.push("Ha habido un problema al actualizar tu anuncio. Por favor, inténtalo de nuevo más tarde.");
        error.value = true;
    }

}
</script>
<template>
    <NavBar></NavBar>
    <header class="text-left text-md-center px-2 py-1 responsive-text ">Modifica tu producto</header>
    <main
        class="d-flex flex-column flex-grow-1 justify-content-left align-items-center justify-content-md-center px-4 py-3 w-100">
        <form novalidate @submit.prevent="sendPost" id="post-form" class="d-flex flex-column px-4 py-3 gap-4"
            enctype="multipart/form-data">
            <label for="title">Título</label>
            <input v-model="formState.title" type="text" name="title" id="title">
            <label for="description">Descripción</label>
            <input v-model="formState.description" type="text" name="description" id="description">
            <label for="category">Categoría</label>
            <select v-model="formState.category" name="category" id="category">
                <optgroup>
                    <option value="PS5">PS5</option>
                    <option value="PS4">PS4</option>
                    <option value="PS3">PS3</option>
                    <option value="Nintendo Switch">Nintendo Switch</option>
                    <option value="Xbox One">Xbox One</option>
                    <option value="Xbox Series X/S">Xbox Series X/S</option>
                    <option value="Retro">Retro</option>
                </optgroup>
            </select>
            <label for="genre">Género</label>
            <select v-model="formState.genre" name="genre" id="genre">
                <optgroup>
                    <option value="Acción">Acción</option>
                    <option value="Aventura">Aventura</option>
                    <option value="Plataformas">Plataformas</option>
                    <option value="RPG">RPG</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Indie">Indie</option>
                    <option value="Lucha">Lucha</option>
                </optgroup>
            </select>
            <label for="price">Precio</label>
            <input v-model="formState.price" type="number" name="price" id="price" step="1" min="1" max="999">
            <label for="images">Imágenes</label>
            <input @change="selectFile($event)" type="file" placeholder="Sube las fotos de tu producto"
                accept="image/png, image/jpeg, image/jpg" name="images" id="images">
            <template v-for="image in formState.images">
                <p>{{ image.name }}</p>
            </template>
            <div class="row">
                <div v-for="image in uploadedImages" :key="image" class="col-4">
                    <figure>
                        <img :src="image" alt="product_photo">
                    </figure>
                </div>
            </div>
            <label for="images">Estado</label>
            <select v-model="formState.state" name="state" id="state">
                <optgroup>
                    <option value="Nuevo">Nuevo</option>
                    <option value="Bueno">Bueno</option>
                    <option value="Satisfactorio">Satisfactorio</option>
                </optgroup>
            </select>
        </form>
        <ErrorMessages :messages="errorMessages"></ErrorMessages>
        <div class="d-flex w-50 flex-column flex-md-row align-items-center">
            <div class="upload-btn">
                <button form="post-form" type="submit">Actualizar producto
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-upload" width="24"
                        height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                        <path d="M7 9l5 -5l5 5"></path>
                        <path d="M12 4l0 12"></path>
                    </svg>
                </button>
            </div>
            <div class="upload-btn">
                <button @click="router.back">Volver</button>
            </div>
        </div>

    </main>
    <AppBar></AppBar>
</template>
<style scoped>
.responsive-text {
    font-size: 2.5rem;
}

header {
    background-color: white;
    color: #9f87f5;
    font-weight: 500;
}

figure>img {
    width: 100%;
    height: auto;
    border-radius: 10px;
}

.fa-cloud-arrow-up {
    color: white;
}

form {
    border: 2px solid #9f87f5;
    border-radius: 10px;
    width: 50%;
    margin-bottom: 50px;
}

label {
    font-size: 1.5rem;
    color: #9f87f5;
    font-weight: 500;
}

input,
select {
    border: none;
    border-radius: 0px;
    border-bottom: 2px solid #9f87f5;
    background-color: white;
    outline: none;
    padding: 0;
}

input,
select,
option {
    font-size: 20px;
}

.upload-btn {
    width: 50%;
    text-align: center;
}


.upload-btn>button {
    width: 40%;
}

@media (max-width: 632px) {

    header {
        background-color: #9f87f5;
        color: white;
    }

    label {
        font-size: 2.0rem;
        color: #9f87f5;
    }

    form {
        border: none;
        width: 100%;
    }

    main {
        width: 100%;
    }

    input,
    select,
    option {
        width: 100%;
        font-size: 21px;
    }

    .responsive-text {
        font-size: 2.0rem;
    }

    .upload-btn {
        width: 100%;
    }

    .upload-btn>button {
        width: 100%;
    }

}
</style>
