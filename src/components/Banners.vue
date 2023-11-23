<template>
  <section class="banners">
    <div class="banners-grid container">
      <div class="banner-grid__box big-box">
        <img :src="bigImg" alt="" />
        <div class="banner-box__inner"></div>
      </div>
      <div class="banner-grid__box medium-box" @click="filterPoliks()">
        <img :src="longImg" alt="" />
        <div class="banner-box__inner">
          <h3 class="banner-box__title">{{ $t("bannerEvaPolik") }}</h3>
          <a href="#!" class="banner-box__link">Shop Now</a>
        </div>
      </div>
      <div class="banner-grid__box small-box" @click="getAlfa()">
        <img :src="img1" alt="" />
        <div class="banner-box__inner">
          <h3 class="banner-box__title">{{ $t("bannerAlfa") }}</h3>
          <a href="#!" class="banner-box__link">Shop Now</a>
        </div>
      </div>
      <div class="banner-grid__box small-box1" @click="getRedSkyline()">
        <img :src="img2" alt="" />
        <div class="banner-box__inner">
          <h3 class="banner-box__title">{{ $t("bannerskyline") }}</h3>
          <a href="#!" class="banner-box__link">Shop Now</a>
        </div>
      </div>
    </div>
  </section>
</template>
.banners {
    display: flex;

    margin: 56px 0 100px 0;

    .banners-grid {
        display: grid;
        grid-template-columns: 355px 355px 355px 355px;
        grid-template-rows: 370px 370px;
        grid-template-areas: "big-box big-box medium-box medium-box"
            "big-box big-box small-box small-box1";
        gap: 30px;

        .big-box {
            grid-area: big-box;
            max-width: 750px;
            width: 100%;


        }

        .medium-box {
            grid-area: medium-box;
            max-width: 750px;
        }

        .small-box {
            grid-area: small-box;
            max-width: 355px;
        }

        .small-box1 {
            grid-area: small-box1;
            max-width: 355px;
        }

        .banner-grid__box {
            position: relative;
            transition: all .5s ease-in-out;

            img {
                position: absolute;
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
                z-index: -1;
            }

            &:hover {
                opacity: .9;
                transition: all .5s ease-in-out;
            }

            .banner-box__inner {
                width: 100%;
                height: 100%;

                display: flex;
                flex-direction: column;
                justify-content: flex-end;

                padding: 0 0 30px 30px;

                .banner-box__title{
                    color: #fff;
                }
            }
        }
    }
}





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