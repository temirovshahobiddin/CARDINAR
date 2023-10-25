<template>
    <section class="main_carousel_container">
      <div class="switch_arrows container">
        <p class="switch-arrows__txt">Премиум сегмент на сайте</p>
        <div class="carousel_btn_container">
          <div class="btn_previous switch_carousel_btn_style complete_absence_on_the_page" @click="previousSlide">
            <i class="far fa-chevron-right"></i>
          </div>
          <div class="btn_next switch_carousel_btn_style" @click="nextSlide">
            <i class="far fa-chevron-right"></i>
          </div>
        </div>
      </div>
  
      <!-- Carousel -->
      <draggable v-model="cards" class="carousel_container" :options="dragOptions">
        <div class="card_container" v-for="(card, index) in cards" :key="index">
          <div class="card">
            <img class="foto_seat" :src="card.img" alt="">
            <div class="card_body">
              <div class="card_btn">PREMIUM</div>
              <p>Чехлы Cardinar Skyline</p>
              <div class="card_link">
                <p>Shop Now</p>
              </div>
            </div>
          </div>
        </div>
      </draggable>
    </section>
  </template>
    
  <script>
  import draggable from 'vuedraggable';
  
  export default {
    components: {
      draggable,
    },
    data() {
      return {
        cards: [
          {
            img: require('@/assets/img/premium/img.png'),
          },
          {
            img: require('@/assets/img/premium/img.png'),
          },
          {
            img: require('@/assets/img/premium/img.png'),
          },
          {
            img: require('@/assets/img/premium/img.png'),
          },
        ],
        dragOptions: {
          animation: 200,
          handle: '.card',
        },
      };
    },
    methods: {
      nextSlide() {
        const carouselContainer = document.querySelector('.carousel_container');
        const btnPrevious = document.querySelector('.btn_previous');
        const btnNext = document.querySelector('.btn_next');
        const cardWidth = 748;
        const maxTranslateX = -cardWidth * (this.cards.length - 1);
  
        if (carouselContainer.style.transform === '') {
          carouselContainer.style.transform = `translateX(-${cardWidth}px)`;
          btnPrevious.classList.remove('complete_absence_on_the_page');
        } else {
          let currentTranslateX = parseInt(carouselContainer.style.transform.split('(')[1].split('px')[0]);
          if (currentTranslateX > maxTranslateX) {
            carouselContainer.style.transform = `translateX(${currentTranslateX - cardWidth}px)`;
            if (currentTranslateX - cardWidth === maxTranslateX) {
              btnNext.classList.add('complete_absence_on_the_page');
            }
          }
        }
      },
      previousSlide() {
        const carouselContainer = document.querySelector('.carousel_container');
        const btnPrevious = document.querySelector('.btn_previous');
        const btnNext = document.querySelector('.btn_next');
        const cardWidth = 748;
        const minTranslateX = 0;
  
        if (carouselContainer.style.transform === '') {
          carouselContainer.style.transform = `translateX(0)`;
          btnNext.classList.remove('complete_absence_on_the_page');
        } else {
          let currentTranslateX = parseInt(carouselContainer.style.transform.split('(')[1].split('px')[0]);
          if (currentTranslateX < minTranslateX) {
            carouselContainer.style.transform = `translateX(${currentTranslateX + cardWidth}px)`;
            if (currentTranslateX + cardWidth === minTranslateX) {
              btnPrevious.classList.add('complete_absence_on_the_page');
            }
          }
        }
      },
    },
  };
  </script>
    
  <style scoped>
  /* Add your SCSS styles here */
  </style>
    