<template>
  <div class="constructor">
    <div class="constructor-wrapper">
      <div class="constructor-settings">
        <div class="constructor-mark constructor-inner">
          <Dropdown
            class="constructor-dropdown"
            v-model="selectedBrand"
            :options="carBrand"
            optionLabel="title"
            :filter="true"
            :placeholder="$t('choiceMark')"
            :showClear="true"
            @change="handleBrandChange(selectedBrand)"
          >
            <template #value="slotProps">
              <div
                class="country-item country-item-value"
                v-if="slotProps.value"
              >
                <img :src="require('@/assets/img/constructor/icon.svg')" />
                <div>{{ slotProps.value.title }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="country-item">
                <img :src="require('@/assets/img/constructor/icon.svg')" />
                <div>{{ slotProps.option.title }}</div>
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="constructor-model constructor-inner">
          <Dropdown
            class="constructor-dropdown"
            v-model="selectedModel"
            :options="ConstructorCarModel.articuls"
            optionLabel="car_model"
            :filter="true"
            :placeholder="$t('choiceModel')"
            :showClear="true"
          >
            <template #value="slotProps">
              <div
                class="country-item country-item-value"
                v-if="slotProps.value"
              >
                <img :src="require('@/assets/img/constructor/icon.svg')" />
                <div>{{ slotProps.value.car_model.title }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="country-item">
                <img :src="require('@/assets/img/constructor/icon.svg')" />
                <div>{{ slotProps.option.car_model.title }}</div>
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="constructor-seat constructor-inner">
          <Dropdown
            class="constructor-dropdown"
            v-model="selectedSeatCover"
            :options="constructorProduct"
            optionLabel="title"
            :filter="true"
            :placeholder="$t('modelSeatCover')"
            :showClear="true"
            :disabled="!selectedModel || !selectedBrand"
          >
            <template #value="slotProps">
              <div
                class="country-item country-item-value"
                v-if="slotProps.value"
              >
                <img :src="require('@/assets/img/constructor/seatcover.svg')" />
                <div>{{ slotProps.value.title }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="country-item">
                <img :src="require('@/assets/img/constructor/seatcover.svg')" />
                <div>{{ slotProps.option.title }}</div>
              </div>
            </template>
          </Dropdown>
        </div>
      </div>
      <div class="constructor-preview__container">
        <div class="constructor-preview">
          <img
            v-if="!itsFloors"
            :src="
              picked == 'one'
                ? activeCase.mainPhoto.imgLogo
                : activeCase.mainPhoto.imgNotLogo
            "
            alt=""
            class="constructor-main__img constructor-img"
          />
          <img
            :src="defaultKant"
            :style="{
              display: defaultKant ? 'block' : 'none',
            }"
            alt=""
            class="constructor-kant__img constructor-img constructor-change"
          />
          <img
            :src="defaultStitch"
            :style="{
              display: defaultStitch ? 'block' : 'none',
            }"
            alt=""
            class="constructor-stitch__img constructor-img constructor-change"
          />
          <img
            :src="defaultAside"
            :style="{
              display: defaultAside ? 'block' : 'none',
            }"
            alt=""
            class="constructor-aside__img constructor-img constructor-change"
          />
          <img
            v-if="itsFloors && picked == 'one'"
            :src="picked == 'one' ? activeCase.podpyatnik : ''"
            alt=""
            class="constructor-main__img constructor-img"
          />
        </div>
      </div>

      <div class="constructor-workplace">
        <div class="constructor-workplace__container">
          <div class="constructor-workplace__control">
            <button class="slider-prev" @click="prevSlide">
              <i class="fal fa-long-arrow-left"></i>
            </button>
            <div class="slide-title">
              <h3 class="constructor-title" :key="currentSlideName">
                {{ $t(currentSlideName) }}
              </h3>
              <div class="slider-fraction">
                {{ currentIndex + 1 }}<span>/{{ slides.length }}</span>
              </div>
            </div>

            <button class="slider-next" @click="nextSlide">
              <i class="fal fa-long-arrow-right"></i>
            </button>
          </div>
          <div class="slider-container">
            <div
              class="slider-wrapper"
              :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
            >
              <div v-if="!itsFloors" class="slider-slide">
                <div class="constructor-btns">
                  <div
                    class="constructor-btn"
                    :class="{ 'constructor-btn__active': switchMaterial }"
                    @click="switchMaterial = false"
                  >
                    {{ $t("ecoLeather") }}
                  </div>
                  <div
                    class="constructor-btn"
                    :class="{ 'constructor-btn__active': !switchMaterial }"
                    @click="switchMaterial = true"
                  >
                    {{ $t("scotlandMaterial") }}
                  </div>
                </div>
              </div>
              <div class="slider-slide">
                <div class="constructor-colors">
                  <div class="constructor-select">
                    <div
                      label=""
                      class="constructor-select__border"
                      :class="{
                        'constructor-select__color-selected':
                          item.activeColorBtn,
                      }"
                      v-for="item in colorBtnKant"
                      :key="item.id"
                      @click="insertDefaultKant(item.id)"
                    >
                      <div
                        class="constructor-select__color"
                        :style="item"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="!itsFloors" class="slider-slide">
                <div class="constructor-colors">
                  <div class="constructor-select">
                    <div
                      label=""
                      class="constructor-select__border"
                      :class="{
                        'constructor-select__color-selected':
                          item.activeColorBtn,
                      }"
                      v-for="item in colorBtnStitch"
                      :key="item.id"
                      @click="insertdefaultStitch(item.id)"
                    >
                      <div
                        class="constructor-select__color"
                        :style="item"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="slider-slide">
                <div class="constructor-colors">
                  <div class="constructor-select">
                    <div
                      label=""
                      class="constructor-select__border"
                      :class="{
                        'constructor-select__color-selected':
                          item.activeColorBtn,
                      }"
                      v-for="item in colorBtnAside"
                      :key="item.id"
                      @click="insertdefaultAside(item.id)"
                    >
                      <div
                        class="constructor-select__color"
                        :style="item"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="slider-slide">
                <div class="constructor-radiobutton">
                  <div class="field-radiobutton">
                    <RadioButton
                      id="one"
                      name="one"
                      value="one"
                      v-model="picked"
                    />
                    <label for="one" class="slider-slide__text">{{
                      $t(toString(firstRadio))
                    }}</label>
                  </div>
                  <div class="field-radiobutton">
                    <RadioButton
                      id="two"
                      name="two"
                      value="two"
                      v-model="picked"
                    />
                    <label for="two" class="slider-slide__text">{{
                      $t(toString(secondRadio))
                    }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="constructor-verify">
        <div class="constructor-verify__wrapper">
          <div class="constructor-verify__left">
            <a class="constructor-btn" @click="openModal()">{{
              $t("submitInquiry")
            }}</a>
            <a class="constructor-btn" @click="downloadAsJpg">{{
              $t("downloadAsImage")
            }}</a>
          </div>
          <div class="constructor-verify__right">
            <p class="constructor-verify__content">
              {{ $t(constructorText) }} . <br />
              {{ $t("constructorText") }}
            </p>
          </div>
        </div>
        <Dialog
          header=" "
          :visible.sync="displayModal"
          containerStyle="max-width: 688px; width: 100%;"
          :modal="true"
        >
          <form
            class="constructor-modal"
            style="
              display: flex;
              align-self: center;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              width: 100%;
            "
          >
            <h3
              class="constructor-modal__title"
              style="
                color: var(--color-dark-dark, #23262f);
                text-align: center;
                font-family: $medium;
                font-size: 32px;
                margin-bottom: 28px;
              "
            >
              Контактная информация
            </h3>
            <p
              class="constructor-modal__txt"
              style="
                color: var(--color-dark-dark-2, #87898e);
                text-align: center;
                font-family: $regular;
                font-size: 16px;
                max-width: 503px;
                width: 100%;
                margin-bottom: 47px;
              "
            >
              Конструктор чехлов рассчитан на 4-ёх местный автомобиль - точную
              стоимость комплекта уточняйте у наших менеджеров
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
                placeholder="Имя"
                autocomplete="off"
                v-model="constructorUserName"
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
                placeholder="Номер телефона"
                autocomplete="off"
                v-model="constructorUserPhone"
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
                type="text"
                style="color: #1e1e1e; padding: 16px"
                id="help-form__user-name"
                class="input"
                placeholder="Username"
                autocomplete="off"
                v-model="constructorUserTg"
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
                width: 100%;
              "
            >
              <Button
                label="No"
                icon="pi pi-times"
                @click="createConstructorOrder"
                class="p-button-text"
              />
              <button
                label="Оставить заявку"
                @click="createConstructorOrder()"
                :class="{
                  'is-success': isSubmitSuccess,
                  'is-error': isSubmitError,
                  'is-transitioning': isTransitioning,
                  'is-timeout': isSubmitTimeout,
                }"
                autofocus
                class="constructor-modal__submit"
                style="
                  max-width: 482px;
                  width: 100%;
                  border-radius: 50px;
                  background: #1e1e1e;
                  color: #fff;
                  outline: none;
                  border: none !important;
                  box-shadow: none !important;
                  margin-bottom: 100px;
                  padding: 20px 0;
                "
              >
                {{
                  isSubmitSuccess
                    ? "Заявка отправлено"
                    : isSubmitError
                    ? "Оставить заявку"
                    : "Оставить заявку"
                }}
              </button>
            </div>
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

import Swiper, { Navigation, Pagination, Keyboard } from "swiper";
import "swiper/css";
import { useRoute } from "vue-router";
import "swiper/css/navigation";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import RadioButton from "primevue/radiobutton";
import Dropdown from "primevue/dropdown";
import Help from "@/components/Help.vue";
import html2canvas from "html2canvas";
import Dialog from "primevue/dialog";
import Swal from "sweetalert2";
export default {
  components: {
    Dropdown,
    Button,
    RadioButton,
    Help,
    html2canvas,
    Dialog,
    InputText,
  },
  data: () => ({
    selectedBrand: null,
    selectedModel: null,
    selectedSeatCover: null,
    selectedMaterial: null,
    selectedTil: null,
    selectedAside: null,
    line: null,
    kant: null,
    displayModal: false,
    defaultKant: null,
    defaultAside: null,
    defaultStitch: null,
    constructorUserName: "",
    constructorUserPhone: "",
    constructorUserTg: "",
    slideNames: [],

    slideNamesSeat: [
      "materialSeatCover",
      "colorOfKant",
      "colorOfStitch",
      "colorOfsmth",
      "logo",
    ],
    formData: [],
    currentIndex: 0,

    slides: [],
    slidesSeat: ["Slide 1", "Slide 2", "Slide 3", "Slide 4", "Slide 5"],

    switchMaterial: true,

    colorBtnKant: [],
    colorBtnKantSeat: [
      { id: 1, background: "#363636 !important", activeColorBtn: false },
      { id: 2, background: "#F04753 !important", activeColorBtn: false },
      { id: 3, background: "#C6C4C1 !important", activeColorBtn: false },
      { id: 4, background: "#637DFD !important", activeColorBtn: false },
      { id: 5, background: "#C057E3 !important", activeColorBtn: false },
      { id: 6, background: "#FAE975 !important", activeColorBtn: false },
      { id: 7, background: "#FDF3E4 !important", activeColorBtn: false },
      { id: 8, background: "#8CFD79 !important", activeColorBtn: false },
      { id: 9, background: "#4FB180 !important", activeColorBtn: false },
      { id: 10, background: "#FF92C7 !important", activeColorBtn: false },
    ],
    colorBtnStitch: [],
    colorBtnStitchSeat: [
      { id: 1, background: "#363636 !important", activeColorBtn: false },
      { id: 2, background: "#F04753 !important", activeColorBtn: false },
      { id: 3, background: "#C6C4C1 !important", activeColorBtn: false },
      { id: 4, background: "#637DFD !important", activeColorBtn: false },
      { id: 5, background: "#C057E3 !important", activeColorBtn: false },
      { id: 6, background: "#FAE975 !important", activeColorBtn: false },
      { id: 7, background: "#FDF3E4 !important", activeColorBtn: false },
      { id: 8, background: "#8CFD79 !important", activeColorBtn: false },
      { id: 9, background: "#4FB180 !important", activeColorBtn: false },
      { id: 10, background: "#FF92C7 !important", activeColorBtn: false },
    ],
    colorBtnAside: [],
    colorBtnAsideSeat: [
      { id: 1, background: "#4B4D4F !important", activeColorBtn: false },
      { id: 2, background: "#C2C2C2 !important", activeColorBtn: false },
    ],
    scottishMaterial: {
      mainPhoto: {
        imgNotLogo: require("@/assets/img/constructor/scottishMaterial/constructor-img-not-logo.png"),
        imgLogo: require("@/assets/img/constructor/scottishMaterial/constructor-img.png"),
      },
      aside: [
        {
          id: 1,
          img: require("@/assets/img/constructor/scottishMaterial/aside/a.png"),
        },
        {
          id: 2,
          img: require("@/assets/img/constructor/scottishMaterial/aside/b.png"),
        },
      ],
      stitch: [
        {
          id: 1,
          img: require("@/assets/img/constructor/scottishMaterial/stitch/a.png"),
        },
        {
          id: 2,
          img: require("@/assets/img/constructor/scottishMaterial/stitch/b.png"),
        },
        {
          id: 3,
          img: require("@/assets/img/constructor/scottishMaterial/stitch/c.png"),
        },
        {
          id: 4,
          img: require("@/assets/img/constructor/scottishMaterial/stitch/d.png"),
        },
        {
          id: 5,
          img: require("@/assets/img/constructor/scottishMaterial/stitch/e.png"),
        },
        {
          id: 6,
          img: require("@/assets/img/constructor/scottishMaterial/stitch/f.png"),
        },
        {
          id: 7,
          img: require("@/assets/img/constructor/scottishMaterial/stitch/g.png"),
        },
        {
          id: 8,
          img: require("@/assets/img/constructor/scottishMaterial/stitch/h.png"),
        },
        {
          id: 9,
          img: require("@/assets/img/constructor/scottishMaterial/stitch/i.png"),
        },
        {
          id: 10,
          img: require("@/assets/img/constructor/scottishMaterial/stitch/j.png"),
        },
      ],
      kant: [
        {
          id: 1,
          img: require("@/assets/img/constructor/scottishMaterial/kant/a.png"),
        },
        {
          id: 2,
          img: require("@/assets/img/constructor/scottishMaterial/kant/b.png"),
        },
        {
          id: 3,
          img: require("@/assets/img/constructor/scottishMaterial/kant/c.png"),
        },
        {
          id: 4,
          img: require("@/assets/img/constructor/scottishMaterial/kant/d.png"),
        },
        {
          id: 5,
          img: require("@/assets/img/constructor/scottishMaterial/kant/e.png"),
        },
        {
          id: 6,
          img: require("@/assets/img/constructor/scottishMaterial/kant/f.png"),
        },
        {
          id: 7,
          img: require("@/assets/img/constructor/scottishMaterial/kant/g.png"),
        },
        {
          id: 8,
          img: require("@/assets/img/constructor/scottishMaterial/kant/h.png"),
        },
        {
          id: 9,
          img: require("@/assets/img/constructor/scottishMaterial/kant/i.png"),
        },
        {
          id: 10,
          img: require("@/assets/img/constructor/scottishMaterial/kant/j.png"),
        },
      ],
    },

    ecoLeather: {
      mainPhoto: {
        imgNotLogo: require("@/assets/img/constructor/ecoLeather/constructor-img-not-logo.png"),
        imgLogo: require("@/assets/img/constructor/ecoLeather/constructor-img.png"),
      },
      aside: [
        {
          id: 1,
          img: require("@/assets/img/constructor/ecoLeather/aside/a.png"),
        },
        {
          id: 2,
          img: require("@/assets/img/constructor/ecoLeather/aside/b.png"),
        },
      ],
      stitch: [
        {
          id: 1,
          img: require("@/assets/img/constructor/ecoLeather/stitch/a.png"),
        },
        {
          id: 2,
          img: require("@/assets/img/constructor/ecoLeather/stitch/b.png"),
        },
        {
          id: 3,
          img: require("@/assets/img/constructor/ecoLeather/stitch/c.png"),
        },
        {
          id: 4,
          img: require("@/assets/img/constructor/ecoLeather/stitch/d.png"),
        },
        {
          id: 5,
          img: require("@/assets/img/constructor/ecoLeather/stitch/e.png"),
        },
        {
          id: 6,
          img: require("@/assets/img/constructor/ecoLeather/stitch/f.png"),
        },
        {
          id: 7,
          img: require("@/assets/img/constructor/ecoLeather/stitch/g.png"),
        },
        {
          id: 8,
          img: require("@/assets/img/constructor/ecoLeather/stitch/h.png"),
        },
        {
          id: 9,
          img: require("@/assets/img/constructor/ecoLeather/stitch/i.png"),
        },
        {
          id: 10,
          img: require("@/assets/img/constructor/ecoLeather/stitch/j.png"),
        },
      ],
      kant: [
        {
          id: 1,
          img: require("@/assets/img/constructor/ecoLeather/kant/a.png"),
        },
        {
          id: 2,
          img: require("@/assets/img/constructor/ecoLeather/kant/b.png"),
        },
        {
          id: 3,
          img: require("@/assets/img/constructor/ecoLeather/kant/c.png"),
        },
        {
          id: 4,
          img: require("@/assets/img/constructor/ecoLeather/kant/d.png"),
        },
        {
          id: 5,
          img: require("@/assets/img/constructor/ecoLeather/kant/e.png"),
        },
        {
          id: 6,
          img: require("@/assets/img/constructor/ecoLeather/kant/f.png"),
        },
        {
          id: 7,
          img: require("@/assets/img/constructor/ecoLeather/kant/g.png"),
        },
        {
          id: 8,
          img: require("@/assets/img/constructor/ecoLeather/kant/h.png"),
        },
        {
          id: 9,
          img: require("@/assets/img/constructor/ecoLeather/kant/i.png"),
        },
        {
          id: 10,
          img: require("@/assets/img/constructor/ecoLeather/kant/j.png"),
        },
      ],
    },
    polikModel: [
      {
        title: "Автополик  Eva",
      },
    ],
    activeCase: [],
    picked: "one",

    idPage: null,
    itsFloors: false,

    floors: {
      podpyatnik: require("@/assets/img/constructor/floors/podpyatnik.png"),
      slides: ["Slide 1", "Slide 2", "Slide 3"],
      slideNames: ["Цвет полика", "Цвет канта", "Подпятник"],
      aside: [
        {
          id: 1,
          img: require("@/assets/img/constructor/floors/floorsLining/a.png"),
        },
        {
          id: 2,
          img: require("@/assets/img/constructor/floors/floorsLining/b.png"),
        },
        {
          id: 3,
          img: require("@/assets/img/constructor/floors/floorsLining/c.png"),
        },
        {
          id: 4,
          img: require("@/assets/img/constructor/floors/floorsLining/d.png"),
        },
        {
          id: 5,
          img: require("@/assets/img/constructor/floors/floorsLining/e.png"),
        },
      ],
      kant: [
        {
          id: 1,
          img: require("@/assets/img/constructor/floors/floorsСolor/a.png"),
        },
        {
          id: 2,
          img: require("@/assets/img/constructor/floors/floorsСolor/b.png"),
        },
        {
          id: 3,
          img: require("@/assets/img/constructor/floors/floorsСolor/c.png"),
        },
        {
          id: 4,
          img: require("@/assets/img/constructor/floors/floorsСolor/d.png"),
        },
      ],
      colorBtnAside: [
        { id: 1, background: "#363636 !important", activeColorBtn: false },
        { id: 2, background: "#EA2E2B !important", activeColorBtn: false },
        { id: 3, background: "#939393 !important", activeColorBtn: false },
        { id: 4, background: "#648EAF !important", activeColorBtn: false },
        { id: 5, background: "#61BA56 !important", activeColorBtn: false },
      ],
      colorBtnKant: [
        { id: 1, background: "#363636 !important", activeColorBtn: true },
        { id: 2, background: "#EA2E2B !important", activeColorBtn: false },
        { id: 3, background: "#939393 !important", activeColorBtn: false },
        { id: 4, background: "#314556 !important", activeColorBtn: false },
      ],
    },
  }),
  watch: {
    switchMaterial() {
      if (this.switchMaterial == true) {
        this.activeCase = this.scottishMaterial;

        this.defaultAside = null;
        this.defaultKant = null;
        this.defaultStitch = null;

        for (let i = 0; i < this.colorBtnStitch.length; i++) {
          this.colorBtnStitch[i].activeColorBtn = false;
        }
        for (let i = 0; i < this.colorBtnKant.length; i++) {
          this.colorBtnKant[i].activeColorBtn = false;
        }
        for (let i = 0; i < this.colorBtnAside.length; i++) {
          this.colorBtnAside[i].activeColorBtn = false;
        }
      } else {
        this.activeCase = this.ecoLeather;

        this.defaultAside = null;
        this.defaultKant = null;
        this.defaultStitch = null;

        for (let i = 0; i < this.colorBtnStitch.length; i++) {
          this.colorBtnStitch[i].activeColorBtn = false;
        }
        for (let i = 0; i < this.colorBtnKant.length; i++) {
          this.colorBtnKant[i].activeColorBtn = false;
        }
        for (let i = 0; i < this.colorBtnAside.length; i++) {
          this.colorBtnAside[i].activeColorBtn = false;
        }
      }
    },
    $route(newRoute, oldRoute) {
      if (newRoute.fullPath == "/constructor/2") {
        this.currentIndex = 0;
        this.itsFloors = true;
        this.activeCase = this.floors;

        this.defaultAside = null;
        this.defaultKant = this.floors.kant[0].img;
        this.defaultStitch = null;

        for (let i = 0; i < this.colorBtnStitch.length; i++) {
          this.colorBtnStitch[i].activeColorBtn = false;
        }
        for (let i = 0; i < this.colorBtnKant.length; i++) {
          this.colorBtnKant[i].activeColorBtn = false;
        }
        for (let i = 0; i < this.colorBtnAside.length; i++) {
          this.colorBtnAside[i].activeColorBtn = false;
        }

        this.slideNames = this.floors.slideNames;
        this.slides = this.floors.slides;
        this.colorBtnKant = this.floors.colorBtnKant;
        this.colorBtnStitch = [];
        this.colorBtnAside = this.floors.colorBtnAside;

        this.colorBtnKant[0].activeColorBtn = true;
      } else {
        this.currentIndex = 0;
        this.itsFloors = false;
        this.activeCase = this.scottishMaterial;

        this.defaultAside = null;
        this.defaultKant = null;
        this.defaultStitch = null;

        for (let i = 0; i < this.colorBtnStitch.length; i++) {
          this.colorBtnStitch[i].activeColorBtn = false;
        }
        for (let i = 0; i < this.colorBtnKant.length; i++) {
          this.colorBtnKant[i].activeColorBtn = false;
        }
        for (let i = 0; i < this.colorBtnAside.length; i++) {
          this.colorBtnAside[i].activeColorBtn = false;
        }

        this.slideNames = this.slideNamesSeat;
        this.slides = this.slidesSeat;
        this.colorBtnKant = this.colorBtnKantSeat;
        this.colorBtnStitch = this.colorBtnStitchSeat;
        this.colorBtnAside = this.colorBtnAsideSeat;
      }
    },
  },
  computed: {
    ...mapGetters("filter", [
      "carBrand",
      "carModel",
      "categories",
      "ConstructorCarModel",
    ]),
    ...mapGetters("constructor", ["seatModel"]),
    ...mapGetters("products", ["products", "infoProduct", "filteredProducts"]),
    currentSlideName() {
      return this.slideNames[this.currentIndex];
    },
    constructorText() {
      const routerParamsId = this.$route.params.id;

      if (routerParamsId === "2") {
        return "constructorPolik";
      } else {
        return "constructorSeatcover";
      }
    },

    placeholderText() {
      const routerParamsId = this.$route.params.id;

      if (routerParamsId === "2") {
        return "Модель полика";
      } else {
        return "Модель чехла";
      }
    },

    constructorCategory() {
      const routerParamsId = this.$route.params.id;

      if (routerParamsId === "2") {
        return "p";
      } else {
        return "c";
      }
    },
    constructorProductId() {
      const routerParamsId = this.$route.params.id;

      if (routerParamsId === "2") {
        return 26;
      } else {
        return 18;
      }
    },
    constructorProduct() {
      const routerParamsId = this.$route.params.id;

      if (routerParamsId === "2") {
        return this.polikModel;
      } else {
        return this.filteredSeatModel;
      }
    },

    filteredSeatModel() {
      // Проверка на наличие seatModel и массива seatModel.title
      if (this.seatModel && Array.isArray(this.seatModel)) {
        return this.seatModel.map((item) => {
          if (item.title) {
            item.title = item.title.replace("Авточехол", "").trim();
          }
          return item;
        });
      } else {
        return [];
      }
    },

    firstRadio() {
      if (this.itsFloors) {
        return "С подпятником";
      } else {
        return "withLogo";
      }
    },
    secondRadio() {
      if (this.itsFloors) {
        return "Без подпятника";
      } else {
        return "withoutLogo";
      }
    },
  },
  methods: {
    ...mapActions("products", ["getProducts", "getInfoProduct", "applyFilter"]),
    ...mapActions("filter", [
      "getCarBrand",
      "getCarModel",
      "getCategories",
      "getConstructorCarBrand",
      "getConstructorCarModels",
    ]),
    ...mapActions("constructor", ["getSeatModel"]),
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    nextSlide() {
      if (this.currentIndex < this.slides.length - 1) {
        this.currentIndex++;
      }
    },
    openModal() {
      if (!this.selectedSeatCover) {
        Swal.fire({
          icon: "error",
          title: "",
          text: "Выберите Модель чехла",
          showConfirmButton: false,
          timer: 5000,
          iconColor: "#1e1e1e",
        });
        return; // Exit the function to prevent further execution
      }
      this.displayModal = true;
    },
    closeModal() {
      this.displayModal = false;
    },
    downloadAsJpg() {
      const element = document.querySelector(".constructor-preview");

      html2canvas(element, {
        useCORS: true,
        scale: 2,
        quality: 1,
      }).then((canvas) => {
        const dataUrl = canvas.toDataURL("image/jpeg");
        this.formData.photo = dataUrl;
        const link = document.createElement("a");
        link.href = dataUrl;

        link.download = "constructor-seat.jpg";

        link.click();
      });
    },
    createConstructorOrder() {
      const element = document.querySelector(".constructor-preview");

      html2canvas(element, {
        useCORS: true,
        scale: 2,
        quality: 1,
      }).then((canvas) => {
        const dataUrl = canvas.toDataURL("image/jpeg");
        const file = dataURLtoFile(dataUrl, "constructor-seat.jpg");

        const formData = new FormData();
        formData.append("category", this.constructorCategory);
        formData.append("product", this.constructorProductId);
        formData.append("product_model", this.selectedSeatCover.id);
        formData.append("full_name", this.constructorUserName);
        formData.append("car_model", this.selectedModel.car_model.id);
        formData.append("phone_number", this.constructorUserPhone);
        formData.append("email", this.constructorUserTg);
        formData.append("remove_logo", true);
        formData.append("remove_podpyatnik", false);
        formData.append("photo", file); // Add the File object to formData

        // Now, you can send the formData using Axios
        axios
          .post(`constructor/product_create/`, formData)
          .then((response) => {
            // Handle successful upload
            console.log("File uploaded successfully!");
            this.constructorUserName = "";
            this.constructorUserPhone = "";
            this.constructorUserTg = "";
            this.isSubmitSuccess = true;
            this.isSubmitError = false;
            this.isSubmitError = false;
          })
          .catch((error) => {
            this.isSubmitSuccess = false;
            this.isSubmitError = true;
            this.isTransitioning = false;
          });
      });
    },
    handleBrandChange(selectedBrand) {
      if (this.selectedBrandId !== selectedBrand.id) {
        // Если выбран другой бренд, сбрасываем активность всех брендов
        this.carBrand.forEach((brand) => {
          brand.active = false;
        });

        // Устанавливаем активность для выбранного бренда
        selectedBrand.active = true;
        this.selectedBrandId = selectedBrand.id;

        // Получаем модели для выбранного бренда
      } else {
        // Снимаем выбор с выбранного бренда
        selectedBrand.active = false;
        this.selectedBrandId = null;

        // Сбрасываем модели
        this.carModel.forEach((model) => {
          model.active = false;
        });
      }
    },

    insertdefaultStitch(id) {
      let valueImg = this.activeCase.stitch.find((i) => {
        return i.id == id;
      });
      this.defaultStitch = valueImg.img;

      let indexColor = this.activeCase.stitch.findIndex((i) => {
        return i.id == id;
      });

      for (let i = 0; i < this.colorBtnStitch.length; i++) {
        this.colorBtnStitch[i].activeColorBtn = false;
      }

      this.colorBtnStitch[indexColor].activeColorBtn = true;
    },

    insertDefaultKant(id) {
      let valueImg = this.activeCase.kant.find((i) => {
        return i.id == id;
      });
      this.defaultKant = valueImg.img;

      let indexColor = this.activeCase.kant.findIndex((i) => {
        return i.id == id;
      });

      for (let i = 0; i < this.colorBtnKant.length; i++) {
        this.colorBtnKant[i].activeColorBtn = false;
      }

      this.colorBtnKant[indexColor].activeColorBtn = true;
    },

    insertdefaultAside(id) {
      let valueImg = this.activeCase.aside.find((i) => {
        return i.id == id;
      });
      this.defaultAside = valueImg.img;

      let indexColor = this.activeCase.aside.findIndex((i) => {
        return i.id == id;
      });

      for (let i = 0; i < this.colorBtnAside.length; i++) {
        this.colorBtnAside[i].activeColorBtn = false;
      }

      this.colorBtnAside[indexColor].activeColorBtn = true;
    },
  },
  async mounted() {
    this.getCategories();
    await this.getConstructorCarBrand();
    this.getConstructorCarModels();
    this.getSeatModel();
    const routerParamsId = this.$route;

    this.idPage = this.$route.params.id;

    if (this.idPage == 2) {
      this.currentIndex = 0;
      this.itsFloors = true;
      this.activeCase = this.floors;

      this.defaultAside = null;
      this.defaultKant = this.floors.kant[0].img;
      this.defaultStitch = null;

      this.slideNames = this.floors.slideNames;
      this.slides = this.floors.slides;
      this.colorBtnKant = this.floors.colorBtnKant;
      this.colorBtnStitch = [];
      this.colorBtnAside = this.floors.colorBtnAside;
    } else {
      this.currentIndex = 0;
      this.itsFloors = false;
      this.activeCase = this.scottishMaterial;

      this.defaultAside = null;
      this.defaultKant = null;
      this.defaultStitch = null;

      this.slideNames = this.slideNamesSeat;
      this.slides = this.slidesSeat;
      this.colorBtnKant = this.colorBtnKantSeat;
      this.colorBtnStitch = this.colorBtnStitchSeat;
      this.colorBtnAside = this.colorBtnAsideSeat;
    }
  },
};
</script>

<style lang="scss" scoped>
.label-dropdown {
  position: absolute;
}

.p-dropdown {
  position: relative !important;
  max-width: 250px !important;
  width: 100%;
}

.p-dropdown-item {
  display: flex !important;
}

.country-item {
  display: flex !important;
  column-gap: 11px;

  img {
    width: 25px;
    height: 25px;
  }
}

.p-dropdown-header {
  display: none !important;
}

.p-dropdown-trigger {
  width: 24px !important;
  height: 24px !important;
  background: #1e1e1e !important;
}

.p-dialog-header {
  border-bottom: none !important;
}

.p-button-text {
  display: none !important;
}

.p-dialog-footer {
  align-items: center !important;
  justify-content: center !important;
  display: flex !important;
}

.p-dialog-content {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.p-dropdown-clear-icon {
  color: #495057;
  right: 3.357rem !important;
}

.p-dialog {
  padding: 0 5px;
}

.slider {
  text-align: center;
  margin: 20px;
}

.slider-slide__text {
  font-family: "Roboto-regular";
  margin-right: 10px;
  margin-left: 10px;
}

.field-radiobutton {
  margin-right: 20px;
  display: flex;
}

.slider-container {
  overflow: hidden;
  position: relative;
  width: 100%;
  max-width: 600px;
}

.slider-wrapper {
  display: flex;
  transition: transform 0.3s ease;
}

.slider-slide {
  flex: 0 0 100%;
  width: 100%;
  text-align: center;
  font-size: 24px;
  padding: 20px;
}

.slider-prev,
.slider-next {
  padding: 10px 12px;

  background: #fff;

  color: #000;
  border: none;
  cursor: pointer;
  font-size: 20px;

  border-radius: 50%;
  transition: all 0.2s linear 0s;
}

.slider-prev:hover,
.slider-next:hover {
  background-color: #0057b32c;
  transition: all 0.2s linear 0s;
}

.constructor-title {
  max-width: 300px;
  width: 100%;
  font-size: 16px;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.slide-fade-enter,
.slide-fade-leave-to

/* .slide-fade-leave-active в <=2.1.8 */ {
  opacity: 0;
  transform: translateX(-10px);
  /* или любое другое значение, которое вы хотите */
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

.p-dropdown-trigger {
  margin-right: 10px !important;
}
</style>
