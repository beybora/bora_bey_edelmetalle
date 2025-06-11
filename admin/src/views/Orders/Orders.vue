<template>
    <div>
        <h1 class="text-2xl font-bold mb-4">Orders</h1>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <OrderCard
                    v-for="order in orders"
                    :key="order.id"
                    :order="order"
                    @details="viewOrderDetails"
                    @status-change="updateStatus"
                />
            </div>
        </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import store from "../../store";
import OrderCard from "./OrderCard.vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
    store.dispatch("getOrders");
});

const orders = computed(() => store.state.orders.data);

function viewOrderDetails(order) {
    router.push(`/app/orders/${order.id}`);
}

async function updateStatus({ order, status }) {
    try {
        await store.dispatch('updateOrderStatus', {
            orderId: order.id,
            status
        });
        await store.dispatch("getOrders");
    } catch (error) {
        alert('Status konnte nicht geändert werden.');
    }
}
</script>
