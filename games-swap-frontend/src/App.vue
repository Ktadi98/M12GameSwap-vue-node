<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal';
import { RouterView } from 'vue-router';
import ControlPanel from './views/ControlPanel.vue';

</script>

<template>
  <ModalsContainer />
  <RouterView />
  <ControlPanel/>
</template>

<style scoped></style>
