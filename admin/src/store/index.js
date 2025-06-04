import { createStore } from "vuex";
import * as actions from "./actions";
import * as mutations from "./mutations";
import * as getters from "./getters";

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
    },
    getters: getters,
    actions: actions,
    mutations: mutations,
});

export default store;
