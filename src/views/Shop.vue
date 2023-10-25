<template>
  <section class="shop container">
    <div class="filter" ref="filter" :class="{ shop__opened: filterActive }">
      <img :src="logo" alt="" style="max-width: 172px; width: 100%" />
      <form action="" class="filter-form">
        <ul class="filter-list filter-categories">
          <h3 class="filter-list__title">Категории</h3>
          <li
            class="filter-list__item"
            v-for="item in categories"
            :key="item.id"
          >
            <a
              href="#!"
              class="filter-list__link"
              :class="{ 'filter-active': item.active }"
              @click="toggleFilterActive('category', item), filterItems()"
              >{{ item.title }}
              <span><i class="filter-check far fa-check"></i></span
            ></a>
          </li>
        </ul>
        <ul class="filter-list filter-auto">
          <h3 class="filter-list__title">Модель машины</h3>
          <li
            class="filter-list__item"
            v-for="brand in carBrand"
            :key="brand.id"
          >
            <a
              href="#!"
              class="filter-list__link"
              :class="{ 'filter-active': brand.active }"
              @click="toggleBrandActive(brand)"
              style="text-transform: capitalize"
              >{{ brand.title }}
              <span><i class="filter-check far fa-check"></i></span
            ></a>
          </li>
        </ul>
        <ul class="filter-list filter-mark">
          <h3 class="filter-list__title">Марка машины</h3>
          <li
            class="filter-list__item"
            v-for="model in carModel"
            :key="model.id"
          >
            <a
              href="#!"
              class="filter-list__link"
              :class="{ 'filter-active': model.active }"
              @click="toggleFilterActive('car_model', model), filterItems()"
              >{{ model.title }}
              <span><i class="filter-check far fa-check"></i></span
            ></a>
          </li>
          <!-- Проверяем, есть ли элементы в carModel или нет -->
          <div v-if="!carModel.length" class="empty-txt">
            Вы ещё не выбрали марку
          </div>
        </ul>

        <h3 class="sum">
          {{ prettifySum(100000 * value4[0]) }} сум -
          {{ prettifySum(100000 * value4[1]) }} сум
        </h3>

        <Slider v-model="value4" :range="true" />
        <a class="filter-btn" @click="closeFilter">Фильтровать</a>
      </form>
    </div>
    <div class="">
      <div class="shop-filter">
        <!--         <div class="shop-circle"></div> -->
        <div class="shop-filter__left">
          <button
            class="shop__collapse-btn"
            @click.stop="shopBtnClick"
            :class="{ shop__opened: filterActive }"
          >
            <span class="shop-btn-line"></span>
            <span class="shop-btn-line"></span>
            <span class="shop-btn-line"></span>
          </button>

          <h3 class="shop-filter__title">Фильтр</h3>
        </div>
        <div class="shop-filter__right">
          <h3 class="shop-filter__clear" @click="clearFilter">
            Сбросить Фильтр
          </h3>
        </div>
      </div>
      <Products></Products>
      <Help></Help>
    </div>
  </section>
</template>

<script>
import Help from "@/components/Help.vue";
import Products from "@/components/Products.vue";
import Slider from "primevue/slider";
import "vue-slider-component/theme/default.css";
import { mapActions, mapGetters } from "vuex";
import { prettifySum } from "@/use/prettify";
import Hammer from "hammerjs";
export default {
  components: {
    Help,
    Products,
    Slider,
  },
  data() {
    return {
      links: [
        { link: "#!", name: "Главная   >" },
        { link: "#!", name: "Магазин" },
      ],
      selectedBrandId: [],
      selectedCategory: [],
      selectedModelId: [],
      selectedPrice: [],
      logo: require("@/assets/img/nav/logo.svg"),
      value4: [2, 100],
      prettifySum,
      filterActive: false,
      isMobile: false,
    };
  },
  computed: {
    ...mapGetters("filter", ["carBrand", "carModel", "categories"]),
    ...mapGetters("products", ["products", "infoProduct", "filteredProducts"]),
  },
  methods: {
    ...mapActions("products", ["getProducts", "getInfoProduct", "applyFilter"]),
    ...mapActions("filter", ["getCarBrand", "getCarModel", "getCategories"]),
    shopBtnClick() {
      this.filterActive = !this.filterActive;
    },
    toggleFilter(event) {
      event.stopPropagation();
      this.filterActive = !this.filterActive;
    },
    closeFilter() {
      this.filterActive = false;
    },
    closeDropdown(event) {
      if (this.filterActive && this.$refs.filter) {
        const filterElement = this.$refs.filter.$el || this.$refs.filter;
        if (event && event.target && filterElement.contains(event.target)) {
          // Click was inside the filter, do not close it
          return;
        }
        this.filterActive = false;
        // Close the filter if the click was outside
      }
    },
    tooltipFormatter(value) {
      return value.toFixed(0);
    },
    handleClick(event) {
      this.$emit("click", event); // Передаем событие клика вверх
    },
    getProcessStyle(index) {
      const backgroundColor =
        index === 0 ? "rgba(228, 35, 70, 1)" : "rgba(228, 35, 70, 1)";
      return `background-color: ${backgroundColor};`;
    },
    getDragStyle(index) {
      const backgroundColor =
        index === 0 ? "rgba(228, 35, 70, 1)" : "rgba(228, 35, 70, 1)";
      return `background-color: ${backgroundColor};`;
    },
    async filterItems() {
      // Gather the selected filter options
      const filterOptions = {
        category: this.selectedCategory,
        car_brands: this.selectedBrandId,
        car_models: this.selectedModelId,
      };
      if (window.innerWidth <= 768) {
        this.isActiveTopCircle = false;
        this.isActiveBotCircle = false;
      }
      // Dispatch the action to apply the filter
      await this.applyFilter(filterOptions);
    },
    toggleBrandActive(item) {
      if (this.selectedBrandId !== item.id) {
        // Если выбран другой бренд, сбрасываем активность всех брендов
        this.carBrand.forEach((brand) => {
          brand.active = false;
        });

        // Устанавливаем активность для выбранного бренда
        item.active = true;
        this.selectedBrandId = item.id;

        // Получаем модели для выбранного бренда
        this.getCarModel(item.id);
        this.filterItems();

        // Очищаем selectedModelId
        this.selectedModelId = [];
      } else {
        // Снимаем выбор с выбранного бренда
        item.active = false;
        this.selectedBrandId = null;
        this.selectedModelId = [];

        // Сбрасываем модели
        this.carModel.forEach((model) => {
          model.active = false;
        });
      }
    },
    toggleFilterActive(column, item) {
      if (column === "category") {
        this.categories.forEach((category) => {
          category.active = false; // Сначала снимаем активность со всех категорий
        });
        this.getCarBrand(item.id);
      }
      if (column === "car_model") {
        this.carModel.forEach((model) => {
          model.active = false; // Сначала снимаем активность со всех моделей
        });
      }

      item.active = !item.active; // Инвертируем активность выбранной категории или модели

      if (column === "category") {
        this.selectedCategory = item.active ? [item.id] : []; // Устанавливаем выбранную категорию в selectedCategory
      } else if (column === "car_model") {
        this.selectedModelId = item.active ? [item.id] : []; // Устанавливаем выбранную модель в selectedModelId
      }
      if (column === "category") {
        this.selectedCategory = item.active ? [item.id] : []; // Устанавливаем выбранную категорию в selectedCategory
        this.selectedBrandId = []; // Сбрасываем выбранные бренды
        this.selectedModelId = []; // Сбрасываем выбранные модели
      } else if (column === "car_model") {
        this.selectedModelId = item.active ? [item.id] : []; // Устанавливаем выбранную модель в selectedModelId
      }
    },
    clearFilter() {
      this.getProducts()
    },
  },
  mounted() {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile) {
      const filterElement = this.$refs.filter.$el || this.$refs.filter;
      const mc = new Hammer.Manager(filterElement);
      mc.add(new Hammer.Swipe({ direction: Hammer.DIRECTION_LEFT }));
      mc.on("swipeleft", this.closeFilter);
    }
    this.getCategories();
    this.getCarBrand();
    this.getCarModel();
    document.addEventListener("click", this.closeDropdown);
  },
  beforeDestroy() {
    // Удаляет слушатель события click при уничтожении компонента
    document.removeEventListener("click", this.closeDropdown);
  },
};
</script> 

<style lang="scss" scoped>
.shop-filter {
  margin-top: 60px;
}
range {
  max-width: 200px;
  width: 100%;
}

.p-slider-horizontal,
.p-inputtext {
  width: 14rem;
}

.p-slider-vertical {
  height: 14rem !important;
}

.p-slider-range {
  background: #fb5b60 !important;
}

.p-slider-handle {
  background: #fb5b60 !important;
  border: 2px solid #fb5b60 !important;
  border-radius: 50% !important;
}
.sum {
  width: 100%;
  font-size: 16px;
}
</style>
