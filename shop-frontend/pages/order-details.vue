<template>
    <ShopLayout>
      <div class="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Order from {{ formatDate(order.created_at) }}
        </h1>

        <div v-if="loading" class="text-gray-500">Loading order data...</div>

        <div v-else-if="order" class="space-y-8 text-gray-800">
          <div>
            <h2 class="text-lg font-semibold mb-2">Status</h2>
            <span :class="getStatusClass(order.status)">{{ order.status }}</span>
          </div>

          <div>
            <h2 class="text-lg font-semibold mb-2">Total Price</h2>
            <div>{{ Number(order.total_price).toFixed(2) }} €</div>
          </div>

          <div>
            <h2 class="text-lg font-semibold mb-2">Order Date</h2>
            <div>{{ formatDate(order.created_at) }}</div>
          </div>

          <div>
            <h2 class="text-lg font-semibold mb-4">Products</h2>
            <div class="overflow-x-auto rounded shadow bg-white">
              <table class="min-w-full text-sm text-left text-gray-700">
                <thead class="text-xs uppercase bg-gray-100 text-gray-600">
                  <tr>
                    <th class="px-4 py-3">Product</th>
                    <th class="px-4 py-3">Quantity</th>
                    <th class="px-4 py-3">Unit Price</th>
                    <th class="px-4 py-3">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in order.items"
                    :key="item.id"
                    class="border-t hover:bg-gray-50 transition"
                  >
                    <td class="px-4 py-3">{{ item.product?.title || '-' }}</td>
                    <td class="px-4 py-3">{{ item.quantity }}</td>
                    <td class="px-4 py-3">{{ Number(item.unit_price).toFixed(2) }} €</td>
                    <td class="px-4 py-3">{{ (item.quantity * item.unit_price).toFixed(2) }} €</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div v-if="order.details">
            <h2 class="text-lg font-semibold mb-2">Shipping Address</h2>
            <div class="space-y-1">
              <div>{{ order.details.first_name }} {{ order.details.last_name }}</div>
              <div>{{ order.details.address1 }} {{ order.details.address2 }}</div>
              <div>{{ order.details.zipcode }} {{ order.details.city }}</div>
              <div>{{ order.details.country_code }}</div>
            </div>
          </div>
        </div>

        <div v-else class="text-red-500 mt-8">
          Could not load order.
        </div>
      </div>
    </ShopLayout>
  </template>

  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useAuthStore } from '~/stores/auth';
  import ShopLayout from '~/components/layouts/ShopLayout.vue';
  import { formatDate, getStatusClass } from '~/composables/useFormatting';

  definePageMeta({
    middleware: ['auth']
  });

  const order = ref(null);
  const loading = ref(true);
  const route = useRoute();
  const auth = useAuthStore();
  const { $axios } = useNuxtApp();

  onMounted(async () => {
    loading.value = true;
    try {
      const id = route.query.id || route.query.order_id;
      if (!id) throw new Error('No order ID found in URL!');
      const res = await $axios.get(`/shop/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      order.value = res.data;
    } catch (error) {
      console.error('Failed to load order:', error);
      order.value = null;
    } finally {
      loading.value = false;
    }
  });
  </script>
