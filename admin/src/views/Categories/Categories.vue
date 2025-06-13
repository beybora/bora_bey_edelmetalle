<template>
    <div>
        <h1 class="text-2xl font-bold mb-4">Manage Categories</h1>
            <form
                @submit.prevent="createCategory"
                class="flex flex-col sm:flex-row sm:items-center gap-2 mb-6"
            >
                <CustomInput
                    type="text"
                    placeholder="Enter category name"
                    v-model="newCategory.name"
                    :disabled="categories.length >= 4"
                    required
                    class="w-full sm:w-auto"
                />
                <CustomInput
                    type="text"
                    placeholder="Enter category slug"
                    v-model="newCategory.slug"
                    :disabled="categories.length >= 4"
                    class="w-full sm:w-auto"
                />
                <CustomButton
                    type="submit"
                    :disabled="categories.length >= 4"
                    class="w-full sm:w-auto"
                >
                    Create
                </CustomButton>
            </form>
            <div v-if="categories.length >= 4" class="mb-4 text-red-600">
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
import CustomInput from "../../components/core/CustomInput.vue";
import CustomButton from "../../components/core/CustomButton.vue";

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
