<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
        />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ProductCard from "~/components/ProductCard.vue";
const { $axios } = useNuxtApp();

const products = ref([]);

onMounted(async () => {
    try {
        const res = await $axios.get("/shop/products");
        products.value = res.data.data;
    } catch (error) {
        console.error("Fehler beim Laden der Produkte:", error);
    }
});
</script>
