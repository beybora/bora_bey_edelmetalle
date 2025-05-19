<template>
    <div
        class="w-[200px] bg-indigo-700 text-gray-300 py-4 px-2 space-y-2 rounded-r-sm shadow-lg"
    >
        <router-link
            :to="{ name: 'app.dashboard' }"
            class="flex items-center py-1 px-2 rounded hover:bg-black/30"
        >
            <span>Dashboard </span>
        </router-link>
        <router-link
            :to="{ name: 'app.products' }"
            class="flex items-center py-1 px-2 rounded hover:bg-black/30"
        >
            <span>Products </span>
        </router-link>
        <router-link
            :to="{ name: 'app.users' }"
            class="flex items-center py-1 px-2 rounded hover:bg-black/30"
        >
            <span>Users </span>
        </router-link>
        <router-link
            :to="{ name: 'app.reports' }"
            class="flex items-center py-1 px-2 rounded hover:bg-black/30"
        >
            <span>Reports </span>
        </router-link>
    </div>
</template>
<script setup>
defineProps({
    title: {
        type: String,
    },
});
</script>
