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
