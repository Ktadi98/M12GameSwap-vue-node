<template>
  <div>

    <NavBar />
    <Platforms :platforms="platformsStore.platforms"></Platforms>
    <SearchBar />

    <!-- <div class="product-grid" v-if="isLoading">
      Cargando...
    </div> -->
    <div class="product-grid">
      <select v-model="criteria">
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
import type { Genre } from '@/interfaces/Genre';

onMounted(() => {
  fetchGenres();
  getPosts();
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



function updateGenreFilter(genre_name: string, id: number) {
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

.input-active {
  background-color: #9f87f5;
}
</style>

