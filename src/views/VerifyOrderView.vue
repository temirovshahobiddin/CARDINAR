  <template>
  <form @submit.prevent="createOrder()">
    <div class="navigation-chain__container container"></div>

    <!-- Заголовок страницы -->
    <div class="checkout__title container">{{ $t("submitOrder") }}</div>

    <!-- Контейнер карточек -->
    <Spinner v-if="isLoading" />

    <section class="checkout-card__container container">
      <div class="checkout-card" v-for="order in cart" :key="order.id">
        <div class="checkout-card__item">
          <div class="checkout-card__img-name__position">
            <div class="checkout-card__img">
              <img
                :src="order.product.photo"
                alt=""
                :class="{
                  'palma-img-resize':
                    order.product.title === 'Авточехол Cardinar Palma',
                  'max-width-250': order.category === 5,
                  'seat-img-resize':
                    order.product.category_title === `Авточехол` &&
                    `Avtochexol`,
                  'polik-img-resize':
                    order.product.category_title === `Полик` && `Polik`,
                  'tarpetka-img-resize':
                    order.product.category_title === `Накидки на торпеду` &&
                    `Tarpeda uchun qoplama`,
                }"
              />
            </div>
            <div class="checkout-card__body">
              <div class="checkout-card-item__name">
                {{ order.product.title }}
              </div>
              <div class="checkout-card-item__price">
                {{ prettifySum(order.cost) }}
              </div>
              <div class="checkout-card__quantity">
                <div
                  class="checkout-card__minus"
                  @click="decrementCartItem(order)"
                >
                  -
                </div>
                <div>{{ order.quantity }}</div>
                <div
                  class="checkout-card__plus"
                  @click="incrementCartItem(order)"
                >
                  +
                </div>
              </div>
            </div>
          </div>
          <div class="checkout-card__quantity">
            <div class="checkout-card__minus" @click="decrementCartItem(order)">
              -
            </div>
            <div>{{ order.quantity }}</div>
            <div class="checkout-card__plus" @click="incrementCartItem(order)">
              +
            </div>
          </div>

          <div
            class="checkout-card-item__delete"
            @click="deleteCartItem(order.id)"
          >
            <img :src="deleteImg" alt="" />
          </div>
        </div>
      </div>
    </section>

    <!-- Форма  -->
    <section class="checkout-form__container container">
      <div id="buy" class="form-personal-area" action="">
        <form
          action=""
          class="form-registration"
          :class="{ registered: hasToken }"
          @submit.prevent="submitRegister"
        >
          <div class="form__shop-title" @click="toggleRegisterOpen">
            <div class="form__shop-title_numb">1</div>
            <div class="form__shop-title_name">{{ $t("registration") }}</div>
            <i
              class="fal fa-chevron-down register-chevron"
              :class="{ rotate: openRegister }"
            ></i>
          </div>
          <div
            class="form-registration__content"
            :class="{ 'registration-opened': openRegister }"
          >
            <div class="form__buyer-row">
              <p class="form__buyer-row_title">{{ $t("contactsName") }}</p>
              <input
                :placeholder="$t('contactsName')"
                class="form__buyer-row_input"
                type="text"
                required
                v-model="regName"
              />
            </div>
            <div class="form__buyer-row">
              <p class="form__buyer-row_title">
                {{ $t("contactsPhoneNumber") }}
              </p>
              <input
                :placeholder="$t('contactsPhoneNumber')"
                class="form__buyer-row_input"
                type="tel"
                required
                id="phone_number"
                v-model="regPhoneNumber"
                @click="phoneNumberClick()"
              />
              <label for="phone_number" class="input_label">{{
                $t("erer")
              }}</label>
            </div>
            <div class="form__buyer-row">
              <p class="form__buyer-row_title">{{ $t("contactsEmail") }}</p>
              <input
                :placeholder="$t('contactsEmail')"
                class="form__buyer-row_input"
                type="email "
                v-model="regEmail"
              />
            </div>
            <div class="form__buyer-row">
              <p class="form__buyer-row_title">{{ $t("password") }}</p>
              <input
                :placeholder="$t('password')"
                class="form__buyer-row_input"
                type="password1 "
                v-model="password1"
              />
            </div>
            <div class="form__buyer-row">
              <p class="form__buyer-row_title">{{ $t("password1") }}</p>
              <input
                :placeholder="$t('password1')"
                class="form__buyer-row_input"
                type="password2 "
                v-model="password2"
              />
            </div>
            <div class="form-registration__btns">
              <button type="submit" class="form-registration__btn">
                {{ $t("registration") }}
              </button>
              <router-link to="/login" class="form-registration__login">{{
                $t("haveaccoutn")
              }}</router-link>
            </div>
          </div>
        </form>
        <div class="form__buyer" :class="{ registered: !hasToken }">
          <div class="form__shop-title">
            <div class="form__shop-title_numb">{{ hasToken ? "1" : "2" }}</div>

            <div class="form__shop-title_name">{{$t("Данные")}}</div>
          </div>

          <div class="form__buyer-row">
            <p class="form__buyer-row_title">{{ $t("contactsName") }}</p>
            <input
              :placeholder="$t('contactsName')"
              class="form__buyer-row_input"
              type="text"
              required
              v-model="name"
            />
          </div>

          <div class="form__buyer-row">
            <p class="form__buyer-row_title">{{ $t("contactsPhoneNumber") }}</p>
            <input
              :placeholder="$t('contactsPhoneNumber')"
              class="form__buyer-row_input"
              type="tel"
              required
              id="phone_number"
              v-model="phoneNumber"
              @click="phoneNumberClick()"
            />
            <label for="phone_number" class="input_label">{{
              $t("Убедитесь")
            }}</label>
          </div>

          <div class="form__buyer-row">
            <p class="form__buyer-row_title">{{ $t("contactsEmail") }}</p>
            <input
              :placeholder="$t('contactsEmail')"
              class="form__buyer-row_input"
              type="email "
              v-model="email" 
            />
          </div>
        </div>

        <div class="form__receiving">
          <div class="form__shop-title">
            <div class="form__shop-title_numb">{{ hasToken ? "2" : "3" }}</div>
            <div class="form__shop-title_name">{{ $t("methodAdmission") }}</div>
          </div>

          <div class="form__receiving-row">
            <RadioButton
              id="reception1"
              name="reception "
              value="Самовывоз"
              v-model="methodAdmission"
            />
            <label for="reception1"> {{ $t("reception") }} </label>
          </div>

          <div class="form__receiving-row">
            <RadioButton
              id="reception2"
              name="reception "
              value="Доставка"
              v-model="methodAdmission"
            />
            <label for="reception2"> {{ $t("delivery") }} </label>
          </div>
          <div
            class="delivery-menu"
            :class="{ 'open-delivery': methodAdmission === 'Доставка' }"
          >
            <h3 class="delivery-menu__title">Ваш город</h3>
            <div class="delivery-menu__flex">
              <Dropdown
                class="form__shop-input__container"
                v-model="selectedCity"
                :options="regions"
                optionLabel="title"
                :filter="true"
                placeholder="Выберите"
                :showClear="true"
              >
                <template #value="slotProps">
                  <div
                    class="country-item country-item-value"
                    v-if="slotProps.value"
                  >
                    <i class="fad fa-city"></i>
                    <div>{{ slotProps.value.title }}</div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <div class="country-item">
                    <i class="fad fa-city"></i>
                    <div>{{ slotProps.option.title }}</div>
                  </div>
                </template>
              </Dropdown>
            </div>
            <h3 class="delivery-menu__title">Укажите адрес доставки</h3>
            <div class="delivery-menu__address">
              <div class="form__buyer-row">
                <input
                  placeholder="Например, Юнусабад 13 квартал"
                  class="form__buyer-row_input"
                  type="text"
                  :required="methodAdmission === 'Доставка'"
                  id="addres-buyer"
                  v-model="address"
                />
                <label for="addres-buyer" class="address-label">Адрес *</label>
              </div>
              <div class="form__buyer-row">
                <input
                  placeholder="Если есть"
                  class="form__buyer-row_input"
                  type="text"
                  :required="methodAdmission === 'Доставка'"
                  v-model="orient"
                />
                <label for="addres-buyer" class="address-label"
                  >Подъезд / Номер квартиры
                </label>
              </div>
            </div>
          </div>
        </div>
        <div
          class="form__shop"
          :class="{ delivery: methodAdmission === 'Доставка' }"
        >
          <div class="form__shop-title">
            <div class="form__shop-title_numb">{{ hasToken ? "3" : "4" }}</div>
            <div class="form__shop-title_name">{{ $t("chooseStore") }}</div>
          </div>

          <div class="form__shop_input-drop">
            <Dropdown
              class="form__shop-input__container"
              v-model="selectedStore"
              :options="stores"
              optionLabel="title"
              :filter="true"
              :placeholder="$t('chooseStore')"
              :showClear="true"
              :disabled="methodAdmission === 'Доставка'"
            >
              <template #value="slotProps">
                <div
                  class="country-item country-item-value"
                  v-if="slotProps.value"
                >
                  <i class="fas fa-shopping-cart"></i>
                  <div>{{ slotProps.value.title }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="country-item">
                  <i class="fas fa-shopping-cart"></i>
                  <div>{{ slotProps.option.title }}</div>
                </div>
              </template>
            </Dropdown>

            <div
              class="form__shop-drop-list"
              v-for="address in filials"
              :key="address.id"
            >
              <div class="form__shop-drop-list_item">{{ address.name }}</div>
            </div>
          </div>
        </div>

        <div class="form__receiving">
          <div class="form__shop-title">
            <div class="form__shop-title_numb">
              {{
                hasToken
                  ? methodAdmission === "Доставка"
                    ? "3"
                    : "4"
                  : methodAdmission === "Доставка"
                  ? "4"
                  : "5"
              }}
            </div>
            <div class="form__shop-title_name">{{ $t("methodPayment") }}</div>
          </div>

          <div class="form__receiving-row">
            <RadioButton
              id="payment1"
              name="payment"
              value="Наличными или картой"
              v-model="payment"
            />
            <label for="payment1"> {{ $t("naxt") }} </label>
          </div>

          <div class="form__receiving-row">
            <RadioButton
              id="payment2"
              name="payment"
              value="Payme"
              v-model="payment"
            />
            <label for="payment2"> Payme </label>
          </div>
        </div>
      </div>

      <!-- Карточка формы -->
      <div class="form__card">
        <div class="form-card__body">
          <div class="form-card__body-title">{{ $t("collection") }}</div>

          <div class="form-card__body-line"></div>

          <div class="form-card__body-item" v-for="item in cart" :key="item.id">
            <p>{{ item.product.title }}</p>
            <p>{{ item.quantity }}</p>
          </div>

          <div class="form-card__body-item">
            <p>{{ $t("quantityProducts") }}</p>
            <p>{{ totalQuantity }}</p>
          </div>

          <div class="form-card__body-item">
            <p>{{ $t("methodPayment") }}</p>
            <p>{{ payment }}</p>
          </div>

          <div class="form-card__body-item">
            <p>{{ $t("methodAdmission1") }}</p>
            <p>{{ methodAdmission }}</p>
          </div>

          <div class="form-card__body-line"></div>

          <div class="form-card__body-total">
            <p>{{ $t("totalSum") }}</p>
            <p>{{ prettifySum(totalPrice) }}</p>
          </div>
        </div>
        <div class="form-card__center">
          {{ $t("orderText") }}
          <router-link to="/register" class="form-center__inner" href="">
            {{ $t("goreg") }}</router-link
          >
        </div>

        <div class="form-card__bottom">
          <div class="form-card__bottom-consent">
            <input form="buy" type="checkbox" id="consent" required />
            <label for="consent"
              >{{ $t("oferta") }} <a href="">{{ $t("oferta1") }}</a></label
            >
          </div>
          <button
            class="form-card__bottom-btn"
            :class="{
              'is-success': isSubmitSuccess,
              'is-error': isSubmitError,
              'is-transitioning': isTransitioning,
              'is-timeout': isSubmitTimeout,
            }"
          >
            {{
              isSubmitSuccess
                ? $t("submitedOrder")
                : isSubmitError
                ? $t("submitOrder")
                : $t("submitOrder")
            }}
          </button>
          <p
            v-if="isSubmitError || isSubmitTimeout"
            :class="{ 'is-transitioning': isTransitioning }"
            style="color: red"
          >
            Что-то пошло не так. Пожалуйста, попробуйте ещё раз.
          </p>
        </div>
      </div>
    </section>
  </form>
</template>

<script>
import RadioButton from "primevue/radiobutton";
import { mapActions, mapGetters } from "vuex";
import { prettifySum } from "@/use/prettify";
import Spinner from "@/components/Spinner.vue";
import Dropdown from "primevue/dropdown";
import Swal from "sweetalert2";
import axios from "axios";
export default {
  components: {
    RadioButton,
    Spinner,
    Dropdown,
  },
  data: () => ({
    selectedStore: null,
    name: "",
    phoneNumber: "",
    email: "",
    prettifySum,
    deleteImg: require("@/assets/img/basket/basket-item__delete.svg"),
    links: [
      { link: "#!", name: "Главная   >" },
      { link: "#!", name: "Магазин" },
    ],
    reception: null,
    payment: null,
    methodAdmission: null,
    isSubmitSuccess: false,
    isSubmitError: false,
    isTransitioning: false,
    isSubmitTimeout: false,
    regName: "",
    regPhoneNumber: "",
    regEmail: "",
    password1: "",
    password2: "",
    orient: "",
    address: "",
    selectedCity: "",
    openRegister: true,
    regions: [
      { title: "г.Ташкент" },
      { title: "Ташкент обл" },
      { title: "Андижан" },
      { title: "Наманган" },
      { title: "Фергана" },
      { title: "Самарканд" },
      { title: "Бухара" },
      { title: "Хорезм" },
      { title: "Навоий" },
      { title: "Джизак" },
      { title: "Сурхандарья" },
      { title: "Кашкадарья" },
      { title: "Сырдарья" },
      { title: "Каракалпакстан" },
    ],
  }),
  computed: {
    ...mapGetters("cart", ["cart", "isLoading"]),
    ...mapGetters("user", ["user", "isLoading"]),

    ...mapGetters("stores", ["stores", "isLoading"]),
    totalQuantity() {
      return Object.values(this.cart).reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    hasToken() {
      return localStorage.getItem("token") !== null;
    },
    totalPrice() {
      return Object.values(this.cart).reduce(
        (total, item) => total + parseFloat(item.cost),
        0
      );
    },
  },
  methods: {
    ...mapActions("cart", ["getCart", "addCart", "deleteCart", "updateCart"]),
    ...mapActions("user", ["getUser", "addOrder"]),
    ...mapActions("stores", ["getStores", "addOrder"]),
    async createOrder(item) {
      try {
        const orderData = {
          full_name: this.name,
          phone_number: this.phoneNumber,
          email: this.email,
          store: this.selectedStore.id,
          delivery_type: this.methodAdmission === "Самовывоз" ? "s" : "d",
          city: this.selectedCity.title,
          region: this.address,
          address: this.orient,
        };
        this.addOrder(orderData);
        const token = localStorage.getItem("token");
        if (!token) {
          // Если токен отсутствует, вывести ошибку с использованием Swal
          Swal.fire({
            icon: "error",
            title: "Вы не авторизованы!",
            text: "",
            showConfirmButton: false,
            timer: 5000,
            iconColor: "#1e1e1e",
          });
          return;
        }
        const res = await axios.post(`/orders/create/`, orderData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.isSubmitSuccess = true;
        this.isSubmitError = false;
        this.isSubmitError = false;
        Swal.fire({
          icon: "success",
          title: "Успех!",
          text: "Ваш заказ успешно оформлен",
          footer: "Ждите Звонка оператора", // Этот текст будет отображаться внизу уведомления
          showConfirmButton: false, // Убираем кнопку "OK", чтобы оповещение исчезло автоматически
          timer: 5000, // Через сколько миллисекунд оповещение исчезнет (в данном случае, через 2 секунды)
        });
        this.$router.push("/user");
        if (this.payment === "Payme") {
          window.open(res.data.payment_url, "_blank");
          return res.data;
        }
      } catch (error) {
        this.isSubmitSuccess = false;
        this.isSubmitError = true;
        this.isTransitioning = false;
        Swal.fire({
          icon: "error",
          title: "Ошибка!",
          text: error.response.data.phone_number,
          showConfirmButton: false, // Убираем кнопку "OK", чтобы оповещение исчезло автоматически
          timer: 5000, // Через сколько миллисекунд оповещение исчезнет (в данном случае, через 2 секунды)
        });
        console.log(error);
        throw error;
      }
    },
    async decrementCartItem(item) {
      if (item.quantity > 1) {
        item.quantity--; // Уменьшаем количество на 1

        const cartItem = {
          id: item.id,
          quantity: item.quantity,
        };

        await this.updateCart(cartItem);
      }
    },

    async incrementCartItem(item) {
      item.quantity++; // Увеличиваем количество на 1

      const cartItem = {
        id: item.id,
        quantity: item.quantity,
      };

      await this.updateCart(cartItem);
    },
    itemTotalPrice(item) {
      return (item.cost * item.quantity).toFixed(2); // Assuming price is in float or decimal format
    },

    async deleteCartItem(item) {
      try {
        // Call the deleteCart action from your Vuex store, passing the index of the item to delete
        await this.$store.dispatch("cart/deleteCart", item);

        console.log("Successfully removed item from cart!");
      } catch (error) {
        console.error("Error deleting item from cart:", error);
      }
    },
    phoneNumberClick() {
      this.phoneNumber = `+998`;
    },
    toggleRegisterOpen() {
      this.openRegister = !this.openRegister;
    },
    submitRegister(e) {
      const formData = {
        username: this.regName,
        first_name: this.regName,
        last_name: this.regName,
        phone_number: this.regPhoneNumber,
        email: this.regEmail,
        password1: this.password1,
        password2: this.password2,
      };
      const device_id = localStorage.getItem("device_id");
      axios
        .post(`/users/register/?device_id=${device_id}/`, formData)
        .then((response) => {
          axios
            .post("/token/", {
              username: this.regName,
              password: this.password1,
            })
            .then((loginResponse) => {
              console.log(loginResponse);
              const token = loginResponse.data.access;
              this.$store.commit("setToken", token);
              axios.defaults.headers.common["Authorization"] =
                "Bearer " + token;
              localStorage.setItem("token", token);
              window.location.reload();
              this.$router.push("/verify-order");
              this.getUser();
              if (this.$route.path !== "/verify-order") {
                window.location.reload();
                this.$router.push("/verify-order");
              }
              Swal.fire({
                icon: "success",
                title: "Что-то пошло не так!",
                showConfirmButton: false,
                timer: 5000, // Display for 1.5 seconds
              });
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
  mounted() {
    this.getCart();
    this.getStores();
    this.getUser();
    console.log(this.user);
    if (this.user) {
      this.name = this.user.username;
      this.phoneNumber = this.user.phone_number;
      this.email = this.user.email;
    }
  },
};
</script>

<style lang="scss" scoped>
.p-radiobutton-box {
  border: 5px solid #ced4da !important;
}
.form__shop-input__container {
  border: 1px solid #000 !important;
  padding: 0;
}
.big-img-resize {
  max-width: calc(62px + 54 * ((100vw - 320px) / 1600)) !important;
}

.polik-img-resize {
  height: calc(85px + 68 * (100vw - 320px) / 1600) !important;
}
.seat-img-resize {
  max-width: calc(55px + 66 * (100vw - 320px) / 1600) !important;
  height: calc(89px + 64 * (100vw - 320px) / 1600) !important;
  @media (max-width: 676px) {
    max-width: calc(76px + 73 * (100vw - 320px) / 1600) !important;
    height: calc(92px + 64 * (100vw - 320px) / 1600) !important;
  }
}
.tarpetka-img-resize {
  height: calc(44px + 68 * ((100vw - 320px) / 1600)) !important;
}
.palma-img-resize {
  max-width: calc(48px + 66 * (100vw - 320px) / 1600) !important;
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
