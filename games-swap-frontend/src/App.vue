<script setup lang="ts">
import { onMounted } from 'vue';
import { ModalsContainer } from 'vue-final-modal';
import { RouterView } from 'vue-router';
import { useRankingStore } from '@/stores/ranking';
import { usePlatformsStore } from './stores/platforms';

//Getting the top vendors when the app mounts.
//Getting genres and platforms.

const { fetchTopVendors } = useRankingStore();
const { fetchPlatforms } = usePlatformsStore();

onMounted(() => {
  fetchTopVendors();
  fetchPlatforms();
})

</script>

<template>
  <ModalsContainer />
  <RouterView />
</template>

<style scoped></style>
