<template>
    <div class="min-h-screen bg-white">
        <div
            v-if="loading"
            class="flex items-center justify-center min-h-screen"
        >
            <Spinner />
        </div>

        <div v-else>
            <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div class="flex h-16 items-center justify-between">
                        <div class="flex items-center">
                            <NuxtLink to="/">
                                <img src="/assets/css/b1f43aed-a95f-4aec-8495-3ab311b2ad82.png" alt="Bora Edelmetalle Logo" class="h-30 w-auto mr-2" />
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

                            <NotificationBell class="relative" icon-class="text-white hover:text-indigo-300" badge-class="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow" />

                            <NuxtLink
                                to="/cart"
                                class="relative flex items-center justify-center h-10 w-10 group"
                            >
                                <ShoppingCartIcon class="h-6 w-6 text-white group-hover:text-indigo-300 transition" />
                                <span
                                    v-if="cartCount > 0"
                                    class="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow"
                                >
                                    {{ cartCount }}
                                </span>
                            </NuxtLink>

                            <div class="block">
                                <Menu as="div" class="relative">
                                    <MenuButton
                                        class="flex items-center text-sm text-white h-10 w-10 justify-center"
                                    >
                                        <UserIcon class="h-5 w-5 text-white hover:text-indigo-300 transition" />
                                    </MenuButton>
                                    <MenuItems
                                        class="absolute right-0 mt-2 w-40 bg-white py-1 shadow-lg ring-1 ring-black/5"
                                    >
                                        <template v-if="isLoggedIn">
                                            <MenuItem>
                                                <NuxtLink
                                                    to="/profile"
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
                        <FiltersNav isMobile />
                    </div>
                </transition>
            </Disclosure>

            <main class="mx-auto max-w-7xl px-4 py-10 min-h-[90vh]" style="min-height:90vh;">
                <slot />
            </main>
            <footer class="bg-gray-900 text-gray-300 py-6 mt-12">
              <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                <div class="flex items-center">
                            <NuxtLink to="/">
                               Bora Bey Edelmetalle
                            </NuxtLink>

                        </div>
                <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                  <div class="text-sm">&copy; {{ new Date().getFullYear() }} All rights reserved.</div>
                </div>
              </div>
            </footer>
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
import { ref, computed, onMounted, watch } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useCartStore } from "~/stores/cart";
import { useCategoriesStore } from "~/stores/categories";
import { useRoute } from "vue-router";
import FiltersNav from "~/components/FiltersNav.vue";
import NotificationBell from '~/components/NotificationBell.vue';
import Spinner from '~/components/Spinner.vue';

const auth = useAuthStore();
const cart = useCartStore();
const categoryStore = useCategoriesStore();
const route = useRoute();

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

watch(
    () => route.name,
    (name) => {
        if (name !== "index") {
            categoryStore.resetFilters();
        }
    }
);

onMounted(async () => {
    if (auth.token && !auth.user) await auth.fetchUser();
    if (auth.token) await cart.fetchCart();
    loading.value = false;
});
</script>
