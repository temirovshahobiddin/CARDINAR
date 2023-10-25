import axios from "axios";

export default {
    namespaced: true,
    state: () => ({
        categories: {},
        carBrand: {},
        carModel: {},
        ConstructorCarModel: {}
    }),
    mutations: {
        setCategories(state, categories) {
            const categoriesWithActive = categories.map(item => ({
                ...item,
                active: false,
            }));
            state.categories = categoriesWithActive;
        },
        setCarBrand(state, carBrand) {
            const carsBrandWithActive = carBrand.map(brand => ({
                ...brand,
                active: false,
            }));
            state.carBrand = carsBrandWithActive;
        },
        setCarModel(state, carModel) {
            const carsModelWithActive = carModel.map(model => ({
                ...model,
                active: false,
            }));
            state.carModel = carsModelWithActive;
        },
        setConstructorCarModel(state, ConstructorCarModel) {

            state.ConstructorCarModel = ConstructorCarModel;
        }
    },
    actions: {
        async getCategories({
            commit,
            state
        }) {
            state.isLoading = true;
            try {

                const res = await axios.get("/store/categories/list/");
                if (res.status === 200) {
                    commit("setCategories", res.data);
                }
            } catch (error) {

            }
        },
        async getCarBrand({
            commit,
            state
        }, categoryId) {
            state.isLoading = true;
            try {

                const res = await axios.get(`/store/car_brands/list/?category_id=${categoryId}`);
                if (res.status === 200) {
                    commit("setCarBrand", res.data);
                }
            } catch (error) {

            }
        },
        async getConstructorCarBrand({
            commit,
            state
        }) {
            state.isLoading = true;
            try {

                const res = await axios.get(`/store/car_brands/list/?category_id=1`);
                if (res.status === 200) {
                    commit("setCarBrand", res.data);
                }
            } catch (error) {

            }
        },
        async getCarModel({
            commit,
            state
        }, brandId) {
            state.isLoading = true;
            try {
                const res = await axios.get(`/store/car_models/list/${brandId}/`);
                if (res.status === 200) {
                    commit("setCarModel", res.data);
                }
            } catch (error) {

            }
        },
        async getConstructorCarModels({
            commit,
            state
        }) {
            state.isLoading = true;
            try {
                const res = await axios.get(`/store/products/retrieve/18/`);
                if (res.status === 200) {
                    commit("setConstructorCarModel", res.data);
                }
            } catch (error) {

            }
        },
    },
    getters: {
        categories(state) {
            return state.categories;
        },
        carBrand(state) {
            return state.carBrand;
        },
        carModel(state) {
            return state.carModel;
        },
        ConstructorCarModel(state) {
            return state.ConstructorCarModel;
        },
    },
};