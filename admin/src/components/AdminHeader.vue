<template>
    <header class="flex justify-end items-center p-3 h-14 shadow bg-white">
        <Menu as="div" class="relative inline-block text-left">
            <MenuButton class="flex items-center">
                <UserNavIcon class="w-6 h-6 text-gray-700 mr-2" />
                <small>{{ currentUser }}</small>
                <ChevronDownIcon
                    class="h-5 w-5 text-gray-500 hover:text-gray-700 ml-1"
                    aria-hidden="true"
                />
            </MenuButton>

            <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
            >
                <MenuItems
                    class="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                    <div class="px-1 py-1">
                        <MenuItem v-slot="{ active }">
                            <button
                                @click="logout"
                                :class="[
                                    active
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-gray-900',
                                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                ]"
                            >
                                <LogoutIcon
                                    class="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                />
                                Logout
                            </button>
                        </MenuItem>
                    </div>
                </MenuItems>
            </transition>
        </Menu>
    </header>
</template>

<script setup>
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import store from "../store/index.js";
import router from "../router/index.js";
import { computed } from "vue";
import UserNavIcon from './icons/UserNavIcon.vue';
import LogoutIcon from './icons/LogoutIcon.vue';

const emit = defineEmits(["toggle-sidebar"]);

const currentUser = computed(() => store.state.user.data.email);

const logout = () => {
    store.dispatch("logout").then(() => {
        router.push({ name: "login" });
    });
};
</script>

<style scoped></style>
