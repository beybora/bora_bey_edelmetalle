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
                console.error("Error loading the cart", error);
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
                console.error("Error adding to cart", error);
            }
        },

        async updateQuantity(itemId, quantity) {
            const auth = useAuthStore();
            const { $axios } = useNuxtApp();

            try {
                await $axios.put(
                    `/shop/cart/${itemId}`,
                    { quantity },
                    {
                        headers: {
                            Authorization: `Bearer ${auth.token}`,
                        },
                    }
                );

                await this.fetchCart();
            } catch (error) {
                console.error("Error updating quantity", error);
            }
        },

        async removeFromCart(itemId) {
            const auth = useAuthStore();
            const { $axios } = useNuxtApp();

            try {
                await $axios.delete(`/shop/cart/${itemId}`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                });

                await this.fetchCart();
            } catch (error) {
                console.error("Error removing from cart", error);
            }
        },
    },
});
