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
            const res = await $axios.get("/shop/cart", {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            this.items = res.data.items;
        },

        async addToCart(productId, quantity = 1) {
            const auth = useAuthStore();
            const { $axios } = useNuxtApp();

            const res = await $axios.post(
                "/shop/cart",
                { product_id: productId, quantity },
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                }
            );

            await this.fetchCart(); // sofort aktualisieren
        },
    },
});
