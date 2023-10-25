<template>
  <section class="login">
    <div class="login-wrapper">
      <form action="" class="login-form" @submit.prevent="submitLogin">
        <h3 class="login-title">Вход / Авторизация</h3>
        <div class="input-wrapper input-group login-input">
          <input
            type="text"
            id="help-form__name"
            class="input"
            required
            placeholder=" "
            autocomplete="off"
            v-model="username"
          />

          <label for="help-form__name" class="input-label login-label"
            >Имя</label
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
            v-model="password"
          />

          <label for="help-form__numb-phone" class="input-label login-label"
            >Пароль</label
          >
        </div>
        <button href="#!" type="submit" class="login-submit login-btn">
          войти
        </button>
        <router-link to="/register" class="login-register login-btn"
          >регистрация</router-link
        >
        <a @click="emailAdd()" class="forgot__password">Забыли пароль?</a>
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
    username: "",
    password: "",
    links: [
      { link: "#!", name: "Главная   >", right: ">" },
      { link: "#!", name: "Авторизация", right: ">" },
    ],
  }),
  computed: {
    ...mapGetters("auth", ["loginError"]),
    async submitLogin(e) {
      const formData = { username: this.username, password: this.password };
      const device_id = localStorage.getItem("device_id");
      axios.post(`/users/login/?device_id=${device_id}`, formData);
      axios
        .post(`/token/?device_id=${device_id}`, formData)
        .then((response) => {
          console.log(response);
          const token = response.data.access;
          const refresh = response.data.refresh;
          this.$store.commit("setToken", token, refresh);
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          localStorage.setItem("token", token);
          localStorage.setItem("refresh", refresh);
          if (this.$route.path !== "/user") {
            this.$router.push("/user");
            window.location.reload();
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Что-то пошло не так!",
            text: `Вы ввели неправильный пароль или логин!`,
            showConfirmButton: false,
            timer: 5000, // Display for 1.5 seconds
          });
          this.username = "";
          this.password = "";
        });
    },
  },
  methods: {
    async emailAdd() {
      const { value: email } = await Swal.fire({
        // Use Swal.fire
        title: "Сброс пароля",
        input: "email",
        inputLabel: "Чтобы сбросить пароль вам необходимо ввести свою почту ",
        inputPlaceholder: "введите email",
        confirmButtonText: "отправить",
      });

      if (email) {
        try {
          const response = await axios.post(
            "/users/reset_password/send_link/",
            { email }
          );

          if (response.status === 200) {
            Swal.fire({
              // Use Swal.fire
              icon: "success",
              title: "Успешно отправлено",
              text: "На указанный адрес было отправлено электронное письмо.",
            });
          } else {
            Swal.fire({
              // Use Swal.fire
              icon: "error",
              title: "Error",
              text: "Failed to send the email. Please try again later.",
            });
          }
        } catch (error) {
          Swal.fire({
            // Use Swal.fire
            icon: "error",
            title: "Error",
            text: "An error occurred. Please try again later.",
          });
        }
      }
    },
  },
};
</script>

<style>
</style>