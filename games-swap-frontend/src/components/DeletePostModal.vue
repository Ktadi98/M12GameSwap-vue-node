<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { VueFinalModal } from 'vue-final-modal';
import { useAuthStore } from "@/stores/auth";

const emit = defineEmits<{
    (e: 'confirm'): void,
    (e: 'cancel'): void
}>()

const props = defineProps<{
    post_image: string,
    post_title: string
}>()

function closeModal() {
    emit('cancel');
}

const authStore = useAuthStore();

const error: Ref<Error | string> = ref("");

const deletePost = async () => {
    // try {
    //     const response = await fetch("http://localhost:8080/users/register", {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         body: JSON.stringify({
    //             username: formData.value.username,
    //             email: formData.value.email,
    //             password: formData.value.password
    //         })
    //     });

    //     if (!response.ok) {
    //         error.value = `Error: ${response.status}`;
    //         return;
    //     }

    //     const data: TokenType = await response.json();
    //     error.value = "";
    //     console.log(data);

    //     authStore.setToken(data.token);
    // } catch (err) {
    //     error.value = err as string;
    // }
}

</script>

<template>
    <VueFinalModal class="confirm-modal" content-class="confirm-modal-content" overlay-transition="vfm-fade"
        content-transition="vfm-fade">
        <form class="d-flex flex-column gap-5 " @submit.prevent="deletePost()">
            <h1>¿Deseas eliminar este producto?</h1>
            <div class="d-flex align-items-center justify-content-center gap-1">
                <div class="img-box text-center">
                    <img :src="props.post_image">
                </div>
                <div>
                    <h2>{{ props.post_title }}</h2>
                </div>
            </div>

            <div class="d-flex flex-column gap-3">
                <button class="delete-button" type="submit">Eliminar</button>
                <button class="exit-button" @click="closeModal">Cerrar</button>
            </div>
        </form>
        <div v-if="error !== ''">{{ error }}</div>
    </VueFinalModal>
</template>

<style>
.img-box {
    width: 100%;
    overflow: hidden;
}

.img-box>img {
    width: 150px;
    height: 150px;
    border-radius: 10px;
}

.exit-button {
    background-color: #F45A5A;
    border: none;
    transition: all 0.2s ease-in-out;
}

.exit-button:hover {
    background-color: #de5353;
}

.confirm-modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.confirm-modal-content {
    display: flex;
    flex-direction: column;
    border-radius: 27px;
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