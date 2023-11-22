<script setup lang="ts">
import AppBar from '@/components/AppBar.vue';
import NavBar from '@/components/NavBar.vue';
import { useAuthStore } from '@/stores/auth';
import { useUserPosts } from '@/stores/userPosts';
import { onBeforeMount, onMounted, reactive, ref, watch, type Ref } from 'vue';
import type { Product } from '@/interfaces/Product';
import PostRow from '@/components/PostRow.vue';


const authStore = useAuthStore();

let posts: Ref<Product[]> = ref([]);

let loading = ref(true);

watch(() => authStore.token, async () => {
    fetchUserPosts(authStore.token);
});

const dropPost = async (postEmitted: Product) => {

    const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

    posts.value.splice(posts.value.findIndex(post => post.post_id === postEmitted.post_id), 1);
    try {
        const response = await fetch(`${apiEndpoint}/posts/delete/${postEmitted.post_id}`, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${authStore.token}`
            }
        });

        if (!response.ok) {
            return;
        }

    } catch (err) {
        console.log(err);
    }
}

async function fetchUserPosts(token: string) {

    try {
        const response: Response = await fetch("http://localhost:8080/posts/user/posts", {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: { posts: Product[] } = await response.json();

        posts.value = data.posts;
    }
    catch (error) {
        console.error(error);
    }
    finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchUserPosts(authStore.token);
})

</script>
<template>
    <NavBar></NavBar>
    <header class="text-left mb-3 ">
        <p class="header-title px-4 py-2">Tus anuncios</p>
        <p class="header-description px-4 py-2">Aquí puedes gestionar todos los anuncios que has subido</p>
    </header>
    <main class="d-flex flex-column px-md-4 mx-3 mx-md-0 align-items-md-center">
        <section v-if="posts !== undefined && !loading" class="posts-box w-100">
            <template v-for="post in posts" :key="post.post_id">
                <PostRow :post="post" @deletePost="dropPost"></PostRow>
            </template>
        </section>
        <section v-else>
            <h2>Cargando tus anuncios...</h2>
        </section>
    </main>
    <AppBar></AppBar>
</template>
<style scoped>
a {
    width: 100%;
}

header {
    background-color: white;
    font-weight: 500;
    font-size: 2.5rem;
}

header p.header-title {
    color: #9f87f5;
}

header p.header-description {
    font-size: 20px;
}

.posts-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
}

@media (max-width: 632px) {

    header p.header-title {
        background-color: #9f87f5;
        color: white;
    }

    .header-description {
        font-size: 18px;
    }

}
</style>