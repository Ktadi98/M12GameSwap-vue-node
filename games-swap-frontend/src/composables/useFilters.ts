import { computed, type Ref } from "vue";
import type { Product } from "../interfaces/Product.ts";

export default function useFilters(products: Ref<Product[]>, criteria: Ref<string>, genreFilter: Ref<number>) {

    const filteredProducts = computed(() => {
        if (genreFilter.value === -1 && criteria.value === "") {
            return products.value;
        }
        else if (genreFilter.value !== -1 && criteria.value === "") {
            return products.value.filter((product: Product) => product.genre_id === genreFilter.value);
        }
        else if (genreFilter.value === -1 && criteria.value !== "") {

            const criteriaFilteredProducts = [...products.value];

            if (criteria.value === "A-Z") {
                return criteriaFilteredProducts.sort((a: Product, b: Product) => a.post_title.localeCompare(b.post_title));
            }
            else if (criteria.value === "Z-A") {
                return criteriaFilteredProducts.sort((a: Product, b: Product) => b.post_title.localeCompare(a.post_title));
            }
            else if (criteria.value === "priceDesc") {
                return criteriaFilteredProducts.sort((a: Product, b: Product) => a.post_price - b.post_price);
            }
            else if (criteria.value === "priceAsc") {
                return criteriaFilteredProducts.sort((a: Product, b: Product) => b.post_price - a.post_price);
            }
        }
        else if (genreFilter.value !== -1 && criteria.value !== "") {
            const criteriaFilteredProducts = [...products.value];

            if (criteria.value === "A-Z") {
                criteriaFilteredProducts.sort((a: Product, b: Product) => a.post_title.localeCompare(b.post_title));
            }
            else if (criteria.value === "Z-A") {
                criteriaFilteredProducts.sort((a: Product, b: Product) => b.post_title.localeCompare(a.post_title));
            }
            else if (criteria.value === "priceDesc") {
                criteriaFilteredProducts.sort((a: Product, b: Product) => b.post_price - a.post_price);
            }
            else if (criteria.value === "priceAsc") {
                criteriaFilteredProducts.sort((a: Product, b: Product) => a.post_price - b.post_price);
            }
            return criteriaFilteredProducts.filter((product: Product) => product.genre_id === genreFilter.value);
        }

    }

    );


    return { filteredProducts }
}