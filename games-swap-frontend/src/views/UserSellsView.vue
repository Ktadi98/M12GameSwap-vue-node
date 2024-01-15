<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

import Chart from 'primevue/chart';

import type { Purchase } from '@/interfaces/Purchase';
import PostRow from '@/components/PostRow.vue';

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
const { token, userIsLoggedIn } = storeToRefs(useAuthStore());

const sells = ref<Purchase[]>([]);
const chartData = ref();
const chartOptions = ref();

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

onMounted(async () => {
    //We need the data before plotting the graphic.
    await getPurchasedProducts();
    chartData.value = await setChartData();
    chartOptions.value = setChartOptions();
})

const setChartData = async () => {
    let response: Response | null = null
    try {
        response = await fetch(`${apiEndpoint}/posts/categories`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token.value}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
    }
    const categories = response ? (await response.json()).categories : []

    return {
        labels: categories.map((c: any) => c.platform_name),
        datasets: [
            {
                label: 'Ventas',
                data: categoriesToSalesMap(categories, sells.value),
                backgroundColor: categoriesToColorsMap(categories),
                borderColor: categoriesToColorsMap(categories),
                borderWidth: 1
            }
        ]
    };
};
const categoriesToColorsMap = (categories: any) => {
    const catColors = categories.map(() => {
        return `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`
    })
    return catColors
}
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}

const categoriesToSalesMap = (categories: any, sales: any) => {
    const catMap = categories.map((c: any) => {
        return sales.reduce((prev: any, cur: any) => cur.post.platform_id === c.platform_id ? prev + 1 : prev, 0)
    })

    return catMap
}
</script>
<template>
    <section v-if="sells.length > 0" class="w-75 px-5">
        <Chart type="bar" :data="chartData" :options="chartOptions" />
        <section class="mt-5 mb-1" v-for="sell in sells" :key="sell.purchase_id">
            <PostRow :sell="sell" :post="sell?.post" :purchaseDate="new Date(sell?.purchase_created_at)" :purchased="true"
                :selled="true">
            </PostRow>
        </section>
    </section>
    <section v-else>
        No han habido ventas todavía.
    </section>
</template>

<style scoped>
.p-chart {
    padding: 0;
    margin-bottom: 50px;
}
</style>