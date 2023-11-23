<template>
  <div class="stores">
    <div class="container">
      <div class="stores-wrapper">
        <h3 class="stores-title">{{ $t("officalStores") }}</h3>
        <DataTable
          :value="stores"
          responsiveLayout="scroll"
          style="width: 100%"
        >
          <Column :header="$t('store')">
            <template #body="rowData">
              <div style="max-width: 150px" class="stores-name">
                {{ rowData.data.title }}
              </div>
            </template></Column
          >

          <Column field="address" :header="$t('address')">
            <template #body="rowData">
              <div class="column-wrapper">
                <div
                  class="column-address"
                  @mouseenter="showMap(rowData.data.address)"
                  @mouseleave="hideMap()"
                >
                  {{ rowData.data.address }}
                  <div
                    class="map"
                    v-if="showMapFor === rowData.data.address"
                    v-html="rowData.data.iframe"
                  ></div>
                </div>
              </div>
            </template>
          </Column>

          <Column field="district" :header="$t('abstract')"></Column>
          <Column field="region" :header="$t('region')"> </Column>
          <Column field="phone_number" :header="$t('phoneNumberForContact')">
            <template #body="rowData">
              <div class="column-address">
                {{ prettify(rowData.data.phone_number) }}
              </div>
            </template></Column
          >
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import { mapActions, mapGetters } from "vuex";
import { formatDate, prettifySum, prettify } from "@/use/prettify";
export default {
  components: {
    ColumnGroup,
    Column,
    DataTable,
  },
  data: () => ({
    formatDate,
    prettifySum,
    prettify,
    showMapFor: null,
  }),
  computed: {
    ...mapGetters("stores", ["stores"]),
  },
  methods: {
    ...mapActions("stores", ["getStores"]),
    showMap(address) {
      this.showMapFor = address;
    },
    hideMap() {
      this.showMapFor = null;
    },
  },
  async mounted() {
    await this.getStores();
    console.log(this.stores);
  },
};
</script>

<style>
</style>