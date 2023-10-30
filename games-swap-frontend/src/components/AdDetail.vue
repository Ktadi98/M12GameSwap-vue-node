<script setup lang="ts">
import Icon from '@/components/Icons/BackArrow.vue';
import Footer from './Footer.vue';
import StarRating from './Icons/StarRating.vue';
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
        <main class="ad-container">
            <div class="profile-vendor">
                <div class="profile-image">
                    <img src="@/assets/avatar-profile.svg" alt="Profile Image">
                </div>
                <div class="profile-name">userName</div>
                <div style="color: #8a6cf6;" class="rating">
                   <StarRating/> (16)
                </div>
            </div>
        
            <div id="ad-info">
                <img class="photo-ad" src="https://cdn.wallapop.com/images/10420/fp/vu/__/c10420p950469346/i3569368343.jpg?pictureSize=W640" alt="spiderman videojuego">
                <h1>
                    price €
                </h1>
                <h2>Titulo anuncio</h2>
                <h3>Estado del producto</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur doloribus labore atque id facilis ratione aut quae dignissimos cupiditate! Vel magni, ea in fuga itaque aspernatur necessitatibus error quisquam incidunt.</p>
                <div>
                    <h3>Sigue explorando</h3>
                    <span class="category-tag">tag1</span>
                    <span class="category-tag">tag2</span>
                    <span class="category-Tag">tag3</span>
                </div>
            </div>
        </main>
        <Footer/>
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

.logo img{
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

.back-arrow{
height: 50px;
width: 50px;

}

main{
    display: flex;
}

.ad-container{
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

img.photo-ad{
height: 500px;
width: 850px;
}

</style>