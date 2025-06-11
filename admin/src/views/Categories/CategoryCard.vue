<template>
  <div class="bg-white rounded-lg shadow p-4 flex flex-col h-full transition hover:shadow-lg">
    <div class="flex-1 flex flex-col items-center">
      <h2 class="text-lg font-semibold text-gray-900 text-center mb-1 truncate w-full">{{ category.name }}</h2>
      <div class="text-gray-500 text-sm mb-2 text-center truncate w-full">Slug: {{ category.slug }}</div>
    </div>
    <div class="flex flex-col gap-2 mt-2 items-center">
      <button @click="$emit('delete', category.id)" class="py-1 w-[60%] bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm font-medium">Delete</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  category: { type: Object, required: true }
});
</script>
