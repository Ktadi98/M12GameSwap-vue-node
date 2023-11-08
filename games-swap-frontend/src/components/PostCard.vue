<template>
  <div class="product-card" v-if="product">
    <img :src="props.product.post_photos[0]" alt="Product Image">
    <div class="product-info">
      <div class="product-price">{{ props.product.post_price }}</div>
      <div class="favorite-icon" @click="toggleFavorite">
        <i class="fas fa-heart" :class="{ 'favorited': isFavorited }"></i>
      </div>
      <div class="product-name">{{ props.product.post_title }}</div>
    </div>
    <RouterLink :to="{ name: 'adDetail', params: { id: props.product.post_id } }">Detalle</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

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

const props = defineProps<{
  product: Product
}>()

let isFavorited = ref(false);

const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value;
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.product-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-price {
  font-weight: bold;
}

.favorite-icon {
  color: red;
  cursor: pointer;
}

.favorite-icon.favorited {
  color: pink;
}

.product-name {
  margin-top: 10px;
}
</style>
