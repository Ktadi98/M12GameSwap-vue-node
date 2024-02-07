<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import SearchBar from '@/components/SearchBar.vue';
import VendorSummary from '@/components/VendorSummary.vue';
import type { Product } from '@/interfaces/Product';
import type { Stats } from '@/interfaces/Stats';
import router from '@/router';
import { computed, onMounted, ref } from 'vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import VendorsRanking from "../components/VendorsRanking.vue";
import PostsHistory from "@/components/PostsHistory.vue";
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

const props = defineProps<{
    id: number,
}>()

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

const posts = ref<Product[]>([]);

const userStats = ref<Stats | null | any>(null as any);

const numberOfPosts = computed<number>(() => posts.value.length > 0 ? posts.value.length : 0);

const getUserStats = async () => {
    try {
        const response: Response = await fetch(`${apiEndpoint}/users/getStats/${props.id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Stats = await response.json();

        userStats.value = data;
    } catch (error) {
        console.error(error);
    }
}

const getVendorPosts = async () => {
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
}

onMounted(
    () => {
        getVendorPosts();
        getUserStats();
        router.push(`/vendor/${props.id}/posts`);
    }
);

const items = ref([
    { label: 'Home', route: '/' },
    { label: 'Perfil vendedor' }
]);

</script>
<template>
    <NavBar></NavBar>
    <section class="px-5">
        <BreadCrumbs :items="items"></BreadCrumbs>
    </section>
    <main class="d-flex flex-column justify-content-center align-items-center mt-3 w-100">
        <SearchBar></SearchBar>
        <VendorSummary :userStats="userStats"></VendorSummary>
        <!-- <h2>{{ id }}</h2> -->
        {{ $route.redirectedFrom }}
        <section class="tabs-box d-flex justify-content-around gap-3 w-75">
            <div class="d-flex flex-column align-items-center justify-content-center">
                <RouterLink :to="{ name: 'vendor_posts' }">
                    <p class="nav-number">En Venta ({{ numberOfPosts }})</p>
                </RouterLink>
            </div>
            <RouterLink :to="{ name: 'vendor_reviews' }">
                <p>Valoraciones</p>
            </RouterLink>
        </section>
        <RouterView></RouterView>
        <!-- <VendorsRanking></VendorsRanking> -->
        <PostsHistory></PostsHistory>
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
    color: #8a6cf6;
    text-decoration: none;
}
</style>