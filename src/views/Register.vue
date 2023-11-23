<template>
  <section class="login">
    <div class="login-wrapper">
      <form action="" class="login-form" @submit.prevent="submitRegister">
        <h3 class="login-title">{{ $t("registration") }}</h3>
        <div class="input-wrapper input-group login-input">
          <input
            type="text"
            id="help-form__name"
            class="input"
            required
            placeholder=" "
            autocomplete="off"
            v-model="registerUsername"
          />

          <label for="help-form__name" class="input-label login-label">{{
            $t("username")
          }}</label>
        </div>
        <div class="input-wrapper input-group login-input">
          <input
            type="text"
            id="help-form__numb-phone"
            class="input"
            required
            placeholder=" "
            autocomplete="off"
            v-model="registerNumber"
          />

          <label for="help-form__numb-phone" class="input-label login-label">{{
            $t("phone_number")
          }}</label>
        </div>
        <div class="input-wrapper input-group login-input">
          <input
            type="email"
            id="help-form__numb-phone"
            class="input"
            required
            placeholder=" "
            autocomplete="off"
            v-model="registerEmail"
          />

          <label for="help-form__numb-phone" class="input-label login-label"
            >E-mail</label
          >
        </div>
        <div class="input-wrapper input-group login-input">
          <input
            type="password"
            id="help-form__numb-phone"
            class="input"
            required
            placeholder=" "
            autocomplete="off"
            v-model="registerPassword1"
          />

          <label for="help-form__numb-phone" class="input-label login-label">{{
            $t("password")
          }}</label>
        </div>
        <div class="input-wrapper input-group login-input">
          <input
            type="password"
            id="help-form__numb-phone"
            class="input"
            required
            placeholder=" "
            autocomplete="off"
            v-model="registerPassword2"
          />

          <label for="help-form__numb-phone" class="input-label login-label"
            >{{$t("password1")}}</label
          >
        </div>
        <button type="submit" class="login-submit login-btn">
          {{$t("registration")}}
        </button>
        <router-link to="/login" class="login-register login-btn"
          >{{$t("avtorizatsiya")}}</router-link
        >
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
    registerUsername: "",
    registerNumber: "",
    registerEmail: "",
    registerPassword1: "",
    registerPassword2: "",
  }),
  computed: {
    ...mapGetters("auth", ["loginError"]),
  },
  methods: {
    submitRegister(e) {
      const formData = {
        username: this.registerUsername,
        first_name: this.registerUsername,
        last_name: this.registerUsername,
        phone_number: this.registerNumber,
        email: this.registerEmail,
        password1: this.registerPassword1,
        password2: this.registerPassword2,
      };
      const device_id = localStorage.getItem("device_id");
      axios
        .post(`/users/register/?device_id=${device_id}`, formData)
        .then((response) => {
          axios
            .post("/token/", {
              username: this.registerUsername,
              password: this.registerPassword1,
            })
            .then((loginResponse) => {
              console.log(loginResponse);
              const token = loginResponse.data.access;
              this.$store.commit("setToken", token);
              axios.defaults.headers.common["Authorization"] =
                "Bearer " + token;
              localStorage.setItem("token", token);
              if (this.$route.path !== "/user") {
                this.$router.push("/user");
                /*          window.location.reload(); */
              }
            })
            .catch((error) => {
              console.log("Error fetching token after registration:", error);
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