import axios from "axios";

export default {
    namespaced: true,
    state: () => ({

        seatModel: {},
        carModel: {}

    }),
    mutations: {

        setSeatModel(state, seatModel) {
            const carsBrandWithActive = seatModel.map(brand => ({
                ...brand,
                active: false,
            }));
            state.seatModel = carsBrandWithActive;
        },

    },
    actions: {

        async getSeatModel({
            commit,
            state
        }) {
            state.isLoading = true;
            try {

                const res = await axios.get("/constructor/models_list/");
                if (res.status === 200) {
                    commit("setSeatModel", res.data);
                }
            } catch (error) {
                console.error(error);
            }
        },


    },
    getters: {

        seatModel(state) {
            return state.seatModel;
        },

    },
};