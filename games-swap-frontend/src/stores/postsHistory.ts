import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import type { Product } from "@/interfaces/Product";
import { useStorage } from '@vueuse/core'

export const usePostsHistoryStore = defineStore('postsHistory', () => {

    const history: Ref<Product[]> = useStorage('history', []);

    const updateHistory = (post: Product) => {

        //If the history is empty we add the new post.
        if (history.value.length === 0) {
            history.value.push({ ...post });
            return;
        }

        //We need to check that we don't add the same product twice.
        const postIndex = history.value.findIndex(p => p.post_id === post.post_id);

        if (postIndex === -1) {

            if (history.value.length === 4) {
                history.value.shift();
            }

            history.value.push({ ...post });
            return;
        }

        //If its duplicated we do nothing.
    };

    const reset = () => {
        history.value = []
    };

    return { reset, history, updateHistory }
})