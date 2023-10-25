import Vue from 'vue'
import Vuex from 'vuex'
import inquiry from "./modules/inquiry.module";
import social from "./modules/socail.module";
import products from "./modules/products.module";
import phone from "./modules/phone.module";
import addresses from "./modules/addresses.module";
import email from "./modules/email.module";
import filter from "./modules/filter.module";
import cart from "./modules/cart.module";
import device from "./modules/device.module";
import constructor from "./modules/constructor.module";
import auth from "./modules/auth.module";
import orders from "./modules/orders.module";
import user from "./modules/user.module";
import stores from "./modules/stores.module";
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    social,
    phone,
    addresses,
    inquiry,
    cart,
    user,
    stores,
    orders,
    products,
    email,
    filter,
    constructor,
    device,
    auth,
    search: {
      state: {
        searchResults: [],
      },
      mutations: {

      },
      actions: {

      },

    },

  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},

})