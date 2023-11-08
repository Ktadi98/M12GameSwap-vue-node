<template>
  <div>

    <NavBar />
    <Platforms :platforms="platforms"></Platforms>
    <SearchBar />

    <!-- <div class="product-grid" v-if="isLoading">
      Cargando...
    </div> -->
    <div class="product-grid">
      <select @change="updateCriteriaFilter" v-model="criteria">
        <option value="Todos">Todos</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A" selected>Z-A</option>
        <option value="priceDesc">Precio (menor a mayor)</option>
        <option value="priceAsc">Precio (mayor a menor)</option>
      </select>
      <!-- Genres in separate component. -->
      <div class="genre-box" v-for="(genre, index) in  genres " :key="genre.genre_id">
        <form @submit.prevent='updateGenreFilter(genre.genre_name, genre.genre_id)'>
          <input :class="{ 'input-active': genreFilter === genre.genre_id }" type="submit" :value="genre.genre_name">
        </form>
      </div>
      <div class="genre-box">
        <form @submit.prevent='genreFilter = -1'>
          <input type="submit" value="Restaurar">
        </form>
      </div>

      <PostCard v-for=" product  in  filteredProducts " :key="product.post_id" :product="product"></PostCard>
    </div>
    <Footer></Footer>
  </div>
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
import type { Platform } from '@/interfaces/Platform';
import type { Genre } from '@/interfaces/Genre';

onMounted(() => {
  fetchPlatforms();
  fetchGenres();
  getPosts();
})

//const platformsStore = usePlatformsStore();
const genreFilter: Ref<number> = ref(-1);
const platforms: Ref<Platform[]> = ref([]);
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

//Filters
// function applyFilters(): Product[] {
//   filteredProducts = products.value;

//   if (genreFilter.value !== "") {
//     filteredProducts = [...products.value.filter(product => product.genre_id === genreFilter.value)]
//   }

//   return filteredProducts;
// }

function updateGenreFilter(genre_name: string, id: number) {
  genreFilter.value = id;
  console.log(genreFilter.value);
  //applyFilters();
}

function updateCriteriaFilter() {

}

const fetchPlatforms = async (): Promise<{ message: string, categories: Platform[] } | undefined> => {
  const response: Response = await fetch("http://localhost:8080/posts/categories");

  if (!response.ok) {
    return;
  }
  const data: { message: string, categories: Platform[] } = await response.json();
  platforms.value = data.categories;

};

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

    const response = await fetch(`http://localhost:8080/posts/category/${categoryId.value}`);

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

watch(route, () => {
  categoryId.value = route.params.id;
  getPosts();
}, { immediate: true, deep: true })

</script>
  
<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

span {
  cursor: pointer;
}

.genre-box {
  width: 100%;
}

span {
  width: 100%;
}

.input-active {
  background-color: #9f87f5;
  ;
}
</style>
  