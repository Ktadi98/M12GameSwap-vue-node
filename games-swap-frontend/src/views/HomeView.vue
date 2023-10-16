<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import NavBar from "../components/NavBar.vue";
import Categories from "../components/Categories.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <NavBar></NavBar>
  <Categories></Categories>
  <main class="d-flex flex-column flex-grow-1 justify-content-center align-items-center">
    <div class="jumbotron jumbotron-fluid text-center my-4">
      <div class="container">
        <h1 class="display-4 font-weight-bold">Aquí encontrarás lo que buscas</h1>
        <p>Compra y vende juegos y consolas de segunda mano en GameSwap.</p>
      </div>
    </div>
    <form class="d-flex mb-5 w-75">
      <div class="search d-flex flex-colum align-items-center justify-content-center me-2">
        <img src="/imgs/search-icon.svg" alt="magnifying glass" />
      </div>

      <input
        class="form-control me-2 rounded-5"
        type="search"
        placeholder="Busca un producto"
        aria-label="Search"
      />

      <button class="button" type="submit">Buscar</button>
    </form>

    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active overflow-hidden">
          <img src="/imgs/ps4.jpg" class="d-block mw-25 w-100 m" alt="ps4-image" />
        </div>
        <div class="carousel-item overflow-hidden">
          <img src="/imgs/gboy.webp" class="d-block mw-25 w-100" alt="gboyadv-image" />
        </div>
        <div class="carousel-item overflow-hidden">
          <img src="/imgs/snes.jpg" class="d-block w-100" alt="snes-image" />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div class="jumbotron jumbotron-fluid text-center my-4">
      <div class="container">
        <p>Súmergete en una comunidad fantástica para hacer realidad tus sueños</p>
      </div>
    </div>
  </main>
  <Footer></Footer>
</template>
<style setup>
main {
  padding: 20px;
}

.search {
  background-color: #9f87f5;
  border-radius: 50%;
  width: 50px;
  height: 50px;
}

.jumbotron p {
  font-size: 2rem !important;
  font-weight: 300;
}

.carousel-inner {
  width: 800px;
  max-width: 800px;
}

input::placeholder {
  font-size: 1.2rem;
}

input:focus,
input[type]:focus,
.uneditable-input:focus {
  border: 2px solid black;
  outline: none !important;
  box-shadow: none;
}
</style>
