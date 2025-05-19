<template>
    <div class="min-h-full flex">
        <Sidebar />

        <div class="flex-1">
            <header class="h-8 shadow bg-white">Header</header>

            <main>
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>

<script setup>
import Sidebar from "./Sidebar.vue";
defineProps({
    title: {
        type: String,
    },
});
</script>
