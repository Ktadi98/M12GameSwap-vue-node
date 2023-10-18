  
<template>
    <div>
      <header class="header">
        <router-link to="/HomeView" class="back-button">
          <img src="@/assets/arrow.svg" alt="Back">
        </router-link>
        <div class="profile-info">
          <div class="profile-image">
            <img src="@/assets/avatar-profile.svg" alt="Profile Image">
          </div>
          <div class="profile-name">userName</div>
        </div>
      </header>
      <main class="main-content">
        <div id="ProfileManagement">
          <div class="button-container">
            <button class="rounded-button">Recuperar Contraseña</button>
            <button class="rounded-button">Cambiar Datos del Perfil</button>
            <button class="rounded-button">Eliminar Cuenta</button>
            <button class="rounded-button" @click="toggleSuggestionBox">Buzón de Sugerencias</button>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  </template>
  
  <script setup lang="ts">
  import Footer from "../components/Footer.vue";
  import { RouterLink, RouterView } from "vue-router";
  
  let suggestion = "";
  let showSuggestionBox = false;
  
  const submitSuggestion = () => {
    console.log("Sugerencia enviada:", suggestion);
    suggestion = "";
  };
  
  const toggleSuggestionBox = () => {
    showSuggestionBox = !showSuggestionBox;
  };
  </script>
  
<style scoped>
/* Estilos comunes */
.header {
    background-color: #9f87f5;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin: 0;
    align-items: center;
}

.back-button {
    background: none;
    border: none;
    cursor: pointer;
}

.back-button img {
    width: 30px;
    height: 30px;
    fill: #fff;
    transition: transform 0.3s;
}

.back-button:hover img {
    transform: scale(1.2);
}

.profile-info {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
}

.profile-image img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.profile-name {
    color: #fff;
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

/* Estilo de los botones */
.rounded-button {
    display: block;
    margin: 40px;
    padding: 15px 60px;
    background-color: #9f87f5;
    color: #fff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;
}

.rounded-button:hover {
    background-color: #8a6cf6;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.button-container button {
    width: 100%;
    text-align: center;
}
</style>