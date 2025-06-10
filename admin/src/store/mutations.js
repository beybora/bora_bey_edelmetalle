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

export function setCategories(state, categories) {
    state.categories.data = categories;
}

export function setCategoriesLoading(state, loading) {
    state.categories.loading = loading;
}

export function deleteCategoryFromState(state, categoryId) {
    state.categories.data = state.categories.data.filter(
        (cat) => cat.id !== categoryId
    );
}

export function setShopUsers(state, users) {
    state.users.data = users;
}

export function setUsersLoading(state, loading) {
    state.users.loading = loading;
}

export function setOrders(state, orders) {
    state.orders.data = orders;
}

export function setOrdersLoading(state, loading) {
    state.orders.loading = loading;
}

export function setNotifications(state, notifications) {
    state.notifications.data = notifications;
}

export function setNotificationsLoading(state, loading) {
    state.notifications.loading = loading;
}

export function setUnreadCount(state, count) {
    state.notifications.unreadCount = count;
}

export function markNotificationAsRead(state, id) {
    const notification = state.notifications.data.find(n => n.id === id);
    if (notification) {
        notification.is_read = true;
        state.notifications.unreadCount = Math.max(0, state.notifications.unreadCount - 1);
    }
}

export function markAllNotificationsAsRead(state) {
    state.notifications.data.forEach(n => n.is_read = true);
    state.notifications.unreadCount = 0;
}

export function updateOrder(state, updatedOrder) {
    const index = state.orders.data.findIndex(o => o.id === updatedOrder.id);
    if (index !== -1) {
        state.orders.data[index] = updatedOrder;
    }
}
