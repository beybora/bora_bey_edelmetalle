import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useOrdersStore = defineStore("orders", {
    state: () => ({
        orders: [],
        notifications: [],
        unreadCount: 0
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

        async fetchNotifications() {
            const { $axios } = useNuxtApp();
            const auth = useAuthStore();
            const res = await $axios.get("/shop/notifications", {
                headers: { Authorization: `Bearer ${auth.token}` },
            });
            this.notifications = res.data;
            this.unreadCount = res.data.filter(n => !n.is_read).length;
        },

        async markNotificationAsRead(id) {
            const { $axios } = useNuxtApp();
            const auth = useAuthStore();
            await $axios.put(`/shop/notifications/${id}/read`, {}, {
                headers: { Authorization: `Bearer ${auth.token}` },
            });
            const notification = this.notifications.find(n => n.id === id);
            if (notification) {
                notification.is_read = true;
                this.unreadCount = Math.max(0, this.unreadCount - 1);
            }
        },

        async markAllNotificationsAsRead() {
            const { $axios } = useNuxtApp();
            const auth = useAuthStore();
            await $axios.put("/shop/notifications/read-all", {}, {
                headers: { Authorization: `Bearer ${auth.token}` },
            });
            this.notifications.forEach(n => n.is_read = true);
            this.unreadCount = 0;
        }
    },
});
