<template>
    <div>
        <h1 class="text-xl font-bold mb-4">
            Produkte
            <span v-if="selectedSlug">– {{ selectedSlug }}</span>
        </h1>

        <div v-if="loading" class="flex justify-center items-center h-64">
            <svg
                class="animate-spin h-10 w-10 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                ></circle>
                <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
        </div>

        <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            <ProductCard
                v-for="product in products"
                :key="product.id"
                :product="product"
            />
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import { useProductsStore } from "~/stores/products";
import { useCategoriesStore } from "~/stores/categories";
import ProductCard from "~/components/ProductCard.vue";

const productStore = useProductsStore();
const categoryStore = useCategoriesStore();

const products = computed(() => productStore.products);
const loading = computed(() => productStore.loading);
const selectedSlug = computed(() => categoryStore.selectedCategorySlug);

onMounted(() => {
    productStore.fetchAll();
});

watch(selectedSlug, () => {
    productStore.fetchAll();
});
</script>
