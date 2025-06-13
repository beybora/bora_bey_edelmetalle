<template>
    <ShopLayout>
      <div class="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

        <div v-if="loading" class="text-gray-500">Loading data...</div>

        <template v-else>
          <div class="bg-white rounded-lg shadow p-6 mb-10">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Account Info</h2>
            <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <div>
                <dt class="font-semibold">Name:</dt>
                <dd>{{ user?.name }}</dd>
              </div>
              <div>
                <dt class="font-semibold">Email:</dt>
                <dd>{{ user?.email }}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 class="text-xl font-semibold text-gray-800 mb-4">My Orders</h2>

            <div v-if="orders.length === 0" class="text-gray-500">
              No orders yet.
            </div>

            <div v-else class="overflow-x-auto bg-white rounded-lg shadow">
              <table class="w-full text-sm text-left text-gray-700">
                <thead class="text-xs uppercase bg-gray-100 text-gray-600">
                  <tr>
                    <th class="px-4 py-3">Date</th>
                    <th class="px-4 py-3">Status</th>
                    <th class="px-4 py-3">Total</th>
                    <th class="px-4 py-3 text-center">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="order in sortedOrders"
                    :key="order.id"
                    class="border-t hover:bg-gray-50 transition"
                  >
                    <td class="px-4 py-3">{{ formatDate(order.created_at) }}</td>
                    <td class="px-4 py-3">
                      <span :class="getStatusClass(order.status)">
                        {{ order.status }}
                      </span>
                    </td>
                    <td class="px-4 py-3">{{ Number(order.total_price).toFixed(2) }} €</td>
                    <td class="px-4 py-3 text-center">
                      <NuxtLink
                        :to="`/order-details?id=${order.id}`"
                        class="text-indigo-600 hover:underline"
                      >
                        View
                      </NuxtLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </template>
      </div>
    </ShopLayout>
  </template>

  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useAuthStore } from '~/stores/auth';
  import { useOrdersStore } from '~/stores/orders';
  import ShopLayout from '~/components/layouts/ShopLayout.vue';
  import { formatDate, getStatusClass } from '~/composables/useFormatting';

  definePageMeta({
    middleware: ['auth']
  });

  const loading = ref(true);
  const auth = useAuthStore();
  const ordersStore = useOrdersStore();

  const user = computed(() => auth.user);
  const orders = computed(() => ordersStore.orders);

  const sortedOrders = computed(() => {
    return [...orders.value].sort((a, b) =>
      new Date(b.created_at) - new Date(a.created_at)
    );
  });

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
