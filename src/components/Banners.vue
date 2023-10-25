<template>
  <section class="banners">
    <div class="banners-container container">
      <!-- banners left container-->
      <div class="banners__left__container">
        <div class="banners__left" href="">
          <img :src="bigImg" alt="" />
          <div class="banners__left__text">
           <!--  <p class="card__subtitle">Чехлы Cardinar Skyline</p>
            <p class="banners__button">Shop Now</p> -->
          </div>
          <div class="banners__left__gradient"></div>
        </div>
      </div>

      <!-- banners right container -->
      <div class="banners__right__container" @click="filterPoliks()">
        <div class="banners__right-top__container">
          <div class="banners__right-top" href="">
            <img :src="longImg" alt="" />
            <div class="banners__right-top__text">
              <p class="card__subtitle">Полики Cardinardan Eva</p>
              <p class="banners__button">Shop Now</p>
            </div>
            <div class="banners__right-top__gradient"></div>
          </div>
        </div>

        <div class="banners__right-bottom__container" @click="getAlfa()">
          <div class="banners__right-bottom-left" href="">
            <img :src="img1" alt="" />
            <div class="banners__right-bottom-left__text">
              <p class="card__subtitle">Чехол Cardinar Alfa</p>
              <p class="banners__button">Shop Now</p>
            </div>
            <div class="banners__right-bottom-left__gradient"></div>
          </div>

          <div
            class="banners__right-bottom-right"
            href=""
            @click="getRedSkyline()"
          >
            <img :src="img2" alt="" />
            <div class="banners__right-bottom-right__text">
              <p class="card__subtitle">Чехол Cardinar Skyline</p>
              <p class="banners__button">Shop Now</p>
            </div>
            <div class="banners__right-bottom-right__gradient"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    bigImg: require("@/assets/img/banners/1.png"),
    longImg: require("@/assets/img/banners/2.png"),
    img1: require("@/assets/img/banners/3.png"),
    img2: require("@/assets/img/banners/4.png"),
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
  methods: {
    ...mapActions("products", ["getProducts", "getInfoProduct", "applyFilter"]),
    filterSkyline() {
      const filterOptions = {
        title: "Skyline",
      };
      console.log(filterOptions);
      this.$router.push({
        name: "title",
        params: { name: filterOptions.title },
      });
      this.applyFilter(filterOptions);
    },
    filterPoliks() {
      const filterOptions = {
        category: [2],
      };
      console.log(filterOptions);
      this.$router.push({
        name: "category",
        params: { id: 2 },
      });
      this.applyFilter(filterOptions);
    },

    async getAlfa() {
      this.$router.push({ name: "product", params: { id: 5 } });
      this.$router.go();
      if (!5) {
        return;
      }

      await this.$store.dispatch("products/getInfoProduct", 18);
    },
    async getRedSkyline() {
      this.$router.push({ name: "product", params: { id: 13 } });
      this.$router.go();
      if (!13) {
        return;
      }

      await this.$store.dispatch("products/getInfoProduct", 13);
    },
  },
};
</script>

<style></style>