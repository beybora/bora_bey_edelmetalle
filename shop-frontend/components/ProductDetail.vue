<template>
    <section class="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div
            v-if="product"
            class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12"
        >
            <div class="bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                <img
                    :src="product.image"
                    :alt="product.title"
                    class="w-full h-auto object-cover"
                />
            </div>

            <div>
                <h1 class="text-3xl font-bold text-gray-900">
                    {{ product.title }}
                </h1>
                <p class="mt-3 text-base text-gray-600 leading-relaxed">
                    {{ product.description }}
                </p>
                <p class="mt-6 text-2xl text-indigo-600 font-semibold">
                    {{ product.price }} €
                </p>

                <div class="mt-8 flex items-center gap-4">
                    <label for="quantity" class="sr-only">Menge</label>
                    <input
                        v-model.number="quantity"
                        id="quantity"
                        type="number"
                        min="1"
                        class="w-20 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                        @click="addToCart"
                        class="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow hover:bg-indigo-700 transition"
                    >
                        In den Warenkorb
                    </button>
                </div>
            </div>
        </div>

        <div v-else class="py-24 text-center text-gray-500">
            Produkt wird geladen...
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "~/stores/cart";

const route = useRoute();
const product = ref(null);
const quantity = ref(1);
const cart = useCartStore();

const loadProduct = async (id) => {
    const { $axios } = useNuxtApp();
    product.value = null;
    try {
        const res = await $axios.get(`/shop/products/${id}`);
        product.value = res.data.data;
    } catch (err) {
        console.error("Produkt konnte nicht geladen werden:", err);
    }
};

onMounted(() => {
    loadProduct(route.params.id);
});

watch(
    () => route.params.id,
    (newId) => {
        loadProduct(newId);
    }
);

function addToCart() {
    if (product.value) {
        cart.addToCart(product.value.id, quantity.value);
    }
}
</script>
