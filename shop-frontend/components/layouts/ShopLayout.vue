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
            <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div class="flex h-16 items-center justify-between">
                        <!-- Logo -->
                        <div class="flex items-center">
                            <NuxtLink
                                to="/"
                                class="text-white text-lg font-bold"
                            >
                                BB Edelmetalle
                            </NuxtLink>
                        </div>

                        <div class="hidden lg:flex flex-1 justify-center">
                            <FiltersNav />
                        </div>

                        <div class="flex items-center space-x-4">
                            <button
                                class="lg:hidden text-white"
                                @click="toggleMobileSearch"
                            >
                                <AdjustmentsHorizontalIcon class="h-6 w-6" />
                            </button>

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

                            <div>
                                <Menu as="div" class="relative">
                                    <MenuButton
                                        class="flex items-center text-sm text-white"
                                    >
                                        <UserIcon class="h-5 w-5" />
                                    </MenuButton>
                                    <MenuItems
                                        class="absolute right-0 mt-2 w-40 bg-white py-1 shadow-lg ring-1 ring-black/5 z-50"
                                    >
                                        <template v-if="isLoggedIn">
                                            <MenuItem>
                                                <NuxtLink
                                                    to="/account"
                                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    Profil
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
                                        </template>
                                        <template v-else>
                                            <MenuItem>
                                                <NuxtLink
                                                    to="/auth/login"
                                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    Login
                                                </NuxtLink>
                                            </MenuItem>
                                        </template>
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </div>

                <transition name="fade">
                    <div
                        v-if="showMobileSearch"
                        class="lg:hidden px-4 pb-4 bg-gray-800"
                    >
                        <FiltersNav :isMobile="true" />
                    </div>
                </transition>
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
import {
    ShoppingCartIcon,
    AdjustmentsHorizontalIcon,
    UserIcon,
} from "@heroicons/vue/24/outline";
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useCartStore } from "~/stores/cart";
import FiltersNav from "~/components/FiltersNav.vue";

const auth = useAuthStore();
const cart = useCartStore();
const loading = ref(true);
const showMobileSearch = ref(false);

const isLoggedIn = computed(() => auth.isLoggedIn);
const cartCount = computed(() =>
    cart.items.reduce((sum, item) => sum + item.quantity, 0)
);

function logout() {
    auth.logout();
}

function toggleMobileSearch() {
    showMobileSearch.value = !showMobileSearch.value;
}

onMounted(async () => {
    if (auth.token && !auth.user) await auth.fetchUser();
    if (auth.token) await cart.fetchCart();
    loading.value = false;
});
</script>
