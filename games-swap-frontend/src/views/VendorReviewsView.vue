<script setup lang="ts">
import type { Purchase } from '@/interfaces/Purchase';
import type { Review } from '@/interfaces/Review';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{
    id: number,
}>()

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

const reviews = ref<Review[]>([]);

async function getReviews() {
    try {
        const response: Response = await fetch(`${apiEndpoint}/reviews/${props.id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const reviewsData: { reviews: Review[] } = await response.json();

        reviews.value = reviewsData.reviews;

        console.log(reviews.value);

    } catch (error) {
        console.error(error);
    }
};

onMounted(async () => {
    getReviews();
})




</script>
<template>
    {{ reviews }}
</template>
<style scoped></style>