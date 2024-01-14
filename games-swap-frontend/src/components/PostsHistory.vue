<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePostsHistoryStore } from '@/stores/postsHistory';
import Carousel from 'primevue/carousel';
import { ref } from "vue";
import PostCard from "../components/PostCard.vue";

const { history } = storeToRefs(usePostsHistoryStore());

</script>
<template>
    <template v-if="history.length">
        <h2 class="mt-4 mb-3 display-6 font-weight-bold">Productos visitados</h2>
        <section class="post-box container-fluid">
            <div class="row">
                <PostCard v-tooltip="'Ir al detalle'" v-for=" product in history" :key="product.post_id" :product="product">
                </PostCard>
            </div>
        </section>
    </template>
</template>

<style scoped></style>