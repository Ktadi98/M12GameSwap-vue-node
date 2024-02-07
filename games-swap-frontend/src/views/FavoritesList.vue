<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import BackArrow from "@/components/Icons/BackArrow.vue";
import HeartLike from "@/components/Icons/HeartLike.vue";
import Footer from "@/components/Footer.vue";
import { computed, onMounted, ref, type ComputedRef, type Ref } from "vue";
import { useAuthStore } from "@/stores/auth";


const articles = ref<any[]>([])
const authStore = useAuthStore()

const fetchFavorites = async () => {
  const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
  const resp = await fetch(`${apiEndpoint}/users/favorites`, {
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${authStore.token}`
    }
  })
  const data = await resp.json()
  articles.value = data
}

onMounted(async () => {
  await fetchFavorites()
})

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

</script>
<template>
  <NavBar></NavBar>
  <div class="arrow-box" style="color: #8a6cf6">
    <BackArrow />
  </div>
  <h1>Mis productos favoritos</h1>
  <div class="sort-container">
    <select name="sort" id="sort" @change="handleFilter(($event as any).target.value)">
      <option disabled selected>Ordenar por...</option>
      <option value="post_title-asc">A ..Z</option>
      <option value="post_title-desc">Z...A</option>
      <option value="post_price-desc">Precio mayor a menor</option>
      <option value="post_price-asc">Precio menor a mayor</option>
    </select>
  </div>
  <main>
    <div class="articles-grid">
      <article v-for="article of sortedArticles" :key="article.post_id">
        <img class="article-image" :src="`data:image/png;base64, ${article.post_photos[0]}`" alt="portada" />
        <div class="article-body">
          <span class="produc-price">{{ article.post_price }}€</span>
          <button class="like-heart" @click="removeFavorite(article.post_id)">
            <HeartLike></HeartLike>
          </button>
        </div>
        <div class="article-footer">
          <h6>{{ article.post_title }}</h6>
        </div>
      </article>
    </div>
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
  border: 1px solid black;
}

article img.article-image {
  height: 15rem;
  width: auto;
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
