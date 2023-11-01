<template>
    <div class="product-card">
      <img :src="product.image" alt="Product Image">
      <div class="product-info">
        <div class="product-price">{{ product.price }}</div>
        <div class="favorite-icon" @click="addToFavorites">
          <i class="fas fa-heart" :class="{ 'favorited': isFavorited }"></i>
        </div>
        <div class="product-name">{{ product.name }}</div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      product: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        isFavorited: false,
      };
    },
    methods: {
      addToFavorites() {
        this.isFavorited = !this.isFavorited;
        // Puedes implementar la lógica para agregar o quitar de favoritos aquí
      },
    },
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
  