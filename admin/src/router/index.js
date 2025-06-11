import { createRouter, createWebHistory } from "vue-router";
import Users from "../views/Users/Users.vue";
import Reports from "../views/Reports.vue";
import Products from "../views/Products/Products.vue";
import Login from "../views/Login.vue";
import AppLayout from "../components/AppLayout.vue";
import NotFound from "../views/NotFound.vue";
import store from "../store/index.js";
import Categories from "../views/Categories/Categories.vue";
import Orders from "../views/Orders/Orders.vue";

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
            {
                path: "orders",
                name: "app.orders",
                component: Orders,
            },
            {
                path: "orders/:id",
                name: "app.order-details",
                component: () => import("../views/OrderDetails.vue"),
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
        path: "/:pathMatch(.*)*",
        redirect: (to) => {
            const isAuthenticated = store.state.user.token;
            return isAuthenticated
                ? { name: "app.orders" }
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
