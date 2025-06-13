<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'px-4 h-10 rounded transition text-sm border',
      buttonClasses,
      'flex items-center justify-center',
      $attrs.class,
    ]"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary'].includes(value),
  },
});

const buttonClasses = computed(() => {
  if (props.disabled) {
    return 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300 hover:bg-gray-300';
  }

  switch (props.variant) {
    case 'secondary':
      return 'bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200';
    case 'primary':
    default:
      return 'bg-indigo-600 text-white border-transparent hover:bg-indigo-700';
  }
});
</script>
