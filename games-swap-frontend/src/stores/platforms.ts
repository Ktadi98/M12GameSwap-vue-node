import { defineStore } from "pinia";
import { computed, ref, type Ref } from "vue";

interface Platform {
    platform_id: number,
    platform_name: string
}
export const usePlatformsStore = defineStore('platforms', () => {

    const platforms: Ref<Platform[]> = ref([]);

    const fetchPlatforms = async (): Promise<{ message: string, categories: Platform[] } | undefined> => {
        const response: Response = await fetch("http://localhost:8080/posts/categories");

        if (!response.ok) {
            return;
        }
        const data: { message: string, categories: Platform[] } = await response.json();
        platforms.value = data.categories;

    };

    function getPlatforms(): Platform[] {
        return platforms.value;
    }



    return { platforms, fetchPlatforms, getPlatforms }
})