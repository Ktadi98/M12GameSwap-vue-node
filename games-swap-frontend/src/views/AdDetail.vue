<script setup lang="ts">
import BackArrow from '@/components/Icons/BackArrow.vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Footer from '../components/Footer.vue';
import StarRating from '../components/Icons/StarRating.vue';
import NavBar from '@/components/NavBar.vue';
import type { Product } from '@/interfaces/Product';

const route = useRoute();
const router = useRouter();

//To use in fetch request
const post_id = route.params.id;

let adDetail = ref<Product | null | any>(null as any);
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

onMounted(async () => {

    try {
        const response: Response = await fetch(`${apiEndpoint}/posts/${post_id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: { post: Product } = await response.json();
        adDetail.value = data.post;
        console.log(adDetail.value);
    }
    catch (error) {
        console.error(error);
    }
})

</script>

<template>
    <NavBar></NavBar>
    <div class="arrow-box" style="color: #8a6cf6" @click="router.back()">
        <BackArrow />
    </div>
    <!-- falta devolver datos del vendedor para pintarlos aqui -->
    <main class="ad-container">
        <div class="profile-vendor">
            <div class="profile-image">
                <img src="@/assets/avatar-profile.svg" alt="Profile Image">
            </div>
            <RouterLink :to="{ name: 'vendor', params: { id: adDetail?.user_client?.user_id } }">
                <h2 class="profile-name">{{ adDetail?.user_client?.user_name }}</h2>
            </RouterLink>
            <!-- El rating de donde sale? -->
            <div style="color: #8a6cf6;" class="rating">
                <StarRating /> (16)
            </div>
        </div>

        <div id="ad-info">
            <div class="img-box mb-3">
                <img :src="adDetail?.post_photos[0]" :alt="adDetail?.post_title">
            </div>
            <h1 class="post_price">{{ adDetail?.post_price }} €</h1>
            <h2 class="post_title">{{ adDetail?.post_title }}</h2>
            <h2 class="post_condition"> Estado: {{ adDetail?.post_condition }}</h2>
            <p class="post_description">{{ adDetail?.post_description }}</p>
            <div class="other-interests">
                <h3>Sigue explorando</h3>
                <span class="category-tag">PS5</span>
                <span class="category-tag">Aventura</span>
                <span class="category-tag">Acción</span>
            </div>
        </div>
    </main>
    <Footer></Footer>
</template>

<style scoped>
.img-box {
    width: 100%;
    overflow: hidden;
}

.img-box>img {
    border-radius: 10px;
    width: 500px;
    height: auto;
}

.arrow-box {
    cursor: pointer;
}

header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin: 0;
    align-items: center;
    border-bottom: 1px solid #8a6cf6;

}

.logo img {
    width: 100px;
    height: 100px;
}

.profile-info {
    display: flex;
    align-items: center;
    justify-content: end;
    flex: 1;
    border: 1px;
    border-color: black;
    color: black;
}

.profile-image img {
    width: 50px;
    height: 50px;
    border-radius: 50%;

}

.profile-name {
    margin-left: 5px;
    color: #8a6cf6;
}

.back-arrow {
    height: 50px;
    width: 50px;

}

main.ad-container {
    display: block;
    margin: 0 auto;
    margin-bottom: 8rem;
}

.ad-container {
    border: 1px solid #8a6cf6;
    border-radius: 3%;
    width: 70rem;
    flex-direction: column;
    padding-top: 20px;
    padding-left: 50px;
    padding-right: 50px;
    margin: auto;
    border-bottom: 1px solid #8a6cf6;
    display: inline-block;
    margin-bottom: 6em;
}

h1.post_price {
    color: #8a6cf6;
    text-align: left;
    font-size: 2.5em;
}

h2.post_title {
    margin-bottom: 50px;
    color: #8a6cf6;
    text-transform: capitalize;
}

h2.post_condition {
    color: #8a6cf6;
    margin-bottom: 30px;
}

p.post_description {
    margin-bottom: 30px;
    font-size: 1.5rem;
}

.other-interests {
    border: 1px solid #8a6cf6;
    border-radius: 20px;
    background-color: #EFEFEF;
    display: inline-block;
    padding: 20px 50px;
    width: 100%;
    margin: auto;
}

h3 {
    font-weight: 200;
    font-size: 1.3rem;
}

.category-tag {
    background-color: #8a6cf6;
    color: white;
    border-radius: 20px;
    height: auto;
    padding: 10px;
    margin-right: 5px;
    font-weight: bold;
    font-size: 1rem;
    display: inline-block;
}

#ad-info {
    margin-bottom: 50px;
}
</style>