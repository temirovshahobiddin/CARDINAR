<template>
  <div class="home">
    <Header></Header>
    <Banners></Banners>
    <Popular></Popular>
    <Premium></Premium>
    <New></New>
    <Popular></Popular>
    <Sale></Sale>
    <Help></Help>
  </div>
</template>

<script>



import Header from "@/components/Header.vue";
import Banners from "@/components/Banners.vue";
import Popular from "@/components/Popular.vue";
import Premium from "@/components/Premium.vue";
import New from "@/components/New.vue";
import Help from "@/components/Help.vue";
import Sale from "@/components/Sale.vue";
export default {
  components: {
    Header,
    Banners,
    Popular,
    Premium,
    New,
    Help,
    Sale,
  },
};
</script>

<style></style>