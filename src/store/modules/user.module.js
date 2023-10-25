import axios from "axios";

export default {
    namespaced: true,
    state: () => ({
        user: {},


    }),
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        async getUser({
            commit,
            state
        }) {
            state.isLoading = true;
            try {
                const res = await axios.get("/users/retrieve/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                if (res.status === 200) {
                    commit("setUser", res.data);
                }
            } catch (error) {
            
            }
        },
    },
    getters: {
        user(state) {
            return state.user;
        },
    },
};