<template>
    <div class="min-h-screen bg-white">
        <div
            v-if="loading"
            class="flex items-center justify-center min-h-screen"
        >
            <svg
                class="animate-spin h-10 w-10 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
        </div>

        <div v-else>
            <Disclosure as="nav" class="bg-gray-800">
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div class="flex h-16 items-center justify-between">
                        <div class="flex items-center space-x-8">
                            <NuxtLink
                                to="/"
                                class="text-white text-lg font-bold"
                                >BB Edelmetalle</NuxtLink
                            >
                        </div>
                        <FiltersNav />
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
                                        class="flex items-center text-sm text-white"
                                    >
                                        <span class="font-medium">{{
                                            userEmail
                                        }}</span>
                                    </MenuButton>
                                    <MenuItems
                                        class="absolute right-0 mt-2 w-40 bg-white py-1 shadow-lg ring-1 ring-black/5"
                                    >
                                        <MenuItem>
                                            <NuxtLink
                                                to="/account"
                                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >Profile</NuxtLink
                                            >
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

            <main class="mx-auto max-w-7xl px-4 py-10">
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
import FiltersNav from "~/components/FiltersNav.vue";
import { useAuthStore } from "~/stores/auth";
import { useCartStore } from "~/stores/cart";
import { ref, computed, onMounted } from "vue";

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
    if (auth.token && !auth.user) await auth.fetchUser();
    if (auth.token) await cart.fetchCart();
    loading.value = false;
});
</script>
