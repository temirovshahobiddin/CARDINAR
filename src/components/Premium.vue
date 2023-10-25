<template>
  <div ref="swiper" class="swiper container">
    <div class="switch_arrows">
      <p class="switch-arrows__txt">Премиум сегмент на сайте</p>
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
    <div class="swiper-wrapper body_carousel">
      <div class="swiper-slide" v-for="(card, index) in cards" :key="index">
        <div
          @mouseover="returnCode(card.code)"
          class="card"
          :id="'parallax-' + index"
        >
          <div class="foto_seat parallax">
            <div class="parallax__layer">
              <img
                v-for="(item, idx) in card.images"
                :key="item"
                :id="'img-' + idx + card.code"
                :src="item"
                alt=""
              />
            </div>
          </div>
          <img :src="symbol" alt="" class="card_symbol" />

          <div class="card_body card-wrapper">
            <div class="card_link">
              <p>Подробнее....</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
    <!--  <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div> -->
    <div class="swiper-scrollbar"></div>
  </div>
</template>

<script>
import Swiper, { Navigation, Pagination, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

export default {
  data: () => ({
    activeCode: "1",
    cards: [
      {
        status: "Premium",
        title: "Чехлы Cardinar Skyline",
        code: 1,
        images: [
          require("@/assets/img/premium/1.png"),
          require("@/assets/img/premium/2.png"),
          require("@/assets/img/premium/3.png"),
          require("@/assets/img/premium/4.png"),
          require("@/assets/img/premium/5.png"),
          require("@/assets/img/premium/6.png"),
          require("@/assets/img/premium/7.png"),
          require("@/assets/img/premium/8.png"),
          require("@/assets/img/premium/9.png"),
          require("@/assets/img/premium/10.png"),
          require("@/assets/img/premium/11.png"),
          require("@/assets/img/premium/12.png"),
          require("@/assets/img/premium/13.png"),
          require("@/assets/img/premium/14.png"),
          require("@/assets/img/premium/15.png"),
          require("@/assets/img/premium/16.png"),
          require("@/assets/img/premium/17.png"),
          require("@/assets/img/premium/18.png"),
        ],
      },
      {
        status: "1",
        title: "Чехлы Cardinar Skyline",
        code: 2,
        images: [
          require("@/assets/img/premium/1.jpg.png"),
          require("@/assets/img/premium/2.jpg.png"),
          require("@/assets/img/premium/3.jpg.png"),
          require("@/assets/img/premium/4.jpg.png"),
          require("@/assets/img/premium/5.jpg.png"),
          require("@/assets/img/premium/6.jpg.png"),
          require("@/assets/img/premium/7.jpg.png"),
          require("@/assets/img/premium/8.jpg.png"),
          require("@/assets/img/premium/9.jpg.png"),
          require("@/assets/img/premium/10.jpg.png"),
          require("@/assets/img/premium/11.jpg.png"),
          require("@/assets/img/premium/12.jpg.png"),
          require("@/assets/img/premium/13.jpg.png"),
          require("@/assets/img/premium/14.jpg.png"),
          require("@/assets/img/premium/15.jpg.png"),
          require("@/assets/img/premium/16.jpg.png"),
          require("@/assets/img/premium/17.jpg.png"),
          require("@/assets/img/premium/18.jpg.png"),
        ],
      },

      {
        status: "Premium",
        title: "Чехлы Cardinar Skyline",
        code: 3,
        images: [
          require("@/assets/img/premium/1.png"),
          require("@/assets/img/premium/2.png"),
          require("@/assets/img/premium/3.png"),
          require("@/assets/img/premium/4.png"),
          require("@/assets/img/premium/5.png"),
          require("@/assets/img/premium/6.png"),
          require("@/assets/img/premium/7.png"),
          require("@/assets/img/premium/8.png"),
          require("@/assets/img/premium/9.png"),
          require("@/assets/img/premium/10.png"),
          require("@/assets/img/premium/11.png"),
          require("@/assets/img/premium/12.png"),
          require("@/assets/img/premium/13.png"),
          require("@/assets/img/premium/14.png"),
          require("@/assets/img/premium/15.png"),
          require("@/assets/img/premium/16.png"),
          require("@/assets/img/premium/17.png"),
          require("@/assets/img/premium/18.png"),
        ],
      },
    ],
    /*     hoveredCardIndex: 3, */
    symbol: require("@/assets/img/premium/symbol.svg"),
  }),
  mounted() {
    new Swiper(this.$refs.swiper, {
      modules: [Navigation, Pagination, Keyboard],
      loop: false,
      spaceBetween: 50,
      keyboard: {
        enabled: true,
      },
      breakpoints: {
        2200: {
          slidesPerView: 2.2,
          sliderPerGroup: 2,
        },
        1920: {
          slidesPerView: 2.2,
          sliderPerGroup: 2,
        },
        1500: {
          slidesPerView: 2,
          sliderPerGroup: 2,
        },
        700: {
          slidesPerView: 1,
          sliderPerGroup: 1,
        },
      },
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        //   clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      /*    scrollbar: {
        el: ".swiper-scrollbar",
      }, */
    });

    this.$nextTick(() => {
      for (let i = 0; i < this.cards.length; i++) {
        const wrapper = document.getElementById(`parallax-${i}`);
        wrapper.addEventListener("mousemove", (evt) =>
          this.handleParallax(evt, i)
        );
      }

      this.cards.forEach((card) => {});
    });
  },

  /*  */

  methods: {
    returnCode(code) {
      this.activeCode = code;
    },
    onWindowResize() {
      if (this.swiper) {
        this.swiper.destroy();
        this.initSwiper();
      }
    },
    handleParallax(evt, index) {
      const wrapper = document.getElementById(`parallax-${index}`);

      // Tekshirish maqsadi bilan qo'shildi
      const images = wrapper.querySelectorAll(".parallax__layer > img");

      const parallaxLeftOffset = wrapper.getBoundingClientRect().left;
      const parallaxTopOffset = wrapper.getBoundingClientRect().top;

      const coordX = evt.clientX - parallaxLeftOffset;
      const coordY = evt.clientY - parallaxTopOffset;

      const x = coordX.toFixed(5);
      const y = coordY.toFixed(5);

      images.forEach((img, idx) => {
        console.log(this.activeCode);
        const targetId = `img-${Math.abs(idx - 17)}` + this.activeCode;

        const target = document.getElementById(targetId);

        if (idx < 17) {
          if (x > idx * 37) {
            target.style.opacity = 1 - ((x - idx * 37) * 4) / 100;
          } else {
            target.style.opacity = 1 - ((x - idx * 37) * 0.1) / 100;
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
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

.swiper-button-prev::after,
.swiper-button-next::after {
  display: none;
}
</style>
