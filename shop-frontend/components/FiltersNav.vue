<template>
    <div
        class="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 lg:gap-8 px-2 lg:px-6"
    >
        <div class="flex space-x-2 overflow-x-auto">
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
            class="flex items-center border border-gray-600 bg-gray-700 rounded-md overflow-hidden w-full lg:w-auto"
        >
            <input
                v-model="searchInput"
                type="text"
                placeholder="Search..."
                @keyup.enter="triggerSearch"
                class="px-3 py-1 w-full text-sm bg-gray-700 text-white placeholder-gray-300 focus:outline-none"
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
import { ref, computed, onMounted } from "vue";
import { useCategoriesStore } from "~/stores/categories";
import { useProductsStore } from "~/stores/products";

const props = defineProps({
    isMobile: Boolean,
});

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
