<template>
    <div v-if="currentUser.id" class="min-h-full flex">
        <Sidebar />

        <div class="flex-1">
            <AdminHeader />
            <main class="p-5">
                <router-view></router-view>
            </main>
        </div>
    </div>

    <div
        v-else
        class="flex items-center justify-center min-h-full bg-black-100"
    >
        <svg
            class="animate-spin -ml-1 mr-3 h-16 w-16 text-blue-200"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import store from "../store/index.js";
import Sidebar from "./Sidebar.vue";
import AdminHeader from "./AdminHeader.vue";

const currentUser = computed(() => store.state.user.data);

onMounted(() => {
    store.dispatch("getUser");
});
</script>

<style scoped></style>
