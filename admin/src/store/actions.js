import axiosClient from "../axios";

export function login({ commit }, user) {
    return axiosClient.post("/admin/login", user).then(({ data }) => {
        commit("setUser", data.user);
        commit("setToken", data.token);
        return data;
    });
}

export function logout({ commit }) {
    return axiosClient.post("/admin/logout").then(() => {
        commit("setToken", null);
    });
}

export function getUser({ commit }) {
    return axiosClient.get("/admin/user").then(({ data }) => {
        commit("setUser", data.user);
        return data;
    });
}

export function getProducts(
    { commit },
    { search = "", perPage = 10, page = 1 }
) {
    commit("setProductsLoading", true);
    return axiosClient
        .get("/admin/products", {
            params: { search, per_page: perPage, page },
        })
        .then(({ data }) => {
            commit("setProducts", data);
            return data;
        })
        .finally(() => {
            commit("setProductsLoading", false);
        });
}

export function createProduct({ commit }, product) {
    return axiosClient.post("/admin/products", product).then(({ data }) => {
        commit("addProduct", data);
        return data;
    });
}

export function updateProduct({ commit }, product) {
    return axiosClient
        .put(`/admin/products/${product.id}`, product)
        .then(({ data }) => data);
}

export function deleteProduct({ commit }, productId) {
    return axiosClient.delete(`/admin/products/${productId}`).then(() => {
        return productId;
    });
}

export function getCategories({ commit }) {
    commit("setCategoriesLoading", true);
    return axiosClient
        .get("/admin/categories")
        .then(({ data }) => {
            commit("setCategories", data);
            return data;
        })
        .finally(() => {
            commit("setCategoriesLoading", false);
        });
}

export function createCategory({ dispatch }, category) {
    return axiosClient.post("/admin/categories", category).then(() => {
        return dispatch("getCategories");
    });
}

export function deleteCategory({ commit }, categoryId) {
    return axiosClient.delete(`/admin/categories/${categoryId}`).then(() => {
        commit("deleteCategoryFromState", categoryId);
    });
}

export function getShopUsers({ commit }) {
    return axiosClient.get("/admin/shop-users").then(({ data }) => {
        commit("setShopUsers", data);
    });
}

export function getOrders({ commit }) {
    commit("setOrdersLoading", true);
    return axiosClient
        .get("/admin/orders")
        .then(({ data }) => {
            commit("setOrders", data);
            return data;
        })
        .finally(() => {
            commit("setOrdersLoading", false);
        });
}

export function getNotifications({ commit }) {
    commit("setNotificationsLoading", true);
    return axiosClient
        .get("/admin/notifications")
        .then(({ data }) => {
            commit("setNotifications", data);
            commit("setUnreadCount", data.filter(n => !n.is_read).length);
            return data;
        })
        .finally(() => {
            commit("setNotificationsLoading", false);
        });
}

export function markNotificationAsRead({ commit }, id) {
    return axiosClient
        .put(`/admin/notifications/${id}/read`)
        .then(() => {
            commit("markNotificationAsRead", id);
        });
}

export function markAllNotificationsAsRead({ commit }) {
    return axiosClient
        .put("/admin/notifications/read-all")
        .then(() => {
            commit("markAllNotificationsAsRead");
        });
}

export function updateOrderStatus({ commit }, { orderId, status }) {
    return axiosClient
        .put(`/admin/orders/${orderId}/status`, { status })
        .then(({ data }) => {
            commit("updateOrder", data.order);
            return data;
        });
}

export function updateUser({ commit }, user) {
    return axiosClient
        .put(`/admin/shop-users/${user.id}`, user)
        .then(({ data }) => data);
}
