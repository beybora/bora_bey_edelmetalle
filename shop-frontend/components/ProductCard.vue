<template>
    <div
        class="group relative border rounded-md p-4 hover:shadow-md transition"
    >
        <img
            :src="product.image"
            :alt="product.title"
            class="aspect-square w-full object-cover rounded-md bg-gray-200"
        />
        <div class="mt-4">
            <h3 class="text-sm font-semibold text-gray-900 truncate">
                {{ product.title }}
            </h3>
            <p class="text-sm text-gray-500 line-clamp-2">
                {{ product.description }}
            </p>
            <p class="text-sm font-bold text-indigo-600 mt-2">
                {{ product.price }} €
            </p>

            <div class="mt-4 flex items-center space-x-2">
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
                    Add to Cart
                </button>
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
