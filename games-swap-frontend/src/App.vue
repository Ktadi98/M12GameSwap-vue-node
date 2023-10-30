<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal';
import { RouterView } from 'vue-router';
import AdDetail from './components/AdDetail.vue';
</script>

<template>
  
  <ModalsContainer />
  <RouterView />
  <AdDetail/>
</template>

<style scoped>
</style>
