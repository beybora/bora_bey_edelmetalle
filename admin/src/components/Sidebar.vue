<template>
    <div
        :class="[
            'bg-indigo-700 text-gray-300 py-4 px-2 space-y-2 rounded-r-sm shadow-lg transition-all',
            isOpen ? 'w-48' : 'w-16',
        ]"
    >
        <router-link
            :to="{ name: 'app.dashboard' }"
            v-if="isOpen"
            class="flex items-center py-1 px-2 rounded hover:bg-black/30"
        >
            <span class="ml-2">Dashboard</span>
        </router-link>
        <router-link
            :to="{ name: 'app.products' }"
            v-if="isOpen"
            class="flex items-center py-1 px-2 rounded hover:bg-black/30"
        >
            <span class="ml-2">Products</span>
        </router-link>
        <router-link
            :to="{ name: 'app.users' }"
            v-if="isOpen"
            class="flex items-center py-1 px-2 rounded hover:bg-black/30"
        >
            <span class="ml-2">Users</span>
        </router-link>
        <router-link
            :to="{ name: 'app.reports' }"
            v-if="isOpen"
            class="flex items-center py-1 px-2 rounded hover:bg-black/30"
        >
            <span class="ml-2">Reports</span>
        </router-link>
    </div>
</template>

<script setup>
defineProps({
    isOpen: {
        type: Boolean,
        default: true,
    },
});
</script>

<style scoped></style>
