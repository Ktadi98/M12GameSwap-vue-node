<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { Product } from '@/interfaces/Product';

let showResults = ref(false);
let searchTerm = ref("");
let searchResults = ref<Product[]>([]);

let numberOfResults = computed(() => searchResults.value.length);

watch(searchTerm, (newVal) => {
  if (!newVal.trim()) {
    // Si searchTerm es una cadena vacía o solo espacios, limpia los resultados
    clearResults();
  }
});

function clearResults() {
  showResults.value = false;
  searchResults.value = [];
}

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

async function fetchResults() {

  if (searchTerm.value.length == 0) return;

  try {
    const response: Response = await fetch(`${apiEndpoint}/posts/query/${searchTerm.value.toLowerCase()}`, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: { posts: Product[] } = await response.json();

    searchResults.value = data.posts;

    showResults.value = true;
  }
  catch (error) {
    console.error(error);
  }
} 
</script> 

<template>
  <form class="d-flex mb-3 w-75 position-relative" @submit.prevent="fetchResults">
    <div class="search w-100 d-flex gap-2 flex-row align-items-center justify-content-center me-2">
      <div class="d-flex justify-content-center align-items-center">
        <img src="/imgs/search-icon.svg" alt="magnifying glass" />
      </div>
      <input type="search" @click.prevent="fetchResults" v-model.trim.lowercase="searchTerm"
        class="rounded-5 flex-grow-1 w-100" placeholder="Busca un producto" aria-label="Search" />
      <button class="button" type="submit">Buscar</button>
    </div>
    <section v-if="showResults && numberOfResults > 0 && searchTerm.length > 0"
      class="search-results-box w-100 z-1 position-absolute">
      <ul class="w-100 ">
        <li class="px-3 pt-3 pb-1" v-for="post in searchResults" :key="post.post_id">
          <RouterLink :to="{ name: 'searchResults', query: { search: searchTerm } }" @click.prevent="clearResults">
            <p class="post-title">{{ post.post_title }}</p>
            <p class="m-0 post-platform">{{ post.platform?.platform_name }}</p>
          </RouterLink>
        </li>
      </ul>
    </section>
    <section v-else-if="showResults && numberOfResults === 0"
      class="search-results-box py-2 w-100 text-center z-1 position-absolute">
      <p>No hay resultados coincidentes</p>
    </section>
  </form>
</template>

<style scoped>
button {
  width: fit-content
}

.search {
  width: 50px;
  height: 50px;
}

input {
  margin-bottom: 0;
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

.search-results-box {
  background: rgba(255, 255, 255, 0.94);
  border-radius: 10px;
  border: 2px solid rgb(229, 229, 229);
  transition: all 0.2s ease-out;
  cursor: pointer;
  bottom: -110px;
}

.search-results-box li {
  border-top: 1px solid rgb(229, 229, 229);
}

.search-results-box li:hover {
  background: rgb(229, 229, 229);
}

.post-title {
  font-size: larger;
  color: #9f87f5;
  font-weight: bold;
}

.post-platform {
  color: rgb(187, 187, 187);
}
</style>
