<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref, watch, type Ref } from 'vue';
import type { Product } from '@/interfaces/Product';
import PostRow from '@/components/PostRow.vue';
import Divider from 'primevue/divider';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import ProgressSpinner from 'primevue/progressspinner';
import router from '@/router';
import ErrorMessages from '@/components/ErrorMessages.vue';


const items = ref([
    { label: 'Home', route: '/' },
    { label: 'Tus anuncios' }
]);

const error = ref<boolean>(false);
const errorMessages: Ref<string[]> = ref([]);

const authStore = useAuthStore();

let posts: Ref<Product[]> = ref([]);

let loading = ref(true);

watch(() => authStore.token, async () => {
    fetchUserPosts(authStore.token);
});

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

const dropPost = async (postEmitted: Product) => {


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

    loading.value = true;
    error.value = false;
    errorMessages.value = [];

    try {
        const response: Response = await fetch(`${apiEndpoint}/posts/user/posts`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            //throw new Error(`HTTP error! Status: ${response.status}`);
            //Force to log out if token is modified or expired.
            if (response.status === 401 || response.status === 403) {
                authStore.deleteToken();
                router.push("/");
            }
        }
        const data: { posts: Product[] } = await response.json();

        posts.value = data.posts;
    }
    catch (err) {
        console.error(err);
        error.value = true;
        errorMessages.value = ["Ha habido un error al recuperar tus anuncios publicados. Por favor, vuélvelo a intentar más tarde"];

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
    <Divider></Divider>
    <section class="px-4">
        <BreadCrumbs :items="items"></BreadCrumbs>
    </section>
    <Divider></Divider>
    <main class="d-flex flex-column px-md-4 mx-3 mx-md-0 align-items-md-center">
        <section v-if="loading">
            <ProgressSpinner></ProgressSpinner>
        </section>
        <section v-else-if="posts.length === 0 && !error">
            <h2>Todavía no has colgado ningún anuncio.</h2>
            <div>
                <img src="@/assets/no_data_found_GIF.gif" alt="not found GIF">
            </div>
        </section>
        <section v-else-if="posts !== undefined && !loading" class="posts-box w-100">
            <template v-for="post in posts" :key="post.post_id">
                <PostRow :post="post" @deletePost="dropPost"></PostRow>
            </template>
        </section>
        <ErrorMessages :messages="errorMessages"></ErrorMessages>
    </main>
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