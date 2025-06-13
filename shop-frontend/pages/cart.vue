<template>
    <ShopLayout>
        <div class="p-8">
            <Cart />
        </div>
    </ShopLayout>
</template>

<script setup>
import ShopLayout from "~/components/layouts/ShopLayout.vue";
import Cart from "~/components/Cart.vue";

definePageMeta({
  middleware: ['auth']
});
</script>
