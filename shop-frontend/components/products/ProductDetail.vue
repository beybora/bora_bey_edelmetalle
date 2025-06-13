<template>
    <div class="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow p-6 sm:p-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <img
          :src="product.image"
          :alt="product.title"
          class="w-full lg:w-80 aspect-square object-cover rounded-md bg-gray-200 dark:bg-gray-700"
        />
        <div class="flex-1 flex flex-col justify-between text-gray-800 dark:text-gray-200">
          <div>
            <h1 class="text-2xl font-bold mb-2">{{ product.title }}</h1>
            <p class="text-gray-600 dark:text-gray-400 mb-4">{{ product.description }}</p>
            <div class="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
              {{ Number(product.price).toFixed(2) }} €
            </div>
          </div>
          <div class="flex items-center space-x-2 mt-6">
            <label for="qty" class="text-sm font-medium text-gray-700 dark:text-gray-300">Menge</label>
            <input
              id="qty"
              v-model.number="quantity"
              type="number"
              min="1"
              class="w-20 border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <button
              @click="add"
              class="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded transition"
            >
              In den Warenkorb
            </button>
          </div>
        </div>
      </div>
      <div class="mt-10 border-t pt-6 text-sm text-gray-600 dark:text-gray-400">
        <p>
          Dieses Produkt enthält hochwertige Komponenten und bietet ein hervorragendes Preis-Leistungs-Verhältnis.
          Für detaillierte Informationen oder Rückfragen stehen wir jederzeit zur Verfügung.
        </p>
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
