<template>
    <div>
        <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1">
            {{ label }}
        </label>
        <input
            :type="type"
            :placeholder="placeholder || label"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :disabled="disabled"
            :class="[
                'block w-full px-3 h-10 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
                disabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ''
            ]"
        />
    </div>
</template>

<script setup>
defineProps({
    modelValue: [String, Number],
    label: String,
    placeholder: String,
    type: {
        type: String,
        default: "text",
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});
defineEmits(["update:modelValue"]);
</script>
