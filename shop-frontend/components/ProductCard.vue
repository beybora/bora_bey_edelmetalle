<template>
    <div
        class="group relative border rounded-md p-4 hover:shadow-md transition"
    >
        <img
            :src="product.image"
            :alt="product.title"
            class="aspect-square w-full object-cover rounded-md bg-gray-200"
        />
        <div class="mt-4">
            <h3 class="text-sm font-semibold text-gray-900 truncate">
                {{ product.title }}
            </h3>
            <p class="text-sm text-gray-500 line-clamp-2">
                {{ product.description }}
            </p>
            <p class="text-sm font-bold text-indigo-600 mt-2">
                {{ product.price }} €
            </p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    product: Object,
});
</script>
