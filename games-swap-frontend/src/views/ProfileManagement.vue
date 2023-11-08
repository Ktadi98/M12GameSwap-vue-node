<template>
    <div>
        <header class="header">
            <router-link to="/" class="back-button">
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
                    <button class="rounded-button">Cambiar Contraseña</button>
                    <button class="rounded-button">Cambiar Datos del Perfil</button>
                    <form @submit.prevent="sendData">
                        <button type="submit" class="rounded-button">Eliminar Cuenta</button>
                    </form>
                    <!-- <button class="rounded-button" @click="toggleSuggestionBox">Buzón de Sugerencias</button> -->
                </div>
            </div>
            <!-- <div v-if="showSuggestionBox" class="suggestion-box">
                <button class="close-button" @click="toggleSuggestionBox">X</button>
                <h2>Deja tus sugerencias</h2>
                <form @submit="submitSuggestion">
                    <textarea v-model="suggestion" placeholder="Escribe tu sugerencia aquí"></textarea>
                    <button type="submit" class="rounded-button">Enviar Sugerencia</button>
                </form>
            </div> -->
        </main>
    </div>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const sendData = () => {
    fetch("http://localhost:8080/users/delete", {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            //??: Coalescense operator, if the value is null we put a valueby default
            userId: JSON.parse(localStorage.getItem("id") ?? "1")
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            localStorage.removeItem("id");

            //If the deletion was resolved, we redirect to the home page.
            router.push({ name: 'home' });
        })
        .catch(error => console.error(error))
}

</script>
  
<style scoped>
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
  