<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import BackArrow from "@/components/Icons/BackArrow.vue";
import HeartLike from "@/components/Icons/HeartLike.vue";
import Footer from "@/components/Footer.vue";
import { ref } from "vue";


const articles = ref([
  {
    id: 1,
    name: "STALKER 2",
    price: 60,
    image: "https://cdn1.epicgames.com/offer/602a0ef0aceb46cca62445439661d712/EGS_STALKER2HeartofChornobyl_GSCGameWorld_S2_1200x1600-15b4c44396ad63e7dd881b3a5ef353cc"
  },
  {
    id: 2,
    name: "STALKER 2",
    price: 60,
    image: "https://cdn1.epicgames.com/offer/602a0ef0aceb46cca62445439661d712/EGS_STALKER2HeartofChornobyl_GSCGameWorld_S2_1200x1600-15b4c44396ad63e7dd881b3a5ef353cc"
  },
  {
    id: 3,
    name: "STALKER 2",
    price: 60,
    image: "https://cdn1.epicgames.com/offer/602a0ef0aceb46cca62445439661d712/EGS_STALKER2HeartofChornobyl_GSCGameWorld_S2_1200x1600-15b4c44396ad63e7dd881b3a5ef353cc"
  },
  {
    id: 4,
    name: "STALKER 2",
    price: 60,
    image: "https://cdn1.epicgames.com/offer/602a0ef0aceb46cca62445439661d712/EGS_STALKER2HeartofChornobyl_GSCGameWorld_S2_1200x1600-15b4c44396ad63e7dd881b3a5ef353cc"
  },
  {
    id: 5,
    name: "STALKER 2",
    price: 60,
    image: "https://cdn1.epicgames.com/offer/602a0ef0aceb46cca62445439661d712/EGS_STALKER2HeartofChornobyl_GSCGameWorld_S2_1200x1600-15b4c44396ad63e7dd881b3a5ef353cc"
  },
  {
    id: 6,
    name: "STALKER 2",
    price: 60,
    image: "https://cdn1.epicgames.com/offer/602a0ef0aceb46cca62445439661d712/EGS_STALKER2HeartofChornobyl_GSCGameWorld_S2_1200x1600-15b4c44396ad63e7dd881b3a5ef353cc"
  }
])

</script>
<template>
  <NavBar></NavBar>
  <div class="arrow-box" style="color: #8a6cf6">
    <BackArrow />
  </div>
  <h1>Mis productos favoritos</h1>
  <div class="sort-container">
    <select name="sort" id="sort">
      <option disabled selected>Ordenar por...</option>
      <option value="Descendiente">A ..Z</option>
      <option value="Ascendiente">Z...A</option>
      <option value="precio-desc">Precio mayor a menor</option>
      <option value="precio-asc">Precio menor a mayor</option>
    </select>
  </div>
  <main>
    <div class="articles-grid">
      <article v-for="article of articles" :key="article.id">
        <img
          class="article-image"
          :src="article.image"
          alt="portada"
        />
        <div class="article-body">
          <span class="produc-price">{{article.price}}€</span>
          <button class="like-heart">
            <HeartLike></HeartLike>
          </button>
        </div>
        <div class="article-footer"><h6>{{article.name}}</h6></div>
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

div.article-body button.like-heart{
  background:none; 
  border: 0px;
  padding: 0px;
  margin: 0px;
  width: min-content;
}

button.like-heart {
  color: #9F87F5;
}
button.like-heart:hover{
  color: transparent;
}

div.article-footer h6{
text-align: center;
font-weight: bold;
}

</style>
