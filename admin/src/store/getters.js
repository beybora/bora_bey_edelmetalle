export function sortedCategories(state) {
    return [...state.categories.data].sort((a, b) => {
        if (a.sort_order && b.sort_order) return a.sort_order - b.sort_order;
        if (a.sort_order) return -1;
        if (b.sort_order) return 1;
        return a.id - b.id;
    });
}

export function getNextSortOrder(state) {
    const visible = state.categories.data.filter((c) => c.visible_in_nav);
    const used = visible
        .map((c) => c.sort_order)
        .filter(Boolean)
        .sort((a, b) => a - b);
    for (let i = 1; i <= 4; i++) {
        if (!used.includes(i)) return i;
    }
    return null;
}
