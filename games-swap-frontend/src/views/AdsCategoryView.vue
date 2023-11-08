<template>
  <div>

    <NavBar />
    <Categories :categories="categories"></Categories>
    <SearchBar />

    <div class="product-grid" v-if="isLoading">
      Cargando...
    </div>
    <div class="product-grid" v-else>
      <PostCard v-for="product in products" :key="product.post_id" :product="product"></PostCard>
    </div>
    <Footer></Footer>
  </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, type Ref, onBeforeMount, watch } from 'vue';
import NavBar from "../components/NavBar.vue";
import SearchBar from "../components/SearchBar.vue";
import Footer from "../components/Footer.vue";
import PostCard from "../components/PostCard.vue";
import Categories from '@/components/Categories.vue';
import { useRoute } from 'vue-router';
import { usePlatformsStore } from '@/stores/platforms';
import type { Product } from "../interfaces/Product.ts";

interface Platform {
  platform_id: number,
  platform_name: string
}

//Load categories

const platformsStore = usePlatformsStore();

const categories: Ref<Platform[]> = ref(platformsStore.getPlatforms());

onBeforeMount(() => {
  platformsStore.fetchPlatforms();
})

onMounted(async () => {
  getPosts();
});

const route = useRoute();

const categoryId = ref(route.params.id);
const products = ref<Array<Product>>([]);
const isLoading = ref(true);

watch(route, () => {
  categoryId.value = route.params.id;
  getPosts();
}, { immediate: true, deep: true })

async function getPosts() {
  try {
    const response = await fetch(`http://localhost:8080/posts/category/${categoryId.value}`);

    if (!response.ok) {
      console.log(response.status);
    }

    const data: { message: string, posts: Product[] } = await response.json();

    products.value = data.posts;
    isLoading.value = false;

  } catch (error) {
    console.error('Error al obtener los productos', error);
  }
}




</script>
  
<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
</style>
  