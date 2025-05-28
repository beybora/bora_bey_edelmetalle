import axiosClient from "../axios";

// ========== AUTH ==========
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

// ========== PRODUCTS ==========
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

// ========== CATEGORIES ==========
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

export function updateCategory({ commit }, category) {
    return axiosClient
        .put(`/admin/categories/${category.id}`, category)
        .then(({ data }) => {
            commit("updateCategoryInState", data);
            return data;
        });
}

export function deleteCategory({ commit }, categoryId) {
    return axiosClient.delete(`/admin/categories/${categoryId}`).then(() => {
        commit("deleteCategoryFromState", categoryId);
    });
}

export function sortCategories({ dispatch }, sorted) {
    return axiosClient
        .post("/admin/categories/sort", { categories: sorted })
        .then(() => {
            return dispatch("getCategories");
        });
}
