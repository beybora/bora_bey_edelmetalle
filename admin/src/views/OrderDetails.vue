<template>
    <div class="p-6">
        <button @click="goBack" class="mb-4 text-indigo-600 hover:underline">← Back to Orders</button>
        <h1 class="text-2xl font-bold mb-4">Order #{{ order?.id }}</h1>
        <div v-if="loading" class="text-gray-500">Loading...</div>
        <div v-else-if="order">
            <div class="mb-6">
                <h2 class="text-lg font-semibold mb-2">Customer</h2>
                <div class="mb-1">Name: {{ order.user?.name || 'Unknown' }}</div>
                <div class="mb-1">Email: {{ order.user?.email || '-' }}</div>
            </div>
            <div class="mb-6">
                <h2 class="text-lg font-semibold mb-2">Order Details</h2>
                <div>Status: <span :class="getStatusClass(order.status)">{{ order.status }}</span></div>
                <div>Total: {{ Number(order.total_price).toFixed(2) }} €</div>
                <div>Date: {{ formatDate(order.created_at) }}</div>
            </div>
            <div class="mb-6">
                <h2 class="text-lg font-semibold mb-2">Shipping Address</h2>
                <div v-if="order.details">
                    <div>{{ order.details.first_name }} {{ order.details.last_name }}</div>
                    <div>{{ order.details.address1 }} {{ order.details.address2 }}</div>
                    <div>{{ order.details.zipcode }} {{ order.details.city }}</div>
                    <div>{{ order.details.country_code }}</div>
                </div>
                <div v-else class="text-gray-500">No address details.</div>
            </div>
            <div>
                <h2 class="text-lg font-semibold mb-2">Items</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div v-for="item in order.items" :key="item.id" class="bg-white rounded shadow p-3 flex flex-col items-center text-center">
                        <div class="font-semibold text-gray-900 mb-1">{{ item.product?.title || '-' }}</div>
                        <div class="text-xs text-gray-500 mb-1">Menge: {{ item.quantity }}</div>
                        <div class="text-xs text-gray-500 mb-1">Stückpreis: {{ Number(item.unit_price).toFixed(2) }} €</div>
                        <div class="text-xs text-gray-700 font-bold">Gesamt: {{ (item.quantity * item.unit_price).toFixed(2) }} €</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="text-gray-500">Order not found.</div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import store from '../store';

const route = useRoute();
const router = useRouter();
const order = ref(null);
const loading = ref(true);

function formatDate(date) {
    return new Date(date).toLocaleString();
}

function getStatusClass(status) {
    const classes = {
        pending: 'bg-yellow-100 text-yellow-800 px-2 rounded',
        approved: 'bg-blue-100 text-blue-800 px-2 rounded',
        shipped: 'bg-purple-100 text-purple-800 px-2 rounded',
        delivered: 'bg-green-100 text-green-800 px-2 rounded',
        cancelled: 'bg-red-100 text-red-800 px-2 rounded'
    };
    return classes[status] || '';
}

function goBack() {
    router.push('/app/orders');
}

onMounted(async () => {
    loading.value = true;
    try {
        const res = await store.dispatch('getOrders');
        const found = res.find(o => o.id == route.params.id);
        order.value = found || null;
    } catch (e) {
        order.value = null;
    }
    loading.value = false;
});
</script>
