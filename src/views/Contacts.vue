<template>
  <div class="contacts">
    <div class="container">
      <div class="contacts-wrapper">
        <div class="contacts-left">
          <h3 class="contacts-left__title">{{ $t("contacts") }}</h3>
          <p class="contacts-left__txt">
            {{ $t("contactsText") }}
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
            <label for="" class="contacts-label">{{
              $t("contactsName")
            }}</label>
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
                :placeholder="$t('username')"
                autocomplete="off"
                v-model="userName"
              />
            </div>
            <label for="" class="contacts-label">{{
              $t("contactsPhoneNumber")
            }}</label>
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
                :placeholder="$t('phone_number')"
                autocomplete="off"
                v-model="phoneNumber"
              />
            </div>
            <label for="" class="contacts-label"
              >{{ $t("contactsEmail") }}
            </label>
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
            <label for="" class="contacts-label">{{ $t("comments") }} </label>
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
            <button class="contacts-btn" type="submit">
              {{ $t("submit") }}
            </button>
          </form>
        </div>
        <div class="contacts-right">
          <div class="contacts-block">
            <img :src="require('@/assets/img/contacts/address.svg')" alt="" />
            <div class="contacts-block__inner">
              <h3 class="contacts-block__title">{{ $t("contactsAddress") }}</h3>
              <a href="#" class="contacts-block__link"
                >р-он Миробатский, ул. Ойбек 24, дом 5</a
              >
            </div>
          </div>
          <div class="contacts-block">
            <img :src="require('@/assets/img/contacts/phone.svg')" alt="" />
            <div class="contacts-block__inner">
              <h3 class="contacts-block__title">{{ $t("contactsPhone") }}</h3>
              <a
                v-for="tel in phone"
                :key="tel.id"
                :href="`tel:${tel.phone_number}`"
                class="contacts-block__link"
                >{{ prettify(tel.phone_number) }}</a
              >
            </div>
          </div>
          <div class="contacts-block">
            <img :src="require('@/assets/img/contacts/time.svg')" alt="" />
            <div class="contacts-block__inner">
              <h3 class="contacts-block__title">{{ $t("contactsTime") }}</h3>
              <a href="#" class="contacts-block__link"
                >{{ $t("contactsWorkTime") }}
              </a>
            </div>
          </div>
          <div class="contacts-block">
            <img :src="require('@/assets/img/contacts/mail.svg')" alt="" />
            <div class="contacts-block__inner">
              <h3 class="contacts-block__title">E-mail:</h3>
              <a
                href="mailto:cardinarinfo@gmail.com"
                class="contacts-block__link"
                v-for="link in email"
                :key="link.id"
                >{{ link.email }}</a
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
import { prettify } from "@/use/prettify";
export default {
  data: () => ({
    prettify,
    links: [
      { link: "/", name: "Главная   >" },
      { link: "/", name: "Магазин" },
    ],
    userName: "",
    phoneNumber: "",
    userEmail: "",
    userComments: "",
  }),
  computed: {
    ...mapGetters("inquiry", ["inquiry"]),
    ...mapGetters("phone", ["phone"]),
    ...mapGetters("social", ["social"]),
    ...mapGetters("email", ["email"]),
    ...mapGetters("addresses", ["addresses"]),
  },
  methods: {
    ...mapActions("inquiry", ["addInquiry"]),
    ...mapActions("phone", ["getPhone"]),
    ...mapActions("social", ["getSocial"]),
    ...mapActions("email", ["getEmail"]),
    ...mapActions("addresses", ["getAddresses"]),
    submitHandler() {
      const formData = {
        full_name: this.userName,
        phone_number: this.phoneNumber,
        email: this.userEmail,
        comment: this.userComments,
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
          this.userComments = "";

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
  async mounted() {
    await this.getEmail();
    await this.getPhone();
    await this.getSocial();
    await this.getAddresses();
  },
};
</script>

<style>
</style>