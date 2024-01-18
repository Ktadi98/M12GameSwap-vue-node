<script setup lang="ts">
import { RouterLink } from "vue-router";
import PS4 from "./Icons/PS4.vue";
import PS5 from "./Icons/PS5.vue";
import PS3 from "./Icons/PS3.vue";
import Switch from "./Icons/Switch.vue";
import XONE from "./Icons/XONE.vue";
import SeriesXS from "./Icons/SeriesXS.vue";
import Retro from "./Icons/Retro.vue";
import { usePlatformsStore } from "@/stores/platforms";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const { platforms, grouped } = storeToRefs(usePlatformsStore());

const nameToIcons: any = {
  "PS4": PS4,
  "PS5": PS5,
  "PS3": PS3,
  "Nintendo Switch": Switch,
  "Xbox One": XONE,
  "Xbox Series X/S": SeriesXS,
  "Retro": Retro
}

const hover = ref<boolean[]>([false, false, false, false, false, false, false]);
</script>
<template>
  <section class="categories py-4 vh-25 w-100">
    <ul class="d-flex flex-column flex-md-row w-100 gap-4 justify-content-center align-items-center">
      <li v-for="(category, index) in grouped" :key="category.platform_id">
        <RouterLink class="svg-link" :to="{ name: 'adsCategory', params: { id: category.platform_id } }">
          <div @mouseover="hover[index] = true" @mouseleave="hover[index] = false"
            class="d-flex flex-column justify-content-around align-items-center icon-box">
            <component :is="nameToIcons[category.platform_name]"></component>
            <!-- <p class="mb-0 platform-count" v-show="hover[index]">({{ category.platform_count }})</p> -->
          </div>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.icon-box {
  position: relative;
}

.icon-box {
  transition: all 0.2s ease-in-out;
  height: 100px;
}

.icon-box:hover {
  transform: translate(0, -6px);
  color: #9f87f5;
}


.icon-box .platform-count {
  position: absolute;
  opacity: 0;
  top: 10%;
  transition: all 0.2s ease-in-out;
}

.icon-box:hover .platform-count {
  opacity: 1;
  top: 80px;
}

.icon-box:hover>* {
  color: #9f87f5;
}

.icon-box p {
  opacity: 0.5;
}
</style>
