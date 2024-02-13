<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import HeartLike from "@/components/Icons/HeartLike.vue";
import Footer from "@/components/Footer.vue";
import { computed, onMounted, ref, type ComputedRef, type Ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import useCustomToast from "@/composables/useCustomToast";
import ErrorMessages from '@/components/ErrorMessages.vue';


const articles = ref<any[]>([]);
const authStore = useAuthStore();
const loading = ref<boolean>(true);
const error = ref<boolean>(false);
const errorMessages: Ref<string[]> = ref([]);

const fetchFavorites = async () => {

  error.value = false;
  errorMessages.value = [];
  loading.value = true;

  try {
    const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
    const resp = await fetch(`${apiEndpoint}/users/favorites`, {
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${authStore.token}`
      }
    })
    const data = await resp.json()
    articles.value = data
  } catch (err) {
    console.error(err);
    error.value = true;
    errorMessages.value.push("No se ha podido cargar tu lista de anuncios favoritos. Por favor, inténtalo más tarde.");
  }
  finally {
    loading.value = false;
  }


}

onMounted(async () => {
  await fetchFavorites()
})

const { triggerToast } = useCustomToast("¡Producto eliminado de tu lista de favoritos!");

const removeFavorite = async (id: number) => {
  const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
  await fetch(`${apiEndpoint}/users/favorites`, {
    method: 'put',
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${authStore.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ post_id: id })
  })
  await fetchFavorites()
  triggerToast();
}

const activeSort = ref<string | null>(null)
const sortedArticles = computed<any>(() => {
  const sortParam = activeSort.value?.split("-")[0]
  const sortOrder = activeSort.value?.split("-")[1]

  const result = (activeSort && sortParam && sortOrder) ? [...articles.value.sort((a, b) => {
    if (sortOrder == "asc") {
      if (a[sortParam] > b[sortParam]) return 1
      if (a[sortParam] < b[sortParam]) return -1
      return 0
    }
    if (a[sortParam] < b[sortParam]) return 1
    if (a[sortParam] > b[sortParam]) return -1
    return 0
  })] : articles.value

  return result
})

const handleFilter = (value: string) => {
  activeSort.value = value
}

const items = ref([
  { label: 'Home', route: '/' },
  { label: 'Perfil ', route: '/profileManagement' },
  { label: 'Favoritos' }
]);

</script>
<template>
  <NavBar></NavBar>
  <div class="ms-4">
    <BreadCrumbs :items="items"></BreadCrumbs>
  </div>
  <h1>Mis productos favoritos</h1>
  <div class="sort-container me-4">
    <select name="sort" id="sort" @change="handleFilter(($event as any).target.value)">
      <option disabled selected>Ordenar por...</option>
      <option value="post_title-asc">A ..Z</option>
      <option value="post_title-desc">Z...A</option>
      <option value="post_price-desc">Precio mayor a menor</option>
      <option value="post_price-asc">Precio menor a mayor</option>
    </select>
  </div>
  <main>
    <div v-if="sortedArticles.length > 0" class="articles-grid">
      <article v-for="article of sortedArticles" :key="article.post_id">
        <img class="article-image" :src="`data:image/png;base64, ${article.post_photos[0]}`" alt="portada" />
        <div class="article-body">
          <span class="produc-price">{{ article.post_price }}€</span>
          <button v-tooltip.top="'Eliminar de favoritos'" class="like-heart" @click="removeFavorite(article.post_id)">
            <HeartLike></HeartLike>
          </button>
        </div>
        <div class="article-footer">
          <h6>{{ article.post_title }}</h6>
        </div>
      </article>
    </div>
    <div v-else-if="!loading && !error && sortedArticles.length === 0">
      No hay productos en tu lista
      <div>
        <img src="@/assets/not_data_outline.gif" alt="not found GIF">
      </div>
    </div>
    <ErrorMessages :messages="errorMessages"></ErrorMessages>
  </main>
  <Footer></Footer>
</template>
<style scoped>
.arrow-box {
  cursor: pointer;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  margin: 1rem 0rem 1rem 0rem;
}

div.sort-container {
  text-align: right;
  margin-bottom: 1rem;
}

main {
  display: flex;
  justify-content: center;
}

.articles-grid {
  display: grid;
  width: 90rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  column-gap: 1rem;
  row-gap: 1rem;
  align-content: center;
}

article {
  display: flex;
  flex-direction: column;
  width: auto;
  border: 1px solid rgb(227, 227, 227);
  border-radius: 15px;
  overflow: hidden;
}

article img.article-image {
  height: 18rem;
  width: auto;
  object-fit: cover;
}

article div.article-body {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

div.article-body button.like-heart {
  background: none;
  border: 0px;
  padding: 0px;
  margin: 0px;
  width: min-content;
}

button.like-heart {
  color: #9F87F5;
}

button.like-heart:hover {
  color: transparent;
}

div.article-footer h6 {
  text-align: center;
  font-weight: bold;
}
</style>
