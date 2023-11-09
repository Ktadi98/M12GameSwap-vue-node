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
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #e1e1e1;
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.product-card img {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  object-position: center top;
}

.product-info {
  padding: 16px;
  text-align: left;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.product-name {
  font-size: 16px;
  color: #555;
}

.favorite-icon {
  color: #e53935;
  cursor: pointer;
  transition: color 0.2s;
}

.favorite-icon:hover {
  color: #c62828;
}

.product-name {
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.product-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-actions a {
  text-decoration: none;
  background-color: #2196F3;
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
}

.product-actions a:hover {
  background-color: #1976D2;
}
</style>

