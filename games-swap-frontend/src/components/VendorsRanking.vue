<script setup lang="ts">
import { useRankingStore } from '@/stores/ranking';
import { storeToRefs } from "pinia";
import Avatar from 'primevue/avatar';
import Rating from 'primevue/rating';
import { ref } from 'vue';
const { bestVendors } = storeToRefs(useRankingStore());

const star = ref(1);
</script>
<template>
    <section class="w-100">
        <h2 class="py-3 px-4 mt-4 mb-3 display-6 font-weight-bold">Top vendedores</h2>
        <section class="d-flex justify-content-center gap-4 px-4 py-3">
            <article class="vendor-card" v-for="vendor in bestVendors" :key="vendor.user_id">
                <!-- <Avatar image="../../public/imgs/logo-app-2.png" :label="vendor.user_name.substring(1)" size="xlarge"
                    shape="circle" /> -->
                <router-link v-tooltip="'Ir al vendedor'" :to="{ name: 'vendor', params: { id: vendor.user_id } }"
                    class="avatar d-flex flex-column gap-1 justify-content-center align-items-center">
                    <Avatar :image="vendor.user_photo" class="mr-2" size="xlarge">
                    </Avatar>
                    <p class="mb-0">{{ vendor.user_name }}</p>
                    <p class="d-flex gap-2">{{ vendor.user_ranking }}
                        <Rating :model-value="star" :stars="1" :cancel="false" readonly />
                    </p>
                </router-link>
            </article>
        </section>
    </section>
</template>
<style>
/*Vue star color */
.p-rating-icon {
    color: #9F87F5;
}
</style>
<style scoped>
.vendor-card {
    border: 1px solid #e1e1e1;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 10px;
    min-width: 10%;
    transition: transform 0.3s ease-in-out;
}

.vendor-card:hover {
    transform: translateY(-10px);
}

.avatar {
    font-size: 1.5rem;
}

h2 {
    background-color: #8a6cf6;
    width: 100%;
    color: white;
    font-weight: bold;
    border-radius: 10px;
}
</style>