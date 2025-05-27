import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useProductsStore = defineStore("products", {
    state: () => ({
        products: [],
    }),

    actions: {
        async fetchAll() {
            const { $axios } = useNuxtApp();
            const auth = useAuthStore();

            try {
                const res = await $axios.get("/shop/products", {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                });

                this.products = res.data.products;
                return this.products;
            } catch (error) {
                console.error("Error fetching products", error);
            }
        },

        async fetchProduct(id) {
            const { $axios } = useNuxtApp();
            const auth = useAuthStore();

            try {
                const res = await $axios.get(`/shop/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                });

                return res.data.product;
            } catch (error) {
                console.error("Error fetching product", error);
            }
        },
    },
});
