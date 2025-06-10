<template>
    <div class="bg-white p-4 shadow">
        <h1 class="text-2xl font-bold mb-4">Shop Users</h1>
        <table class="table-fixed w-full mt-4 border-collapse">
            <thead>
                <tr class="text-left">
                    <th class="w-12 px-4 py-2">#</th>
                    <th class="w-1/4 px-4 py-2">Name</th>
                    <th class="w-1/4 px-4 py-2">Email</th>
                    <th class="w-1/4 px-4 py-2">Cart</th>
                    <th class="w-1/4 px-4 py-2">Orders</th>
                </tr>
            </thead>
            <tbody v-if="users.length > 0">
                <tr v-for="(user, index) in users" :key="user.id" class="border-t">
                    <td class="px-4 py-2">{{ index + 1 }}</td>
                    <td class="px-4 py-2">{{ user.name }}</td>
                    <td class="px-4 py-2">{{ user.email }}</td>
                    <td class="px-4 py-2">
                        <span :class="user.cart_items_count > 0 ? 'text-green-700 font-medium' : 'text-gray-500 italic'">
                            {{ user.cart_items_count > 0 ? user.cart_items_count + (user.cart_items_count === 1 ? ' product in cart' : ' products in cart') : 'Empty' }}
                        </span>
                    </td>
                    <td class="px-4 py-2">{{ user.orders_count }}</td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <td colspan="5" class="text-center text-gray-500 italic py-6">
                        No users found.
                    </td>
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
