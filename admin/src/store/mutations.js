export function setUser(state, user) {
    state.user.data = user;
}

export function setToken(state, token) {
    state.user.token = token;

    if (token) {
        sessionStorage.setItem("TOKEN", token);
    } else {
        sessionStorage.removeItem("TOKEN");
    }
}

export function setProducts(state, products) {
    state.products.data = products;
}

export function setProductsLoading(state, loading) {
    state.products.loading = loading;
}
