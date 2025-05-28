<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">Kategorien verwalten</h1>

        <!-- Neue Kategorie erstellen -->
        <div class="mb-6">
            <h2 class="text-xl font-semibold mb-2">Neue Kategorie</h2>
            <form
                @submit.prevent="createCategory"
                class="flex flex-col sm:flex-row sm:items-center gap-2"
            >
                <input
                    v-model="newCategory.name"
                    type="text"
                    placeholder="Name"
                    class="border p-2 w-full sm:w-auto"
                    required
                />
                <input
                    v-model="newCategory.slug"
                    type="text"
                    placeholder="Slug"
                    class="border p-2 w-full sm:w-auto"
                />
                <label class="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        v-model="newCategory.visible_in_nav"
                    />
                    <span>In Navigation anzeigen</span>
                </label>
                <button
                    type="submit"
                    class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Erstellen
                </button>
            </form>
        </div>

        <!-- Kategorienliste -->
        <div>
            <h2 class="text-xl font-semibold mb-2">Kategorien</h2>
            <div
                v-for="category in sortedCategories"
                :key="category.id"
                class="flex items-center justify-between bg-white p-4 border mb-2"
            >
                <input
                    type="number"
                    v-model.number="category.sort_order"
                    :disabled="!category.visible_in_nav"
                    class="border w-16 text-center"
                    min="1"
                    max="4"
                    @change="updateSortOrder(category)"
                />
                <span class="font-semibold">{{ category.name }}</span>
                <span class="text-gray-500">/{{ category.slug }}</span>
                <label class="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        :checked="category.visible_in_nav"
                        @change="toggleVisibility(category)"
                    />
                    <span>In Navigation</span>
                </label>
                <button
                    class="text-red-600 hover:underline"
                    @click="deleteCategory(category.id)"
                >
                    Löschen
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import store from "./../store/index.js";

const newCategory = ref({
    name: "",
    slug: "",
    visible_in_nav: false,
});

onMounted(() => {
    store.dispatch("getCategories");
});

const sortedCategories = computed(() => store.getters.sortedCategories);
const categories = computed(() => store.state.categories.data);
console.log("Categories:", categories.value);
console.log("Sorted Categories:", sortedCategories);

const createCategory = async () => {
    const visibleCount = categories.value.filter(
        (c) => c.visible_in_nav
    ).length;

    if (newCategory.value.visible_in_nav && visibleCount >= 4) {
        alert("Maximal 4 sichtbare Kategorien erlaubt.");
        newCategory.value.visible_in_nav = false;
    } else if (newCategory.value.visible_in_nav) {
        newCategory.value.sort_order = store.getters.getNextSortOrder;
    }

    await store.dispatch("createCategory", { ...newCategory.value });

    newCategory.value = {
        name: "",
        slug: "",
        visible_in_nav: false,
    };
};

const toggleVisibility = async (category) => {
    await store.dispatch("toggleVisibility", category);
};

const updateSortOrder = async (category) => {
    await store.dispatch("updateSortOrder", category);
};

const deleteCategory = async (id) => {
    if (!confirm("Wirklich löschen?")) return;
    await store.dispatch("deleteCategory", id);
};
</script>
