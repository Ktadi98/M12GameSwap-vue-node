<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import AppBar from '@/components/AppBar.vue';
import { type Ref, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';

interface PostType {
    title: string,
    description: string,
    category: string,
    genre: string,
    price: number,
    images: any[],
    state: string
}

const authStore = useAuthStore();

const route = useRoute();
const router = useRouter();

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

async function getPhotosPosted() {
    try {
        const postImages = new FormData();
        uploadedImages.value = [];
        postImages.append("images", formState.value.images);

        const response = await fetch("http://localhost:8080/posts/images", {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${authStore.getToken()}`
            },
            body: postImages
        }
        );

        if (!response.ok) {
            //error.value = `Error: ${response.status}`;
            return;
        }

        const data: any = await response.json();
        //error.value = "";
        console.log(data);
        uploadedImages.value.push(data.file);

    } catch (error) {
        console.log(error);
    }
}

async function sendPost() {

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


    try {
        const response = await fetch("http://localhost:8080/posts/upload", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${authStore.getToken()}`
            },
            body: postFormData
        }
        );

        if (!response.ok) {
            //error.value = `Error: ${response.status}`;
            return;
        }

        const data: any = await response.json();
        //error.value = "";
        console.log(data);

    } catch (err: any) {
        err.value = err as string;
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
        <div class="d-flex w-50 flex-column flex-md-row align-items-center">
            <div class="upload-btn">
                <button form="post-form" type="submit">Subir producto
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
