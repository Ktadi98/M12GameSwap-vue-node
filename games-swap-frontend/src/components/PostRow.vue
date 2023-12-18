<script setup lang="ts">
import type { Product } from '@/interfaces/Product';
import Bookmark from '@/components/Icons/BookMark.vue';
import Pencil from '@/components/Icons/Pencil.vue';
import PostDetail from './Icons/PostDetail.vue';
import ReviewIcon from './Icons/ReviewIcon.vue';
import TrashCan from '@/components/Icons/TrashBinIcon.vue';
import { useModal } from 'vue-final-modal';
import DeletePostModal from './DeletePostModal.vue';
import RemoveReserveModal from './RemoveReserveModal.vue';
import type { Purchase } from '@/interfaces/Purchase';
import BookMarkRemove from './Icons/BookMarkRemove.vue';
import ShoppingCart from './Icons/ShoppingCart.vue';
import type { Reservation } from '@/interfaces/Reservation';

const props = defineProps<{
    sell?: Purchase,
    post: Product,
    purchased?: Boolean,
    reserved?: Boolean
    selled?: Boolean
    purchaseDate?: Date
}>()

const emit = defineEmits<{
    deletePost: [post: Product],
    deleteReservation: []
}>()

function drop() {
    emit('deletePost', props.post);
}

function dropReservation() {
    emit('deleteReservation');
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

const { open: openRemoveReserveModal, close: closeRemoveReserveModal } = useModal({
    component: RemoveReserveModal,
    attrs: {
        onConfirm() {
            closeRemoveReserveModal();
            dropReservation();
        },
        onCancel() {
            closeRemoveReserveModal();
        },
        post_image: props.post.post_photos[0],
        post_title: props.post.post_title
    }
});

function formatPurchaseDate() {

    const dayOfPurchase: number | undefined = props.purchaseDate?.getDate();
    const monthOfPurchase: number = (props.purchaseDate?.getMonth()) as number + 1;
    const yearOfPurchase: number | undefined = props.purchaseDate?.getFullYear();

    return `${dayOfPurchase}/${monthOfPurchase}/${yearOfPurchase}`;
}

function formatCreationDate(date: string) {
    let formattedDate = date.substring(0, 10);
    return formattedDate.split("-").reverse().join("-").substring(0, 10);
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
        <div v-if="!purchased && !selled && !reserved" class="dates-box d-none d-lg-flex gap-2 mx-5 flex-grow-1">
            <div class="published d-flex flex-column">
                <h4>Actualizado</h4>
                <p>{{ formatCreationDate(props.post.post_created_at) }}</p>
            </div>
            <div class="updated flex-cloumn">
                <h4>Publicado</h4>
                <p>{{ formatCreationDate(props.post.post_created_at) }}</p>
            </div>
        </div>
        <div v-else-if="purchased && !selled">
            <p>Comprado el {{ formatPurchaseDate() }}</p>
            <RouterLink :to="{ name: 'vendor', params: { id: post.user_client?.user_id } }">
                <p> a {{ post.user_client?.user_name }}</p>
            </RouterLink>
        </div>
        <div v-else-if="reserved && !purchased && !selled">
            <p>Reservado el {{ formatPurchaseDate() }}</p>
            <RouterLink :to="{ name: 'vendor', params: { id: post.user_client?.user_id } }">
                <p> a {{ post.user_client?.user_name }}</p>
            </RouterLink>
        </div>
        <div v-else>
            <p>Vendido el {{ formatPurchaseDate() }}</p>
            <RouterLink :to="{ name: 'vendor', params: { id: sell?.user?.user_id } }">
                <p> a {{ sell?.user?.user_name }}</p>
            </RouterLink>

        </div>
        <div v-if="!purchased && !selled && !reserved" class="icons-box position-relative d-flex gap-2">
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
        <div v-if="!purchased && !selled && !reserved" class="text-end ms-4 ms-md-0" @click="openDeleteModal">
            <TrashCan></TrashCan>
        </div>
        <RouterLink v-else-if="purchased && !post.post_reviewed"
            :to="{ name: 'review', params: { postId: props.post.post_id }, query: { postName: props.post.post_title } }">
            <div class="text-end ms-4 ms-md-0">
                <ReviewIcon></ReviewIcon>
            </div>
        </RouterLink>
        <section class="reservation-options-box d-flex flex-column flex-md-row gap-2"
            v-else-if="reserved && !purchased && !post.post_reviewed">
            <div class="icon-box reserve d-flex py-1 px-2" @click="openRemoveReserveModal">
                <div class="d-flex">
                    <p>Cancelar Reserva</p>
                    <BookMarkRemove></BookMarkRemove>
                </div>
            </div>
            <div class="icon-box reserve d-flex py-1 px-2">
                <div class="d-flex ">
                    <p> Tramitar compra</p>
                    <RouterLink to="/">
                        <ShoppingCart></ShoppingCart>
                    </RouterLink>
                </div>
            </div>
        </section>
    </article>
</template>
<style scoped>
.reserve:hover {
    background-color: #9f87f5;
    color: white;
}

.reservation-options-box {
    color: #9f87f5;
}

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

.icon-box:not(.reserve) {
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