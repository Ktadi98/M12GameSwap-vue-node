<script setup lang="ts">
import type { Purchase } from '@/interfaces/Purchase';
import type { Review } from '@/interfaces/Review';
import ReviewRow from '@/components/ReviewRow.vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{
    id: number,
}>()

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

const reviews = ref<Review[]>([]);

const numberOfReviews = computed<number>(() => reviews.value.length);

async function getReviews() {
    try {
        const response: Response = await fetch(`${apiEndpoint}/reviews/${props.id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const reviewsData: { reviews: Review[] } = await response.json();

        reviews.value = reviewsData.reviews;

    } catch (error) {
        console.error(error);
    }
};

onMounted(async () => {
    getReviews();
})

</script>
<template>
    <section class="w-75">
        <h2 class="mb-4">Número de Valoraciones : {{ numberOfReviews }}</h2>
        <ReviewRow v-for="review in reviews" :userId="props.id" :review="review" :key="review.review_id"></ReviewRow>
    </section>
</template>
<style scoped></style>