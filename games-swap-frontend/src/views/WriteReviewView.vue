<script setup lang="ts">
import type { PostReview } from '@/interfaces/PostReview';
import { ref, type Ref } from 'vue';
import Rating from 'primevue/rating';
import ErrorMessages from '@/components/ErrorMessages.vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useToast, POSITION } from "vue-toastification";
import type { Review } from '@/interfaces/Review';
import { useRoute, useRouter } from 'vue-router';

const error: Ref<boolean> = ref(false);
const errorMessages: Ref<string[]> = ref([]);
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

const { token, userIsLoggedIn } = storeToRefs(useAuthStore());

const props = defineProps<{
    postId: number,
    postName: string
}>()

const reviewData = ref<PostReview>({
    title: "",
    description: "",
    puntuaction: 3
});

const toast = useToast();
const router = useRouter();
const route = useRoute();

function triggerToast() {

    toast.success("¡Gracias por tu reseña!", {
        position: POSITION.BOTTOM_RIGHT,
        timeout: 5000,
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

function validateReview() {
    if (reviewData.value.title.length === 0 || reviewData.value.title.length > 50) {
        errorMessages.value.push("El asunto debe tener como máximo 50 carácteres.");
        error.value = true;
    }
    if (reviewData.value.description.length === 0 || reviewData.value.description.length > 350) {
        errorMessages.value.push("La descripción debe tener como máximo 350 carácteres.");
        error.value = true;
    }
}

async function sendReview() {
    errorMessages.value = [];
    error.value = false;
    validateReview();

    if (error.value) return;

    try {
        const response = await fetch(`${apiEndpoint}/reviews/post/${route.params.postId}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.value}`
            },
            body: JSON.stringify({
                title: reviewData.value.title,
                description: reviewData.value.description,
                puntuaction: reviewData.value.puntuaction
            })
        });

        if (!response.ok) {
            errorMessages.value.push("Ha habido un problema al publicar la review.");
            error.value = true;
            return;
        }

        const data: { message: string, review: Review } = await response.json();

        console.log(data);

        triggerToast();
        router.back();
    } catch (err) {
        errorMessages.value.push("Ha habido un problema con el servidor. Por favor, inténtalo más tarde.");
    }



}
</script>

<template>
    <main class="container-fluid d-flex justify-content-center align-items-center mt-5">
        <form class="d-flex flex-column justify-content-center align-items-center gap-4 px-4 py-2"
            @submit.prevent="sendReview()">
            <header>
                <h1>ESCRIBE TU RESEÑA SOBRE "{{ postName }}"</h1>
            </header>
            <label for="title">
                Título
                <br>
                <input v-model.trim="reviewData.title" maxlength="50" type="text" name="title" id="title"
                    placeholder="Nombre reseña...">
            </label>
            <label for="description">
                Descripción
                <br>
                <textarea rows="10" v-model.trim="reviewData.description" maxlength="350" name="description"
                    id="description" placeholder="Escribe tu reseña...">
            </textarea>
            </label>
            <label class="d-flex flex-column gap-2 mb-4" for="punctuation">
                Valoración de la experiencia de compra
                <br>
                <Rating v-model="reviewData.puntuaction" :cancel="false">
                </Rating>
            </label>
            <div class="d-flex w-50 gap-2">
                <button type="submit">ENVIAR</button>
                <button type="button" @click="$router.back()">VOLVER ATRÁS</button>
            </div>
            <ErrorMessages :messages="errorMessages"></ErrorMessages>
        </form>
    </main>
</template>

<style scoped>
header {
    background-color: white;
    color: #9f87f5;
    font-weight: 500;
}

h1 {
    font-size: 2rem !important;
}

form {
    border: 2px solid #9f87f5;
    border-radius: 10px;
    width: 80%;
    margin-bottom: 50px;
}

label {
    font-size: 1.5rem;
    color: #9f87f5;
    font-weight: 500;
    width: 80%;
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
textarea {
    width: 100%;
    font-size: 16px;
}

input:focus,
input:active {
    border-bottom: 5px solid #9f87f5;
}

textarea {
    resize: none;
    border: 2px solid #9f87f5;

}

button {
    width: 50%;
}

svg {
    fill: #9f87f5 !important;
}

@media (max-width: 632px) {

    label {
        font-size: 2.0rem;
        color: #9f87f5;
        width: 100%;
    }

    textarea {
        font-size: 13px;
    }

    form {
        border: none;
        width: 100%;
    }

    input,
    select,
    option {
        width: 100%;
        font-size: 21px;
    }

    button {
        width: 100%;
    }

}
</style>