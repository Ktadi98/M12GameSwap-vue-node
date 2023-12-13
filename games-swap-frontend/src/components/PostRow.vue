<script setup lang="ts">
import type { Product } from '@/interfaces/Product';
import Bookmark from '@/components/Icons/BookMark.vue';
import Pencil from '@/components/Icons/Pencil.vue';
import PostDetail from './Icons/PostDetail.vue';
import ReviewIcon from './Icons/ReviewIcon.vue';
import TrashCan from '@/components/Icons/TrashBinIcon.vue';
import { useModal } from 'vue-final-modal';
import DeletePostModal from './DeletePostModal.vue';

const props = defineProps<{
    post: Product
    purchased?: Boolean,
    purchaseDate?: Date
}>()

const emit = defineEmits<{
    deletePost: [post: Product]
}>()

function drop() {
    emit('deletePost', props.post);
}

const { open: openDeleteModal, close } = useModal({
    component: DeletePostModal,
    attrs: {
        onConfirm() {
            close();
            drop();
        },
        onCancel() {
            close();
        },
        post_image: props.post.post_photos[0],
        post_title: props.post.post_title
    }
});

function formatPurchaseDate() {
    return `${props.purchaseDate?.getDay()}/${props.purchaseDate?.getMonth()}/${props.purchaseDate?.getFullYear()}`;
}

function formatCreationDate(date: string) {

    let formattedDate = date.substring(0, 9);
    return formattedDate.split("-").reverse().join("-").substring(0, 9);
}


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
        <div v-if="!purchased" class="dates-box d-none d-lg-flex gap-2 mx-5 flex-grow-1">
            <div class="published d-flex flex-column">
                <h4>Actualizado</h4>
                <p>{{ formatCreationDate(props.post.post_created_at) }}</p>
            </div>
            <div class="updated flex-cloumn">
                <h4>Publicado</h4>
                <p>{{ formatCreationDate(props.post.post_created_at) }}</p>
            </div>
        </div>
        <div v-else>
            <p>Comprado el {{ formatPurchaseDate() }}</p>
        </div>
        <div v-if="!purchased" class="icons-box position-relative d-flex gap-2">
            <div class="icon-box">
                <Bookmark></Bookmark>
            </div>
            <div class="icon-box">
                <RouterLink :to="{
                    name: 'updatePost', query:
                    {
                        id: props.post.post_id,
                        title: props.post.post_title,
                        description: props.post.post_description,
                        platform: props.post.platform?.platform_name,
                        price: props.post.post_price,
                        state: props.post.post_condition
                    }
                }">
                    <Pencil></Pencil>
                </RouterLink>

            </div>
            <div class="icon-box">
                <RouterLink :to="{ name: 'adDetail', params: { id: props.post.post_id } }">
                    <PostDetail></PostDetail>
                </RouterLink>
            </div>
        </div>
        <div v-if="!purchased" class="text-end ms-4 ms-md-0" @click="openDeleteModal">
            <TrashCan></TrashCan>
        </div>
        <RouterLink v-else-if="purchased && !post.post_reviewed"
            :to="{ name: 'review', params: { postId: props.post.post_id }, query: { postName: props.post.post_title } }">
            <div class="text-end ms-4 ms-md-0">
                <ReviewIcon></ReviewIcon>
            </div>
        </RouterLink>
    </article>
</template>
<style scoped>
.img-box {
    width: 150px;
    border-radius: 10px;
}

.img-box>img {
    width: 150px;
    height: 150px;
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


.post-row:hover {
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
}
</style>