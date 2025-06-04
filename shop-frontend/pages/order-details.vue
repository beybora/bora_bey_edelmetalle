<template>
  <ShopLayout>
    <div class="p-10">
      <h1 class="text-2xl font-bold mb-4">Order Details</h1>

      <div v-if="loading" class="text-gray-500">Lade Bestelldaten...</div>

      <div v-else-if="order">
        <p class="text-gray-700 mb-2">
          <strong>Bestellnummer:</strong> {{ order.id }}
        </p>
        <p class="text-gray-700 mb-2">
          <strong>Status:</strong> {{ order.status }}
        </p>
        <p class="text-gray-700 mb-4">
          <strong>Gesamtpreis:</strong> {{ order.total_price }} €
        </p>

        <div class="border-t border-gray-200 pt-4">
          <h2 class="text-lg font-semibold mb-2">Produkte:</h2>
          <ul class="list-disc pl-6 space-y-1">
            <li v-for="item in order.items" :key="item.id">
              {{ item.product.title }} – {{ item.quantity }} × {{ item.unit_price }} €
            </li>
          </ul>
        </div>

        <div v-if="order.details" class="mt-6">
          <h2 class="text-lg font-semibold mb-2">Lieferadresse:</h2>
          <p>
            {{ order.details.first_name }} {{ order.details.last_name }}<br />
            {{ order.details.address1 }} {{ order.details.address2 }}<br />
            {{ order.details.zipcode }} {{ order.details.city }}<br />
            {{ order.details.country_code }}
          </p>
        </div>
      </div>

      <div v-else class="text-red-500">Bestellung konnte nicht geladen werden.</div>
    </div>
  </ShopLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '~/stores/auth';
import ShopLayout from '~/components/layouts/ShopLayout.vue';

const order = ref(null);
const loading = ref(true);
const route = useRoute();
const auth = useAuthStore();
const { $axios } = useNuxtApp();

onMounted(async () => {
  loading.value = true;
  try {
    // Unterstützt sowohl ?id= als auch ?order_id=
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