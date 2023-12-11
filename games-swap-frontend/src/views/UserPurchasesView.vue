<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import type { Purchase } from '@/interfaces/Purchase';
import PostRow from '@/components/PostRow.vue';
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
const { token, userIsLoggedIn } = storeToRefs(useAuthStore());

const purchases = ref<Purchase[]>([]);

async function getPurchasedProducts() {

    try {
        const response: Response = await fetch(`${apiEndpoint}/posts/purchases`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token.value}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const purchasesData: { purchasesData: Purchase[] } = await response.json();
        purchases.value = purchasesData.purchasesData;

    } catch (error) {
        console.error(error);
    }


}

onMounted(() => {
    getPurchasedProducts();
})

</script>
<template>
    <main>
        <section class="w-100">
            <template v-for="purchase in  purchases " :key="purchase.purchase_id">
                <PostRow :post="purchase?.post" :purchaseDate="new Date(purchase?.purchase_created_at)" :purchased="true">
                </PostRow>
            </template>
        </section>
    </main>
</template>

<style scoped></style>