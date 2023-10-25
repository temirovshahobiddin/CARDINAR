<template>
  <div class="contacts">
    <div class="container">
      <div class="contacts-wrapper">
        <div class="contacts-left">
          <h3 class="contacts-left__title">Контакты</h3>
          <p class="contacts-left__txt">
            Отправтье свои контакты и наш специалист свяжется с вами
            и проконсультирует по всем вопросам
          </p>

          <form
            class="constructor-modal"
            @submit.prevent="submitHandler()"
            style="
              display: flex;
              align-self: center;
              flex-direction: column;
              align-items: start;
              justify-content: center;
              width: 100%;
            "
          >
            <label for="" class="contacts-label">Ваше имя*</label>
            <div
              class="input-wrapper input-group"
              style="
                border: 2px solid #dfdfe6;
                max-width: 432px;
                width: 100%;
                margin-bottom: 25px;
                border-radius: 4px;
                padding: 8px;
              "
            >
              <input
                required
                type="text"
                style="color: #1e1e1e; padding: 16px"
                id="help-form__name"
                class="input"
                placeholder="Имя"
                autocomplete="off"
                v-model="userName"
              />
            </div>
            <label for="" class="contacts-label">Ваш номер телефона*</label>
            <div
              class="input-wrapper input-group"
              style="
                border: 2px solid #dfdfe6;
                max-width: 432px;
                width: 100%;
                margin-bottom: 25px;
                border-radius: 4px;
                padding: 8px;
              "
            >
              <input
                required
                type="tel"
                style="color: #1e1e1e; padding: 16px"
                id="help-form__numb-phone"
                class="input"
                placeholder="Номер телефона"
                autocomplete="off"
                v-model="phoneNumber"
              />
            </div>
            <label for="" class="contacts-label">Ваш Email </label>
            <div
              class="input-wrapper input-group"
              style="
                border: 2px solid #dfdfe6;
                max-width: 432px;
                width: 100%;
                margin-bottom: 25px;
                border-radius: 4px;
                padding: 8px;
              "
            >
              <input
                type="text"
                style="color: #1e1e1e; padding: 16px"
                id="help-form__user-name"
                class="input"
                placeholder="Username"
                autocomplete="off"
                v-model="userEmail"
              />
            </div>
            <label for="" class="contacts-label">Коментарии </label>
            <div class="contacts-textarea">
              <textarea
                name=""
                id=""
                cols="200"
                rows="20"
                class="textarea"
                v-model="comments"
              ></textarea>
            </div>
            <button class="contacts-btn" type="submit">отправить</button>
          </form>
        </div>
        <div class="contacts-right">
          <div class="contacts-block">
            <img :src="require('@/assets/img/contacts/address.svg')" alt="" />
            <div class="contacts-block__inner">
              <h3 class="contacts-block__title">Адрес:</h3>
              <a href="#" class="contacts-block__link"
                >р-он Миробатский, ул. Ойбек 24, дом 5</a
              >
            </div>
          </div>
          <div class="contacts-block">
            <img :src="require('@/assets/img/contacts/phone.svg')" alt="" />
            <div class="contacts-block__inner">
              <h3 class="contacts-block__title">Телефон:</h3>
              <a href="#" class="contacts-block__link">(90) 920 20 20</a>
            </div>
          </div>
          <div class="contacts-block">
            <img :src="require('@/assets/img/contacts/time.svg')" alt="" />
            <div class="contacts-block__inner">
              <h3 class="contacts-block__title">Время работы:</h3>
              <a href="#" class="contacts-block__link">Пн - Вс 9:00 - 19:00 </a>
            </div>
          </div>
          <div class="contacts-block">
            <img :src="require('@/assets/img/contacts/mail.svg')" alt="" />
            <div class="contacts-block__inner">
              <h3 class="contacts-block__title">E-mail:</h3>
              <a href="#" class="contacts-block__link"
                >cardinarinfo@gmail.com</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data: () => ({
    links: [
      { link: "/", name: "Главная   >" },
      { link: "/", name: "Магазин" },
    ],
    userName: "",
    phoneNumber: "",
    userEmail: "",
    userComments: ""
  }),
  computed: {
    ...mapGetters("inquiry", ["inquiry"]),
  },
  methods: {
    ...mapActions("inquiry", ["addInquiry"]),
    submitHandler() {
      const formData = {
        full_name: this.userName,
        phone_number: this.phoneNumber,
        email: this.userEmail,
        comment: this.userComments
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
          this.userEmail = "";
          this.userComments = ""

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

<style>
</style>