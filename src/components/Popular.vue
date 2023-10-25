<template>
  <section class="second-carousel__container swiper container" ref="swiper">
    <div class="switch_arrows">
      <p class="switch-arrows__txt">Популярные товары на сайте</p>
      <div class="carousel_btn_container">
        <div
          class="btn_previous switch_carousel_btn_style complete_absence_on_the_page swiper-button-prev"
        >
          <i class="far fa-chevron-left"></i>
        </div>
        <div class="btn_next switch_carousel_btn_style swiper-button-next">
          <i class="far fa-chevron-right"></i>
        </div>
      </div>
    </div>

    <!-- body carousel -->
    <div class="swiper-wrapper body__second-carousel">
      <div
        class="swiper-slide card__second-carousel"
        v-for="card in hitProducts"
        :key="card.id"
        @click="getProductDetails(card.id)"
      >
        <div class="card-header__second-carousel">
          <img
            :src="card.photo"
            alt=""
            :class="{
              'max-width-250': card.category.id === 3,
              'big-img-resize':
                card.title === 'Cardinar Scorpion - Чёрные' ||
                card.title === 'Cardinar Rich',
            }"
          />

          <router-link
            to="/constructor"
            class="card-title__second-carousel"
            :class="{
              'skyline-product': card.title.toLowerCase().includes('skyline'),
            }"
          >
            <img :src="customiezer" alt="" />
            <a :href="card.link">customiezer</a>
          </router-link>
        </div>

        <div class="card-body__second-carousel">
          <div class="card-copy__second-carousel">
            <p class="card-name__second-carousel">{{ card.title }}</p>
            <p class="card-price__second-carousel">
              {{ prettifySum(card.price) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Swiper, { Navigation, Pagination, Keyboard } from "swiper";
import "swiper/css";
import axios from "axios";
import "swiper/css/navigation";
import { prettifySum } from "@/use/prettify";
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    prettifySum,
    cards: [
      {
        img: require("@/assets/img/popular/seat.png"),
        name: "Авточехол Cardinar Skyline",
        price: "500 000 сум",
        link: "#!",
      },
      {
        img: require("@/assets/img/popular/polik.png"),
        name: "Авточехол Cardinar Skyline",
        price: "500 000 сум",
        link: "#!",
      },
      {
        img: require("@/assets/img/popular/seat.png"),
        name: "Авточехол Cardinar Skyline",
        price: "500 000 сум",
        link: "#!",
      },
      {
        img: require("@/assets/img/popular/seat.png"),
        name: "Авточехол Cardinar Skyline",
        price: "500 000 сум",
        link: "#!",
      },
    ],
    customiezer: require("@/assets/img/popular/Vector.svg"),
    cart: require("@/assets/img/popular/cart.svg"),
  }),
  computed: {
    ...mapGetters("products", [
      "products",
      "infoProduct",
      "filteredProducts",
      "isLoading",
      "hitProducts",
    ]),
  },
  mounted() {
    this.getProducts();
    console.log(this.hitProducts);

    new Swiper(this.$refs.swiper, {
      modules: [Navigation, Pagination, Keyboard],
      loop: true,
      spaceBetween: 50,
      keyboard: {
        enabled: true,
      },
      /*    spaceBetween: 400, */
      breakpoints: {
        1920: {
          slidesPerView: 3,
          sliderPerGroup: 1,
        },
        700: {
          slidesPerView: 2,
          sliderPerGroup: 1,
        },
        400: {
          slidesPerView: 1,
          sliderPerGroup: 1,
        },
      },
      grabCursor: true,
      pagination: {
        /*  el: '.swiper-pagination', */
        //   clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      /*  scrollbar: {
                 el: '.swiper-scrollbar',
             }, */
    });
  },
  methods: {
    ...mapActions("products", ["getProducts", "getInfoProduct", "applyFilter"]),
    onWindowResize() {
      if (this.swiper) {
        this.swiper.destroy();
        this.initSwiper();
      }
    },
    async getProductDetails(productId) {
      console.log("Product ID:", productId);
      if (!productId) {
        console.error("Invalid product ID");
        return;
      }

      await this.$store.dispatch("products/getInfoProduct", productId);
      this.$router.push({ name: "product", params: { id: productId } });
      this.$router.go();
    },
  },
};
</script>

<style lang="scss" scoped>
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
.skyline-product {
  display: flex !important;
}

.swiper-button-prev,
.swiper-button-next {
  position: relative !important;
  top: 0;
  width: 48px !important;
  height: 48px !important;
  margin-top: 0 !important;
  /* z-index: 10; */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
}

.swiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  /*   column-gap: 160px !important; */
  display: flex;
  transition-property: transform;
  transition-timing-function: var(
    --swiper-wrapper-transition-timing-function,
    initial
  );
  box-sizing: content-box;
}

.padding-img-resize {
  padding-top: 50px;
}
.swiper-button-prev::after,
.swiper-button-next::after {
  display: none;
}
.max-width-250 {
  max-width: 400px !important;
  width: 100%;
  margin-top: 40px !important;
}
.big-img-resize {
  max-width: 278px !important;
  width: 100%;
  @media (max-width: 440px) {
    max-width: 223px !important;
  }
}
</style>
