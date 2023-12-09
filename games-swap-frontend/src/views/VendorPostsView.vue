<script setup lang="ts">
import type { Product } from '@/interfaces/Product';
import { onMounted, ref } from 'vue';
import PostCard from '@/components/PostCard.vue';
const props = defineProps<{
    id: number,
}>()

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
const posts = ref<Product[]>([]);


onMounted(async () => {
    try {
        const response: Response = await fetch(`${apiEndpoint}/posts/vendor/${props.id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: { posts: Product[] } = await response.json();

        posts.value = data.posts;
    } catch (error) {
        console.error(error);
    }
})
</script>
<template>
    <section class="post-box container-fluid">
        <div v-if="posts.length > 0" class="row">
            <PostCard v-for="post in posts" :key="post.post_id" :product="post"></PostCard>
        </div>
        <div v-else>
            <h2>No hay anuncios disponibles.</h2>
        </div>
    </section>
</template>
<style scoped></style>