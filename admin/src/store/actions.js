import axiosClient from "../axios";

export function login({ commit }, user) {
    return axiosClient
        .post("/login", user)
        .then(({ data }) => {
            commit("setUser", data.user);
            commit("setToken", data.token);
            return data;
        })
        .catch((error) => {
            throw error;
        });
}

export function logout({ commit }) {
    return axiosClient
        .post("/logout")
        .then(() => {
            commit("setToken", null);
        })
        .catch((error) => {
            throw error;
        });
}

export function getUser({ commit }) {
    return axiosClient
        .get("/user")
        .then(({ data }) => {
            commit("setUser", data.user);
            return data;
        })
        .catch((error) => {
            throw error;
        });
}

export function getProducts(
    { commit },
    { search = "", perPage = 10, page = 1 }
) {
    commit("setProductsLoading", true);
    return axiosClient
        .get("/products", {
            params: {
                search,
                per_page: perPage,
            },
        })
        .then(({ data }) => {
            commit("setProducts", data);
            return data;
        })
        .catch((error) => {
            throw error;
        })
        .finally(() => {
            commit("setProductsLoading", false);
        });
}

export function createProduct({ commit }, product) {
    return axiosClient
        .post("/products", product)
        .then(({ data }) => {
            commit("addProduct", data);
            return data;
        })
        .catch((error) => {
            throw error;
        });
}

export function updateProduct({ commit }, product) {
    return axiosClient
        .put(`/products/${product.id}`, product)
        .then(({ data }) => {
            return data;
        })
        .catch((error) => {
            throw error;
        });
}

export function deleteProduct({ commit }, productId) {
    return axiosClient
        .delete(`/products/${productId}`)
        .then(() => {
            commit("removeProduct", productId);
        })
        .catch((error) => {
            throw error;
        });
}
