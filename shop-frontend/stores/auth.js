export const useAuthStore = defineStore("auth", () => {
    const token = useCookie("auth_token");
    const user = ref(null);

    const isLoggedIn = computed(() => !!token.value);
    const userEmail = computed(() => user.value?.email || "");

    async function fetchUser() {
        if (!token.value) return;
        try {
            const { $axios } = useNuxtApp();
            const res = await $axios.get("/shop/user", {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            user.value = res.data.user;
        } catch {
            logout();
        }
    }

    async function login(credentials) {
        const { $axios } = useNuxtApp();
        const res = await $axios.post("/shop/login", credentials);
        token.value = res.data.token;
        user.value = res.data.user;
    }

    async function register(data) {
        const { $axios } = useNuxtApp();
        const res = await $axios.post("/shop/register", data);
        token.value = res.data.token;
        user.value = res.data.user;
    }

    async function logout() {
        const { $axios } = useNuxtApp();
        try {
            await $axios.post("/shop/logout", {}, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
        } catch (error) {
            console.error("Logout error:", error);
        } finally {

            const cart = useCartStore();
            const orders = useOrdersStore();

            cart.items = [];
            orders.orders = [];
            orders.notifications = [];
            orders.unreadCount = 0;

            token.value = null;
            user.value = null;

            navigateTo("/");
        }
    }

    async function updatePassword(data) {
        const { $axios } = useNuxtApp();

        try {
            await $axios.put("/shop/user/password", data, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    return {
        token,
        user,
        isLoggedIn,
        userEmail,
        fetchUser,
        login,
        logout,
        register,
        updatePassword,
    };
});
