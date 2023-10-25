<template>
  <section class="login">
    <div class="login-wrapper">
      <form action="" class="login-form" @submit.prevent="submitResetPassword">
        <h3 class="login-title">Сброс пароля</h3>
        <div class="input-wrapper input-group login-input">
          <input
            type="text"
            id="help-form__name"
            class="input"
            required
            placeholder=" "
            autocomplete="off"
            v-model="resetPassword1"
          />

          <label for="help-form__name" class="input-label login-label"
            >пароль</label
          >
        </div>
        <div class="input-wrapper input-group login-input">
          <input
            type="text"
            id="help-form__numb-phone"
            class="input"
            required
            placeholder=" "
            autocomplete="off"
            v-model="resetPassword2"
          />

          <label for="help-form__numb-phone" class="input-label login-label"
            >Подтверждение пароля</label
          >
        </div>

        <button type="submit" class="login-submit login-btn">
          регистрация
        </button>
      </form>
    </div>
  </section>
</template>
  
  <script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";
export default {
  data: () => ({
    links: [
      { link: "#!", name: "Главная   >", right: ">" },
      { link: "#!", name: "Регистрация", right: ">" },
    ],
    /*     username: "",
      password: "", */
    resetPassword1: "",
    resetPassword2: "",
  }),
  computed: {
    ...mapGetters("auth", ["loginError"]),
  },
  methods: {
    submitResetPassword(e) {
      const formData = {
        password1: this.resetPassword1,
        password2: this.resetPassword2,
      };
      const device_id = localStorage.getItem("device_id");
      const uidb = this.$route.params.uidb;
      const token = this.$route.params.token;

      axios
        .post(`/users/reset_password/reset/${uidb}/${token}/`, formData)
        .then((response) => {
          if (this.$route.path !== "/login") {
            this.$router.push("/login");
            /*          window.location.reload(); */
          }
          Swal.fire({
            icon: "success",
            title: "Что-то пошло не так!",
            text: error.response.data.phone_number,
            showConfirmButton: false,
            timer: 5000, // Display for 1.5 seconds
          });
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Что-то пошло не так!",
            text: error.response.data.phone_number,
            showConfirmButton: false,
            timer: 5000, // Display for 1.5 seconds
          });
        });
    },
  },
};
</script>
  
  <style>
</style>