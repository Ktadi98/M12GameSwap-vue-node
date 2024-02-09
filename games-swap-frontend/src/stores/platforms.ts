import { defineStore } from "pinia";
import { computed, ref, type Ref } from "vue";
import type { Platform } from "@/interfaces/Platform";
import { useStorage } from '@vueuse/core'

export const usePlatformsStore = defineStore('platforms', () => {

    const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

    const platforms: Ref<Platform[]> = useStorage('platforms', []);
    const grouped: Ref<{ platform_name: string, platform_count: number, platform_id: number }[]> = useStorage('grouped', []);

    const fetchPlatforms = async (): Promise<{ message: string, categories: Platform[] } | undefined> => {
        const response: Response = await fetch(`${apiEndpoint}/posts/categories`);

        if (!response.ok) {
            return;
        }
        const data: { message: string, categories: Platform[], grouped: { platform_name: string, platform_count: number, platform_id: number }[] } = await response.json();
        platforms.value = data.categories;
        grouped.value = data.grouped;
        grouped.value.sort((a, b) => a.platform_name.localeCompare(b.platform_name));
    };

    // const getPlatformName = (platformId: number): string | undefined => {
    //     return platforms.value.find((platform: Platform) => platform.platform_id = platformId)?.platform_name;
    // }

    const getPlatformName = (platformId: number) => {
        // Define la función computada que depende del parámetro
        return computed(() => {
            return platforms.value.find((platform: Platform) => platform.platform_id = platformId)?.platform_name;
        });
    };

    return { platforms, grouped, fetchPlatforms, getPlatformName }
})