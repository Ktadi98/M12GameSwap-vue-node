<script setup lang="ts">
import Icon from '@/components/Icons/BackArrow.vue';
import Footer from './Footer.vue';
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
        <div id="ad-container">
            <router-link to="/" class="back-button">
               <div style="color: red">
                <Icon />
               </div>
            </router-link>
           
            <div id="photo-ad">
                <img src="" alt="">
            </div>
            <div id="ad-info">
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
        </div>
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

.main-content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.button-container {
    text-align: center;
}

.rounded-button {
    display: block;
    margin: 40px;
    padding: 15px 60px;
    background-color: #9f87f5;
    color: #fff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: color 0.3s, box-shadow 0.3s;
}

.rounded-button:hover {
    background-color: #8a6cf6;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.button-container button {
    width: 100%;
    text-align: center;
}


.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;
    color: #9f87f5;
}

.close-button:hover {
    color: #8a6cf6;
}

.suggestion-box {
    position: relative;
    text-align: center;
    margin-top: 20px;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 10px;
}

.suggestion-box h2 {
    color: #9f87f5;
}

.suggestion-box textarea {
    width: 100%;
    height: 100px;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.suggestion-box button {
    background-color: #9f87f5;
    color: #fff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.suggestion-box button:hover {
    background-color: #8a6cf6;
}
</style>