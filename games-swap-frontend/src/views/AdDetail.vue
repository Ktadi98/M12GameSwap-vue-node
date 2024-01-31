<script setup lang="ts">
import BackArrow from '@/components/Icons/BackArrow.vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Footer from '../components/Footer.vue';
import StarRating from '../components/Icons/StarRating.vue';
import NavBar from '@/components/NavBar.vue';
import type { Product } from '@/interfaces/Product';
import { useAuthStore } from '@/stores/auth';
import { usePostsHistoryStore } from '@/stores/postsHistory';
import { storeToRefs } from 'pinia';
import BookMarkFilledCheck from "@/components/Icons/BookMarkFilledCheck.vue"
import BookMarkFilled from '@/components/Icons/BookMarkFilled.vue';
import ReportFlag from '@/components/Icons/ReportFlag.vue';
import ReportModal from '@/components/ReportModal.vue';
import { useModal } from 'vue-final-modal';

const route = useRoute();
const router = useRouter();


const { updateHistory } = usePostsHistoryStore();

//To use in fetch request
const post_id = route.params.id;

let adDetail = ref<Product | null | any>(null as any);

const { token, userIsLoggedIn } = storeToRefs(useAuthStore());

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

const currentUserName = ref<string>("");


const { open: openReportModal, close: closeReportModal } = useModal({
    component: ReportModal,
    attrs: {
        onConfirm() {
            closeReportModal();
            //We need to send the report and show a toast notification
        },
        onCancel() {
            closeReportModal();
        },
        post_title: adDetail?.post_title,
    }
});


async function getPost() {
    try {
        const response: Response = await fetch(`${apiEndpoint}/posts/${post_id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: { post: Product } = await response.json();
        adDetail.value = data.post;
    }
    catch (error) {
        console.error(error);
    }
}

async function getUserData() {
    try {
        const response: Response = await fetch(`${apiEndpoint}/users/getData`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token.value}`
            }
        });

        if (!response.ok) return;

        const userData: { email: string, name: string } = await response.json();

        currentUserName.value = userData.name;


    } catch (error) {
        console.error(error);
    }
}

onMounted(async () => {

    await getPost();
    if (userIsLoggedIn.value) {
        getUserData();
    }

    //We add the current product to the history
    updateHistory(adDetail.value);
})

//TODO
async function setReservation() {
    try {
        const response: Response = await fetch(`${apiEndpoint}/posts/reservation/${post_id}`, {
            method: 'PATCH',
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token.value}`
            }
        });

        if (!response.ok) return;

        await getPost();


    } catch (error) {
        console.error(error);
    }
}

</script>

<template>
    <NavBar></NavBar>
    <div class="arrow-box" style="color: #8a6cf6" @click="router.back()">
        <BackArrow />
    </div>
    <!-- falta devolver datos del vendedor para pintarlos aqui -->
    <main class="ad-container">
        <div class="profile-vendor">
            <div class="d-flex w-75 mb-3">
                <div class="profile-image d-flex gap-3">
                    <img src="@/assets/avatar-profile.svg" alt="Profile Image">
                </div>
                <RouterLink v-tooltip.top="'Ir al vendedor'" v-if="!(currentUserName === adDetail?.user_client?.user_name)"
                    :to="{ name: 'vendor', params: { id: adDetail?.user_client?.user_id } }">
                    <h2 class="profile-name">{{
                        adDetail?.user_client?.user_name }}</h2>
                </RouterLink>
                <i v-tooltip.top="'Poner queja'"
                    v-if="userIsLoggedIn && !(currentUserName === adDetail?.user_client?.user_name)"
                    @click="openReportModal" class="justify-self-end ms-2 report">
                    <ReportFlag></ReportFlag>
                </i>
            </div>
            <div v-if="userIsLoggedIn && !(currentUserName === adDetail?.user_client?.user_name)" class="reserved-box">
                <span class="no-reserved-box" v-if="!adDetail?.post_reserved" @click="setReservation()">No Reservado
                    <i class="book-mark">
                        <BookMarkFilled class="ms-2"></BookMarkFilled>
                    </i>
                </span>
                <span v-else> Reservado
                    <i class="book-mark">
                        <BookMarkFilledCheck></BookMarkFilledCheck>
                    </i>
                </span>
            </div>
            <div v-else class="reserved-box">
                <span v-if="adDetail?.post_reserved"> Reservado
                    <i class="book-mark">
                        <BookMarkFilledCheck></BookMarkFilledCheck>
                    </i>
                </span>
            </div>
        </div>
        <div id="ad-info" class="d-flex gap-4 flex-sm-column flex-md-row">
            <div class="img-box mb-3 mt-3">
                <img :src="adDetail?.post_photos[0]" :alt="adDetail?.post_title">
            </div>
            <div>
                <h2 class="post_title">{{ adDetail?.post_title }}</h2>
                <h1 class="post_price">{{ adDetail?.post_price }} €</h1>
                <h2 class="post_condition"> Estado: {{ adDetail?.post_condition }}</h2>
                <p class="post_description">{{ adDetail?.post_description }}</p>
                <!-- <div class="other-interests">
                <h3>Sigue explorando</h3>
                <span class="category-tag">PS5</span>
                <span class="category-tag">Aventura</span>
                <span class="category-tag">Acción</span>
            </div> -->
            </div>

        </div>
    </main>
    <!-- Footer commented to fix styles-->
    <!-- <Footer></Footer> -->
</template>

<style scoped>
.report {
    cursor: pointer;
    border: 1px solid lightgray;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.2s ease-in-out;
}

.report:hover {
    transform: translateY(-6px);
}

.img-box {

    overflow: hidden;
}

.img-box>img {
    border-radius: 10px;
    max-width: 400px;
    height: 500px;
}

.arrow-box {
    cursor: pointer;
}

header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin: 0;
    align-items: center;
    border-bottom: 1px solid #8a6cf6;

}

.logo img {
    width: 100px;
    height: 100px;
}

.profile-info {
    display: flex;
    align-items: center;
    justify-content: end;
    flex: 1;
    border: 1px;
    border-color: black;
    color: black;
}

.profile-image img {
    width: 50px;
    height: 50px;
    border-radius: 50%;

}

.profile-name {
    margin-left: 5px;
    color: #8a6cf6;
}

.back-arrow {
    height: 50px;
    width: 50px;

}

main.ad-container {
    display: block;
    margin: 0 auto;
    margin-bottom: 8rem;
}

.ad-container {
    border: 3px dashed #8a6cf6;
    width: fit-content;
    border-radius: 3%;
    flex-direction: column;
    padding-top: 20px;
    padding-left: 50px;
    padding-right: 50px;
    margin: auto;
    display: inline-block;
    margin-bottom: 6em;
}

h1.post_price {
    color: black;
    text-align: left;
    font-size: 2.5em;
}

h2.post_title {
    margin-bottom: 50px;
    color: #8a6cf6;
    text-transform: capitalize;
}

h2.post_condition {
    color: #8a6cf6;
    margin-bottom: 30px;
}

p.post_description {
    margin-bottom: 30px;
    font-size: 1.5rem;
    width: 75ch;
}

.other-interests {
    border: 1px solid #8a6cf6;
    border-radius: 20px;
    background-color: #EFEFEF;
    display: inline-block;
    padding: 20px 50px;
    width: 100%;
    margin: auto;
}

h3 {
    font-weight: 200;
    font-size: 1.3rem;
}

.category-tag {
    background-color: #8a6cf6;
    color: white;
    border-radius: 20px;
    height: auto;
    padding: 10px;
    margin-right: 5px;
    font-weight: bold;
    font-size: 1rem;
    display: inline-block;
}

#ad-info {
    margin-bottom: 50px;
}

.reserved-box {
    color: #8a6cf6;
    font-size: larger;

}

.reserved-box span {
    border: 2px solid #8a6cf6;
    border-radius: 8px;
    padding: 10px;
    transition: all 0.2s ease-in;
}

.no-reserved-box {
    cursor: pointer;
}

.reserved-box span:hover {
    background-color: #8a6cf6;
    color: white;
}

.book-mark {
    border-left: 2px solid #8a6cf6;

}
</style>