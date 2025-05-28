// ========== USER ==========
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

// ========== PRODUCTS ==========
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

// ========== CATEGORIES ==========
export function setCategories(state, categories) {
    state.categories.data = categories;
}

export function setCategoriesLoading(state, loading) {
    state.categories.loading = loading;
}

export function updateCategoryInState(state, updatedCategory) {
    const index = state.categories.data.findIndex(
        (cat) => cat.id === updatedCategory.id
    );
    if (index !== -1) {
        state.categories.data[index] = updatedCategory;
    }
}

export function deleteCategoryFromState(state, categoryId) {
    state.categories.data = state.categories.data.filter(
        (cat) => cat.id !== categoryId
    );
}
