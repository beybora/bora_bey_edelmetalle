<template>
    <AuthLayout title="Login">
        <div class="bg-gray-300 text-sm text-gray-700 p-4 rounded mb-6">
            Login:<br />
            <strong>admin@example.com</strong> <br />
            <strong>password</strong>
        </div>
        <form class="space-y-6" @submit.prevent="login" method="POST">
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
                    class="block text-sm/6 font-medium text-gray-900"
                    >Email address</label
                >
                <div class="mt-2">
                    <input
                        v-model="user.email"
                        type="email"
                        name="email"
                        id="email"
                        autocomplete="email"
                        required=""
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <label
                        for="password"
                        class="block text-sm/6 font-medium text-gray-900"
                        >password</label
                    >
                </div>
                <div class="mt-2">
                    <input
                        v-model="user.password"
                        type="password"
                        name="password"
                        id="password"
                        autocomplete="current-password"
                        required=""
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
            </div>

            <div>
                <button
                    :disabled="loading"
                    :class="{
                        'cursor-not-allowed opacity-50': loading,
                        'hover:bg-indigo-500': loading,
                    }"
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
import AuthLayout from "../components/AuthLayout.vue";
import store from "../store/index.js";
import router from "../router/index.js";

let loading = ref(false);
let errorMsg = ref("");

const user = {
    email: "",
    password: "",
};

function login() {
    loading.value = true;
    errorMsg.value = "";

    store
        .dispatch("login", user)
        .then(() => {
            loading.value = false;
            router.push({ name: "app.dashboard" });
        })
        .catch((error) => {
            loading.value = false;
            errorMsg.value = error.response.data.message;
        });
}
</script>
