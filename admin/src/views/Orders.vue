<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">Bestellungen</h1>
        <table class="table-auto w-full border">
            <thead>
                <tr class="bg-gray-100 text-left">
                    <th class="p-2 border">#</th>
                    <th class="p-2 border">Bestellnummer</th>
                    <th class="p-2 border">Kunde</th>
                    <th class="p-2 border">Status</th>
                    <th class="p-2 border">Gesamtpreis</th>
                    <th class="p-2 border">Datum</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order, index) in orders" :key="order.id">
                    <td class="p-2 border">{{ index + 1 }}</td>
                    <td class="p-2 border">{{ order.id }}</td>
                    <td class="p-2 border">{{ order.user?.name || 'Unbekannt' }}</td>
                    <td class="p-2 border">{{ order.status }}</td>
                    <td class="p-2 border">{{ order.total_price }} €</td>
                    <td class="p-2 border">{{ order.created_at ? (new Date(order.created_at)).toLocaleString() : '' }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import store from "../store";

onMounted(() => {
    store.dispatch("getOrders");
});

const orders = computed(() => store.state.orders.data);
</script>
