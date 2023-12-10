<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import VendorSummary from '@/components/VendorSummary.vue';
</script>
<template>
    <NavBar></NavBar>
    <h1>User profile</h1>
    <VendorSummary></VendorSummary>
    <RouterLink :to="{ name: 'purchases' }">Compras</RouterLink>
    <RouterView></RouterView>
</template>

<style scoped></style>