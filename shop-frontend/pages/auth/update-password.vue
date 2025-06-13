<template>
    <AuthLayout title="Change your password">
        <form class="space-y-6" @submit.prevent="submit">
            <div
                v-if="successMsg"
                class="py-3 px-5 bg-green-500 text-white rounded-md"
                role="status"
            >
                {{ successMsg }}
            </div>

            <div
                v-if="errorMsg"
                class="py-3 px-5 bg-red-400 text-white rounded-md"
                role="alert"
            >
                {{ errorMsg }}
            </div>

            <div>
                <label
                    for="current_password"
                    class="block text-sm font-medium text-gray-900"
                >
                    Current Password
                </label>
                <input
                    v-model="form.current_password"
                    type="password"
                    id="current_password"
                    required
                    class="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                />
            </div>

            <div>
                <label
                    for="password"
                    class="block text-sm font-medium text-gray-900"
                >
                    New Password
                </label>
                <input
                    v-model="form.password"
                    type="password"
                    id="password"
                    required
                    class="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                />
            </div>

            <div>
                <label
                    for="password_confirmation"
                    class="block text-sm font-medium text-gray-900"
                >
                    Confirm New Password
                </label>
                <input
                    v-model="form.password_confirmation"
                    type="password"
                    id="password_confirmation"
                    required
                    class="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                />
            </div>

            <div>
                <button
                    :disabled="loading"
                    type="submit"
                    :class="{
                        'cursor-not-allowed opacity-50': loading,
                        'hover:bg-indigo-500': !loading,
                    }"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white"
                >
                    <svg
                        v-if="loading"
                        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            class="opacity-75"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM6 17.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    Update Password
                </button>
            </div>
        </form>
    </AuthLayout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import AuthLayout from "~/components/layouts/AuthLayout.vue";

definePageMeta({
  middleware: ['guest']
});

const router = useRouter();
const auth = useAuthStore();

const loading = ref(false);
const errorMsg = ref("");
const successMsg = ref("");

const form = ref({
    current_password: "",
    password: "",
    password_confirmation: "",
});

async function submit() {
    loading.value = true;
    errorMsg.value = "";
    successMsg.value = "";

    try {
        await auth.updatePassword(form.value);
        successMsg.value = "Password updated successfully";

        setTimeout(() => {
            router.push("/");
        }, 1000);
    } catch (error) {
        errorMsg.value =
            error.response?.data?.message || "Password update failed.";
    } finally {
        loading.value = false;
    }
}
</script>
