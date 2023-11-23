<template>
  <header class="header">
    <img :src="hero" alt="" class="hero-img" />
    <div class="container">
      <div class="header-wrapper">
        <div class="header-left">
          <p class="header-title">CARDINAR</p>
          <p class="header-subtitle">{{ $t("cardinarDescription") }} <br /></p>
          <p class="header-copy">{{ $t("forAllGMCars") }}</p>
          <router-link to="shop" class="header-btn">
            <div class="header-btn__text">
              <p>{{ $t("store") }}</p>
              <div class="header-icon">
                <i class="far fa-long-arrow-right arrow-right"></i>
              </div>
            </div>
          </router-link>
        </div>
        <div class="header-wrapper__rigth">
          <router-link to="shop" class="header-btn">
            <div class="header-btn__text">
              <p>{{ $t("toStore") }}</p>
              <div class="header-icon">
                <i class="far fa-long-arrow-right arrow-right"></i>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data: () => ({
    hero: require("@/assets/img/header/hero.png"),
  }),
};
</script>

<style></style>