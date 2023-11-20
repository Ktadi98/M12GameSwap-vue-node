<script setup lang="ts">
import { RouterLink } from "vue-router";
import PS4 from "./Icons/PS4.vue";
import PS5 from "./Icons/PS5.vue";
import PS3 from "./Icons/PS3.vue";
import Switch from "./Icons/Switch.vue";
import XONE from "./Icons/XONE.vue";
import SeriesXS from "./Icons/SeriesXS.vue";
import Retro from "./Icons/Retro.vue";
import type { Platform } from "../interfaces/Platform";

const props = defineProps<{
  platforms: Platform[]
}>();

const nameToIcons: any = {
  "PS4": PS4,
  "PS5": PS5,
  "PS3": PS3,
  "Nintendo Switch": Switch,
  "Xbox One": XONE,
  "Xbox Series X/S": SeriesXS,
  "Retro": Retro
}

</script>
<template>
  <section class="categories py-4 w-100">
    <ul class="d-flex flex-column flex-md-row w-100 gap-4 justify-content-center align-items-center">
      <li v-for="category in props.platforms" :key="category.platform_id">
        <RouterLink class="svg-link" :to="{ name: 'adsCategory', params: { id: category.platform_id } }">
          <component :is="nameToIcons[category.platform_name]"></component>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.categories {
  border-bottom: 0.5px solid #e4e1e1;
  padding: 5px 10px 5px 10px;
}
</style>
