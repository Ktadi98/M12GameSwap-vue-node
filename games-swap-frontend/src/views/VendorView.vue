<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import SearchBar from '@/components/SearchBar.vue';
import VendorSummary from '@/components/VendorSummary.vue';
import type { Product } from '@/interfaces/Product';
import { computed, onMounted, ref } from 'vue';

const props = defineProps<{
    id: number,
}>()

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

const posts = ref<Product[]>([]);

const numberOfPosts = computed<number>(() => posts.value.length > 0 ? posts.value.length : 0);

onMounted(async () => {
    try {
        const response: Response = await fetch(`${apiEndpoint}/posts/vendor/${props.id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: { posts: Product[] } = await response.json();

        posts.value = data.posts;
    } catch (error) {
        console.error(error);
    }
})
</script>
<template>
    <NavBar></NavBar>
    <main class="d-flex flex-column justify-content-center align-items-center mt-3 w-100">
        <SearchBar></SearchBar>
        <VendorSummary></VendorSummary>
        <!-- <h2>{{ id }}</h2> -->
        <section class="tabs-box d-flex justify-content-around gap-3 w-75">
            <div class="d-flex flex-column align-items-center justify-content-center">
                <p class="nav-number">{{ numberOfPosts }} </p>
                <RouterLink :to="{ name: 'vendor_posts' }">
                    <p>En Venta</p>
                </RouterLink>
            </div>
            <RouterLink :to="{ name: 'vendor_reviews' }">Valoraciones</RouterLink>
        </section>
        <RouterView></RouterView>
    </main>
</template>
<style scoped>
.tabs-box a {
    font-size: 25px;
    font-weight: bold;
}

.tabs-box a:focus,
.tabs-box a:active,
.tabs-box a:hover {
    text-decoration: underline;
    text-decoration-thickness: 3px;
    color: #8a6cf6;
}

.router-link-active {
    text-decoration: underline;
    text-decoration-thickness: 3px;
    color: #8a6cf6;
}

.nav-number {
    font-size: 30px;
    color: #8a6cf6;
}
</style>