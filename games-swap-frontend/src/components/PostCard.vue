<template>
  <RouterLink class="col-6 col-md-4 col-lg-2" :to="{ name: 'adDetail', params: { id: props.product.post_id } }">
    <div class="product-card w-100" v-if="product">
      <div class="w-75 img-box">
        <img :src="props.product.post_photos[0]" alt="Product Image">
      </div>
      <div class="product-info w-100 px-3 py-2">
        <div class="product-name">{{ props.product.post_title }}</div>
        <div class="product-price">{{ props.product.post_price }}€</div>
        <div class="favorite-icon" @click="toggleFavorite">
          <i class="fas fa-heart" :class="{ 'favorited': isFavorited }"></i>
        </div>
        <Chip :label="props.product.genre?.genre_name"></Chip>
        <div v-if="props.product.post_reserved" class="purple icon-box px-2  reserve-box">
          <BookMarkFilledAlt></BookMarkFilledAlt><span>Reservado</span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import type { Product } from '@/interfaces/Product';
import Chip from 'primevue/chip';
import BookMarkFilledAlt from './Icons/BookMarkFilledAlt.vue';
import { useAuthStore } from '@/stores/auth';

const props = defineProps<{
  product: Product
}>()

const { userIsLoggedIn, token } = useAuthStore();

let isFavorited = ref(false);

const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value;
};

</script>

<style scoped>
.heart-box {
  background: none;
  border: 0px;
  padding: 0px;
  margin: 0px;
  width: min-content;
  z-index: 999;
}

.heart-box>* {
  font-size: x-large;
}

.reserve-box {
  position: absolute;
  top: -30px;
  left: 10px;
}

.img-box {
  overflow: hidden;
  height: 20vw;
}

.img-box>img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.product-card {
  border: 1px solid #e1e1e1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  overflow: hidden;
  min-height: 20vw;
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
  align-self: start;
  text-align: left;
  position: relative;
}

.product-price {
  font-weight: bold;
  font-size: 34px;
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

.p-chip {
  background-color: #9f87f5;
  color: white;

}

.purple {
  color: #795aea;
}

.icon-box {
  background: rgba(255, 255, 255, 0.94);
  border-radius: 10px;
  border: 2px solid rgb(229, 229, 229);
  transition: all 0.2s ease-out;
  cursor: pointer;
}

@media screen and (max-width: 700px) {
  .img-box {
    height: 600px;
  }
}

@media screen and (max-width: 668px) {
  /* .img-box {
    height: 600px;
  } */

  .product-card {
    height: 400px;
  }
}
</style>

