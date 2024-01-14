<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';
import { VueFinalModal } from 'vue-final-modal';
import { useAuthStore } from "@/stores/auth";
import Dropdown from 'primevue/dropdown';
import ErrorMessages from './ErrorMessages.vue';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import useCustomToast from "@/composables/useCustomToast"

const emit = defineEmits<{
    (e: 'confirm'): void,
    (e: 'cancel'): void
}>()

function closeModal() {
    emit('confirm');
}

const { triggerToast } = useCustomToast("Reporte enviado con éxito. El administrador se encarga.")

const { token, userIsLoggedIn } = storeToRefs(useAuthStore());

const reportMotive = ref<string>("");

const reportMotives = ref<string[]>([
    "Uso inadecuado",
    "Contenido fraudulento",
    "Spam",
    "Otros"
]);

const route = useRoute();

const reportExplanation = ref<string>("");

const error: Ref<boolean | string> = ref(false);
const errorMessages: Ref<string[]> = ref([]);

const validateReport = () => {
    if (
        reportExplanation.value.length > 250 || reportExplanation.value.length < 0
    ) {
        errorMessages.value.push("La descripción de la queja no puede tener más de 250 carácteres.");
        error.value = true;
    }
    if (!reportMotives.value.includes(reportMotive.value)) {
        errorMessages.value.push("El motivo de la queja indicado no es válido.");
        error.value = true;
    }
}

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

const sendReport = async () => {

    errorMessages.value = [];
    error.value = false;
    validateReport();

    if (error.value) return;

    try {
        const response: Response = await fetch(`${apiEndpoint}/complaints/${route.params.id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token.value}`
            },
            body: JSON.stringify({
                motive: reportMotive.value,
                text: reportExplanation.value
            })
        });

        if (!response.ok) {
            errorMessages.value.push("Los datos de la queja son incorrectos. Inténtalo de nuevo.");
            error.value = true;
            return;
        }

        const data: { message: string } = await response.json();

        triggerToast();

        emit("confirm");

    } catch (err) {
        errorMessages.value.push("Ha habido un problema con el servidor. Por favor, inténtalo más tarde.");
    }
}

//To limit the characters written in the textarea.
watch(reportExplanation, () => {
    if (reportExplanation.value.length > 250) {
        reportExplanation.value = reportExplanation.value.substring(0, 251);
    }
})

</script>

<template>
    <VueFinalModal class="confirm-modal" content-class="confirm-modal-content border-0" overlay-transition="vfm-fade"
        content-transition="vfm-fade">
        <form class="d-flex flex-column gap-3 absolute inset-0" @submit.prevent="sendReport()">
            <Dropdown v-model="reportMotive" :options="reportMotives" placeholder="Selecciona un el motivo de tu queja" />
            <h3>Describe tu queja (opcional)</h3>
            <div>
                <textarea v-model="reportExplanation" cols="40" rows="10"></textarea>
            </div>
            <div class="d-flex flex-column gap-3">
                <button type="submit" class="exit-button">Enviar reporte</button>
                <button class="exit-button" @click="closeModal">Volver</button>
            </div>
        </form>
        <ErrorMessages :messages="errorMessages"></ErrorMessages>
    </VueFinalModal>
</template>

<style scoped>
h1 {
    font-size: large;
}

textarea {
    border: 2px dashed #9F87F5;
    border-radius: 0px;
    background-color: white;
    outline: none;
    padding: 10px;
    resize: none;
    font-size: 18px;
}

.exit-button:hover {
    background-color: #805ffa;
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