<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">Shop-User</h1>
        <table class="table-auto w-full border">
            <thead>
                <tr class="bg-gray-100 text-left">
                    <th class="p-2 border">#</th>
                    <th class="p-2 border">Name</th>
                    <th class="p-2 border">E-Mail</th>
                    <th class="p-2 border">Warenkorb</th>
                    <th class="p-2 border">Bestellungen</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user.id">
                    <td class="p-2 border">{{ index + 1 }}</td>
                    <td class="p-2 border">{{ user.name }}</td>
                    <td class="p-2 border">{{ user.email }}</td>
                    <td class="p-2 border">{{ user.cart_items_count }}</td>
                    <td class="p-2 border text-gray-400 italic">–</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import store from "../store";

onMounted(() => {
    store.dispatch("getShopUsers");
});

const users = computed(() => store.state.users.data);
</script>
