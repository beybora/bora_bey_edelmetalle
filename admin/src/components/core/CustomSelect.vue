<template>
    <div>
        <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
        <select
            :value="modelValue"
            @change="$emit('update:modelValue', $event.target.value)"
            :class="[
                'block w-full px-3 h-10 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
                $attrs.class,
            ]"
        >
            <option v-if="placeholder" value="">{{ placeholder }}</option>
            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.text }}
            </option>
        </select>
    </div>
</template>

<script setup>
defineProps({
    modelValue: [String, Number],
    label: String,
    placeholder: String,
    options: {
        type: Array,
        required: true,
    },
});
defineEmits(["update:modelValue"]);
</script>
