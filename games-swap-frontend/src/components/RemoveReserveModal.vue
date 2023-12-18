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
    emit('confirm');
}

const authStore = useAuthStore();

const error: Ref<Error | string> = ref("");

</script>

<template>
    <VueFinalModal class="confirm-modal" content-class="confirm-modal-content border-0" overlay-transition="vfm-fade"
        content-transition="vfm-fade">
        <form class="d-flex flex-column gap-5 absolute inset-0" @submit.prevent="emit('cancel')">
            <h1 class="display-4">¿Deseas eliminar la reserva?</h1>
            <div class="d-flex align-items-center justify-content-center gap-3">
                <div class="img-box w-40 text-center">
                    <img :src="props.post_image">
                </div>
                <div class="w-50">
                    <h2>{{ props.post_title }}</h2>
                </div>
            </div>
            <!-- <div class="warning-box text-center p-3">
                <p class="h4">Una vez eliminado este producto no podrás recuperarlo. ¿Estás seguro de que lo quieres
                    eliminar?
                </p>
            </div> -->
            <div class="d-flex flex-column gap-3">
                <button class="delete-button" @click="closeModal">Eliminar</button>
                <button class="exit-button" type="submit">Volver</button>
            </div>
        </form>
        <div v-if="error !== ''">{{ error }}</div>
    </VueFinalModal>
</template>

<style>
h1 {
    font-size: large;
}

.img-box {
    overflow: hidden;
}

.img-box>img {
    width: 150px;
    height: 150px;
    border-radius: 10px;
}

.warning-box {
    border: 2px solid #9F87F5;
    border-radius: 10px;
}

.delete-button {
    background-color: #F45A5A;
    border: none;
    transition: all 0.2s ease-in-out;
}

.delete-button:hover {
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