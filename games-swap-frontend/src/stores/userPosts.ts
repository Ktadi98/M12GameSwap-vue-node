import { defineStore } from "pinia";
import { reactive } from "vue";
import type { Product } from "@/interfaces/Product";
import { useAuthStore } from "./auth";

export const useUserPosts = defineStore('userPosts', () => {

    let posts = reactive<Product[]>([]);
    const authStore = useAuthStore();

    const fetchUserPosts = async (): Promise<{ message: string, posts: Product[] } | undefined> => {
        const response: Response = await fetch("http://localhost:8080/posts/user/posts", {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${authStore.token}`
            },
        });

        if (!response.ok) {
            return;
        }
        const data: { message: string, posts: Product[] } = await response.json();
        posts = data.posts;

    };

    return { posts, fetchUserPosts }
})