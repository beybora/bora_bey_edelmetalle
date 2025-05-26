<!-- pages/index.vue -->
<template>
    <ShopLayout>
        <div class="p-8">
            <h1 class="text-2xl font-bold mb-4">All Products</h1>
            <ProductList />
        </div>
    </ShopLayout>
</template>

<script setup>
import ShopLayout from "~/components/layouts/ShopLayout.vue";
import ProductList from "~/components/ProductList.vue";
</script>
