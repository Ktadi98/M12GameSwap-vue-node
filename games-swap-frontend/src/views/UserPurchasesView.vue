<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import type { Purchase } from '@/interfaces/Purchase';
import PostRow from '@/components/PostRow.vue';
import ProgressSpinner from 'primevue/progressspinner';
import router from '@/router';

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
const { token, userIsLoggedIn } = storeToRefs(useAuthStore());
const { deleteToken } = useAuthStore();


const purchases = ref<Purchase[]>([]);
const loading = ref<boolean>(true);


async function getPurchasedProducts() {

    try {
        loading.value = true;
        const response: Response = await fetch(`${apiEndpoint}/posts/purchases`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token.value}`
            }
        });
        if (!response.ok) {
            //throw new Error(`HTTP error! Status: ${response.status}`);
            //Force to log out if token is modified or expired.
            if (response.status === 401 || response.status === 403) {
                deleteToken();
                router.push("/");
            }
        }
        const purchasesData: { purchasesData: Purchase[] } = await response.json();
        purchases.value = purchasesData.purchasesData;

    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }


}

onMounted(() => {
    getPurchasedProducts();
})

</script>
<template>
    <section v-if="purchases.length > 0 && !loading" class="w-75">
        <template v-for="purchase in purchases" :key="purchase.purchase_id">
            <PostRow :post="purchase?.post" :purchaseDate="new Date(purchase?.purchase_created_at)" :purchased="true">
            </PostRow>
        </template>
    </section>
    <section v-else-if="loading">
        <ProgressSpinner></ProgressSpinner>
    </section>
    <section v-else>
        No has comprado nada todavía.
        <div>
            <img src="@/assets/no_data_found_GIF.gif" alt="not found GIF">
        </div>
    </section>
</template>

<style scoped></style>