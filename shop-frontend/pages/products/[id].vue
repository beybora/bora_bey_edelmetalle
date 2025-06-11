<template>
    <ShopLayout>
        <ProductDetail v-if="product" :product="product" />
        <ProductSkeleton v-else />
    </ShopLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductsStore } from '~/stores/products';
import ShopLayout from '~/components/layouts/ShopLayout.vue';
import ProductDetail from '~/components/products/ProductDetail.vue';
import ProductSkeleton from '~/components/products/ProductSkeleton.vue';

const route = useRoute();
const productsStore = useProductsStore();
const product = ref(null);

onMounted(async () => {
    product.value = await productsStore.fetchProduct(route.params.id);
});
</script>
