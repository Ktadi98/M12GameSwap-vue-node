<script setup lang="ts">
import type { Product } from '@/interfaces/Product';


const props = defineProps<{
    post: Product
}>()

</script>
<template>
    <article class="post-row">
        <h2>{{ props.post.post_title }}</h2>
    </article>
</template>
<style scoped>
.post-row {
    background: rgba(255, 255, 255, 0.94);
    border-radius: 10px;
    backdrop-filter: blur(6.6px);
    -webkit-backdrop-filter: blur(6.6px);
    border: 2px solid rgba(255, 255, 255, 0.31);
    transition: all 0.2s ease-out;
}

.post-row:hover {
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
}
</style>