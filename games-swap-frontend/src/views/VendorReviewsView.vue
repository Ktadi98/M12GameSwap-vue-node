<script setup lang="ts">
import type { Purchase } from '@/interfaces/Purchase';
import type { Review } from '@/interfaces/Review';
import ReviewRow from '@/components/ReviewRow.vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import ProgressSpinner from 'primevue/progressspinner';
import ErrorMessages from '@/components/ErrorMessages.vue';

const props = defineProps<{
    id: number,
}>()

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

const reviews = ref<Review[]>([]);

const loading = ref<boolean>(true);

const numberOfReviews = computed<number>(() => reviews.value.length);
const error = ref<boolean>(false);
const errorMessages: Ref<string[]> = ref([]);


async function getReviews() {
    error.value = false;
    errorMessages.value = [];
    loading.value = true;
    try {
        const response: Response = await fetch(`${apiEndpoint}/reviews/${props.id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const reviewsData: { reviews: Review[] } = await response.json();

        reviews.value = reviewsData.reviews;

    } catch (err) {
        console.error(err);
        error.value = true;
        errorMessages.value.push("Ha habido un error al devolver los reseñas del vendedor. Por favor, inténtalo más tarde.");
    } finally {
        loading.value = false;
    }
};

onMounted(async () => {
    getReviews();
})

</script>
<template>
    <section v-if="loading">
        <ProgressSpinner></ProgressSpinner>
    </section>
    <section v-else class="w-75">
        <h2 v-if="!error" class="mb-4">Número de Valoraciones : {{ numberOfReviews }}</h2>
        <ReviewRow v-for="review in reviews" :userId="props.id" :review="review" :key="review.review_id"></ReviewRow>
    </section>
    <ErrorMessages :messages="errorMessages"></ErrorMessages>
</template>
<style scoped></style>