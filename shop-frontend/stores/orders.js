import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useOrdersStore = defineStore("orders", {
    state: () => ({
        orders: [],
    }),

    actions: {
        async fetchOrders() {
            const { $axios } = useNuxtApp();
            const auth = useAuthStore();
            const res = await $axios.get("/shop/orders", {
                headers: { Authorization: `Bearer ${auth.token}` },
            });
            this.orders = res.data;
        },

        async placeOrder(orderData) {
            const { $axios } = useNuxtApp();
            const auth = useAuthStore();
            const res = await $axios.post("/shop/checkout", orderData, {
                headers: { Authorization: `Bearer ${auth.token}` },
            });
            return res.data;
        },

        async cancelOrder(orderId) {
            const { $axios } = useNuxtApp();
            const auth = useAuthStore();
            await $axios.delete(`/shop/orders/${orderId}`, {
                headers: { Authorization: `Bearer ${auth.token}` },
            });
        },
    },
});
