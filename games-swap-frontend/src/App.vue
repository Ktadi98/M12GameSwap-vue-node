<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal';
import { RouterView } from 'vue-router';
import AdDetail from './components/AdDetail.vue';
</script>

<template>
  <ModalsContainer />
  <RouterView />
  <!-- <AdDetail ad-id="2" /> -->
</template>

<style scoped></style>
