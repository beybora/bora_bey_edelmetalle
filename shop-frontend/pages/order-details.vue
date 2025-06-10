<template>
  <ShopLayout>
    <div class="max-w-2xl mx-auto py-10">
      <button @click="$router.back()" class="mb-4 text-indigo-600 hover:underline">← Zurück</button>
      <h1 class="text-2xl font-bold mb-4">Bestellung #{{ order?.id }}</h1>
      <div v-if="loading" class="text-gray-500">Lade Bestelldaten...</div>
      <div v-else-if="order">
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-2">Status</h2>
          <span :class="getStatusClass(order.status)">{{ order.status }}</span>
        </div>
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-2">Gesamtpreis</h2>
          <div>{{ Number(order.total_price).toFixed(2) }} €</div>
        </div>
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-2">Bestelldatum</h2>
          <div>{{ formatDate(order.created_at) }}</div>
        </div>
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-2">Produkte</h2>
          <table class="table-auto w-full border mb-4">
            <thead>
              <tr class="bg-gray-100 text-left">
                <th class="p-2 border">Produkt</th>
                <th class="p-2 border">Menge</th>
                <th class="p-2 border">Stückpreis</th>
                <th class="p-2 border">Gesamt</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.items" :key="item.id">
                <td class="p-2 border">{{ item.product?.title || '-' }}</td>
                <td class="p-2 border">{{ item.quantity }}</td>
                <td class="p-2 border">{{ Number(item.unit_price).toFixed(2) }} €</td>
                <td class="p-2 border">{{ (item.quantity * item.unit_price).toFixed(2) }} €</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="order.details" class="mb-6">
          <h2 class="text-lg font-semibold mb-2">Lieferadresse</h2>
          <div>{{ order.details.first_name }} {{ order.details.last_name }}</div>
          <div>{{ order.details.address1 }} {{ order.details.address2 }}</div>
          <div>{{ order.details.zipcode }} {{ order.details.city }}</div>
          <div>{{ order.details.country_code }}</div>
        </div>
      </div>
      <div v-else class="text-red-500">Bestellung konnte nicht geladen werden.</div>
    </div>
  </ShopLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';
import ShopLayout from '~/components/layouts/ShopLayout.vue';

const order = ref(null);
const loading = ref(true);
const route = useRoute();
const auth = useAuthStore();
const { $axios } = useNuxtApp();

function formatDate(date) {
  return new Date(date).toLocaleString('de-DE');
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

onMounted(async () => {
  loading.value = true;
  try {
    const id = route.query.id || route.query.order_id;
    if (!id) throw new Error('Keine Bestell-ID in der URL gefunden!');
    const res = await $axios.get(`/shop/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    order.value = res.data;
  } catch (error) {
    console.error('Fehler beim Laden der Bestellung:', error);
    order.value = null;
  } finally {
    loading.value = false;
  }
});
</script>
