<template>
  <div class="products">
    <Spinner v-if="isLoading" />
    <div class="products-wrapper" v-else>
      <div v-if="!products || products.length === 0">
        <p>На данный момент нет таких товаров</p>
      </div>
      <div class="product-block" v-for="card in products" :key="card.id">
        <div
          class="product-header__second-carousel"
          @click="getProductDetails(card.id)"
        >
          <img
            :src="card.photo"
            alt=""
            :class="{
              'max-width-230': card.category.id === 3,
              'big-img-resize':
                card.title === 'Cardinar Scorpion - Чёрные' ||
                card.title === 'Cardinar Rich',
            }"
          />

          <router-link
            to="/constructor"
            class="product-title__second-carousel"
            :class="{
              'skyline-product': card.title.toLowerCase().includes('skyline'),
            }"
          >
            <img :src="customiezer" alt="" />
            <a :href="card.link">customiezer</a>
          </router-link>
        </div>

        <div class="product-second-carousel">
          <div class="product-copy__second-carousel">
            <p class="product-name__second-carousel">{{ card.title }}</p>
            <p class="product-price__second-carousel">
              {{ prettifySum(card.price) }} сум
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { log } from "three";
import { prettifySum } from "@/use/prettify";
import { mapActions, mapGetters } from "vuex";
import Spinner from "@/components/Spinner.vue";

/* import Cropper from "cropperjs"; */
export default {
  components: { Spinner },
  data: () => ({
    customiezer: require("@/assets/img/popular/Vector.svg"),
    cart: require("@/assets/img/popular/cart.svg"),
    prettifySum,
  }),
  computed: {
    ...mapGetters("products", [
      "products",
      "infoProduct",
      "filteredProducts",
      "isLoading",
    ]),
  },
  methods: {
    ...mapActions("products", ["getProducts", "getInfoProduct", "applyFilter"]),

    async getProductDetails(productId) {
      this.$router.push({ name: "product", params: { id: productId } });
      this.$router.go();
      if (!productId) {
        return;
      }

      await this.$store.dispatch("products/getInfoProduct", productId);
    },
  },
  mounted() {
    this.applyFilter();
  /*   this.getProducts(); */
  },
};
</script>

<style lang="scss" scoped>
.big-img-resize {
  max-width: 210px !important;
}
.big-Nova-resize {
  max-width: 240px !important;
}
.big-Razer-resize {
  max-width: 250px !important;
}
.padding-img-resize {
  padding-top: 50px;
}
.max-width-230 {
  max-width: 280px !important;
  width: 100%;
  margin-top: 20px !important;
}
.skyline-product {
  display: flex !important;
}
</style>