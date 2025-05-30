<template>
    <div class="w-full flex justify-between items-center px-6">
        <div class="flex space-x-4">
            <button @click="selectCategory(null)" :class="linkClass(null)">
                All Products
            </button>
            <button
                v-for="category in categories"
                :key="category.id"
                @click="selectCategory(category.slug)"
                :class="linkClass(category.slug)"
            >
                {{ category.name }}
            </button>
        </div>

        <div
            class="flex items-center border border-gray-600 bg-gray-700 rounded-md overflow-hidden"
        >
            <input
                v-model="searchInput"
                type="text"
                placeholder="Search..."
                class="px-3 py-1 text-sm bg-gray-700 text-white placeholder-gray-300 focus:outline-none"
            />
            <button
                @click="triggerSearch"
                class="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm"
            >
                🔍
            </button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useCategoriesStore } from "~/stores/categories";
import { useProductsStore } from "~/stores/products";

const categoryStore = useCategoriesStore();
const productStore = useProductsStore();
const categories = computed(() => categoryStore.items);
const selected = computed(() => categoryStore.selectedCategorySlug);
const searchInput = ref(categoryStore.search || "");

function selectCategory(slug) {
    categoryStore.selectCategory(slug);
    productStore.fetchAll();
}

function triggerSearch() {
    categoryStore.setSearch(searchInput.value);
    productStore.fetchAll();
}

function linkClass(slug) {
    const base = "px-3 py-2 rounded-md text-sm font-medium transition";
    const isActive = slug === selected.value;
    return isActive
        ? `${base} bg-gray-700 text-white`
        : `${base} text-gray-300 hover:bg-gray-600 hover:text-white`;
}

onMounted(() => {
    categoryStore.fetchCategories();
});
</script>
