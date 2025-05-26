<template>
    <div class="min-h-screen bg-white">
        <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between">
                    <div class="flex items-center">
                        <NuxtLink
                            to="/"
                            class="shrink-0 text-white text-lg font-bold"
                            >MyShop</NuxtLink
                        >
                        <div class="hidden md:block">
                            <div class="ml-10 flex items-baseline space-x-4">
                                <NuxtLink
                                    to="/"
                                    class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                >
                                    All Products
                                </NuxtLink>
                            </div>
                        </div>
                    </div>

                    <!-- Right side -->
                    <div class="flex items-center space-x-4">
                        <!-- Cart -->
                        <NuxtLink
                            to="/cart"
                            class="text-gray-300 hover:text-white"
                        >
                            <ShoppingCartIcon class="h-6 w-6" />
                        </NuxtLink>

                        <!-- Conditional: Logged in / not -->
                        <div v-if="isLoggedIn">
                            <Menu as="div" class="relative">
                                <MenuButton
                                    class="flex items-center rounded-full text-sm text-white focus:outline-none"
                                >
                                    <span class="sr-only">Open user menu</span>
                                    <span class="font-medium">{{
                                        userName
                                    }}</span>
                                </MenuButton>
                                <transition
                                    enter-active-class="transition ease-out duration-100"
                                    enter-from-class="transform opacity-0 scale-95"
                                    enter-to-class="transform opacity-100 scale-100"
                                    leave-active-class="transition ease-in duration-75"
                                    leave-from-class="transform opacity-100 scale-100"
                                    leave-to-class="transform opacity-0 scale-95"
                                >
                                    <MenuItems
                                        class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                                    >
                                        <MenuItem>
                                            <NuxtLink
                                                to="/account"
                                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Profile
                                            </NuxtLink>
                                        </MenuItem>
                                        <MenuItem>
                                            <button
                                                @click="logout"
                                                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Logout
                                            </button>
                                        </MenuItem>
                                    </MenuItems>
                                </transition>
                            </Menu>
                        </div>

                        <div v-else>
                            <NuxtLink
                                to="/auth/login"
                                class="text-sm text-gray-300 hover:text-white"
                                >Login</NuxtLink
                            >
                        </div>
                    </div>
                </div>
            </div>
        </Disclosure>

        <main class="mx-auto max-w-7xl px-2 py-10">
            <slot />
        </main>
    </div>
</template>

<script setup>
import {
    Disclosure,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/vue";
import { ShoppingCartIcon } from "@heroicons/vue/24/outline";
import { useCookie } from "#app";

// 🧠 Simplifiziert – du kannst später Pinia oder useAuth() nutzen
const token = useCookie("auth_token");
const isLoggedIn = computed(() => !!token.value);
const userName = "John Doe"; // später dynamisch ersetzen

function logout() {
    token.value = null;
    navigateTo("/auth/login");
}
</script>
