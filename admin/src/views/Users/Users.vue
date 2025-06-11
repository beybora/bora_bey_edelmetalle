<template>
    <div>


            <h1 class="text-2xl font-bold mb-4">Shop Users</h1>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <UserCard
                    v-for="user in users"
                    :key="user.id"
                    :user="user"
                    @toggle="toggleActive"
                />
            </div>
        </div>

</template>

<script setup>
import { onMounted, computed } from "vue";
import store from "../../store";
import UserCard from "./UserCard.vue";

onMounted(() => {
    store.dispatch("getShopUsers");
});

const users = computed(() => store.state.users.data);

async function toggleActive(user) {
    await store.dispatch("updateUser", {
        id: user.id,
        is_active: !user.is_active,
    });
    await store.dispatch("getShopUsers");
}
</script>
