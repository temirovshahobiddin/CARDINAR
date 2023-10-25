<template>
  <section class="new">
    <div class="container">
      <div class="new-wrapper" @click="filterTarpedok()">
        <img :src="img" alt="" class="new-img" />
        <div class="new-content">
          <h3 class="new-content__action">NEW</h3>
          <h3 class="new-content__title">Накидка на торпеду</h3>

          <a href="#!" class="new-content__link">Shop Now</a>
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
    img: require("@/assets/img/new/new.jpg"),
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
    filterTarpedok() {
      const filterOptions = {
        category: [3],
      };
      console.log(filterOptions);
      this.$router.push({
        name: "category",
        params: { id: 3 },
      });
      this.applyFilter(filterOptions);
    },
  },
};
</script>

<style></style> 