// stores/cart.js
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useCartStore = defineStore("cart", {
    state: () => ({
        items: [],
    }),

    actions: {
        async fetchCart() {
            const auth = useAuthStore();
            const { $axios } = useNuxtApp();

            if (!auth.token) return;

            try {
                const res = await $axios.get("/shop/cart", {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                });
                this.items = res.data.items;
            } catch (error) {
                console.error("Error laoading the cart", error);
            }
        },

        async addToCart(productId, quantity = 1) {
            const auth = useAuthStore();
            const { $axios } = useNuxtApp();

            try {
                await $axios.post(
                    "/shop/cart",
                    { product_id: productId, quantity },
                    {
                        headers: {
                            Authorization: `Bearer ${auth.token}`,
                        },
                    }
                );

                await this.fetchCart();
            } catch (error) {
                console.error("Error loading the cart", error);
            }
        },
    },
});
