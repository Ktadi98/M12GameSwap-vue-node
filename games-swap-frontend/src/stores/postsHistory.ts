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
        console.log(postIndex);
        if (postIndex !== -1) {
            history.value.push({ ...post });
        }

        //If is duplicated we do nothing.
    };

    return { history, updateHistory }
})