<!-- pages/index.vue -->
<template>
    <ShopLayout>
        <div class="p-8">
            <ProductList />
        </div>
    </ShopLayout>
</template>

<script setup>
import ShopLayout from "~/components/layouts/ShopLayout.vue";
import ProductList from "~/components/ProductList.vue";
</script>
