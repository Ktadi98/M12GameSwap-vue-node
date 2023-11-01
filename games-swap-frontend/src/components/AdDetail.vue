<script setup lang="ts">
import Icon from '@/components/Icons/BackArrow.vue';
import Footer from './Footer.vue';
import StarRating from './Icons/StarRating.vue';
import { onMounted, ref } from 'vue';

const props = defineProps(['adId'])

let adDetail = ref(null as any)

onMounted(async () => {
    const data = await fetch(`http://localhost:8080/posts/${props.adId}`).then(res => res.json())
    adDetail.value = data
})

</script>

<template>
    <header>

        <div class="logo">
            <img src="@/assets/logo.png" alt="logo">
        </div>
        <div class="profile-info">
            <div class="profile-image">
                <img src="@/assets/avatar-profile.svg" alt="Profile Image">
            </div>
            <div class="profile-name">userName</div>
        </div>
    </header>
    <div style="color: #8a6cf6">
        <Icon />
    </div>
    <!-- falta devolver datos del vendedor para pintarlos aqui -->
    <main class="ad-container">
        <div class="profile-vendor">
            <div class="profile-image">
                <img src="@/assets/avatar-profile.svg" alt="Profile Image">
            </div>
            <div class="profile-name">userName</div>
            <!-- El rating de donde sale? -->
            <div style="color: #8a6cf6;" class="rating">
                <StarRating /> (16)
            </div>
        </div>

        <div id="ad-info">
            <!-- Hay que poner fotos -->
            <img class="photo-ad" :src="adDetail?.post_photos[0]" :alt="adDetail?.post_title">
            <h1>
                {{ adDetail?.post_price }} €
            </h1>
            <h2>{{ adDetail?.post_title }}</h2>
            <h3>{{ adDetail?.post_condition }}</h3>
            <p>{{ adDetail?.post_description }}</p>
            <div class="other-interests">
                <h3>Sigue explorando</h3>
                <span class="category-tag">PS5</span>
                <span class="category-tag">Aventura</span>
                <span class="category-tag">Acción</span>
            </div>
        </div>
    </main>
    <Footer />
</template>

<style>
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

main {
    display: flex;
}

.ad-container {
    border: 1px solid #8a6cf6;
    border-radius: 3%;
    height: 50rem;
    width: 70rem;
    flex-direction: column;
    padding-top: 20px;
    padding-left: 50px;
    padding-right: 50px;
    margin: auto;
    border-bottom: 1px solid #8a6cf6;

}

img.photo-ad {
    height: 500px;
    width: 850px;
}

h1 {

    display: inline-block;
    color: #8a6cf6;
}



.other-interests {
    border: 1px solid black;
    border-radius: 3%;
    background-color: #EFEFEF;
    display: inline-block;

    padding-top: 20px;
    padding-left: 50px;
    padding-right: 50px;
    height: 30em;
    margin: auto;
}

.category-tag {
    background-color: #8a6cf6;
    color: white;
    border-radius: 15%;
    height: auto;
    padding: 10px;
    margin-right: 5px;
    font-weight: bold;
}
</style>