<template>
    <ShopLayout>
        <div class="p-10">
            <h1 class="text-2xl font-bold mb-4">Order Details</h1>

            <div v-if="order">
                <p class="text-gray-700 mb-2">
                    <strong>Bestellnummer:</strong> {{ order.id }}
                </p>
                <p class="text-gray-700 mb-2">
                    <strong>Status:</strong> {{ order.status }}
                </p>
                <p class="text-gray-700 mb-4">
                    <strong>Gesamtpreis:</strong>
                    {{ order.total_price }} €
                </p>

                <div class="border-t border-gray-200 pt-4">
                    <h2 class="text-lg font-semibold mb-2">Produkte:</h2>
                    <ul class="list-disc pl-6 space-y-1">
                        <li v-for="item in order.items" :key="item.id">
                            {{ item.product.title }} – {{ item.quantity }} ×
                            {{ item.unit_price }} €
                        </li>
                    </ul>
                </div>

                <div v-if="order.details" class="mt-6">
                    <h2 class="text-lg font-semibold mb-2">Lieferadresse:</h2>
                    <p>
                        {{ order.details.first_name }}
                        {{ order.details.last_name }}<br />
                        {{ order.details.address1 }} {{ order.details.address2
                        }}<br />
                        {{ order.details.zipcode }} {{ order.details.city
                        }}<br />
                        {{ order.details.country_code }}
                    </p>
                </div>
            </div>

            <p v-else>Lade Bestelldaten...</p>
        </div>
    </ShopLayout>
</template>

<script setup>
import ShopLayout from "~/components/layouts/ShopLayout.vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import { onMounted, ref } from "vue";

const route = useRoute();
const order = ref(null);
const auth = useAuthStore();
const { $axios } = useNuxtApp();

onMounted(async () => {
    const id = route.query.order_id;
    const res = await $axios.get(`/shop/orders/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
    });
    order.value = res.data;
});
</script>
