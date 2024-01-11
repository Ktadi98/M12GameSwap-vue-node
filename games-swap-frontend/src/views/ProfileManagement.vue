<template>
    <div>
        <NavBar>
        </NavBar>
        <main>
            <div>
                <div class="button-container">
                    <button class="rounded-button">Cambiar Contraseña</button>
                    <router-link to="/editUserData"> <button class="rounded-button">Cambiar Datos del Perfil</button></router-link>
                    <button class="rounded-button" @click="openMailbox">Buzón de sugerencias</button>
                    <button class="rounded-button" @click="openDeleteUser">Eliminar Cuenta</button>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
import {useModal} from 'vue-final-modal';
import SuggestionsMailbox from '@/components/SuggestionsMailbox.vue';
import DeleteUserProfile from '@/components/DeleteUserProfile.vue';

const router = useRouter();

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;


const sendData = () => {
    fetch(`${apiEndpoint}/users/delete`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            userId: JSON.parse(localStorage.getItem("id") ?? "1")
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            localStorage.removeItem("id");
            router.push({ name: 'home' });
        })
        .catch(error => console.error(error))
}


const { open:openMailbox, close: closeMailbox } = useModal({
    component: SuggestionsMailbox,
    attrs: {
        onConfirm() {
            openMailbox();
        },
        onCancel() {
            closeMailbox();
        },
    },
});

const { open: openDeleteUser, close: closeDeleteUser } = useModal({
    component: DeleteUserProfile,
    attrs: {
        onConfirm() {
            openDeleteUser();
        },
        onCancel() {
            closeDeleteUser();
        },
    },
});

</script>

<style scoped>
/* Estilos para los botones redondeados */
.rounded-button {
  display: block;
  margin: 20px auto; 
  padding: 8px 8px; 
  background-color: #9f87f5;
  color: #fff;
  border: none;
  border-radius: 10px; 
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.rounded-button:hover {
  background-color: #8a6cf6;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); 
}

/* Estilos para el contenedor de botones */
.button-container {
  text-align: center;
}
</style>