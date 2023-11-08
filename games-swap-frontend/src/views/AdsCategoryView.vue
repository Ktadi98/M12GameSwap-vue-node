<template>
  <div>

    <NavBar />
    <Platforms :platforms="platforms"></Platforms>
    <SearchBar />

    <!-- <div class="product-grid" v-if="isLoading">
      Cargando...
    </div> -->
    <div class="product-grid">
      <!-- Genres in separate component. -->
      <div class="genre-box" v-for="(genre, index) in genres" :key="genre.genre_id">
        <form @submit.prevent='updateGenreFilter(genre.genre_name, genre.genre_id)'>
          <input type="submit" :value="genre.genre_name">
        </form>
      </div>
      <form @submit.prevent='updateGenreFilter("test", 2)'>
        <input type="submit" value="Test">
      </form>
      <PostCard v-for="product in products" :key="product.post_id" :product="product"></PostCard>
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
const genreFilter: Ref<string | number> = ref(0);
const platforms: Ref<Platform[]> = ref([]);
const genres: Ref<Genre[]> = ref([]);
const route = useRoute();
const categoryId = ref(route.params.id);
const products = ref<Array<Product>>([]);
const isLoading = ref(true);
//let filteredProducts = computed<Product[]>(() => console.log("test"))

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
</style>
  