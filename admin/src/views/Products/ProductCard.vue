<template>
    <div class="bg-white rounded-lg shadow p-4 flex flex-col h-full transition hover:shadow-lg">
      <div class="flex-1 flex flex-col items-center">
        <img :src="product.image" :alt="product.title" class="w-28 h-28 object-cover rounded mb-3 border" />
        <h2 class="text-lg font-semibold text-gray-900 text-center mb-1 truncate w-full">{{ product.title }}</h2>
        <div class="text-gray-500 text-sm mb-2 text-center truncate w-full">{{ product.category || '-' }}</div>
        <div class="text-indigo-700 font-bold text-xl mb-2">{{ product.price }} €</div>
        <div class="text-xs text-gray-400 mb-2">{{ formatDate(product.created_at) }}</div>
      </div>
      <div class="flex flex-col gap-2 mt-2 items-center">
        <button @click="$emit('edit', product)" class="py-1 w-[60%] bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 text-sm font-medium">Edit</button>
        <button @click="$emit('delete', product.id)" class="py-1 w-[60%] bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm font-medium">Delete</button>
      </div>
    </div>
  </template>

  <script setup>
  const props = defineProps({
    product: { type: Object, required: true }
  });
  function formatDate(date) {
    if (!date) return '';
    return new Date(date).toLocaleString('de-DE');
  }
  </script>
