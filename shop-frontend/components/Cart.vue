<template>
    <div class="bg-white px-4 sm:px-6 lg:px-8">
        <div v-if="cart.items.length === 0" class="flex flex-col items-center justify-center py-24">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.48 19h9.04a2 2 0 001.83-1.3L17 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" /></svg>
            <div class="text-2xl font-semibold text-gray-700 mb-2">Dein Warenkorb ist leer</div>
            <div class="text-gray-500 mb-6">Füge Produkte hinzu, um deinen Einkauf zu starten.</div>
            <div class="flex gap-4">
                <NuxtLink to="/" class="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">Zur Startseite</NuxtLink>
            </div>
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10">
            <!-- Cart Items -->
            <div class="lg:col-span-8">
                <ul role="list" class="divide-y divide-gray-200">
                    <li
                        v-for="item in cart.items"
                        :key="item.id"
                        class="flex py-6 sm:py-10"
                    >
                        <div
                            class="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border border-gray-200"
                        >
                            <img
                                v-if="item.product.image"
                                :src="item.product.image"
                                :alt="item.product.title"
                                class="h-full w-full object-cover object-center"
                            />
                        </div>

                        <div class="ml-4 flex flex-1 flex-col sm:ml-6">
                            <div>
                                <div
                                    class="flex justify-between text-base font-medium text-gray-900"
                                >
                                    <h3>{{ item.product.title }}</h3>
                                    <p>
                                        {{
                                            (
                                                item.product.price *
                                                item.quantity
                                            ).toFixed(2)
                                        }}
                                        €
                                    </p>
                                </div>
                                <p class="mt-1 text-sm text-gray-500">
                                    {{ item.product.description }}
                                </p>
                            </div>

                            <div
                                class="flex flex-1 items-end justify-between text-sm mt-4"
                            >
                                <div class="flex items-center gap-2">
                                    <label class="text-gray-500">Qty:</label>
                                    <input
                                        type="number"
                                        min="1"
                                        class="w-16 rounded border border-gray-300 p-1 text-center text-sm"
                                        v-model.number="item.quantity"
                                        @change="
                                            updateQuantity(
                                                item.id,
                                                item.quantity
                                            )
                                        "
                                    />
                                </div>
                                <button
                                    @click="remove(item.id)"
                                    class="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- Summary -->
            <div class="lg:col-span-4">
                <div class="bg-gray-50 rounded-lg shadow p-6 space-y-6">
                    <h2 class="text-lg font-medium text-gray-900">
                        Order summary
                    </h2>

                    <div class="space-y-4 text-sm text-gray-700">
                        <div class="flex justify-between">
                            <span>Subtotal</span>
                            <span>{{ subtotal.toFixed(2) }} €</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Shipping estimate</span>
                            <span>5.00 €</span>
                        </div>

                        <div
                            class="border-t border-gray-200 pt-4 flex justify-between font-medium text-gray-900 text-base"
                        >
                            <span>Order total</span>
                            <span>{{ total.toFixed(2) }} €</span>
                        </div>
                    </div>

                    <button
                        class="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 text-base font-medium"
                        @click="checkout"
                    >
                        Checkout
                    </button>

                    <div class="text-sm text-center text-gray-500">
                        or
                        <NuxtLink
                            to="/"
                            class="text-indigo-600 hover:text-indigo-500 font-medium"
                        >
                            Continue Shopping →
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCartStore } from "~/stores/cart";
import { useOrdersStore } from "~/stores/orders";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const cart = useCartStore();
const orders = useOrdersStore();
const router = useRouter();

onMounted(() => {
    cart.fetchCart();
});

const subtotal = computed(() =>
    cart.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    )
);

const total = computed(() => subtotal.value + 5);

function updateQuantity(id, quantity) {
    cart.updateQuantity(id, quantity);
}

function remove(id) {
    cart.removeFromCart(id);
}

async function checkout() {
    const orderData = {
        first_name: "Max",
        last_name: "Mustermann",
        phone: "0123456789",
        address1: "Musterstraße 1",
        address2: "",
        city: "Berlin",
        state: "BE",
        zipcode: "10115",
        country_code: "DE",
    };

    try {
        const res = await orders.placeOrder(orderData);
        router.push(`/order-details?order_id=${res.order_id}`);
    } catch (e) {
        console.error("Checkout failed", e);
    }
}
</script>
