<template>
    <div class="bg-white p-4 shadow">
        <h1 class="text-2xl font-bold mb-4">Orders</h1>
        <table class="table-fixed w-full mt-4 border-collapse">
            <thead>
                <tr class="text-left">
                    <th class="w-12 px-4 py-2">#</th>
                    <th class="w-24 px-4 py-2">Order ID</th>
                    <th class="w-1/4 px-4 py-2">Customer</th>
                    <th class="w-24 px-4 py-2">Status</th>
                    <th class="w-24 px-4 py-2">Total</th>
                    <th class="w-40 px-4 py-2">Date</th>
                    <th class="w-16 px-4 py-2 text-right">Actions</th>
                </tr>
            </thead>
            <tbody v-if="orders.length > 0">
                <tr v-for="(order, index) in orders" :key="order.id" class="border-t">
                    <td class="px-4 py-2">{{ index + 1 }}</td>
                    <td class="px-4 py-2">{{ order.id }}</td>
                    <td class="px-4 py-2">{{ order.user && order.user.name ? order.user.name : 'Unknown' }}</td>
                    <td class="px-4 py-2">
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
                    <td class="px-4 py-2">{{ Number(order.total_price).toFixed(2) }} €</td>
                    <td class="px-4 py-2">{{ formatDate(order.created_at) }}</td>
                    <td class="px-4 py-2 text-right">
                        <button
                            @click="viewOrderDetails(order)"
                            class="text-indigo-600 hover:text-indigo-800"
                        >
                            View Details
                        </button>
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <td colspan="7" class="text-center text-gray-500 italic py-6">
                        No orders found.
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
