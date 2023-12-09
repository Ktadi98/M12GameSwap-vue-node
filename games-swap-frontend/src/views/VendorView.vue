<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
const props = defineProps<{
    id: number,
}>()
</script>
<template>
    <NavBar></NavBar>
    <h1>Vendor View</h1>
    <h2>{{ id }}</h2>
</template>
<style scoped></style>