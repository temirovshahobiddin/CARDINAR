<template>
  <section class="help-form">
    <div class="container">
      <div class="help-form__wrapper">
        <div class="help-form__left">
          <h3 class="help-left__title">НУЖНА ПОМОЩЬ С ВЫБОРОМ?</h3>
          <p class="help-left__txt">
            Оставьте свои контакты и наш специалист проконсультирует вас
          </p>
          <div class="help-left__icon">
            <i class="far fa-arrow-right"></i>
          </div>
        </div>
        <div class="help-form__right">
          <form
            action=""
            class="help-right__form"
            @submit.prevent="submitHandler()"
          >
            <div class="input-wrapper input-group">
              <input
                type="text"
                id="help-form__name"
                class="input"
                placeholder=" "
                autocomplete="off"
                v-model="name"
              />

              <label for="help-form__name" class="input-label">Имя</label>
            </div>
            <div class="input-wrapper input-group">
              <input
                type="text"
                id="help-form__numb-phone"
                class="input"
                placeholder=" "
                autocomplete="off"
                v-model="phoneNumber"
              />

              <label for="help-form__numb-phone" class="input-label"
                >Номер телефона</label
              >
            </div>
            <div class="input-wrapper input-group">
              <input
                type="text"
                id="help-form__user-name"
                class="input"
                placeholder=" "
                autocomplete="off"
                v-model="username"
              />

              <label for="help-form__user-name" class="input-label"
                >Username</label
              >
            </div>

            <button class="help-right__btn">
              <p class="help-btn__inner">отправить</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { mapActions, mapGetters } from "vuex";
import { log } from "three";
export default {
  data: () => ({
    name: "",
    phoneNumber: "",
    username: "",
  }),
  computed: {
    ...mapGetters("inquiry", ["inquiry"]),
  },
  methods: {
    ...mapActions("inquiry", ["addInquiry"]),
    submitHandler() {
      const formData = {
        full_name: this.name,
        phone_number: this.phoneNumber,
        email: this.username,
        is_call: true
      };
      const jsonFormData = JSON.stringify(formData);

      axios
        .post("/inquiries/inquiry/", jsonFormData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // Handle the response if needed
          // Reset form fields after successful form submission
          this.name = "";
          this.phoneNumber = "";
          this.email = "";

          Swal.fire({
            icon: "success",
            title: "Отправлено!",
            text: "Ваша Заявка успешно отправлено!",
            showConfirmButton: false,
            timer: 1500, // Display for 1.5 seconds
          });
        })
        .catch((error) => {
          // Handle error if needed
  
          Swal.fire({
            icon: "error",
            title: error.response.data.phone_number[0],
            showConfirmButton: false,
            timer: 3000, // Display for 3 seconds
          });
        });
    },
  },
};
</script>

<style></style>