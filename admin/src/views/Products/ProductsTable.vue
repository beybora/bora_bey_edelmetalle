<template>
    <div class="bg-white p-4 shadow">
        <!-- Controls -->
        <div class="flex justify-between border-b-2 pb-3">
            <div class="flex items-center">
                <span class="whitespace-nowrap mr-3">Per Page</span>
                <select
                    v-model="perPage"
                    @change="() => getProducts(1)"
                    class="w-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500"
                >
                    <option
                        v-for="opt in [5, 10, 20, 50, 100]"
                        :key="opt"
                        :value="opt"
                    >
                        {{ opt }}
                    </option>
                </select>
            </div>

            <input
                type="text"
                v-model="search"
                @keyup.enter="() => getProducts(1)"
                placeholder="Search..."
                class="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500"
            />
        </div>

        <!-- Table -->
        <table class="table-fixed w-full mt-4 border-collapse">
            <thead>
                <tr class="text-left">
                    <th class="w-12 px-4 py-2">ID</th>
                    <th class="w-20 px-4 py-2">Image</th>
                    <th class="w-1/4 px-4 py-2">Title</th>
                    <th class="w-24 px-4 py-2">Price</th>
                    <th class="w-56 px-4 py-2">Last updated</th>
                    <th class="w-16 px-4 py-2 text-right">Actions</th>
                </tr>
            </thead>

            <tbody v-if="products.data?.length > 0">
                <tr
                    v-for="product in products.data"
                    :key="product.id"
                    class="border-t"
                >
                    <td class="px-4 py-2">{{ product.id }}</td>
                    <td class="px-4 py-2">
                        <img
                            v-if="product.image"
                            class="w-12 h-12 object-cover"
                            :src="product.image"
                            :alt="product.title"
                        />
                        <img
                            v-else
                            class="w-12 h-12 object-cover"
                            src="../../assets/noimage.png"
                            alt="No image"
                        />
                    </td>
                    <td class="px-4 py-2 truncate max-w-[200px]">
                        {{ product.title }}
                    </td>
                    <td class="px-4 py-2">{{ product.price }}</td>
                    <td class="px-4 py-2">{{ product.updated_at }}</td>
                    <td class="px-4 py-2 text-right">
                        <Menu as="div" class="relative inline-block text-left">
                            <MenuButton class="p-2 hover:bg-gray-100 rounded">
                                <EllipsisVerticalIcon
                                    class="h-5 w-5 text-gray-500"
                                />
                            </MenuButton>
                            <MenuItems
                                class="absolute right-0 mt-2 w-40 origin-top-right bg-white divide-y divide-gray-100 shadow-lg ring-1 ring-black/5 focus:outline-none"
                            >
                                <div class="px-1 py-1">
                                    <MenuItem v-slot="{ active }">
                                        <button
                                            @click="editProduct(product)"
                                            :class="[
                                                active
                                                    ? 'bg-indigo-500 text-white'
                                                    : 'text-gray-900',
                                                'group flex w-full items-center px-2 py-2 text-sm',
                                            ]"
                                        >
                                            <PencilSquareIcon
                                                class="mr-2 h-5 w-5"
                                            />
                                            Edit
                                        </button>
                                    </MenuItem>
                                    <MenuItem v-slot="{ active }">
                                        <button
                                            @click="deleteProduct(product.id)"
                                            :class="[
                                                active
                                                    ? 'bg-red-500 text-white'
                                                    : 'text-gray-900',
                                                'group flex w-full items-center px-2 py-2 text-sm',
                                            ]"
                                        >
                                            <TrashIcon class="mr-2 h-5 w-5" />
                                            Delete
                                        </button>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
                    </td>
                </tr>
            </tbody>

            <tbody v-else>
                <tr>
                    <td
                        colspan="6"
                        class="text-center text-gray-500 italic py-6"
                    >
                        Keine Einträge gefunden.<br />
                        Bitte Suchbegriff prüfen oder Filter anpassen.
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Pagination -->
        <div class="flex justify-between items-center mt-4">
            <div v-if="products.total > 0">
                Showing from {{ products.from }} to {{ products.to }}
            </div>

            <nav
                v-if="products.total > products.per_page"
                class="inline-flex space-x-1"
            >
                <a
                    v-for="(link, i) in products.links"
                    :key="i"
                    href="#"
                    @click.prevent="goTo(link)"
                    v-html="link.label"
                    :class="[
                        'px-4 py-2 border text-sm',
                        link.active
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                    ]"
                ></a>
            </nav>
        </div>

        <!-- Modal -->
        <ProductModal
            v-model="showModal"
            :product="selectedProduct"
            @updated="getProducts"
        />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import {
    EllipsisVerticalIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/vue/20/solid";
import store from "../../store/index.js";
import ProductModal from "./ProductModal.vue";

const perPage = ref(10);
const search = ref("");
const products = computed(() => store.state.products.data);

const showModal = ref(false);
const selectedProduct = ref({});

onMounted(() => {
    getProducts();
});

function getProducts(page = 1) {
    store.dispatch("getProducts", {
        page,
        perPage: perPage.value,
        search: search.value,
    });
}

function goTo(link) {
    if (!link.url) return;
    const url = new URL(link.url);
    const page = url.searchParams.get("page");
    getProducts(page);
}

function editProduct(product) {
    selectedProduct.value = { ...product };
    showModal.value = true;
}

function deleteProduct(id) {
    if (confirm("Bist du sicher, dass du dieses Produkt löschen willst?")) {
        store.dispatch("deleteProduct", id).then(() => {
            getProducts();
        });
    }
}
</script>
