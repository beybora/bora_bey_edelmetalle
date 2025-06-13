<template>
    <TransitionRoot appear :show="modelValue" as="template" @after-leave="$emit('closed')">
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
                                        ? "Update Product"
                                        : "Create New Product"
                                }}
                            </DialogTitle>
                            <div v-if="errorMsg" class="mb-2 p-3 bg-red-100 text-red-700 rounded">
                                {{ errorMsg }}
                            </div>
                            <ul v-if="errorDetails.length" class="mb-4 list-disc list-inside text-red-600 text-sm">
                                <li v-for="(err, idx) in errorDetails" :key="idx">{{ err }}</li>
                            </ul>
                            <form @submit.prevent="onSubmit">
                                <CustomInput
                                    v-model="product.title"
                                    label="Product Title"
                                    placeholder="Enter product title"
                                    class="mb-4"
                                />
                                <CustomInput
                                    v-model="product.description"
                                    label="Description"
                                    placeholder="Enter product description"
                                    class="mb-4"
                                />
                                <CustomInput
                                    v-model="product.price"
                                    type="number"
                                    label="Price"
                                    placeholder="Enter product price"
                                    class="mb-4"
                                />
                                <CustomInput
                                    v-model="product.image"
                                    label="Image URL"
                                    placeholder="Enter image URL"
                                    class="mb-4"
                                />
                                <CustomSelect
                                    v-model="product.category_id"
                                    label="Category"
                                    placeholder="No category"
                                    :options="categoryOptions"
                                    class="mb-4"
                                />

                                <div class="flex justify-end space-x-2 mt-6">
                                    <CustomButton
                                        type="button"
                                        variant="secondary"
                                        @click="onCancel"
                                    >
                                        Cancel
                                    </CustomButton>

                                    <CustomButton
                                        type="submit"
                                        :disabled="loading"
                                    >
                                        {{
                                            loading
                                                ? "Saving..."
                                                : product.id
                                                ? "Update"
                                                : "Create"
                                        }}
                                    </CustomButton>
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
import CustomButton from "../../components/core/CustomButton.vue";
import CustomSelect from "../../components/core/CustomSelect.vue";
import store from "../../store/index.js";

const emit = defineEmits(["update:modelValue", "updated", "closed"]);

const props = defineProps({
    modelValue: Boolean,
    product: Object,
});

const loading = ref(false);
const product = ref({ ...props.product });
const errorMsg = ref("");
const errorDetails = ref([]);

const categories = computed(() => store.state.categories.data);
const categoryOptions = computed(() =>
    categories.value.map((cat) => ({
        value: cat.id,
        text: cat.name,
    }))
);

onMounted(() => {
    if (!store.state.categories.data.length) {
        store.dispatch("getCategories");
    }
});

watch(
    () => props.product,
    (newProduct) => {
        product.value = { ...newProduct };
    },
    { deep: true, immediate: true }
);

function closeModal() {
    emit("update:modelValue", false);
    errorMsg.value = "";
    errorDetails.value = [];
}

function onCancel() {
    closeModal();
}

async function onSubmit() {
    loading.value = true;
    errorMsg.value = "";
    errorDetails.value = [];
    const action = product.value.id ? "updateProduct" : "createProduct";
    try {
        const response = await store.dispatch(action, product.value);
        if (response && response.data && response.data.id) {
            emit("updated");
            closeModal();
        }
    } catch (err) {
        errorMsg.value = err.response?.data?.message || "Unknown error while saving.";
        if (err.response?.data?.errors) {
            errorDetails.value = Object.values(err.response.data.errors).flat();
        }
    } finally {
        loading.value = false;
    }
}
</script>
