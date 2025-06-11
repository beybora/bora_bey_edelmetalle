<template>
    <div>
        <div class="flex items-center justify-between mb-3">
            <h1 class="text-2xl font-bold mb-4">Products</h1>
            <button
                @click="showModal = true"
                class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Add new product
            </button>
        </div>

        <div class="mb-4 flex flex-col sm:flex-row sm:items-center gap-2">
            <input
                type="text"
                v-model="search"
                @keyup.enter="() => getProducts(1)"
                placeholder="Search..."
                class="w-full sm:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500"
            />
            <select
                v-model="perPage"
                @change="() => getProducts(1)"
                class="w-full sm:w-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500"
            >
                <option v-for="opt in [5, 10, 20, 50, 100]" :key="opt" :value="opt">{{ opt }}</option>
            </select>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ProductCard
                v-for="product in products.data"
                :key="product.id"
                :product="product"
                @edit="editProduct"
                @delete="deleteProduct"
            />
        </div>

        <div class="flex justify-between items-center mt-6">
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

        <ProductModal
            v-model="showModal"
            :product="selectedProduct"
            @updated="getProducts"
        />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import ProductModal from "./ProductModal.vue";
import ProductCard from "./ProductCard.vue";
import store from "../../store/index.js";

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
