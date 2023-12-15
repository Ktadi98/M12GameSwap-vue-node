<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import type { Purchase } from '@/interfaces/Purchase';
import PostRow from '@/components/PostRow.vue';
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
const { token, userIsLoggedIn } = storeToRefs(useAuthStore());

const sells = ref<Purchase[]>([]);

async function getPurchasedProducts() {

    try {
        const response: Response = await fetch(`${apiEndpoint}/posts/sells`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token.value}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const sellsData: { sellsData: Purchase[] } = await response.json();
        sells.value = sellsData.sellsData;

    } catch (error) {
        console.error(error);
    }


}

onMounted(() => {
    getPurchasedProducts();
})

</script>
<template>
    <section v-if="sells.length > 0" class="w-75">
        <template v-for="sell in sells" :key="sell.purchase_id">
            <PostRow :sell="sell" :post="sell?.post" :purchaseDate="new Date(sell?.purchase_created_at)" :purchased="true"
                :selled="true">
            </PostRow>
        </template>
    </section>
    <section v-else>
        No han habido ventas todavía.
    </section>
</template>

<style scoped></style>