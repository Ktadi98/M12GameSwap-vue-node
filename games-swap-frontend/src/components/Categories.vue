<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
<template>
  <div class="categories">
    <ul class="d-flex flex-row w-100 gap-4 justify-content-center">
      <li>
        <RouterLink to="/"
          >PS5
          <!-- <img src="/imgs/ps5.png" alt="ps5-logo" /> -->
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/">PS4</RouterLink>
      </li>
      <li>
        <RouterLink to="/">XBOX</RouterLink>
      </li>
      <li>
        <RouterLink to="/">SWITCH</RouterLink>
      </li>
      <li>
        <RouterLink to="/"></RouterLink>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.categories {
  border-bottom: 0.5px solid #e4e1e1;
  padding: 5px 10px 5px 10px;
}

.categories li {
  font-size: 2rem;
}

.categories li a:hover {
  color: #9f87f5;
}
</style>
