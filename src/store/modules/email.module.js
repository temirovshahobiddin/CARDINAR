import axios from "axios";

export default {
    namespaced: true,
    state: () => ({
        email: {},


    }),
    mutations: {
        setEmail(state, email) {
            state.email = email;
        }
    },
    actions: {
        async getEmail({
            commit,
            state
        }) {
            state.isLoading = true;
            try {
                const res = await axios.get("/about/emails/");
                if (res.status === 200) {
                    commit("setEmail", res.data);
                }
            } catch (error) {
                console.error(error);
            }
        },
    },
    getters: {
        email(state) {
            return state.email;
        },
    },
};