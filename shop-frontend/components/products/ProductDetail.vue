<template>
    <div class="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <div class="flex flex-col md:flex-row gap-8">
            <img
                :src="product.image"
                :alt="product.title"
                class="w-full md:w-80 aspect-square object-cover rounded-md bg-gray-200"
            />
            <div class="flex-1 flex flex-col justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 mb-2">
                        {{ product.title }}
                    </h1>
                    <p class="text-gray-600 mb-4">
                        {{ product.description }}
                    </p>
                    <div class="text-lg font-bold text-indigo-600 mb-4">
                        {{ product.price }} €
                    </div>
                </div>
                <div class="flex items-center space-x-2 mt-4">
                    <input
                        v-model.number="quantity"
                        type="number"
                        min="1"
                        class="w-16 border rounded px-2 py-1 text-sm"
                    />
                    <button
                        @click="add"
                        class="bg-indigo-600 text-white text-sm px-3 py-1 rounded hover:bg-indigo-500"
                    >
                        In den Warenkorb
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useCartStore } from "~/stores/cart";

const props = defineProps({
    product: {
        type: Object,
        required: true,
    },
});

const cart = useCartStore();
const quantity = ref(1);

async function add() {
    await cart.addToCart(props.product.id, quantity.value);
}
</script>
