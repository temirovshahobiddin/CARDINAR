`<template>
  <aside class="basket__container" @click.stop="">
    <div class="blackout" @click="toggleBasket()"></div>

    <div class="basket__pos">
      <div class="basket__wrapper">
        <div class="aside__title">
          <div class="basket__title">{{ $t("Корзина") }}</div>
          <a class="basket__clear" @click.prevent="clearCart()" href="">{{
            $t("Отчистить корзину")
          }}</a>
        </div>
        <Spinner v-if="isLoading" />
        <div v-else style="flex-grow: 1">
          <div v-if="cartItemCount === 0" class="basket-empty">
            <p>Ваша корзина пуста</p>
          </div>
          <div v-else>
            <div class="basket__item" v-for="item in cart" :key="item.id">
              <div class="basket__img">
                <img
                  :src="item.product.photo"
                  alt=""
                  :class="{
                    'max-width-250': item.category === 5,
                    'palma-img-resize':
                      item.product.title === 'Авточехол Cardinar Palma',
                    'seat-img-resize':
                      item.product.category_title === `Авточехол` &&
                      `Avtochexol`,
                    'polik-img-resize':
                      item.product.category_title === `Полик` && `Polik`,
                    'tarpetka-img-resize':
                      item.product.category_title === `Накидки на торпеду` &&
                      `Tarpeda uchun qoplama`,
                  }"
                />
              </div>
              <div class="basket__body">
                <div class="basket-item__name">{{ item.product.title }}</div>
                <div class="basket-item__price">
                  {{ prettifySum(item.cost) }}
                </div>
              </div>

              <div class="basket__quantity">
                <div class="basket__minus" @click="decrementCartItem(item)">
                  -
                </div>
                <input type="number" class="basket__input"  v-model="item.quantity"/>
                <div class="basket__plus" @click="incrementCartItem(item)">
                  +
                </div>
              </div>

              <div class="basket-item__delete" @click="deleteCartItem(item.id)">
                <img :src="deleteImg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="aside__btn-container">
          <a class="aside__close" @click="toggleBasket">
            {{ $t("Продолжить покупки") }}
          </a>
          <div @click.prevent="redirectToCheckout" class="aside_buy">
            {{ $t("Оформить заказ") }}
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { prettifySum } from "@/use/prettify";
import Spinner from "@/components/Spinner.vue";
import Swal from "sweetalert2";
export default {
  components: { Spinner },
  data: () => ({
    prettifySum,
    deleteImg: require("@/assets/img/basket/basket-item__delete.svg"),
    cartData: [],
  }),
  computed: {
    ...mapGetters("cart", ["cart", "isLoading"]),
    cartTotalPrice() {
      return this.cartData
        .reduce((total, item) => {
          return total + item.cost * item.quantity;
        }, 0)
        .toFixed(2);
    },
    cartItemCount() {
      return this.cart ? Object.keys(this.cart).length : 0;
    },
  },
  methods: {
    ...mapActions("cart", [
      "getCart",
      "addCart",
      "deleteCart",
      "cleartCart",
      "updateCart",
    ]),
    toggleBasket() {
      this.$emit("toggle-basket");
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

    async addToCart(card) {
      axios.defaults.withCredentials = true;
      try {
        // Prepare the cart item data that you want to add
        const cartItem = {
          id: card.id,
          quantity: 1,
        };

        // Dispatch the addCart action with the cart item data
        await this.addCart(cartItem);

        // Optionally, you can show a success message or perform any other actions after adding to the cart.
      } catch (error) {}
    },
    async clearCart() {
      try {
        // Call the deleteCart action from your Vuex store to clear the cart
        await this.$store.dispatch("cart/clearCart");
      } catch (error) {}
    },
    async deleteCartItem(item) {
      try {
        // Call the deleteCart action from your Vuex store, passing the index of the item to delete
        await this.$store.dispatch("cart/deleteCart", item);
        await this.getCart();
      } catch (error) {}
    },
    redirectToCheckout() {
      if (this.cartItemCount === 0) {
        Swal.fire({
          icon: "error",
          title: "Ваша корзина пуста!",
          text: "Ваша корзина пуста. Пожалуйста, добавьте товары, прежде чем перейти к оформлению заказа.",
        });
      } else {
        this.$router.push("/verify-order");
        this.$emit("toggle-basket");
      }
    },
  },
  async mounted() {
    await this.getCart();
    console.log(this.cart);
  },
};
</script>

<style lang="scss" scoped>
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
    height: calc(93x + 64 * (100vw - 320px) / 1600) !important;
  }
}
.tarpetka-img-resize {
  height: calc(44px + 68 * ((100vw - 320px) / 1600)) !important;
}
.palma-img-resize {
  max-width: calc(48px + 66 * (100vw - 320px) / 1600) !important;
}
</style>