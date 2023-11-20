<script setup lang="ts">
import type { Product } from '@/interfaces/Product';
import Bookmark from '@/components/Icons/BookMark.vue';
import Pencil from '@/components/Icons/Pencil.vue';
import PostDetail from './Icons/PostDetail.vue';
import TrashCan from '@/components/Icons/TrashBinIcon.vue';

const props = defineProps<{
    post: Product
}>()

</script>
<template>
    <article
        class="w-100 post-row d-flex flex-wrap position-relative flex-md-nowrap gap-2 align-items-center justify-content-start py-2 px-3">
        <div class="img-box">
            <img :src="props.post.post_photos[0]" alt="post-img">
        </div>
        <div class="info-box ms-4">
            <h3 class="price-box">{{ props.post.post_price }}€</h3>
            <p class="title-box">{{ props.post.post_title }}</p>
        </div>
        <div class="dates-box d-none d-lg-flex gap-2 mx-5 flex-grow-1">
            <div class="published d-flex flex-column">
                <h4>Actualizado</h4>
                <p>{{ props.post.post_created_at }}</p>
            </div>
            <div class="updated flex-cloumn">
                <h4>Publicado</h4>
                <p>{{ props.post.post_created_at }}</p>
            </div>
        </div>
        <div class="icons-box position-relative d-flex gap-2">
            <div class="icon-box">
                <Bookmark></Bookmark>
            </div>
            <div class="icon-box">
                <Pencil></Pencil>
            </div>
            <div class="icon-box">
                <RouterLink :to="{ name: 'adDetail', params: { id: props.post.post_id } }">
                    <PostDetail></PostDetail>
                </RouterLink>
            </div>
        </div>
        <div class="text-end ms-4 ms-md-0">
            <TrashCan></TrashCan>
        </div>
    </article>
</template>
<style scoped>
.img-box>img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
}

.title-box {
    font-size: 1.5rem;
}

.price-box {
    font-size: 2rem;
    font-weight: 700;
}

.published p,
.updated p,
.title-box {
    color: rgb(187, 187, 187);
}

.post-row {
    overflow: hidden;
}

.post-row,
.icon-box {
    background: rgba(255, 255, 255, 0.94);
    border-radius: 10px;
    border: 2px solid rgb(229, 229, 229);
    transition: all 0.2s ease-out;
    cursor: pointer;
}

.icon-box {
    height: 2.9rem;
}

.post-row>* {
    width: 30%;
}

.img-box {
    width: 100px;
}

.post-row:hover {
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
}
</style>