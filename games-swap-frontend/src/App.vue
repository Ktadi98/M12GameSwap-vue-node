<script setup lang="ts">
import { onMounted } from 'vue';
import { ModalsContainer } from 'vue-final-modal';
import { RouterView } from 'vue-router';
import { useRankingStore } from '@/stores/ranking';

//Getting the top vendors when the app mounts 
//TODO: Get genres and platforms.

const { fetchTopVendors } = useRankingStore();

onMounted(() => {
  fetchTopVendors();
})

</script>

<template>
  <ModalsContainer />
  <RouterView />
</template>

<style scoped></style>
