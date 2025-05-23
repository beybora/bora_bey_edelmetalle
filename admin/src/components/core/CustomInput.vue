<template>
    <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ label }}
        </label>
        <input
            :type="type"
            :placeholder="label"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
    </div>
</template>

<script setup>
defineProps({
    modelValue: [String, Number],
    label: String,
    type: {
        type: String,
        default: "text",
    },
});
defineEmits(["update:modelValue"]);
</script>
