<template>
    <div
        class="bg-indigo-700 text-gray-300 py-4 px-2 space-y-2 rounded-r-sm shadow-lg overflow-hidden transition-all duration-300"
        :class="isOpen ? 'w-48' : 'w-16'"
    >
        <router-link
            :to="{ name: 'app.dashboard' }"
            class="flex items-center py-1 px-2 rounded hover:bg-black/30"
        >
            <HomeIcon class="h-5 w-5" />
            <span v-if="isOpen" class="ml-2">Dashboard</span>
        </router-link>

        <router-link
            :to="{ name: 'app.products' }"
            class="flex items-center py-1 px-2 rounded hover:bg-black/30"
        >
            <ArchiveBoxIcon class="h-5 w-5" />
            <span v-if="isOpen" class="ml-2">Products</span>
        </router-link>

        <router-link
            :to="{ name: 'app.users' }"
            class="flex items-center py-1 px-2 rounded hover:bg-black/30"
        >
            <UserIcon class="h-5 w-5" />
            <span v-if="isOpen" class="ml-2">Users</span>
        </router-link>

        <router-link
            :to="{ name: 'app.reports' }"
            class="flex items-center py-1 px-2 rounded hover:bg-black/30"
        >
            <ChartBarIcon class="h-5 w-5" />
            <span v-if="isOpen" class="ml-2">Reports</span>
        </router-link>
    </div>
</template>

<script setup>
import {
    HomeIcon,
    ArchiveBoxIcon,
    UserIcon,
    ChartBarIcon,
} from "@heroicons/vue/20/solid";

defineProps({
    isOpen: {
        type: Boolean,
        default: true,
    },
});
</script>

<style scoped></style>
