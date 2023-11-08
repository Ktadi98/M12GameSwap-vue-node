<template>
    <div>

      <NavBar />
      <SearchBar />
      <Categories></Categories>
      <div class="product-grid" v-if="isLoading">
        Cargando...
      </div>
      <div class="product-grid" v-else>
        <PostCard v-for="product in products" :key="product.post_id" :product="product" />
      </div> 
      <Footer />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import NavBar from "../components/NavBar.vue";
  import SearchBar from "../components/SearchBar.vue";
  import Footer from "../components/Footer.vue";
  import PostCard from "../components/PostCard.vue";
  import Categories from '@/components/Categories.vue';
  
  const categoryId = 1; 
  const products = ref<Array<Product>>([]);
  const isLoading = ref(true);
  
  interface Product {
    post_id: number;
    user_id: number;
    platform_id: number;
    genre_id: number;
    post_title: string;
    post_photos: Array<string>;
    post_description: string;
    post_condition: string;
    post_created_at: string;
    post_price: number;
    post_status: string;
  }
  
  onMounted(async () => {
    try {
      const response = await fetch(`http://localhost:8080/posts/category/${categoryId}`);
      if (response.ok) {
        const data: Array<Product> = await response.json();
        products.value = data;
        isLoading.value = false;
      } else {
        console.error('Error al obtener los productos');
      }
    } catch (error) {
      console.error('Error al obtener los productos', error);
    }
  });
  </script>
  
  <style scoped>
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  </style>
  