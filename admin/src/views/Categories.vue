<template>
    <div class="bg-white p-4 shadow">
        <h1 class="text-2xl font-bold mb-4">Manage Categories</h1>
        <form
            @submit.prevent="createCategory"
            class="flex flex-col sm:flex-row sm:items-center gap-2 mb-6"
        >
            <input
                v-model="newCategory.name"
                type="text"
                placeholder="Name"
                class="border p-2 w-full sm:w-auto"
                required
                :disabled="categories.length >= 4"
                :class="categories.length >= 4 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ''"
            />
            <input
                v-model="newCategory.slug"
                type="text"
                placeholder="Slug"
                class="border p-2 w-full sm:w-auto"
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
        <table class="table-fixed w-full mt-4 border-collapse">
            <thead>
                <tr class="text-left">
                    <th class="w-12 px-4 py-2">#</th>
                    <th class="w-1/4 px-4 py-2">Name</th>
                    <th class="w-1/4 px-4 py-2">Slug</th>
                    <th class="w-1/4 px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody v-if="categories.length > 0">
                <tr v-for="(category, index) in categories" :key="category.id" class="border-t">
                    <td class="px-4 py-2">{{ index + 1 }}</td>
                    <td class="px-4 py-2">{{ category.name }}</td>
                    <td class="px-4 py-2">{{ category.slug }}</td>
                    <td class="px-4 py-2">
                        <button
                            @click="deleteCategory(category.id)"
                            class="text-red-600 hover:underline"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <td colspan="4" class="text-center text-gray-500 italic py-6">
                        No categories found.
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="mt-4 flex justify-end">
            <button @click="saveVisibility" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                Sichtbarkeit speichern
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import store from "./../store/index.js";

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

function toggleVisible(category) {
    store.dispatch("updateCategory", {
        id: category.id,
        visible_in_nav: category.visible_in_nav,
    });
}

async function saveVisibility() {
    for (const category of categories.value) {
        await store.dispatch("updateCategory", {
            id: category.id,
            visible_in_nav: category.visible_in_nav,
        });
    }
}
</script>
