<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">Orders</h1>
        <table class="table-auto w-full border">
            <thead>
                <tr class="bg-gray-100 text-left">
                    <th class="p-2 border">#</th>
                    <th class="p-2 border">Order ID</th>
                    <th class="p-2 border">Customer</th>
                    <th class="p-2 border">Status</th>
                    <th class="p-2 border">Total</th>
                    <th class="p-2 border">Date</th>
                    <th class="p-2 border">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="orders.length === 0">
                    <td colspan="7" class="text-center text-gray-500 italic py-6">
                        No orders found.
                    </td>
                </tr>
                <tr v-for="(order, index) in orders" :key="order.id">
                    <td class="p-2 border">{{ index + 1 }}</td>
                    <td class="p-2 border">{{ order.id }}</td>
                    <td class="p-2 border">{{ order.user && order.user.name ? order.user.name : 'Unknown' }}</td>
                    <td class="p-2 border">
                        <select
                            v-model="order.status"
                            @change="updateStatus(order)"
                            class="border rounded px-2 py-1 text-sm"
                            :class="getStatusClass(order.status)"
                        >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </td>
                    <td class="p-2 border">{{ Number(order.total_price).toFixed(2) }} €</td>
                    <td class="p-2 border">{{ formatDate(order.created_at) }}</td>
                    <td class="p-2 border">
                        <button
                            @click="viewOrderDetails(order)"
                            class="text-indigo-600 hover:text-indigo-800"
                        >
                            View Details
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import store from "../store";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
    store.dispatch("getOrders");
});

const orders = computed(() => store.state.orders.data);

function formatDate(date) {
    return new Date(date).toLocaleString();
}

function getStatusClass(status) {
    const classes = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-blue-100 text-blue-800',
        shipped: 'bg-purple-100 text-purple-800',
        delivered: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800'
    };
    return classes[status] || '';
}

async function updateStatus(order) {
    try {
        await store.dispatch('updateOrderStatus', {
            orderId: order.id,
            status: order.status
        });
    } catch (error) {
        console.error('Failed to update order status:', error);
        // Revert the status change in the UI
        await store.dispatch("getOrders");
    }
}

function viewOrderDetails(order) {
    router.push(`/app/orders/${order.id}`);
}
</script>
