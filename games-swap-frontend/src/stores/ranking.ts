import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import type { UserClient } from "@/interfaces/UserClient";
import { useStorage } from '@vueuse/core'

export const useRankingStore = defineStore('ranking', () => {

    const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

    const bestVendors: Ref<UserClient[]> = useStorage('ranking', []);

    const fetchTopVendors = async () => {
        const response: Response = await fetch(`${apiEndpoint}/users/ranking`);

        if (!response.ok) {
            return [];
        }
        const data: { topVendors: UserClient[] } = await response.json();
        bestVendors.value = data.topVendors;
    };

    return { bestVendors, fetchTopVendors }
})