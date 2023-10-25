<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-wrapper">
        <div class="footer-brand">
          <img :src="logo" alt="" />
        </div>
        <div class="footer-inner">
          <div class="footer-inner__about">
            <div class="footer-info footer-about__card">
              <h3 class="footer-info__title footer-about__title">Информация</h3>
              <ul class="footer-list">
                <li class="footer-item footer__link-animation">
                  <router-link to="/shop" class="footer-link">Каталог</router-link>
                </li>
                <li class="footer-item footer__link-animation">
                  <router-link to="/constructor" class="footer-link">Конструктор</router-link>
                </li>
                <li class="footer-item footer__link-animation">
                  <router-link to="/stores" class="footer-link">Где купить?</router-link>
                </li>
              </ul>
            </div>
            <div class="footer-contacts footer-about__card">
              <h3 class="footer-contacts__title footer-about__title">
                Номер телефона
              </h3>
              <ul class="footer-list">
                <li class="footer-item" v-for="tel in phone" :key="tel.id">
                  <a :href="`tel:${tel.phone_number}`" class="footer-link">{{
                    prettify(tel.phone_number)
                  }}</a>
                </li>
              </ul>
            </div>
            <div class="footer__new-line"></div>
            <div class="footer-email footer-about__card">
              <h3 class="footer-email__title footer-about__title">Почта</h3>
              <ul class="footer-list">
                <li class="footer-item">
                  <a
                    href="mailto:cardinarinfo@gmail.com"
                    class="footer-link"
                    v-for="link in email"
                    :key="link.id"
                    >{{ link.email }}</a
                  >
                </li>
              </ul>
            </div>
            <div class="footer-address footer-about__card">
              <h3 class="footer-address__title footer-about__title">
                Адрес (офис)
              </h3>
              <ul class="footer-list">
                <li class="footer-item">
                  <a
                    v-for="(location, index) in addresses"
                    :key="index"
                    @click="logMethod"
                    href="https://www.google.com/maps/place/5,+24+Oybek+ko'chasi,+Tashkent,+%D0%A3%D0%B7%D0%B1%D0%B5%D0%BA%D0%B8%D1%81%D1%82%D0%B0%D0%BD/@41.2946013,69.2743053,17z/data=!3m1!4b1!4m5!3m4!1s0x38ae8acf9c3e8253:0xdda30d146557d0b9!8m2!3d41.2945973!4d69.2768802?entry=ttu"
                    class="footer-link"
                    target="_blank"
                  >
                    {{ location.region }}
                    {{ location.district }} {{ location.street }}
                    <!-- {{ location.house_no }} --></a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="footer-inner__socials">
            <a
              v-for="(link, index) in combinedLinks"
              :href="link.site"
              :key="index"
              class="footer-socials__link"
              ><i :class="link.img"></i
            ></a>
          </div>
        </div>
      </div>
    </div>
    <div class="cm-mark-container">
      <a class="cm-mark" href="https://centrismedia.uz/" target="_blanck"
        >СДЕЛАНО В <img class="cm-mark-img" :src="cmMark" alt=""
      /></a>
    </div>
  </footer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { prettify } from "@/use/prettify";

export default {
  data: () => ({
    cmMark: require("@/assets/img/cm-mark.svg"),
    logo: require("@/assets/img/nav/logo.svg"),
    prettify,
    socialsImg: [
      {
        img: "fab fa-telegram-plane",
        class: "footer__social-tg",
        verifyLink: "Telegram",
      },
      {
        img: "fab fa-facebook-f",
        class: "footer__social-fb",
        verifyLink: "facebook",
      },
      {
        img: "fab fa-instagram",
        class: "footer__social-inst",
        verifyLink: "Instagram",
      },
    ],
  }),
  computed: {
    ...mapGetters("phone", ["phone"]),
    ...mapGetters("social", ["social"]),
    ...mapGetters("email", ["email"]),
    ...mapGetters("addresses", ["addresses"]),

    combinedLinks() {
      const combined = [];

      for (let i = 0; i < this.social.length; i++) {
        const socialMedia = this.social[i].social_media;
        const matchingSocialImg = this.socialsImg.find(
          (imgObj) => imgObj.verifyLink === socialMedia
        );

        if (matchingSocialImg) {
          combined.push({
            link: this.social[i][socialMedia],
            site: this.social[i].link, // Assuming that the social object has properties like 'tg', 'fb', and 'ig'.
            img: matchingSocialImg.img,
            class: matchingSocialImg.class,
          });
        }
      }

      return combined;
    },
  },
  methods: {
    ...mapActions("phone", ["getPhone"]),
    ...mapActions("social", ["getSocial"]),
    ...mapActions("email", ["getEmail"]),
    ...mapActions("addresses", ["getAddresses"]),
    logMethod() {},
    handleCall(phone) {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        // If it's a mobile device, try to initiate the call
        window.location.href = `tel:+998${phone}`;
      } else {
        // If it's not a mobile device, show a message or provide alternative contact options
        alert(`To call, please dial: +998${phone}`);
        // Or provide an alternative contact option like an email address or a contact form
      }
    },
  },
  async mounted() {
    await this.getEmail();
    await this.getPhone();
    await this.getSocial();
    await this.getAddresses();
  },
};
</script>

<style></style>