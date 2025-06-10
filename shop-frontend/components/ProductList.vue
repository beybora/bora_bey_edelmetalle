<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold text-gray-900">
                Products
                <span v-if="selectedSlug" class="text-gray-500 font-normal">
                    – {{ selectedSlug }}
                </span>
            </h1>
        </div>

        <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
            <div class="relative">
                <div class="w-12 h-12 rounded-full border-4 border-indigo-200"></div>
                <div class="w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin absolute top-0"></div>
            </div>
        </div>

        <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
            <ProductCard
                v-for="product in products"
                :key="product.id"
                :product="product"
            />
        </div>

        <div v-if="!loading && products.length === 0" class="text-center py-12">
            <p class="text-gray-500 text-lg">No products found.</p>
        </div>

        <div v-if="lastPage > 1" class="flex justify-center mt-8 space-x-2">
            <button
                class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                :disabled="currentPage === 1"
                @click="prevPage"
            >
                Previous
            </button>
            <span class="px-3 py-1 text-gray-700">Page {{ currentPage }} of {{ lastPage }}</span>
            <button
                class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                :disabled="currentPage === lastPage"
                @click="nextPage"
            >
                Next
            </button>
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
const currentPage = computed(() => productStore.currentPage);
const lastPage = computed(() => productStore.lastPage);

function nextPage() {
    if (currentPage.value < lastPage.value) {
        productStore.fetchAll({ page: currentPage.value + 1 });
    }
}

function prevPage() {
    if (currentPage.value > 1) {
        productStore.fetchAll({ page: currentPage.value - 1 });
    }
}

onMounted(() => {
    productStore.fetchAll({ page: 1 });
});

watch(selectedSlug, () => {
    productStore.fetchAll({ page: 1 });
});
</script>
