<template>
    <AuthLayout title="Login to your account">
        <form class="space-y-6" @submit.prevent="login">
            <div
                v-if="errorMsg"
                class="py-3 px-5 bg-red-400 text-white rounded-md"
                role="alert"
            >
                {{ errorMsg }}
            </div>

            <div>
                <label
                    for="email"
                    class="block text-sm font-medium text-gray-900"
                    >Email address</label
                >
                <input
                    v-model="user.email"
                    type="email"
                    id="email"
                    required
                    class="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 sm:text-sm outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                />
            </div>

            <div>
                <label
                    for="password"
                    class="block text-sm font-medium text-gray-900"
                    >Password</label
                >
                <input
                    v-model="user.password"
                    type="password"
                    id="password"
                    required
                    class="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 sm:text-sm outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                />
            </div>

            <div class="flex items-center">
                <input
                    id="remember"
                    type="checkbox"
                    v-model="remember"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label for="remember" class="ml-2 block text-sm text-gray-900"
                    >Remember me</label
                >
            </div>

            <div>
                <button
                    :disabled="loading"
                    type="submit"
                    :class="{
                        'cursor-not-allowed opacity-50': loading,
                        'hover:bg-indigo-500': !loading,
                    }"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs focus:outline-none"
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
                    Sign in
                </button>
            </div>

            <p class="text-sm text-center text-gray-600">
                No account?
                <NuxtLink
                    to="/auth/register"
                    class="text-indigo-600 hover:underline"
                >
                    Register here
                </NuxtLink>
            </p>
        </form>
    </AuthLayout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import AuthLayout from "~/components/layouts/AuthLayout.vue";

const router = useRouter();
const auth = useAuthStore();

const loading = ref(false);
const errorMsg = ref("");
const remember = ref(false);

const user = ref({
    email: "",
    password: "",
});

async function login() {
    loading.value = true;
    errorMsg.value = "";

    try {
        await auth.login({ ...user.value, remember: remember.value });
        await router.push("/");
    } catch (error) {
        errorMsg.value =
            error.response?.data?.message || "Login fehlgeschlagen";
    } finally {
        loading.value = false;
    }
}
</script>
