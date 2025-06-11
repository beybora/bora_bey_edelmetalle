<template>
  <div class="bg-white rounded-lg shadow p-4 flex flex-col h-full transition hover:shadow-lg">
    <div class="flex-1 flex flex-col items-center">
      <h2 class="text-lg font-semibold text-gray-900 text-center mb-1 truncate w-full">Order #{{ order.id }}</h2>
      <div class="text-gray-500 text-sm mb-1 text-center truncate w-full">Kunde: {{ order.user?.name || '-' }}</div>
      <div class="text-xs text-gray-400 mb-1">{{ formatDate(order.created_at) }}</div>
      <div class="text-indigo-700 font-bold text-lg mb-1">{{ order.total_price }} €</div>
      <div class="text-xs mb-2">
        <span :class="getStatusClass(order.status)">{{ order.status }}</span>
      </div>
      <select
        v-model="localStatus"
        @change="emitStatusChange"
        class="border rounded px-2 py-1 text-sm mt-2"
      >
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>
    <div class="flex flex-col gap-2 mt-2 items-center">
      <button @click="$emit('details', order)" class="py-1 w-[60%] bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 text-sm font-medium">Details</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
  order: { type: Object, required: true }
});
const emit = defineEmits(['details', 'status-change']);
const localStatus = ref(props.order.status);
watch(() => props.order.status, (val) => { localStatus.value = val; });
function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleString('de-DE');
}
function getStatusClass(status) {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800 px-2 rounded',
    approved: 'bg-blue-100 text-blue-800 px-2 rounded',
    shipped: 'bg-purple-100 text-purple-800 px-2 rounded',
    delivered: 'bg-green-100 text-green-800 px-2 rounded',
    cancelled: 'bg-red-100 text-red-800 px-2 rounded'
  };
  return classes[status] || '';
}
function emitStatusChange() {
  emit('status-change', { order: props.order, status: localStatus.value });
}
</script>
