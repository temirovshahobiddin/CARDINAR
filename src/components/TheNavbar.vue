<template>
  <nav class="nav">
    <div class="nav-top">
      <div class="container">
        <div class="nav-top__wrapper">
          <router-link to="/" class="nav-brand">
            <img :src="logo" alt="" class="nav-brand__logo" />
          </router-link>
          <div class="nav-search">
            <input class="search_line" type="text" :placeholder="$t('search')" v-model="searchText"
              @click="openSearchMenu" />
            <a class="nav_btn_search_container">
              {{ $t("search") }}
              <img :src="search" alt="" />
            </a>
            <div v-if="filteredProducts.length > 0" class="nav-search__menu" ref="searchBar"
              :style="{ 'max-height': searchMenu ? '500px' : '0' }">
              <div v-for="product in filteredProducts" :key="product.id" class="nav-search__menu-inner"
                @click="getProductDetails(product.id)">

                <p v-html="highlightMatchingText(product.title)"></p>

              </div>

            </div>

            <div class="nav_icon">
              <a href="#!" @click="toggleBasket" class="nav-basket">
                <div class="nav-basket__any" v-for="(item, index) in cart" :key="index">
                  {{ cartItemCount }}
                </div>
                <img :src="cartImg" alt="" />
              </a>
              <div class="nav__user">
                <a @click="nav__login_auth()">
                  <img :src="userIcon" alt="" />
                </a>
                <div v-if="isUserMenuOpen" class="user-menu" ref="userMenu" @click="closeUserMenu()">
                  <router-link :to="{ name: 'user' }" class="user-menu__item">История заказов</router-link>
                  <a href="#!" class="user-menu__item" @click="logout">Выход</a>
                </div>
              </div>
            </div>
          </div>

          <div class="lang nav-lang" @click="(isLangOpen = !isLangOpen)" ref="navLang">
            <img :src="languages[langIndex].img" :alt="languages[langIndex].name" class="nav-lang__flag" />
            <p>
              {{ languages[langIndex].name }}
            </p>
            <img :src="chevron" alt="" />
            <ul v-if="isLangOpen" class="nav-lang__list">
              <li v-for="(lang, index) in languages" :key="lang.name" @click.stop="changeHandler(index, lang.value)">
                <img :src="lang.img" :alt="lang.name" class="nav-lang__flag" />{{ lang.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="nav-bottom">
      <div class="container">
        <div class="nav-bottom__wrapper">
          <ul class="nav-list">
            <div class="nav_icon">
              <a href="#!" class="nav-basket">
                <div class="nav-basket__any" v-for="(item, index) in cart" :key="index">
                  {{ cartItemCount }}
                </div>
                <img :src="cartWhite" alt="" @click="toggleBasket" />
              </a>
              <a @click="nav__login_auth">
                <img :src="userIcon" alt="" />
              </a>
            </div>
            <button class="nav__collapse-btn" @click="openPhoneMenu">
              <span class="nav-btn-line"></span>
              <span class="nav-btn-line"></span>
              <span class="nav-btn-line"></span>
            </button>
            <li class="nav-item nav-dropdown">
              <a class="nav-dropbtn nav-link">{{ $t("catalog") }}</a>
              <div class="nav-dropdown__content">
                <a class="nav-dropdown__link" v-for="item in categories" :key="item.id" @click="filterItems(item)">
                  <i class="nav-check far fa-check"></i>
                  {{ item.title }}</a>
              </div>
            </li>
            <li class="nav-item nav-dropdown">
              <a class="nav-dropbtn nav-link">{{ $t("builder") }}</a>
              <div class="nav-dropdown__content">
                <router-link to="/constructor" class="nav-dropdown__link">
                  <i class="nav-check far fa-check"></i>
                  {{ $t("seatCoverBuilder") }}</router-link>
                <router-link to="/constructor/2" class="nav-dropdown__link">
                  <i class="nav-check far fa-check"></i>
                  {{ $t("floorMatBuilder") }}</router-link>
              </div>
            </li>
            <li class="nav-item">
              <router-link to="/stores" class="nav-link">{{
                $t("whereToBuy")
              }}</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/contacts" class="nav-link">{{
                $t("contacts")
              }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="nav-tel" :class="{ active: phoneMenuOpen }">
      <div class="nav-tel__header">
        <router-link to="/" @click.native="closePhoneMenu" class="nav-brand">
          <img :src="logo" alt="" class="nav-brand__logo" />
        </router-link>
        <div class="nav-tel__close" @click="closePhoneMenu">
          <i class="fal fa-times nav-tel__icon"></i>
        </div>
      </div>
      <ul class="nav-tel__list">
        <li class="nav-item nav-dropdown">
          <a class="nav-dropbtn nav-link nav-dropdown__link-tel">{{ $t("catalog") }} <i
              class="far fa-arrow-up rotate-icon"></i>
          </a>
          <div class="nav-dropdown__content">
            <a class="nav-dropdown__link nav-dropdown__link-tel" v-for="item in categories" :key="item.id"
              @click="filterItems(item)">
              <i class="nav-check far fa-check"></i>
              {{ item.title }}</a>
          </div>
        </li>
        <li class="nav-item nav-dropdown">
          <a class="nav-dropbtn nav-link nav-dropdown__link-tel">{{ $t("builder") }} <i
              class="far fa-arrow-up rotate-icon"></i>
          </a>
          <div class="nav-dropdown__content">
            <router-link to="/constructor" @click.native="closePhoneMenu"
              class="nav-dropdown__link nav-dropdown__link-tel">
              <i class="nav-check far fa-check"></i>
              {{ $t("seatCoverBuilder") }}</router-link>
            <router-link @click.native="closePhoneMenu" to="/constructor/2"
              class="nav-dropdown__link nav-dropdown__link-tel">
              <i class="nav-check far fa-check"></i>
              {{ $t("floorMatBuilder") }}</router-link>
          </div>
        </li>
        <li class="nav-item">
          <router-link to="/stores" @click.native="closePhoneMenu" class="nav-link nav-dropdown__link-tel">{{
            $t("whereToBuy") }}</router-link>
        </li>
        <li class="nav-item">
          <router-link @click.native="closePhoneMenu" to="/contacts" class="nav-link nav-dropdown__link-tel">{{
            $t("contacts") }}</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import Dropdown from "primevue/dropdown";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  components: {
    Dropdown,
  },
  data: () => ({
    logo: require("@/assets/img/nav/logo.svg"),
    cartImg: require("@/assets/img/nav/cart.svg"),
    cartWhite: require("@/assets/img/nav/cart-white.svg"),
    search: require("@/assets/img/nav/search.svg"),
    chevron: require("@/assets/img/nav/Chevron.svg"),
    isDropdownVisible: false,
    isLangOpen: false,
    langIndex: 0,
    phoneMenuOpen: false,
    isUserMenuOpen: false,
    searchText: "",
    searchMenu: false,
    searchProducts: []
  }),

  computed: {
    ...mapGetters("cart", ["cart"]),
    ...mapGetters("filter", ["carBrand", "carModel", "categories"]),
    ...mapGetters("products", [
      "products",
      "infoProduct",
      "filteredProducts",
      "isLoading",
    ]),
    languages: () => [
      {
        name: "Russian",
        img: require("@/assets/img/nav/ru.jpg"),
        value: "ru",
      },
      { name: "Uzbek", img: require("@/assets/img/nav/uz.gif"), value: "uz" },
    ],
    cartItemCount() {
      // Calculate and return the total count of unique products in the cart
      return Object.keys(this.cart).length;
    },
    filteredProducts() {
      const searchQuery = this.searchText.toLowerCase();
      return this.searchProducts.filter(product => {
        return product.title.toLowerCase().includes(searchQuery);
      });
    },
    userIcon() {
      const token = localStorage.getItem("token");
      const isMobileDevice = this.isMobileDevice();
      return token
        ? isMobileDevice
          ? require("@/assets/img/auth_black.svg") // Set userVerify icon for mobile
          : require("@/assets/img/auth.svg") // Set userVerify icon for desktop
        : require("@/assets/img/nav/user-add.svg"); // Set userAdd icon
    },
  },
  methods: {
    ...mapActions("cart", ["getCart", "addCart", "deleteCart"]),
    ...mapActions("filter", ["getCarBrand", "getCarModel", "getCategories"]),
    ...mapActions("products", ["getProducts", "getInfoProduct", "applyFilter"]),
    highlightMatchingText(productName) {
      const searchQuery = this.searchText.toLowerCase();
      const index = productName.toLowerCase().indexOf(searchQuery);

      if (index === -1) {
        return productName;
      }

      const highlightedName =
        productName.substring(0, index) +
        '<strong>' +
        productName.substring(index, index + searchQuery.length) +
        '</strong>' +
        productName.substring(index + searchQuery.length);

      return highlightedName;
    },
    async filterItems(item) {
      // Gather the selected filter options
      const filterOptions = {
        category: [item.id],
      };
      console.log(this.filterOptions);
      await this.applyFilter(filterOptions);
      this.$router.push({ name: "category", params: { id: item.id } });
      this.phoneMenuOpen = false;
    },
    changeHandler(index, value) {
      localStorage.setItem("locale", value);
      localStorage.setItem("localeIndex", index);
      this.$i18n.locale = value;
      this.langIndex = index;
      this.isLangOpen = false;
      window.location.reload();
      this.$forceUpdate();
    },
    toggleBasket() {
      this.$emit("toggle-basket");
    },

    toggleDropdown(isOpen) {
      this.isDropdownOpen = isOpen;
    },


    openPhoneMenu() {
      this.phoneMenuOpen = true;
    },
    closeUserMenu() {
      this.isUserMenuOpen = false;
    },
    closePhoneMenu() {
      this.phoneMenuOpen = false;
    },
    nav__login_auth() {
      const token = localStorage.getItem("token");
      if (token) {
        if (this.isMobileDevice()) {
          this.userIcon = require("@/assets/img/auth_black.svg");
        } else {
          this.userIcon = require("@/assets/img/auth.svg");
        }
        this.isUserMenuOpen = !this.isUserMenuOpen;
      } else {
        this.$router.push({ name: "login" });
        if (this.isMobileDevice()) {
          this.userIcon = require("@/assets/img/nav/user-add.svg");
        } else {
          this.userIcon = require("@/assets/img/auth.svg");
        }
      }
    },
    async fetchProducts() {

      try {

        const res = await axios.get("/store/products/list/", {});

        if (res.status === 200) {
          this.searchProducts = res.data
        }
      } catch (error) {
        console.error(error);
      }

    },
    closeSearchMenu(event) {
      if (!this.$refs.searchBar.contains(event.target)) {
        this.searchMenu = false;
      }
    },
    openSearchMenu() { this.searchMenu = true },
    async getProductDetails(productId) {
      this.$router.push({ name: "product", params: { id: productId } });
      this.$router.go();
      if (!productId) {
        return;
      }

      await this.$store.dispatch("products/getInfoProduct", productId);
    },
    async logout() {
      try {
        // Send a POST request to the logout URL
        await axios.get("/users/logout/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Clear the token from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");

        // Redirect the user to the login page after logout
        this.$router.push({ name: "logout" });
      } catch (error) { }
    },
    isMobileDevice() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    },
  },
  async created() {
    await this.fetchProducts()
  },
  async mounted() {
    this.getCart();
    this.getCategories();
    await this.fetchProducts()
    window.addEventListener("mouseup", this.closeSearchMenu);

    const savedLocale = localStorage.getItem("locale");
    if (savedLocale) {
      this.$i18n.locale = savedLocale;

      // Получаем индекс для выбранного языка
      const langIndex = parseInt(localStorage.getItem("localeIndex"));
      this.langIndex = langIndex;
    }

  },
  beforeDestroy() {

    window.removeEventListener("click", this.closeSearchMenu);

  },
};
</script>

<style></style>