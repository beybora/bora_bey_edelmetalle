import { createRouter, createWebHistory } from "vue-router";
import Dashbard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";

const routes = [
    {
        path: "/dashboard",
        name: "dashboard",
        component: Dashbard,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
