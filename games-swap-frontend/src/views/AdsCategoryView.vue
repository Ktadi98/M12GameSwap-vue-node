<template>
  <NavBar />
  <Platforms></Platforms>
  <main class="d-flex flex-column gap-2 justify-content-center align-items-center px-5 mt-5">
    <SearchBar />
    <Divider></Divider>
    <BreadCrumbs :items="items"></BreadCrumbs>
    <Divider></Divider>
    <section class="filters-section w-100 d-flex flex-row gap-5 justify-content-start">
      <form class="genre-box" v-for="(genre, index) in genres " :key="genre.genre_id"
        @submit.prevent='updateGenreFilter(genre.genre_id)'>
        <div class="genre-div">
          <input :class="{ 'input-active': genreFilter === genre.genre_id }" type="submit" :value="genre.genre_name">
          <component class="genreIcon" :is="genreToIcon[genre.genre_name]"></component>
        </div>
      </form>
      <form class="genre-div" @submit.prevent='genreFilter = -1'>
        <input type="submit" value="Todos">
      </form>
    </section>
    <Divider></Divider>
    <div class="w-100 criteria-box align-self-left">
      <Dropdown v-model="criteria" :options="filterCriterias" placeholder="Selecciona un filtro" />
    </div>
    <section class="post-box container-fluid">
      <div v-if="products.length > 0" class="row">
        <PostCard v-tooltip="'Ir al detalle'" v-for=" product in filteredProducts" :key="product.post_id"
          :product="product"></PostCard>
      </div>
      <div v-else-if="isLoading">
        <div class="card flex justify-content-center">
          <ProgressSpinner />
        </div>
      </div>
      <div class="text-center" v-else>
        <h2>No hay anuncios disponibles para esta categoria. Échale un vistazo a las demás.</h2>
        <div>
          <img src="@/assets/no_data_found_GIF.gif" alt="not found GIF">
        </div>
      </div>
    </section>
    <VendorsRanking></VendorsRanking>
    <PostsHistory></PostsHistory>
  </main>
  <Footer></Footer>
</template>
  
<script setup lang="ts">
import { ref, onMounted, type Ref, onBeforeMount, watch, computed } from 'vue';
import NavBar from "../components/NavBar.vue";
import SearchBar from "../components/SearchBar.vue";
import Footer from "../components/Footer.vue";
import PostCard from "../components/PostCard.vue";
import Platforms from '@/components/Platforms.vue';
import { useRoute } from 'vue-router';
import type { Product } from "../interfaces/Product.ts";
import type { Genre } from '@/interfaces/Genre';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import Dropdown from 'primevue/dropdown';
import RPGIcon from '@/components/Icons/RPGIcon.vue';
import Divider from 'primevue/divider';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import VendorsRanking from "../components/VendorsRanking.vue";
import PostsHistory from "@/components/PostsHistory.vue";
import ProgressSpinner from 'primevue/progressspinner';
import LuchaIcon from '@/components/Icons/LuchaIcon.vue';
import IndieIcon from '@/components/Icons/IndieIcon.vue';
import PuzzleIcon from '@/components/Icons/PuzzleIcon.vue';
import PlataformasVue from '@/components/Icons/Plataformas.vue';
import AccionIcon from '@/components/Icons/AccionIcon.vue';
import AventuraIcon from '@/components/Icons/AventuraIcon.vue';

const { token, userIsLoggedIn } = storeToRefs(useAuthStore());

const items = ref([
  { label: 'Home', route: '/' },
  { label: 'Anuncios ' },
]);

const genreFilter: Ref<number> = ref(-1);
const genres: Ref<Genre[]> = ref([]);
const route = useRoute();
const categoryId = ref(route.params.id);
const products = ref<Array<Product>>([]);
const isLoading = ref<boolean>(true);
const criteria: Ref<string> = ref("A-Z");


const genreToIcon: any = {
  "RPG": RPGIcon,
  "Indie": IndieIcon,
  "Lucha": LuchaIcon,
  "Plataformas": PlataformasVue,
  "Puzzle": PuzzleIcon,
  "Acción": AccionIcon,
  "Aventura": AventuraIcon
}

const filterCriterias = ref<string[]>([
  "A-Z",
  "Z-A",
  "priceDesc",
  "priceAsc"
]);

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

function updateGenreFilter(id: number) {
  genreFilter.value = id;
}

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;


const fetchGenres = async (): Promise<{ message: string, genres: Genre[] } | undefined> => {
  const response: Response = await fetch(`${apiEndpoint}/posts/genres`);

  if (!response.ok) {
    return;
  }
  const data: { message: string, genres: Genre[] } = await response.json();
  genres.value = data.genres;

};

async function getPosts() {
  try {

    const response = await fetch(`${apiEndpoint}/posts/category/${categoryId.value}`);

    if (!response.ok) {
      console.log(response.status);
      isLoading.value = false;
      return;
    }

    const data: { message: string, posts: Product[] } = await response.json();

    products.value = data.posts;

  } catch (error) {
    console.error('Error al obtener los productos', error);
  }
  finally {
    isLoading.value = false;

  }
}

async function getPostsLogIn() {
  try {

    const response = await fetch(`${apiEndpoint}/posts/category/auth/${categoryId.value}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token.value}`
      }
    });

    if (!response.ok) {
      console.log(response.status);
      return;
    }

    const data: { message: string, posts: Product[] } = await response.json();

    products.value = data.posts;
    // isLoading.value = false;
  } catch (error) {
    console.error('Error al obtener los productos', error);
  }
  finally {
    isLoading.value = false;
  }
}

fetchGenres();

//If the user is logged in we don't need to retrieve his posts.
if (!userIsLoggedIn.value) {
  getPosts();
}
else {
  getPostsLogIn();
}

watch(route, () => {

  categoryId.value = route.params.id;

  genreFilter.value = -1;

  if (!userIsLoggedIn.value) {
    //Getting all the posts of the system (which are not buyed and actived).
    getPosts();
  }
  else {
    //Getting all the posts that don't belong to the current user.
    getPostsLogIn();
  }
}, { immediate: true, deep: true })

</script>
<style>
.p-dropdown:not(.p-disabled):hover {
  border-color: #9f87f5;
}

.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
  color: black;
  background: #c1b2f7;
}

.p-dropdown:not(.p-disabled).p-focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 0.2rem #c1b2f7;
  border-color: #9f87f5;
}
</style>
<style scoped>
.genre-div {
  background-color: white;
  color: #9f87f5;
  transition: all 0.2s ease-in-out;
  border: 2px solid #9f87f5;
  border-radius: 10px;
  display: flex;
  align-items: center;
  height: min-content;
  padding: 0px 15px;

}

.genre-div:focus,
.genre-div:hover {
  background-color: #9f87f5;
  color: white;
}

.genreIcon {
  width: fit-content;
}

input[type="submit"] {
  border: none;
  background: none;
  color: inherit;
}

.post-box {
  padding: 5vw;
}

h1 {
  text-align: left;
  background-color: #8a6cf6;
  width: 100%;
  color: white;
  font-weight: bold;
  border-radius: 10px;
}

/* .criteria-box * {
  border-color: #9f87f5 !important;
} */
</style>

