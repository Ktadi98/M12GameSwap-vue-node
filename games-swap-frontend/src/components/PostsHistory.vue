<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePostsHistoryStore } from '@/stores/postsHistory';
import Carousel from 'primevue/carousel';
import { ref } from "vue";

const { history } = storeToRefs(usePostsHistoryStore());

const prod = ref([{
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
},
{
    id: '1001',
    code: 'nvklal433',
    name: 'Black Watch',
    description: 'Product Description',
    image: 'black-watch.jpg',
    price: 72,
    category: 'Accessories',
    quantity: 61,
    inventoryStatus: 'INSTOCK',
    rating: 4
},
{
    id: '1002',
    code: 'zz21cz3c1',
    name: 'Blue Band',
    description: 'Product Description',
    image: 'blue-band.jpg',
    price: 79,
    category: 'Fitness',
    quantity: 2,
    inventoryStatus: 'LOWSTOCK',
    rating: 3
},])
const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]);

</script>
<template>
    <template>
        <div>
            <Carousel :value="prod" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions">
                <template #item="slotProps">
                    <div class="border-1 surface-border border-round m-2 text-center py-5 px-3">
                        <div class="mb-3">
                            <!-- <img :src="'https://primefaces.org/cdn/primevue/images/product/' + slotProps.data.image"
                                :alt="slotProps.data.post_title" class="w-6 shadow-2" /> -->
                        </div>
                        <div>
                            <h4 class="mb-1">{{ slotProps.data.post_title }}</h4>
                            {{ slotProps }}
                        </div>
                    </div>
                </template>
            </Carousel>
        </div>
    </template>
</template>

<style scoped>
.vendor-card {
    border: 1px solid #e1e1e1;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 10px;
    min-width: 10%;
}

.avatar {
    font-size: 1.5rem;
}
</style>