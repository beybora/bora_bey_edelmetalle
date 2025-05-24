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

export function addProduct(state, product) {
    state.products.data.data.unshift(product.data);
}

export function updateProduct(state, updatedProduct) {
    const index = state.products.data.data.findIndex(
        (product) => product.id === updatedProduct.id
    );

    if (index !== -1) {
        state.products.data.data[index] = updatedProduct;
    }
}

export function deleteProduct(state, productId) {
    const index = state.products.data.data.findIndex(
        (product) => product.id === productId
    );

    if (index !== -1) {
        state.products.data.data.splice(index, 1);
    }
}
