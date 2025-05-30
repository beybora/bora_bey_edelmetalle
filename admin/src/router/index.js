import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Users from "../views/Users.vue";
import Reports from "../views/Reports.vue";
import Products from "../views/Products/Products.vue";
import Login from "../views/Login.vue";
import RequestPassword from "../views/RequestPassword.vue";
import ResetPassword from "../views/ResetPassword.vue";
import AppLayout from "../components/AppLayout.vue";
import NotFound from "../views/NotFound.vue";
import store from "../store/index.js";
import Categories from "../views/Categories.vue";

const routes = [
    {
        path: "/app",
        name: "app",
        component: AppLayout,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: "dashboard",
                name: "app.dashboard",
                component: Dashboard,
            },
            {
                path: "products",
                name: "app.products",
                component: Products,
            },
            {
                path: "users",
                name: "app.users",
                component: Users,
            },
            {
                path: "categories",
                name: "app.categories",
                component: Categories,
            },
            {
                path: "reports",
                name: "app.reports",
                component: Reports,
            },
        ],
    },
    {
        path: "/login",
        name: "login",
        meta: {
            requiresUnauth: true,
        },
        component: Login,
    },
    {
        path: "/request-password",
        name: "requestPassword",
        meta: {
            requiresUnauth: true,
        },
        component: RequestPassword,
    },
    {
        path: "/reset-password",
        name: "resetPassword",
        meta: {
            requiresUnauth: true,
        },
        component: ResetPassword,
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: (to) => {
            const isAuthenticated = store.state.user.token;
            return isAuthenticated
                ? { name: "app.dashboard" }
                : { name: "login" };
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.state.user.token;

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: "login" });
    } else if (to.meta.requiresUnauth && isAuthenticated) {
        next({ name: "app.dashboard" });
    } else {
        next();
    }
});

export default router;
