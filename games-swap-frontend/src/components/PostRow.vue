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
import BookMarkFilledAlt from './Icons/BookMarkFilledAlt.vue';
import ShoppingCart from './Icons/ShoppingCart.vue';
import type { Reservation } from '@/interfaces/Reservation';
import useCustomToast from '@/composables/useCustomToast';

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

const { triggerToast } = useCustomToast("Anuncio eliminado correctamente.")

const { open: openDeleteModal, close } = useModal({
    component: DeletePostModal,
    attrs: {
        onConfirm() {
            close();
            drop();

            triggerToast();
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
    <!-- <template v-if="!post.post_buyed">

    </template> -->
    <article
        class="w-100 post-row mt-3 d-flex flex-wrap position-relative flex-md-nowrap gap-2 align-items-center justify-content-start py-2 px-3">
        <div class="img-box">
            <img :src="props.post.post_photos[0]" alt="post-img">
        </div>
        <div class="info-box ms-4">
            <h3 class="price-box">{{ props.post.post_price }}€</h3>
            <p class="title-box">{{ props.post.post_title }}</p>
        </div>
        <!-- Rendering information for user post list -->
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
        <!-- Rendering information for user buyed products in his profile -->
        <div class="flex-grow-2" v-else-if="purchased && !selled">
            <p>Comprado el {{ formatPurchaseDate() }}</p>
            <RouterLink :to="{ name: 'vendor', params: { id: post.user_client?.user_id } }">
                <p class="underline"> a {{ post.user_client?.user_name }}</p>
            </RouterLink>
        </div>
        <!-- Rendering information for user reservations in his profile -->
        <div v-else-if="reserved && !purchased && !selled">
            <p>Reservado el {{ formatPurchaseDate() }}</p>
            <RouterLink :to="{ name: 'vendor', params: { id: post.user_client?.user_id } }">
                <p class="underline"> a {{ post.user_client?.user_name }}</p>
            </RouterLink>
        </div>
        <!-- Rendering information for user sells in his profile -->
        <div v-else>
            <p>Vendido el {{ formatPurchaseDate() }}</p>
            <RouterLink :to="{ name: 'vendor', params: { id: sell?.user?.user_id } }">
                <p class="underline"> a {{ sell?.user?.user_name }}</p>
            </RouterLink>
        </div>
        <!-- Rendering product detail for the post list view of the user-->
        <div v-if="!purchased && !selled && !reserved" class="icons-box position-relative d-flex gap-2">
            <div v-tooltip.top="'No reservado'" v-if="!post.post_reserved" class="icon-box reservation">
                <Bookmark></Bookmark>
            </div>
            <div v-tooltip.top="'Reservado'" v-else class="purple icon-box">
                <BookMarkFilledAlt></BookMarkFilledAlt>
            </div>
            <div class="icon-box">
                <RouterLink v-tooltip.top="'Actualizar anuncio'" :to="{
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
                <RouterLink v-tooltip.right="'Detalle del anuncio'"
                    :to="{ name: 'adDetail', params: { id: props.post.post_id } }">
                    <PostDetail></PostDetail>
                </RouterLink>
            </div>
        </div>
        <div v-tooltip.bottom="'Eliminar anuncio'" v-if="!purchased && !selled && !reserved"
            class="text-center ms-4 ms-md-0" @click="openDeleteModal">
            <TrashCan></TrashCan>
        </div>
        <!-- Rendering information for user buyed products that can be reviewed -->
        <RouterLink v-else-if="purchased && !post.post_reviewed && !sell"
            :to="{ name: 'review', params: { postId: props.post.post_id }, query: { postName: props.post.post_title } }">
            <div v-tooltip="'Escribe una reseña'" class="text-end ms-4 ms-md-0">
                <ReviewIcon></ReviewIcon>
            </div>
        </RouterLink>
        <!-- Rendering information for user products that had been already reserved -->
        <section class="reservation-options-box d-flex flex-column flex-md-row gap-2"
            v-else-if="reserved && !purchased && !post.post_reviewed">
            <div class="icon-box reserve d-flex py-1 px-2" @click="openRemoveReserveModal">
                <div class="d-flex">
                    <p>Cancelar Reserva</p>
                    <BookMarkRemove></BookMarkRemove>
                </div>
            </div>
            <div class="icon-box reserve d-flex py-1 px-2">
                <router-link :to="{name:'cart', query: {id:props.post.post_id, title:props.post.post_title, photo: props.post.post_photos[0], price:props.post.post_price} }" >
                <div class="d-flex ">
                    Tramitar compra
                        <ShoppingCart></ShoppingCart>    
                </div>
                </router-link>
            </div>
        </section>
    </article>
</template>
<style>
/*Vue star color */
.p-rating-icon {
    color: #9F87F5;
}
</style>
<style scoped>
a {
    color:inherit;
}
.purple {
    color: #795aea;
}

.underline {
    text-decoration: underline;
    color: #795aea;
}

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