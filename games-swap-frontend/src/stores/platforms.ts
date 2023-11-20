import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import type { Platform } from "@/interfaces/Platform";


export const usePlatformsStore = defineStore('platforms', () => {

    const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

    const platforms: Ref<Platform[]> = ref([]);

    const fetchPlatforms = async (): Promise<{ message: string, categories: Platform[] } | undefined> => {
        const response: Response = await fetch(`${apiEndpoint}/posts/categories`);

        if (!response.ok) {
            return;
        }
        const data: { message: string, categories: Platform[] } = await response.json();
        platforms.value = data.categories;

    };

    return { platforms, fetchPlatforms }
})