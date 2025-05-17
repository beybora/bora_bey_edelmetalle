<template>
    <AuthLayout title="Reset Password">
        <form class="space-y-6" action="#" method="POST">
            <div>
                <div class="flex items-center justify-between">
                    <label
                        for="new-password"
                        class="block text-sm/6 font-medium text-gray-900"
                    >
                        New Password
                    </label>
                </div>
                <div class="mt-2">
                    <input
                        type="password"
                        name="new-password"
                        id="new-password"
                        required
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        placeholder="Enter new password"
                    />
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <label
                        for="confirm-password"
                        class="block text-sm/6 font-medium text-gray-900"
                    >
                        Confirm New Password
                    </label>
                </div>
                <div class="mt-2">
                    <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        required
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        placeholder="Confirm new password"
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Set New Password
                </button>
            </div>
        </form>
    </AuthLayout>
</template>
<script setup>
import AuthLayout from "../components/AuthLayout.vue";
</script>
