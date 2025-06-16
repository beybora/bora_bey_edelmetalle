<!-- pages/index.vue -->
<template>
    <ShopLayout>
        <div>
            <ProductList />
        </div>
    </ShopLayout>
</template>

<script setup>
import ShopLayout from "~/components/layouts/ShopLayout.vue";
import ProductList from "~/components/products/ProductList.vue";
</script>
