<template>
  <section class="info">
    <div class="info-block__container container">
      <div class="info-block__img-container">
        <div
          class="info-block__small-img"
          :class="{ 'height-scroll': infoProduct.photos.length === 5 }"
        >
          <div
            class="info-block__small-img_pos"
            v-for="img in infoProduct.photos"
            :key="img"
            @click="selectedImage = img.photo"
          >
            <img :src="img.photo" alt="" :class="{}" />
          </div>
        </div>
        <div class="info-block__big-img">
          <img
            :src="selectedImage"
            alt=""
            :class="{
              'tarpetka-class': infoProduct.category.id === 3,
              'big-Razer-resize': infoProduct.category.id === 4,
            }"
          />
          <div class="btn-scroll__shop-carousel">
            <div
              class="btn-previous__shop-carousel rotate180"
              @click="goToPreviousImage()"
            >
              <i class="far fa-chevron-right"></i>
            </div>
            <div class="btn-next__shop-carousel" @click="goToNextImage()">
              <i class="far fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="info-block__info-container">
        <p class="info-block__title">{{ infoProduct.title }}</p>
        <p class="info-block__subtitle">{{ $t("freeDelivery") }}</p>
        <div class="info-block__line"></div>

        <div class="info-block__model-container">
          <p>{{ $t("choiceCarMark") }}:</p>
          <div class="info-block__model-btn-container">
            <div
              class="info-block__model-btn"
              v-for="model in infoProduct.articuls"
              :key="model"
              :class="{ active: selectedModel === model }"
              @click="selectCarModel(model)"
            >
              {{ model.car_model.title }}
            </div>
          </div>
        </div>

        <div class="info-block__quantity">
          <div class="info-block__minus" @click="decrementQuantity()">-</div>
          <div>{{ quantity }}</div>
          <div class="info-block__plus" @click="incrementQuantity()">+</div>
        </div>

        <div class="info-block__price-container">
          <p class="info-block__price-title">{{ $t("Amount") }}</p>
          <p class="info-block__price-body">
            {{ prettifySum(totalSum()) }} {{ $t("sum") }}
          </p>
        </div>
        <div class="about-shop__container">
          <div class="about-shop__header-container">
            <div class="about-shop__header">
              <div class="about-shop__title active">{{ $t("descr") }}</div>
            </div>
          </div>
          <div class="about-shop__cope" v-html="infoProduct.description"></div>
        </div>
        <div class="info-block__footer">
          <div class="info-block__btn-add" @click="addToCart(infoProduct)">
            {{ $t("addToCart") }}
          </div>
          <div class="info-block__btn-buy" @click="openModal()">
            {{ $t("buyOneClick") }}
          </div>
          <Dialog
            :header="$t('buyOneClick')"
            :visible.sync="displayModal"
            containerStyle="max-width:543px; width: 100%; padding: 24px !important; border: none !important"
            :modal="true"
          >
            <form
              class="constructor-modal"
              style="
                display: flex;
                align-items: flex-start;
                flex-direction: column;
                justify-content: center;
                width: 100%;
              "
              @submit.prevent="submitHandler()"
            >
              <p
                class="constructor-modal__txt"
                style="
                  color: var(--color-dark-dark-2, #87898e);

                  font-family: $regular;
                  font-size: 14px;
                  max-width: 479px;
                  width: 100%;
                  margin-bottom: 47px;
                "
              >
                {{ $t("butOneCliclText") }}
              </p>

              <div
                class="input-wrapper input-group"
                style="
                  border: 2px solid #dfdfe6;
                  max-width: 482px;
                  width: 100%;
                  margin-bottom: 25px;
                  border-radius: 12px;
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
              <div
                class="input-wrapper input-group"
                style="
                  border: 2px solid #dfdfe6;
                  max-width: 482px;
                  width: 100%;
                  margin-bottom: 25px;
                  border-radius: 12px;
                  padding: 8px;
                "
              >
                <input
                  required
                  type="text"
                  style="color: #1e1e1e; padding: 16px"
                  id="help-form__numb-phone"
                  class="input"
                  :placeholder="$t('footerPhone')"
                  autocomplete="off"
                  v-model="phoneNumber"
                />
              </div>
            </form>
            <template #footer>
              <div
                class="constructor-footer"
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-grow: 1;
                  flex-direction: column;
                  margin-bottom: 20px;
                "
              >
                <button
                  autofocus
                  class="constructor-modal__submit"
                  type="submit"
                  @click="submitHandler()"
                  :class="{
                    'is-success': isSubmitSuccess,
                    'is-error': isSubmitError,
                    'is-transitioning': isTransitioning,
                    'is-timeout': isSubmitTimeout,
                  }"
                  style="
                    display: flex;
                    flex-grow: 1;
                    max-width: 482px !important;
                    width: 100%;
                    border-radius: 50px;
                    background: #1e1e1e;
                    outline: none;
                    border: none !important;
                    box-shadow: none !important;
                    transition: all 0.4s;
                    padding: 20px 0;
                    margin-bottom: 20px;
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  {{
                    isSubmitSuccess
                      ? $t("submitted")
                      : isSubmitError
                      ? $t("submit")
                      : $t("submit")
                  }}
                </button>
                <p
                  v-if="isSubmitError || isSubmitTimeout"
                  :class="{ 'is-transitioning': isTransitioning }"
                  style="color: red"
                >
                  {{ $t("submitError") }}
                </p>
              </div>
            </template>
          </Dialog>
        </div>
      </div>
    </div>

    <div class="description-shop__container container">
      <div class="description-shop__header-container">
        <div class="description-shop__header">
          <div class="description-shop__title active">Описание</div>
        </div>
        <div class="description-shop__line"></div>
      </div>
      <div
        class="description-shop__cope"
        v-html="infoProduct.description"
      ></div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { prettifySum } from "@/use/prettify";
import axios from "axios";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Swal from "sweetalert2";
export default {
  components: { Dialog, Button },
  data: () => ({
    selectedImage: null,
    selectedModel: null,
    displayModal: false,
    prettifySum,
    quantity: 1,
    userName: "",
    isSubmitSuccess: false,
    isSubmitError: false,
    isTransitioning: false,
    isSubmitTimeout: false,
    phoneNumber: "",

    links: [
      { link: "#!", name: "Главная   >", right: ">" },
      { link: "#!", name: "Авточехол Cardinar Skyline", right: ">" },
    ],
  }),
  computed: {
    ...mapGetters("products", ["products", "infoProduct"]),
    ...mapGetters("cart", ["cart"]),
    ...mapGetters("inquiry", ["inquiry"]),
  },
  methods: {
    ...mapActions("products", ["getProducts", "getInfoProduct"]),
    ...mapActions("cart", ["getCart", "addCart", "deleteCart"]),
    ...mapActions("inquiry", ["addInquiry"]),
    totalSum() {
      if (this.infoProduct) {
        const price = this.infoProduct.price || 0;
        return this.quantity * price;
      }
      return 0;
    },
    submitHandler() {
      const formData = {
        full_name: this.userName,
        phone_number: this.phoneNumber,
        on_product: this.infoProduct.id,
        articul: this.selectedModel.id,
        car_model: this.selectedModel.car_model.id,
        is_one_click: true,
        comment: "📌 Администрация сайта: Клиент хочет купить в Один клик",
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
          this.isSubmitSuccess = true;
          this.isSubmitError = false;
          this.isSubmitError = false;
        })
        .catch((error) => {
          // Handle error if needed
          this.isSubmitSuccess = false;
          this.isSubmitError = true;
          this.isTransitioning = false;
        });
    },
    selectCarModel(modelId) {
      if (this.selectedModel === modelId.car_model) {
        this.selectedModel = null;
      } else {
        this.selectedModel = modelId;
      }
    },
    async fetchProductDetails(productId) {
      try {
      } catch (error) {}
    },
    goToPreviousImage() {
      const currentIndex = this.infoProduct.photos.findIndex(
        (img) => img.photo === this.selectedImage
      );
      const lastIndex = this.infoProduct.photos.length - 1;

      if (currentIndex === 0) {
        this.selectedImage = this.infoProduct.photos[lastIndex].photo;
      } else {
        this.selectedImage = this.infoProduct.photos[currentIndex - 1].photo;
      }
    },

    goToNextImage() {
      const currentIndex = this.infoProduct.photos.findIndex(
        (img) => img.photo === this.selectedImage
      );
      const lastIndex = this.infoProduct.photos.length - 1;

      if (currentIndex === lastIndex) {
        this.selectedImage = this.infoProduct.photos[0].photo;
      } else {
        this.selectedImage = this.infoProduct.photos[currentIndex + 1].photo;
      }
    },
    incrementQuantity() {
      this.quantity++;
    },
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    openModal() {
      if (this.selectedModel === null) {
        Swal.fire({
          icon: "error",
          title: "",
          text: "Выберите марку машины",
          showConfirmButton: false,
          timer: 5000,
          iconColor: "#1e1e1e",
        });
      } else {
        this.displayModal = true;
      }
    },
    closeModal() {
      this.displayModal = false;
    },
    async addToCart(infoProductData) {
      axios.defaults.withCredentials = true;
      if (this.selectedModel === null) {
        Swal.fire({
          icon: "error",
          title: "",
          text: "Выберите марку машины",
          showConfirmButton: false,
          timer: 5000,
          iconColor: "#1e1e1e",
        });
      }
      try {
        const device_id = localStorage.getItem("device_id");
        const cartItem = {
          device_id: device_id,
          product: infoProductData.id,
          quantity: this.quantity,
          articul: this.selectedModel.id,
          car_model: this.selectedModel.car_model.id,
        };

        await this.addCart(cartItem);
      } catch (error) {}
    },
    updateSelectedImage() {
      if (this.infoProduct.photos.length > 0) {
        this.selectedImage = this.infoProduct.photos[0].photo;
      }
    },
  },

  async mounted() {
    console.log(this.infoProduct);
    const productId = this.$route.params.id;

    await this.getInfoProduct(productId);

    this.updateSelectedImage(); // Вызываем метод для обновления selectedImage

    /* ... остальной код ... */
  },

  watch: {
    // Следим за изменениями в infoProduct и обновляем selectedImage
    infoProduct: {
      handler() {
        this.updateSelectedImage();
      },
      deep: true, // Глубокое слежение, если infoProduct имеет вложенные объекты
    },
  },
};
</script>

<style lang="scss" scoped>
.info-item {
  display: flex;
}
.big-Razer-resize {
  max-width: 350px !important;
}
.tarpetka-class {
  max-width: 436px !important;
  width: 100%;
  @media (max-width: 440px) {
    width: 90% !important;
  }
}
.tarpetka-img {
  max-width: 570px !important;
}
.height-scroll {
  height: 700px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #fff;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #fff;
  }
}
.is-success {
  background: green !important;
  color: white !important;
}
.is-timeout {
  background: #192965 !important;
  color: white !important;
}
.is-error {
  color: white !important;
}

.is-transitioning {
  opacity: 1;
}
</style>