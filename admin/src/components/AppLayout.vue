<template>
    <div class="min-h-full flex">
        <Sidebar :is-open="isSidebarOpen" />

        <div class="flex-1">
            <AdminHeader @toggle-sidebar="toggleSidebar" />
            <main>
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "./Sidebar.vue";
import AdminHeader from "./AdminHeader.vue";

const isSidebarOpen = ref(true);

function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
}
</script>

<style scoped></style>
