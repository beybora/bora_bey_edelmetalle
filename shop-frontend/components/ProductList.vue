<template>
    <div>
        <h1 class="text-xl font-bold mb-4">
            Produkte
            <span v-if="selectedSlug">– {{ selectedSlug }}</span>
        </h1>

        <div v-if="loading" class="text-gray-500 text-sm py-10">
            Lade Produkte...
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
