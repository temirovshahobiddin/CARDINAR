<template>
  <div class="logout container">
    
    <section class="personalArea__exit container">
      <img :src="exitImg" alt="" />
      <p>Вы вышли из Личного Кабинета.</p>
      <p>Ваша корзина покупок была сохранена</p>
      <a @click="logout()" class="personalArea__exit-btn">ПРОДОЛЖИТЬ</a>
    </section>
  </div>
</template>

<script>
export default {
  data: () => ({
    exitImg: require("@/assets/img/exit-icon.svg"),
    links: [
      { link: "#!", name: "Главная   >", color: "#000" },
      { link: "#!", name: "Личный кабинет   >", color: "#000" },
      { link: "#!", name: "Выход", color: "#0156FF" },
    ],
  }),
  methods: {
    logout() {
      this.$router.push("/");
      window.location.reload();
    },
  },
};
</script>

<style>
</style>