import { createStore } from "vuex";
import * as actions from "./actions";
import * as mutations from "./mutations";
const store = createStore({
    state: {
        user: {
            token: sessionStorage.getItem("TOKEN") || null,
            data: {},
        },
        products: {
            loading: false,
            data: [],
        },
        categories: {
            loading: false,
            data: [],
        },
        users: {
            loading: false,
            data: [],
        },
        orders: {
            loading: false,
            data: [],
        },

        notifications: {
            loading: false,
            data: [],
            unreadCount: 0
        }
    },
    actions: actions,
    mutations: mutations,
});

export default store;
