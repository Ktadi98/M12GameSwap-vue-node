<script setup lang="ts">
import type { Product } from '@/interfaces/Product';
import { computed, onMounted, ref, watch, type Ref } from 'vue';
import PostCard from '@/components/PostCard.vue';
import ProgressSpinner from 'primevue/progressspinner';
import ErrorMessages from '@/components/ErrorMessages.vue';

const props = defineProps<{
    id: number,
}>()

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
const posts = ref<Product[]>([]);

const filteredPosts = computed<Product[]>(() => filterTerm.value === "" ? posts.value : posts.value.filter(post => post.post_title.toLowerCase().startsWith(filterTerm.value)))

const loading = ref<boolean>(true);
const error = ref<boolean>(false);
const errorMessages: Ref<string[]> = ref([]);

onMounted(async () => {
    error.value = false;
    errorMessages.value = [];
    loading.value = true;
    try {
        const response: Response = await fetch(`${apiEndpoint}/posts/vendor/${props.id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: { posts: Product[] } = await response.json();

        posts.value = data.posts;
    } catch (err) {
        console.error(err);
        error.value = true;
        errorMessages.value.push("Ha habido un error al devolver los anuncios del vendedor. Por favor, inténtalo más tarde.");
    } finally {
        loading.value = false;
    }
})

const filterTerm = ref<string>("");

watch(filterTerm, (newSearchterm, oldSearchTerm) => {
    filterTerm.value = filterTerm.value.toLowerCase();
});

</script>
<template>
    <form class="d-flex mb-3 w-75 position-relative">
        <div class="search w-100 d-flex gap-2 flex-row align-items-center justify-content-center me-2">
            <div class="d-flex justify-content-center align-items-center">
                <img src="/imgs/search-icon.svg" alt="magnifying glass" />
            </div>
            <input type="text" v-model.trim="filterTerm" class="rounded-5 flex-grow-1 w-100"
                placeholder="Filtrar productos del vendedor" aria-label="Search" />
        </div>
    </form>
    <section class="post-box container-fluid">
        <div v-if="posts.length > 0" class="row">
            <PostCard v-for="post in filteredPosts" :key="post.post_id" :product="post"></PostCard>
        </div>
        <div v-else-if="loading">
            <ProgressSpinner></ProgressSpinner>
        </div>
        <div v-else>
            <h2>No hay anuncios disponibles.</h2>
        </div>
        <ErrorMessages :messages="errorMessages"></ErrorMessages>
    </section>
</template>
<style scoped></style>