<template>
  <div class="user container">
    <div class="user-routing">
      <section class="personalArea__table-order">
        <div v-if="cartItemCount === 0" class="personalArea__table-empty">
          <p class="table__empty-txt">У вас пока нет Заказов</p>
        </div>

        <div v-else>
          <DataTable :value="orders" responsiveLayout="scroll">
            <Column field="id" header="Номер заказа"></Column>
            <Column field="get_title" header="Товар">
              <template #body="rowData">
                <div style="max-width: 150px">
                  {{ rowData.data.get_title }}
                </div>
              </template></Column
            >
            <Column field="payment_status" header="Способ оплаты"
              ><template #body="rowData">
                <div
                  class="payment_status"
                  :class="{
                    'green-text': rowData.data.payment_status === 'pd',
                  }"
                >
                  {{ formatPaymentStatus(rowData.data.payment_status) }}
                </div>
              </template></Column
            >
            <Column field="created" header="Дата заказа">
              <template #body="rowData">
                {{ formatDate(rowData.data.created) }}
              </template>
            </Column>
            <Column field="final_price" header="Сумма заказа"></Column>
            <Column field="status" header="Статус заказа">
              <template #body="rowData">
                <div
                  class="user-status"
                  :class="{ delivered: rowData.data.status === 'd' }"
                >
                  {{ formatStatus(rowData.data.status) }}
                </div></template
              ></Column
            >
          </DataTable>
        </div>
      </section>
    </div>
    <div class="user-routing">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <Help></Help>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { formatDate, prettifySum } from "@/use/prettify";
import Help from "@/components/Help.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";

export default {
  components: {
    Help,
    ColumnGroup,
    Column,
    DataTable,
  },
  data: () => ({
    formatDate,
    prettifySum,
  }),
  computed: {
    ...mapGetters("orders", ["orders"]),
    cartItemCount() {
      // Check if this.orders is defined and not null, then calculate the count
      return this.orders ? Object.keys(this.orders).length : 0;
    },
  },
  methods: {
    ...mapActions("orders", ["getOrders"]),
    isDefaultRoute(routeName) {
      return this.$route.name === routeName;
    },
    formatPaymentStatus(paymentStatus) {
      if (paymentStatus === "wp") {
        return "при получение";
      } else if (paymentStatus === "pd") {
        return "оплачено онлайн";
      } else {
        return paymentStatus; // Если значение не "wp" или "pd", оставляем его без изменений
      }
    },
    formatStatus(status) {
      if (status === "p") {
        return "В Процессе";
      } else if (status === "d") {
        return "Доставлено";
      } else {
        return status; // Если значение не "wp" или "pd", оставляем его без изменений
      }
    },
    isChildRouteActive(routeName) {
      return this.$route.matched.some((route) => route.name === routeName);
    },
    formatCustomField(rowData) {
      // Implement logic to format or calculate the custom field value here
      // For example, if you want to concatenate "id" and "quantity" fields:
      return `ID: ${rowData.id}, Quantity: ${rowData.quantity}`;
    },
  },
  mounted() {
    this.getOrders();
    console.log(this.orders);
  },
};
</script>

<style>
.user-routing {
  margin-top: 60px;
  margin-bottom: 150px;
  overflow-y: hidden;
  overflow-x: auto;
  padding-bottom: 10px;
}

.user-routing::-webkit-scrollbar {
  height: 3px;
}

.user-routing::-webkit-scrollbar-track {
  background: #ffffff;
}

.user-routing::-webkit-scrollbar-thumb {
  background-color: #192965;
  height: 3px;
  border-radius: 20px;
}

@media (max-width: 500px) {
  .user-routing {
    margin-bottom: 50px;
  }
}
.green-text {
  color: rgb(0, 202, 0); /* Устанавливаем зеленый цвет текста */
}
</style>
