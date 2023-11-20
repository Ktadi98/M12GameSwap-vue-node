<template>
    <NavBar />
    <main class="d-flex flex-column gap-2 justify-content-center align-items-center px-5 mt-5">
        <SearchBar />
        <section class="filters-section w-100 d-flex flex-row gap-5 justify-content-center">
            <form class="genre-box" v-for="(genre, index) in genres " :key="genre.genre_id"
                @submit.prevent='updateGenreFilter(genre.genre_id)'>
                <input :class="{ 'input-active': genreFilter === genre.genre_id }" type="submit" :value="genre.genre_name">
            </form>
            <form class="genre-box" @submit.prevent='genreFilter = -1'>
                <input type="submit" value="Restaurar">
            </form>
        </section>
        <div class="w-100 criteria-box align-self-left">
            <select v-model="criteria">
                <option value="A-Z">A-Z</option>
                <option value="Z-A" selected>Z-A</option>
                <option value="priceDesc">Precio (menor a mayor)</option>
                <option value="priceAsc">Precio (mayor a menor)</option>
            </select>
        </div>
        <section class="post-box container">
            <div class="row">
                <div class="col-12 col-md-3">
                    <PostCard v-for=" product in filteredProducts " :key="product.post_id" :product="product"></PostCard>
                </div>
            </div>
        </section>
    </main>
    <Footer></Footer>
</template>
    
<script setup lang="ts">
import { ref, onMounted, type Ref, watch, computed } from 'vue';
import NavBar from "../components/NavBar.vue";
import SearchBar from "../components/SearchBar.vue";
import Footer from "../components/Footer.vue";
import PostCard from "../components/PostCard.vue";
import { useRoute, type LocationQuery } from 'vue-router';
import type { Product } from "../interfaces/Product.ts";
import type { Genre } from '@/interfaces/Genre';

onMounted(() => {
    fetchGenres();
    getPosts();
})

const genreFilter: Ref<number> = ref(-1);
const genres: Ref<Genre[]> = ref([]);
const route = useRoute();
const products = ref<Array<Product>>([]);
const isLoading = ref(true);
const criteria: Ref<string> = ref("");

const filteredProducts = computed(() => {
    if (genreFilter.value === -1 && criteria.value === "") {
        return products.value;
    }
    else if (genreFilter.value !== -1 && criteria.value === "") {
        return products.value.filter((product: Product) => product.genre_id === genreFilter.value);
    }
    else if (genreFilter.value === -1 && criteria.value !== "") {

        const criteriaFilteredProducts = [...products.value];

        if (criteria.value === "A-Z") {
            return criteriaFilteredProducts.sort((a: Product, b: Product) => a.post_title.localeCompare(b.post_title));
        }
        else if (criteria.value === "Z-A") {
            return criteriaFilteredProducts.sort((a: Product, b: Product) => b.post_title.localeCompare(a.post_title));
        }
        else if (criteria.value === "priceDesc") {
            return criteriaFilteredProducts.sort((a: Product, b: Product) => a.post_price - b.post_price);
        }
        else if (criteria.value === "priceAsc") {
            return criteriaFilteredProducts.sort((a: Product, b: Product) => b.post_price - a.post_price);
        }
    }
    else if (genreFilter.value !== -1 && criteria.value !== "") {
        const criteriaFilteredProducts = [...products.value];

        if (criteria.value === "A-Z") {
            criteriaFilteredProducts.sort((a: Product, b: Product) => a.post_title.localeCompare(b.post_title));
        }
        else if (criteria.value === "Z-A") {
            criteriaFilteredProducts.sort((a: Product, b: Product) => b.post_title.localeCompare(a.post_title));
        }
        else if (criteria.value === "priceDesc") {
            criteriaFilteredProducts.sort((a: Product, b: Product) => b.post_price - a.post_price);
        }
        else if (criteria.value === "priceAsc") {
            criteriaFilteredProducts.sort((a: Product, b: Product) => a.post_price - b.post_price);
        }
        return criteriaFilteredProducts.filter((product: Product) => product.genre_id === genreFilter.value);
    }
}
);

function updateGenreFilter(id: number) {
    genreFilter.value = id;
}

const fetchGenres = async (): Promise<{ message: string, genres: Genre[] } | undefined> => {
    const response: Response = await fetch("http://localhost:8080/posts/genres");

    if (!response.ok) {
        return;
    }
    const data: { message: string, genres: Genre[] } = await response.json();
    genres.value = data.genres;

};

async function getPosts() {
    try {

        const response = await fetch(`http://localhost:8080/posts/query/${route.query.search}`);

        if (!response.ok) {
            console.log(response.status);
            return;
        }

        const data: { posts: Product[] } = await response.json();

        products.value = data.posts;
        isLoading.value = false;

    } catch (error) {
        console.error('Error al obtener los productos', error);
    }
}

watch(route, () => {
    getPosts();
}, { immediate: true, deep: true })

</script>
    
<style scoped>
input[type="submit"]:hover {
    background-color: white;
    color: #9f87f5;
    transition: all 0.2s ease-in-out;
}

input[type="submit"]:focus,
input[type="submit"]:hover {
    background-color: #9f87f5;
    color: white;
}
</style>
  
  