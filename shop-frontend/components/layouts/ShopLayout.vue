<template>
    <div class="min-h-screen bg-white">
        <div
            v-if="loading"
            class="flex items-center justify-center min-h-screen"
        >
            <svg
                class="animate-spin -ml-1 mr-3 h-10 w-10 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
        </div>

        <div v-else>
            <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div class="flex h-16 items-center justify-between">
                        <div class="flex items-center">
                            <NuxtLink
                                to="/"
                                class="shrink-0 text-white text-lg font-bold"
                            >
                                BB Edelmetalle
                            </NuxtLink>
                            <div
                                class="hidden md:block ml-10 flex items-baseline space-x-4"
                            >
                                <NuxtLink
                                    to="/"
                                    class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                >
                                    All Products
                                </NuxtLink>
                            </div>
                        </div>

                        <div class="flex items-center space-x-4">
                            <NuxtLink
                                to="/cart"
                                class="relative text-gray-300 hover:text-white"
                            >
                                <ShoppingCartIcon class="h-6 w-6" />
                                <span
                                    v-if="cartCount > 0"
                                    class="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1"
                                >
                                    {{ cartCount }}
                                </span>
                            </NuxtLink>

                            <div v-if="isLoggedIn">
                                <Menu as="div" class="relative">
                                    <MenuButton
                                        class="flex items-center rounded-full text-sm text-white focus:outline-none"
                                    >
                                        <span class="sr-only"
                                            >Open user menu</span
                                        >
                                        <span class="font-medium">{{
                                            userEmail
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
                                >
                                    Login
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </Disclosure>

            <main class="mx-auto max-w-7xl px-2 py-10">
                <slot />
            </main>
        </div>
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
import { useAuthStore } from "~/stores/auth";
import { useCartStore } from "~/stores/cart";
import { onMounted, ref, computed } from "vue";

const auth = useAuthStore();
const cart = useCartStore();

const loading = ref(true);

const isLoggedIn = computed(() => auth.isLoggedIn);
const userEmail = computed(() => auth.userEmail);
const cartCount = computed(() =>
    cart.items.reduce((sum, item) => sum + item.quantity, 0)
);

function logout() {
    auth.logout();
}

onMounted(async () => {
    if (auth.token && !auth.user) {
        await auth.fetchUser();
    }

    if (auth.token) {
        await cart.fetchCart();
    }

    loading.value = false;
});
</script>
