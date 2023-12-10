<template>
  <NavBar />
  <Platforms :platforms="platformsStore.platforms"></Platforms>
  <main class="d-flex flex-column gap-2 justify-content-center align-items-center px-5 mt-5">
    <SearchBar />
    <section class="filters-section w-100 d-flex flex-row gap-5 justify-content-center">
      <form class="genre-box" v-for="(genre, index) in genres " :key="genre.genre_id"
        @submit.prevent='updateGenreFilter(genre.genre_id)'>
        <input :class="{ 'input-active': genreFilter === genre.genre_id }" type="submit" :value="genre.genre_name">
      </form>
      <form class="genre-box" @submit.prevent='genreFilter = -1'>
        <input type="submit" value="Todos">
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
    <section class="post-box container-fluid">
      <div v-if="products.length > 0" class="row gap-3 w-100">
        <PostCard v-for=" product in filteredProducts" :key="product.post_id" :product="product"></PostCard>
      </div>
      <div v-else>
        <h2>No hay anuncios disponibles para esta categoria. Échale un vistazo a las demás.</h2>
      </div>
    </section>
  </main>
  <Footer></Footer>
</template>
  
<script setup lang="ts">
import { ref, onMounted, type Ref, onBeforeMount, watch, computed } from 'vue';
import NavBar from "../components/NavBar.vue";
import SearchBar from "../components/SearchBar.vue";
import Footer from "../components/Footer.vue";
import PostCard from "../components/PostCard.vue";
import Platforms from '@/components/Platforms.vue';
import { useRoute } from 'vue-router';
import { usePlatformsStore } from '@/stores/platforms';
import type { Product } from "../interfaces/Product.ts";
import type { Genre } from '@/interfaces/Genre';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';


const { token, userIsLoggedIn } = storeToRefs(useAuthStore());

onMounted(() => {

})



const platformsStore = usePlatformsStore();
platformsStore.fetchPlatforms();


const genreFilter: Ref<number> = ref(-1);
const genres: Ref<Genre[]> = ref([]);
const route = useRoute();
const categoryId = ref(route.params.id);
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

    const response = await fetch(`${apiEndpoint}/posts/category/${categoryId.value}`);

    if (!response.ok) {
      console.log(response.status);
      return;
    }

    const data: { message: string, posts: Product[] } = await response.json();

    products.value = data.posts;
    isLoading.value = false;

  } catch (error) {
    console.error('Error al obtener los productos', error);
  }
}

async function getPostsLogIn() {
  try {

    const response = await fetch(`${apiEndpoint}/posts/category/auth/${categoryId.value}`, {
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

    const data: { message: string, posts: Product[] } = await response.json();

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
  categoryId.value = route.params.id;
  genreFilter.value = -1;
  if (!userIsLoggedIn.value) {
    getPosts();
  }
  else {
    getPostsLogIn();
  }
  // getPosts();
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

