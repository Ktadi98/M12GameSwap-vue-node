<template>
    <div>
        <NavBar />

        <SearchBar />

     

        <!-- <div class="product-grid">
            <PostCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            />
        </div> -->

        <Footer></Footer>
    </div>
</template>
  
<script lang="ts">
import { ref, onMounted } from 'vue';
import NavBar from "../components/NavBar.vue";
import SearchBar from "../components/SearchBar.vue";
import Categories from "../components/Categories.vue";
import Footer from "../components/Footer.vue";
import PostCard from "../components/PostCard.vue";

export default {
    components: {
        NavBar,
        SearchBar,
        Categories,
        Footer,
        PostCard
    },
    setup() {
        const products = ref([]);

        onMounted(async () => {
            // Que no me olvide de cambiar categoryId con el ID de la categoría deseada o pasar el valor desde las rutas, por ejemplo, usando Vue Router.
            const categoryId = 1;

            try {
                const response = await fetch(`http://localhost:8080/posts/category/${categoryId}`);
                if (response.ok) {
                    const data = await response.json();
                    // la respuesta de la API es un array de productos.
                    products.value = data;
                } else {
                    console.error('Error al obtener los productos');
                }
            } catch (error) {
                console.error('Error al obtener los productos', error);
            }
        });


        return {
            products,
        };
    },
};
</script>
  
<style scoped>
.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
}
</style>
  