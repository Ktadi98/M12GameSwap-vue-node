<template>
    <NavBar />
    <main class="d-flex flex-column gap-2 justify-content-center align-items-center px-5 mt-5">
        <SearchBar />
        <Divider></Divider>
        <BreadCrumbs :items="items"></BreadCrumbs>
        <Divider></Divider>
        <section class="filters-section w-100 d-flex flex-row gap-5 justify-content-start">
            <form class="genre-box" v-for="(genre, index) in genres " :key="genre.genre_id"
                @submit.prevent='updateGenreFilter(genre.genre_id)'>
                <input :class="{ 'input-active': genreFilter === genre.genre_id }" type="submit" :value="genre.genre_name">
                <component class="genreIcon" :is="genreToIcon[genre.genre_name]"></component>
            </form>
            <form class="genre-box" @submit.prevent='genreFilter = -1'>
                <input type="submit" value="Todos">
            </form>
        </section>
        <Divider></Divider>
        <div class="w-100 criteria-box align-self-left">
            <Dropdown v-model="criteria" :options="filterCriterias" placeholder="Selecciona un filtro" />
            <!-- <select v-model="criteria">
                <option value="A-Z">A-Z</option>
                <option value="Z-A" selected>Z-A</option>
                <option value="priceDesc">Precio (menor a mayor)</option>
                <option value="priceAsc">Precio (mayor a menor)</option>
            </select> -->
        </div>
        <section class="post-box container-fluid">
            <div v-if="filteredProducts?.length" class="row">
                <PostCard v-tooltip="'Ir al detalle'" v-for="product in filteredProducts" :key="product.post_id"
                    :product="product"></PostCard>
            </div>
            <div v-else>
                <h2>No hay anuncios disponibles para esta búsqueda. Prueba a buscar otra cosa.</h2>
            </div>
        </section>
        <VendorsRanking></VendorsRanking>
        <PostsHistory></PostsHistory>
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
import type { Product } from "../interfaces/Product";
import type { Genre } from '@/interfaces/Genre';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import Dropdown from 'primevue/dropdown';
import Divider from 'primevue/divider';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import VendorsRanking from "../components/VendorsRanking.vue";
import PostsHistory from "@/components/PostsHistory.vue";
import RPGIcon from '@/components/Icons/RPGIcon.vue';
import LuchaIcon from '@/components/Icons/LuchaIcon.vue';
import IndieIcon from '@/components/Icons/IndieIcon.vue';
import PuzzleIcon from '@/components/Icons/PuzzleIcon.vue';
import PlataformasVue from '@/components/Icons/Plataformas.vue';
import AccionIcon from '@/components/Icons/AccionIcon.vue';
import AventuraIcon from '@/components/Icons/AventuraIcon.vue';

onMounted(() => {
    // fetchGenres();
    // getPosts();
})

const { token, userIsLoggedIn } = storeToRefs(useAuthStore());

const genreFilter: Ref<number> = ref(-1);
const genres: Ref<Genre[]> = ref([]);
const route = useRoute();
const products = ref<Array<Product>>([]);
const isLoading = ref(true);
const criteria: Ref<string> = ref("A-Z");

const genreToIcon: any = {
    "RPG": RPGIcon,
    "Indie": IndieIcon,
    "Lucha": LuchaIcon,
    "Plataformas": PlataformasVue,
    "Puzzle": PuzzleIcon,
    "Acción": AccionIcon,
    "Aventura": AventuraIcon
}

const items = ref([
    { label: 'Home', route: '/' },
    { label: 'Anuncios ' },
]);
const filterCriterias = ref<string[]>([
    "A-Z",
    "Z-A",
    "priceDesc",
    "priceAsc"
]);


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

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

const fetchGenres = async (): Promise<{ message: string, genres: Genre[] } | undefined> => {
    const response: Response = await fetch(`${apiEndpoint}/posts/genres`);

    if (!response.ok) {
        return;
    }
    const data: { message: string, genres: Genre[] } = await response.json();
    genres.value = data.genres;

};

async function getPosts() {
    try {

        const response = await fetch(`${apiEndpoint}/posts/query/${route.query.search}`);

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

async function getPostsLogIn() {
    try {

        const response = await fetch(`${apiEndpoint}/posts/query/auth/${route.query.search}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token.value}`
            }
        });

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

fetchGenres();
if (!userIsLoggedIn.value) {
    getPosts();
}
else {
    getPostsLogIn();
}

watch(route, () => {
    fetchGenres();
    if (!userIsLoggedIn.value) {
        getPosts();
    }
    else {
        getPostsLogIn();
    }
    genreFilter.value = -1;
}, { immediate: true, deep: true })

</script>

<style>
.p-breadcrumb {
    width: fit-content !important;
    padding: 5px !important;
}

.p-breadcrumb-home {
    display: none;
}

.p-breadcrumb-list {
    margin: 0;
    padding: 0;
}

.p-dropdown:not(.p-disabled):hover {
    border-color: #9f87f5;
}

.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
    color: black;
    background: #c1b2f7;
}

.p-dropdown:not(.p-disabled).p-focus {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: 0 0 0 0.2rem #c1b2f7;
    border-color: #9f87f5;
}
</style>

    
<style scoped>
.genre-box {
    background-color: white;
    color: #9f87f5;
    transition: all 0.2s ease-in-out;
    border: 2px solid #9f87f5;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: min-content;
    padding: 0px 15px;

}

.genre-box:focus,
.genre-box:hover {
    background-color: #9f87f5;
    color: white;
}

.genreIcon {
    width: fit-content;
}

input[type="submit"] {
    border: none;
    background: none;
    color: inherit;
}
</style>
  
  