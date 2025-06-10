<template>
    <TransitionRoot appear :show="modelValue" as="template">
        <Dialog as="div" class="relative z-10" @close="closeModal">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div
                    class="flex min-h-full items-center justify-center p-4 text-center"
                >
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel
                            class="w-full max-w-md bg-white p-6 rounded shadow-xl text-left transition-all"
                        >
                            <DialogTitle
                                class="text-lg font-medium text-gray-900 mb-4"
                            >
                                {{
                                    product.id
                                        ? "Update product"
                                        : "Create new product"
                                }}
                            </DialogTitle>

                            <form @submit.prevent="onSubmit">
                                <CustomInput
                                    v-model="product.title"
                                    label="Title"
                                    class="mb-4"
                                />
                                <CustomInput
                                    v-model="product.description"
                                    label="Description"
                                    class="mb-4"
                                />
                                <CustomInput
                                    v-model="product.price"
                                    type="number"
                                    label="Price"
                                    class="mb-4"
                                />
                                <CustomInput
                                    v-model="product.image"
                                    label="Image URL"
                                    class="mb-4"
                                />
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select v-model="product.category_id" class="w-full border rounded px-3 py-2">
                                        <option value="">No category</option>
                                        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                                    </select>
                                </div>

                                <div class="flex justify-end space-x-2 mt-6">
                                    <button
                                        type="button"
                                        class="px-4 py-2 bg-gray-100 text-sm rounded border"
                                        @click="onCancel"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        :disabled="loading"
                                        class="px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                                    >
                                        {{
                                            loading
                                                ? "Saving..."
                                                : product.id
                                                ? "Update"
                                                : "Create"
                                        }}
                                    </button>
                                </div>
                            </form>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue";
import CustomInput from "../../components/core/CustomInput.vue";
import store from "../../store/index.js";

const emit = defineEmits(["update:modelValue", "updated"]);

const props = defineProps({
    modelValue: Boolean,
    product: Object,
});

const loading = ref(false);
const product = ref({ ...props.product });

const categories = computed(() => store.state.categories.data);

onMounted(() => {
    if (!store.state.categories.data.length) {
        store.dispatch("getCategories");
    }
});

watch(
    () => props.product,
    (newProduct) => {
        product.value = { ...newProduct };
    }
);

function closeModal() {
    emit("update:modelValue", false);
}

function onCancel() {
    closeModal();
    product.value = { ...props.product };
}

async function onSubmit() {
    loading.value = true;

    const action = product.value.id ? "updateProduct" : "createProduct";

    const response = await store.dispatch(action, product.value);

    loading.value = false;

    if (response && response.data.id) {
        emit("updated");
        onCancel();
    }
}
</script>
