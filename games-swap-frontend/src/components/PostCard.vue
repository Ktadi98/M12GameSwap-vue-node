<template>
  <RouterLink class="col-12 col-md-4 col-lg-3" :to="{ name: 'adDetail', params: { id: props.product.post_id } }">
    <div class="product-card" v-if="product">
      <div class="img-box">
        <img :src="props.product.post_photos[0]" alt="Product Image">
      </div>
      <div class="product-info">
        <div class="product-name">{{ props.product.post_title }}</div>
        <div class="product-price">{{ props.product.post_price }}€</div>
        <div class="favorite-icon" @click="toggleFavorite">
          <i class="fas fa-heart" :class="{ 'favorited': isFavorited }"></i>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import type { Product } from '@/interfaces/Product';

const props = defineProps<{
  product: Product
}>()

let isFavorited = ref(false);

const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value;
};
</script>

<style scoped>
.img-box {
  overflow: hidden;
}

.img-box>img {
  width: 100%;
  height: auto;
}

.product-card {
  border: 1px solid #e1e1e1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.product-card-image {
  text-align: center;
  margin-bottom: 10px;
}

.product-info {
  text-align: center;
}

.product-price {
  font-weight: bold;
  font-size: 18px;
  color: #333;
  margin-bottom: 8px;
}

favorite-icon {
  color: #e53935;
  cursor: pointer;
  transition: color 0.2s;
}

favorite-icon.favorited {
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

