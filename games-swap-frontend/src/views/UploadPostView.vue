<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import AppBar from '@/components/AppBar.vue';

</script>
<template>
    <NavBar></NavBar>
    <header class="responsive-text text-xl text-left text-md-center px-2 py-1">Tu nuevo producto</header>
    <main class="px-4 py-3">
    </main>
    <AppBar></AppBar>
</template>
<style scoped>
@media (max-width: 576px) {

    /* Estilos de texto para pantallas más pequeñas */

    header {
        background-color: #9f87f5;
        color: white;
    }

    .responsive-text {
        font-size: 14px;
    }
}

.responsive-text {
    font-size: 2.5rem;
}

header {
    background-color: white;
    color: #9f87f5;
}
</style>
