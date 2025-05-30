<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">Kategorien verwalten</h1>

        <!-- Neue Kategorie -->
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
            />
            <input
                v-model="newCategory.slug"
                type="text"
                placeholder="Slug"
                class="border p-2 w-full sm:w-auto"
            />
            <button
                type="submit"
                class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
                Erstellen
            </button>
        </form>

        <!-- Kategorienliste -->
        <h2 class="text-xl font-semibold mb-2">Kategorien</h2>
        <div
            v-for="(category, index) in categories"
            :key="category.id"
            class="flex items-center justify-between bg-white p-4 border mb-2"
        >
            <span class="w-10 text-center">{{ index + 1 }}</span>
            <span class="font-semibold">{{ category.name }}</span>
            <span class="text-gray-500">/{{ category.slug }}</span>
            <span class="text-green-700 font-medium">In Navigation</span>
            <button
                @click="deleteCategory(category.id)"
                class="text-red-600 hover:underline"
            >
                Löschen
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
    if (!confirm("Wirklich löschen?")) return;
    await store.dispatch("deleteCategory", id);
};
</script>
