<template>
  <div class="relative">
    <button
      @click="toggleNotifications"
      class="relative flex items-center justify-center h-10 w-10 focus:outline-none"
      :class="iconClass"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
      <span
        v-if="unreadCount > 0"
        :class="badgeClass"
      >
        {{ unreadCount }}
      </span>
    </button>

    <!-- Notifications Dropdown -->
    <div
      v-if="isOpen"
      class="absolute right-0 left-0 mx-auto mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50"
      style="left: 50%; transform: translateX(-50%);"
    >
      <div class="p-4 border-b">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-900">Notifications</h3>
          <button
            v-if="unreadCount > 0"
            @click="markAllAsRead"
            class="text-sm text-blue-600 hover:text-blue-800"
          >
            Mark all as read
          </button>
        </div>
      </div>

      <div class="max-h-96 overflow-y-auto">
        <div v-if="notifications.length === 0" class="p-4 text-center text-gray-500">
          No notifications
        </div>
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="p-4 border-b bg-white cursor-default select-text"
          :class="{ 'bg-blue-50': !notification.is_read }"
          style="pointer-events: none;"
        >
          <div class="flex items-start">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">
                {{ notification.title }}
              </p>
              <p class="text-sm text-gray-600 mt-1">
                {{ notification.message }}
              </p>
              <p class="text-xs text-gray-500 mt-2">
                {{ formatDate(notification.created_at) }}
              </p>
            </div>
            <div v-if="!notification.is_read" class="ml-2">
              <span class="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useOrdersStore } from '~/stores/orders';

const props = defineProps({
  iconClass: { type: String, default: '' },
  badgeClass: { type: String, default: '' }
});

const ordersStore = useOrdersStore();
const isOpen = ref(false);
const notifications = ref([]);
const unreadCount = ref(0);

const toggleNotifications = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    fetchNotifications();
  }
};

const fetchNotifications = async () => {
  await ordersStore.fetchNotifications();
  notifications.value = ordersStore.notifications;
  unreadCount.value = ordersStore.unreadCount;
};

const handleNotificationClick = async (notification) => {
  if (!notification.is_read) {
    await ordersStore.markNotificationAsRead(notification.id);
    await fetchNotifications();
  }
  // Handle navigation based on notification type
  if (notification.type === 'order_status') {
    navigateTo(`/orders/${notification.data.order_id}`);
  }
};

const markAllAsRead = async () => {
  await ordersStore.markAllNotificationsAsRead();
  await fetchNotifications();
};

const formatDate = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (isOpen.value && !event.target.closest('.relative')) {
    isOpen.value = false;
  }
};

onMounted(() => {
  fetchNotifications();
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
