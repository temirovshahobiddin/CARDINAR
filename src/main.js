import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'

import '@/assets/css/all.min.css'
import "./interceptors/axios";
import '@/assets/scss/main.scss'
import i18n from "./i18n";
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'; // Choose the desired theme
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import AOS from 'aos'
import 'aos/dist/aos.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,

  render: h => h(App),
  mounted() {
    AOS.init()
  },
}).$mount('#app')