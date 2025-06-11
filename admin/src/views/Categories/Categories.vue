<template>
    <div>
        <h1 class="text-2xl font-bold mb-4">Manage Categories</h1>
            <form
                @submit.prevent="createCategory"
                class="flex flex-col sm:flex-row sm:items-center gap-2 mb-6"
            >
                <input
                    v-model="newCategory.name"
                    type="text"
                    placeholder="Name"
                    class="border p-2 w-full sm:w-auto rounded"
                    required
                    :disabled="categories.length >= 4"
                    :class="categories.length >= 4 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ''"
                />
                <input
                    v-model="newCategory.slug"
                    type="text"
                    placeholder="Slug"
                    class="border p-2 w-full sm:w-auto rounded"
                    :disabled="categories.length >= 4"
                    :class="categories.length >= 4 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ''"
                />
                <button
                    type="submit"
                    class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    :disabled="categories.length >= 4"
                    :class="categories.length >= 4 ? 'bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-300 hover:bg-gray-300' : ''"
                >
                    Create
                </button>
            </form>
            <div v-if="categories.length >= 4" class="mb-4 text-red-600 font-semibold">
                Maximum of 4 categories allowed. Please delete a category to add a new one.
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <CategoryCard
                    v-for="category in categories"
                    :key="category.id"
                    :category="category"
                    @delete="deleteCategory"
                />
            </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import store from "../../store/index.js";
import CategoryCard from "./CategoryCard.vue";

const newCategory = ref({ name: "", slug: "" });

const categories = computed(() => store.state.categories.data);

onMounted(() => {
    store.dispatch("getCategories");
});

const createCategory = async () => {
    await store.dispatch("createCategory", {
        ...newCategory.value,
        visible_in_nav: true,
    });

    newCategory.value = {
        name: "",
        slug: "",
    };
};

const deleteCategory = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    await store.dispatch("deleteCategory", id);
};
</script>
