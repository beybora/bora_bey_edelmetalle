<template>
  <div class="bg-white rounded-lg shadow p-4 flex flex-col h-full transition hover:shadow-lg">
    <div class="flex-1 flex flex-col items-center">
      <h2 class="text-lg font-semibold text-gray-900 text-center mb-1 truncate w-full">{{ user.name }}</h2>
      <div class="text-gray-500 text-sm mb-1 text-center truncate w-full">{{ user.email }}</div>
      <div class="text-xs text-gray-400 mb-1">Cart: <span :class="user.cart_items_count > 0 ? 'text-green-700 font-medium' : 'text-gray-500 italic'">{{ user.cart_items_count > 0 ? user.cart_items_count : 'Empty' }}</span></div>
      <div class="text-xs text-gray-400 mb-1">Orders: {{ user.orders_count }}</div>
      <div class="mb-2">
        <span :class="user.is_active ? 'text-green-700' : 'text-red-600'">{{ user.is_active ? 'Active' : 'Inactive' }}</span>
      </div>
    </div>
    <div class="flex flex-col gap-2 mt-2 items-center">
      <button @click="$emit('toggle', user)" :class="user.is_active ? 'py-1 w-[60%] bg-red-100 text-red-700 hover:bg-red-200' : 'py-1 w-[60%] bg-green-100 text-green-700 hover:bg-green-200'" class="rounded text-sm font-medium">{{ user.is_active ? 'Deactivate' : 'Activate' }}</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  user: { type: Object, required: true }
});
</script>
