import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    const axiosClient = axios.create({
        baseURL: `${config.public.apiBase}/api`,
        withCredentials: true,
    });

    axiosClient.interceptors.request.use((config) => {
        const token = useCookie("auth_token").value;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    axiosClient.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                const router = useRouter();
                router.push("/auth/login");
            }
            return Promise.reject(error);
        }
    );

    return {
        provide: {
            axios: axiosClient,
        },
    };
});
