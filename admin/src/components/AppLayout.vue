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
import { ref, onMounted, onUnmounted } from "vue";
import Sidebar from "./Sidebar.vue";
import AdminHeader from "./AdminHeader.vue";

const isSidebarOpen = ref(true);

function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
}

onMounted(() => {
    if (window.outerWidth < 768) {
        isSidebarOpen.value = false;
    }
    window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
});

function handleResize() {
    if (window.outerWidth < 768) {
        isSidebarOpen.value = false;
    } else {
        isSidebarOpen.value = true;
    }
}
</script>

<style scoped></style>
