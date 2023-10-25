<template>
  <div class="app">
    <Navbar :basketOpen="basketOpen" @toggle-basket="toggleBasket"></Navbar>
    <Basket :class="{ open_aside: basketOpen }" @toggle-basket="toggleBasket" />
    <div class="app-page">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "@/components/TheNavbar.vue";
import Footer from "@/components/Footer.vue";
import Basket from "@/components/Basket.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Navbar,
    Footer,
    Basket,
  },
  data() {
    return {
      basketOpen: false,
      displayModal: false,
    };
  },
  computed: {
    ...mapGetters("device", ["getDeviceId"]),
    ...mapGetters("user", ["user", "isLoading"]),
    ...mapGetters("device", ["getDeviceId", "csrf"]),
    someMethod() {
      this.generateDeviceId();
      const device_id = this.getDeviceId;
    },
  },
  methods: {
    ...mapActions("device", ["generateDeviceId"]),
    ...mapActions("user", ["getUser"]),
    ...mapActions("device", ["generateDeviceId", "getCsrf"]),
    toggleBasket() {
      this.basketOpen = !this.basketOpen;
      const body = document.body;
      body.classList.toggle("body-lock");
    },
  },
  mounted() {
    this.generateDeviceId();
    this.getUser();
    this.getCsrf();
  },  
};
</script>

<style lang="scss">
.app {
  position: relative;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.scroll-text {
  white-space: nowrap;
  overflow: hidden;
  animation: marquee 10s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
.marquee {
  background: yellow;
  padding: 10px 0;
  font-size: 18px;
}
.body-lock {
  overflow: hidden;
}
</style>
