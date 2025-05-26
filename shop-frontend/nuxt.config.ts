import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-05-15",
    devtools: { enabled: true },
    css: ["~/assets/css/main.css"],

    vite: {
        plugins: [tailwindcss()],
    },
    runtimeConfig: {
        public: {
            apiBase: process.env.API_BASE || "http://localhost:8000",
        },
    },

    modules: ["@pinia/nuxt"],
});
