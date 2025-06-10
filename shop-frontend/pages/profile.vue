<template>
  <ShopLayout>
    <div class="max-w-2xl mx-auto py-10">
      <h1 class="text-2xl font-bold mb-6">Mein Profil</h1>

      <div v-if="loading" class="text-gray-500">Lade Daten...</div>

      <template v-else>
        <div class="bg-white rounded shadow p-6 mb-8">
          <div class="mb-2"><span class="font-semibold">Name:</span> {{ user?.name }}</div>
          <div class="mb-2"><span class="font-semibold">E-Mail:</span> {{ user?.email }}</div>
        </div>

        <h2 class="text-xl font-semibold mb-4">Meine Bestellungen</h2>

        <div v-if="orders.length === 0" class="text-gray-500">Noch keine Bestellungen vorhanden.</div>

        <table v-else class="w-full border text-sm bg-white rounded shadow">
          <thead>
            <tr class="bg-gray-100">
              <th class="p-2 border">#</th>
              <th class="p-2 border">Status</th>
              <th class="p-2 border">Gesamt</th>
              <th class="p-2 border">Datum</th>
              <th class="p-2 border">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50 transition">
              <td class="p-2 border">{{ order.id }}</td>
              <td class="p-2 border">
                <span :class="getStatusClass(order.status)">{{ order.status }}</span>
              </td>
              <td class="p-2 border">{{ order.total_price }} €</td>
              <td class="p-2 border">
                {{ formatDate(order.created_at) }}
              </td>
              <td class="p-2 border text-center">
                <NuxtLink :to="`/order-details?id=${order.id}`" class="text-indigo-600 hover:underline">Anzeigen</NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </ShopLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useOrdersStore } from '~/stores/orders';
import ShopLayout from '~/components/layouts/ShopLayout.vue';

const loading = ref(true);
const auth = useAuthStore();
const ordersStore = useOrdersStore();

const user = computed(() => auth.user);
const orders = computed(() => ordersStore.orders);

function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleString('de-DE');
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

async function loadData() {
  loading.value = true;

  await auth.fetchUser();

  if (auth.user && auth.token) {
    await ordersStore.fetchOrders();
  }

  loading.value = false;
}

onMounted(loadData);
</script>
