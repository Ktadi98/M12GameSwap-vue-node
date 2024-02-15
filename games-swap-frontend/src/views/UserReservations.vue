<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, ref, type Ref } from 'vue';
import type { Reservation } from '@/interfaces/Reservation';
import PostRow from '@/components/PostRow.vue';
import ProgressSpinner from 'primevue/progressspinner';
import router from '@/router';
import useCustomToast from '@/composables/useCustomToast';
import ErrorMessages from '@/components/ErrorMessages.vue';


const error = ref<boolean>(false);
const errorMessages: Ref<string[]> = ref([]);

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
const { token, userIsLoggedIn } = storeToRefs(useAuthStore());
const { deleteToken } = useAuthStore();
const reservations = ref<Reservation[]>([]);

const loading = ref<boolean>(true);

const { triggerToast } = useCustomToast("!Reserva eliminada! ");

async function getReservedProducts() {

    error.value = false;
    errorMessages.value = [];

    try {
        loading.value = true;
        const response: Response = await fetch(`${apiEndpoint}/posts/reservations`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token.value}`
            }
        });
        if (!response.ok) {
            //throw new Error(`HTTP error! Status: ${response.status}`);
            //Force to log out if token is modified or expired.
            if (response.status === 401 || response.status === 403) {
                deleteToken();
                router.push("/");
            }
        }
        const reservationsData: { reservationsData: Reservation[] } = await response.json();
        reservations.value = reservationsData.reservationsData;

    } catch (err) {
        console.error(err);
        error.value = true;
        errorMessages.value.push("Ha habido un problema al recuperar tus reservas. Inténtalo más tarde.")
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    getReservedProducts();
})

const dropReservation = async (reservation: Reservation) => {
    reservations.value.splice(reservations.value.findIndex(res => res.reservation_id === reservation.reservation_id), 1);
    try {
        const response = await fetch(`${apiEndpoint}/posts/reservation/${reservation.reservation_id}`, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token.value}`
            }
        });

        if (!response.ok) {
            //Force to log out if token is modified or expired.
            if (response.status === 401 || response.status === 403) {
                deleteToken();
                router.push("/");
            }
        }

        triggerToast();

    } catch (err) {
        console.log(err);
    }
};

</script>
<template>
    <section v-if="reservations.length > 0 && !loading" class="w-75">
        <template v-for="reservation in reservations" :key="reservation.reservation_id">
            <PostRow @deleteReservation="dropReservation(reservation)" :post="reservation?.post"
                :purchaseDate="new Date(reservation?.reservation_created_at)" :purchased="false" :selled="false"
                :reserved="true">
            </PostRow>
        </template>
    </section>
    <section v-else-if="loading">
        <ProgressSpinner></ProgressSpinner>
    </section>
    <section v-else-if="!loading && reservations.length === 0 && !error">
        No has realizado la reserva de ningún producto todavía
        <div>
            <img src="@/assets/not_data_outline.gif" alt="not found GIF">
        </div>
    </section>
    <ErrorMessages :messages="errorMessages"></ErrorMessages>
</template>

<style scoped></style>