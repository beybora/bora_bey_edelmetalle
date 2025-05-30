import { defineStore } from "pinia";

export const useCategoriesStore = defineStore("categories", {
    state: () => ({
        items: [],
        selectedCategorySlug: null,
        search: "",
    }),

    actions: {
        async fetchCategories() {
            const { $axios } = useNuxtApp();
            try {
                const res = await $axios.get("/shop/categories");
                this.items = res.data;
            } catch (error) {
                console.error("Error loading categories", error);
            }
        },

        selectCategory(slug) {
            this.selectedCategorySlug = slug;
        },

        setSearch(term) {
            this.search = term;
        },

        resetFilters() {
            this.selectedCategorySlug = null;
            this.search = "";
        },
    },
});
