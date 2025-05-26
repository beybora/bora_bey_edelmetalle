<template>
    <AuthLayout title="Login to your account">
        <form class="space-y-6" @submit.prevent="login">
            <div
                v-if="errorMsg"
                class="flex items-center justify-center py-3 px-5 bg-red-400 text-white rounded-md"
                role="alert"
            >
                {{ errorMsg }}
            </div>

            <div>
                <label
                    for="email"
                    class="block text-sm font-medium text-gray-900"
                >
                    Email address
                </label>
                <div class="mt-2">
                    <input
                        v-model="user.email"
                        type="email"
                        name="email"
                        id="email"
                        autocomplete="email"
                        required
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <label
                        for="password"
                        class="block text-sm font-medium text-gray-900"
                    >
                        Password
                    </label>
                    <div class="text-sm">
                        <NuxtLink
                            to="/auth/forgot-password"
                            class="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                            Forgot password?
                        </NuxtLink>
                    </div>
                </div>
                <div class="mt-2">
                    <input
                        v-model="user.password"
                        type="password"
                        name="password"
                        id="password"
                        autocomplete="current-password"
                        required
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
                </div>
            </div>

            <!-- ✅ Remember me -->
            <div class="flex items-center">
                <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    v-model="remember"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label for="remember" class="ml-2 block text-sm text-gray-900">
                    Remember me
                </label>
            </div>

            <div>
                <button
                    :disabled="loading"
                    :class="{
                        'cursor-not-allowed opacity-50': loading,
                        'hover:bg-indigo-500': !loading,
                    }"
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    <svg
                        v-if="loading"
                        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    Sign in
                </button>
            </div>
        </form>
    </AuthLayout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCookie } from "#app";
import AuthLayout from "~/components/layouts/AuthLayout.vue";

const router = useRouter();
const { $axios } = useNuxtApp();

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
        const res = await $axios.post("/shop/login", {
            email: user.value.email,
            password: user.value.password,
            remember: remember.value,
        });

        const token = useCookie("auth_token", {
            maxAge: remember.value ? 60 * 60 * 24 * 30 : undefined, /
        });
        token.value = res.data.token;

        await router.push("/dashboard");  catch (error) {
        errorMsg.value =
            error.response?.data?.message || "Login fehlgeschlagen";
    } finally {
        loading.value = false;
    }
}
</script>
