import axios from "axios";

export default {
    namespaced: true,
    state: () => ({
        products: {},
        hitProducts: {},
        infoProduct: {},
        filteredProducts: [],
        searchedResponse: {},
        isLoading: false
    }),
    mutations: {
        setProducts(state, products) {
            const productsWithIsActive = products.map(product => ({
                ...product,
                isActive: false,
                favActive: false,
            }));
            state.hitProducts = products.filter(product => product.status === "Hit");
            state.products = productsWithIsActive;
        },
        setInfoProduct(state, infoProduct) {
            state.infoProduct = infoProduct
        },
        setFilteredProducts(state, products) {
            state.filteredProducts = products;
        },
        setSearch(state, searchedResponse) {
            state.searchedResponse = products;
        },
    },
    actions: {
        async getProducts({
            commit,
            state
        }) {
            state.isLoading = true;
            try {

                const res = await axios.get("/store/products/list/", {
                    headers: {
                        'content-language': "ru"
                    }
                });
                if (res.status === 200) {
                    commit("setProducts", res.data);
                }
            } catch (error) {
                console.error(error);
            }
            state.isLoading = false;
        },
        async getSearch({
            commit,
            state
        }, termin) {
            state.isLoading = true;
            try {
                const res = await axios.get(`/store/products/list/?s=${termin}`);
                if (res.status === 200) {
                    commit("setSearch", res.data);
                }
            } catch (error) {
                console.error(error);
            }
            state.isLoading = false;
        },
        async getInfoProduct({
            commit,
            state
        }, productId) {
            state.isLoading = true;
            try {
                const res = await axios.get(`/store/products/retrieve/${productId}/`, {
                    headers: {
                        'content-language': "ru",
                    },
                });
                if (res.status === 200) {
                    commit("setInfoProduct", res.data);
                    console.log(res.data);
                }
            } catch (error) {
                console.error(error);
            }
            state.isLoading = false;
        },
        async applyFilter({
            commit,
            state
        }, filterOptions) {
            state.isLoading = true
            setTimeout(async () => {
                try {
                    const queryParams = [];

                    if (filterOptions.category && filterOptions.category.length > 0) {
                        queryParams.push(`category=${filterOptions.category.join('&category=')}`);
                    }
                    if (filterOptions.title && filterOptions.title.length > 0) {
                        queryParams.push(`title=${filterOptions.title}`);
                    }

                    if (filterOptions.main_color && filterOptions.main_color.length > 0) {
                        queryParams.push(`main_color=${filterOptions.main_color.join('&main_color=')}`);
                    }

                    if (filterOptions.car_brands && filterOptions.car_brands.length > 0) {
                        queryParams.push(`car_brands=${filterOptions.car_brands.join('&car_brands=')}`);
                    }

                    if (filterOptions.car_models && filterOptions.car_models.length > 0) {
                        queryParams.push(`car_models=${filterOptions.car_models.join('&car_model=')}`);
                    }



                    const queryString = queryParams.join('&');

                    const res = await axios.get(`/store/products/list/?${queryString}`, {
                        headers: {
                            'content-language': 'ru',
                        },
                    });

                    if (res.status === 200) {
                        commit("setProducts", res.data);
                    }
                } catch (error) {
                    console.error(error);
                }



                state.isLoading = false;
            }, 500);

        },
    },
    getters: {
        products(state) {
            return state.products;
        },
        infoProduct(state) {
            return state.infoProduct;
        },
        hitProducts(state) {
            return state.hitProducts;
        },
        filteredProducts: (state) => state.filteredProducts,
        isLoading(state) {
            return state.isLoading;
        },
        searchedResponse(state) {
            return state.searchedResponse;
        },
    },
};