import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { useCategoriesStore } from "./categories";

export const useProductsStore = defineStore("products", {
    state: () => ({
        products: [],
        loading: false,
    }),

    actions: {
        async fetchAll(options = {}) {
            const { $axios } = useNuxtApp();
            const auth = useAuthStore();
            const categoryStore = useCategoriesStore();
            this.loading = true;

            try {
                const params = {
                    ...options,
                    search: categoryStore.search || undefined,
                    category: categoryStore.selectedCategorySlug || undefined,
                };

                const res = await $axios.get("/shop/products", {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                    params,
                });

                this.products = res.data.data || res.data.products || [];
            } catch (error) {
                console.error("Error fetching products", error);
            } finally {
                this.loading = false;
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

                return res.data.product || res.data.data;
            } catch (error) {
                console.error("Error fetching product", error);
            }
        },
    },
});
