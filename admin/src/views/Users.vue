<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">Shop Users</h1>
        <table class="table-auto w-full border">
            <thead>
                <tr class="bg-gray-100 text-left">
                    <th class="p-2 border">#</th>
                    <th class="p-2 border">Name</th>
                    <th class="p-2 border">Email</th>
                    <th class="p-2 border">Cart</th>
                    <th class="p-2 border">Orders</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user.id">
                    <td class="p-2 border">{{ index + 1 }}</td>
                    <td class="p-2 border">{{ user.name }}</td>
                    <td class="p-2 border">{{ user.email }}</td>
                    <td class="p-2 border">
                        <span
                            :class="
                                user.cart_items_count > 0
                                    ? 'text-green-700 font-medium'
                                    : 'text-gray-500 italic'
                            "
                        >
                            {{
                                user.cart_items_count > 0
                                    ? user.cart_items_count + (user.cart_items_count === 1 ? ' product in cart' : ' products in cart')
                                    : 'Empty'
                            }}
                        </span>
                    </td>
                    <td class="p-2 border">
                        {{ user.orders_count }}
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
