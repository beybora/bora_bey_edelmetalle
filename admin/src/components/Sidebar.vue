<template>
    <div
        class="bg-indigo-700 text-gray-300 w-16 py-4 px-2 space-y-2 rounded-r-sm shadow-lg"
    >
        <router-link
            :to="{ name: 'app.orders' }"
            class="flex items-center py-1 px-2 rounded hover:bg-black/30"
        >
            <OrdersIcon class="h-5 w-5" />
        </router-link>

        <router-link
            :to="{ name: 'app.products' }"
            class="flex items-center py-1 px-2 rounded hover:bg-black/30"
        >
            <ProductsIcon class="h-5 w-5" />
        </router-link>

        <router-link
            :to="{ name: 'app.users' }"
            class="flex items-center py-1 px-2 rounded hover:bg-black/30"
        >
            <UsersIcon class="h-5 w-5" />
        </router-link>

        <router-link
            :to="{ name: 'app.categories' }"
            class="flex items-center py-1 px-2 rounded hover:bg-black/30"
        >
            <CategoriesIcon class="h-5 w-5" />
        </router-link>
    </div>
</template>

<script setup>
import OrdersIcon from './icons/OrdersIcon.vue';
import ProductsIcon from './icons/ProductsIcon.vue';
import UsersIcon from './icons/UsersIcon.vue';
import CategoriesIcon from './icons/CategoriesIcon.vue';
</script>

<style scoped></style>
