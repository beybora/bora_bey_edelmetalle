import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { useCategoriesStore } from "./categories";

export const useProductsStore = defineStore("products", {
    state: () => ({
        products: [],
        loading: false,
        currentPage: 1,
        lastPage: 1,
        total: 0,
        perPage: 8,
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
                    page: options.page || this.currentPage || 1,
                    per_page: 8,
                };

                const res = await $axios.get("/shop/products", {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                    params,
                });

                this.products = res.data.data || [];
                this.currentPage = res.data.meta?.current_page || 1;
                this.lastPage = res.data.meta?.last_page || 1;
                this.total = res.data.meta?.total || 0;
                this.perPage = res.data.meta?.per_page || 8;
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
