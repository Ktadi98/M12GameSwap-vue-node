<template>
  <div class="product-card" v-if="product">
    <img :src="product.post_photos[0]" alt="Product Image">
    <div class="product-info">
      <div class="product-price">{{ product.post_price }}</div>
      <div class="favorite-icon" @click="toggleFavorite">
        <i class="fas fa-heart" :class="{ 'favorited': isFavorited }"></i>
      </div>
      <div class="product-name">{{ product.post_title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

const props = defineProps({
  product: Object,
});

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
