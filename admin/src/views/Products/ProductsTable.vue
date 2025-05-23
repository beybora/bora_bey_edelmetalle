<template>
    <div class="bg-white p-4 rounded-lg shadow">
        <!-- Filter Controls -->
        <div class="flex justify-between border-b-2 pb-3">
            <div class="flex items-center">
                <span class="whitespace-nowrap mr-3">Per Page</span>
                <select
                    v-model="perPage"
                    @change="getProducts"
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
                @keyup.enter="getProducts"
                placeholder="Search..."
                class="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500"
            />
        </div>

        <!-- Table -->
        <table class="table-auto w-full mt-4">
            <thead>
                <tr>
                    <th class="px-4 py-2">ID</th>
                    <th class="px-4 py-2">Image</th>
                    <th class="px-4 py-2">Title</th>
                    <th class="px-4 py-2">Price</th>
                    <th class="px-4 py-2">Last updated</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products.data" :key="product.id">
                    <td class="border-b p-2">{{ product.id }}</td>
                    <td class="border-b p-2">
                        <img
                            v-if="product.image"
                            class="w-16 h-16 object-cover"
                            :src="product.image"
                            :alt="product.title"
                        />
                        <img
                            v-else
                            class="w-16 h-16 object-cover"
                            src="../../assets/noimage.png"
                            alt="No image"
                        />
                    </td>
                    <td
                        class="border-b p-2 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                        {{ product.title }}
                    </td>
                    <td class="border-b p-2">{{ product.price }}</td>
                    <td class="border-b p-2">{{ product.updated_at }}</td>
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
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import store from "../../store/index.js";

const perPage = ref(10);
const search = ref("");
const products = computed(() => store.state.products.data);

onMounted(() => {
    getProducts();
});

function getProducts(page = 1) {
    store.dispatch("getProducts", {
        page,
        per_page: perPage.value,
        search: search.value,
    });
}

function goTo(link) {
    if (!link.url) return;
    const url = new URL(link.url);
    const page = url.searchParams.get("page");
    getProducts(page);
}
</script>
