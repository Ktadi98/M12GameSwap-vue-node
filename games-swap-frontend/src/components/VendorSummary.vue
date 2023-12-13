<script setup lang="ts">
import type { Stats } from '@/interfaces/Stats';
import Rating from 'primevue/rating';


const props = defineProps<{
    userStats: Stats | null | any
}>()

</script>
<template>
    <section
        class="d-flex flex-column flex-md-row justify-content-around align-items-center gap-4 vendor-box py-2 mb-4 px-1 px-md-3">
        <div class="profile-image d-flex gap-2 align-items-center flex-row">
            <img :src="userStats?.user.user_photo" alt="Profile Image">
            <div>
                <h2>{{ userStats?.user.user_name }}</h2>
                <Rating :model-value="userStats?.averageScore" :cancel="false" readonly></Rating>
            </div>
        </div>
        <div class="d-flex gap-2">
            <p>{{ userStats?.numSells }} Ventas</p>
            <p>{{ userStats?.numPurchases }} Compras</p>
        </div>
    </section>
</template>
<style scoped>
.vendor-box {
    width: 90%;
    border-radius: 10px;
    border: 2px solid rgb(229, 229, 229);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}



.profile-image img {
    width: 50px;
    height: 50px;
    border-radius: 50%;

}
</style>