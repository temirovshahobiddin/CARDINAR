<template>
  <div class="constructor">
    <div class="container">
      <div class="constructor-wrapper">
        <div class="constructor-left">
          <div class="constructor-mark constructor-inner">
            <h3 class="constructor-left__title">Автомобиль</h3>

            <Dropdown
              class="constructor-dropdown"
              v-model="selectedBrand"
              :options="carBrand"
              optionLabel="title"
              :filter="true"
              placeholder="Выберите марку"
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
              :options="carModel"
              optionLabel="title"
              :filter="true"
              placeholder="Выберите модель"
              :showClear="true"
              :disabled="!selectedBrand"
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
          <div class="constructor-seat constructor-inner">
            <h3 class="constructor-left__title">Модель чехла</h3>

            <Dropdown
              class="constructor-dropdown"
              v-model="selectedSeatCover"
              :options="filteredSeatModel"
              optionLabel="title"
              :filter="true"
              placeholder="Выберите марку"
              :showClear="true"
              :disabled="!selectedModel || !selectedBrand"
            >
              <template #value="slotProps">
                <div
                  class="country-item country-item-value"
                  v-if="slotProps.value"
                >
                  <img
                    :src="require('@/assets/img/constructor/seatcover.svg')"
                  />
                  <div>{{ slotProps.value.title }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="country-item">
                  <img
                    :src="require('@/assets/img/constructor/seatcover.svg')"
                  />
                  <div>{{ slotProps.option.title }}</div>
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="constructor-material constructor-inner">
            <h3 class="constructor-left__title">
              Материал центральной вставки
            </h3>

            <Dropdown
              class="constructor-dropdown"
              v-model="selectedMaterial"
              :options="materials"
              optionLabel="name"
              :filter="true"
              placeholder="Выберите марку"
              :showClear="true"
              :disabled="!selectedSeatCover"
            >
              <template #value="slotProps">
                <div
                  class="country-item country-item-value"
                  v-if="slotProps.value"
                >
                  <img
                    :src="require('@/assets/img/constructor/icon.svg')"
                    :class="'flag flag-' + slotProps.value.code.toLowerCase()"
                  />
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="country-item">
                  <img
                    :src="require('@/assets/img/constructor/icon.svg')"
                    :class="'flag flag-' + slotProps.option.code.toLowerCase()"
                  />
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="constructor-color__center">
            <h3 class="constructor-left__title">Цвет центральной вставки</h3>
            <div class="constructor-color__center-inner">
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 4B4D4F"
                style="background: #4b4d4f !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color F22121"
                style="background: #f22121 !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color C2C2C2"
                style="background: #51ff00 !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 332FEB"
                style="background: #332feb !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 9B4DC2"
                style="background: #9b4dc2 !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 4B4D4F"
                style="background: #4b4d4f !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color F2E9DC"
                style="background: #f2e9dc !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 7BB0FF"
                style="background: #7bb0ff !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 880827"
                style="background: #880827 !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color F4EDF8"
                style="background: #f4edf8 !important; border: none !important"
              />
            </div>
          </div>
          <div class="constructor-til">
            <h3 class="constructor-left__title">Материал задней части</h3>

            <Dropdown
              class="constructor-dropdown"
              v-model="selectedTil"
              :options="tils"
              optionLabel="name"
              :filter="true"
              placeholder="Выберите марку"
              :showClear="true"
              :disabled="!selectedSeatCover"
            >
              <template #value="slotProps">
                <div
                  class="country-item country-item-value"
                  v-if="slotProps.value"
                >
                  <img
                    :src="require('@/assets/img/constructor/icon.svg')"
                    :class="'flag flag-' + slotProps.value.code.toLowerCase()"
                  />
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="country-item">
                  <img
                    :src="require('@/assets/img/constructor/icon.svg')"
                    :class="'flag flag-' + slotProps.option.code.toLowerCase()"
                  />
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="constructor-color__til">
            <h3 class="constructor-left__title">Цвет задней части</h3>
            <div class="constructor-color__til-inner">
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 4B4D4F"
                style="background: #4b4d4f !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color F22121"
                style="background: #f22121 !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color C2C2C2"
                style="background: #51ff00 !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 332FEB"
                style="background: #332feb !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 9B4DC2"
                style="background: #9b4dc2 !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 4B4D4F"
                style="background: #4b4d4f !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color F2E9DC"
                style="background: #f2e9dc !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 7BB0FF"
                style="background: #7bb0ff !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 880827"
                style="background: #880827 !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color F4EDF8"
                style="background: #f4edf8 !important; border: none !important"
              />
            </div>
          </div>
        </div>
        <div class="constructor-center">
          <div class="constructor-workplace">
            <div class="constructor-workplace__seat">
              <img
                :src="img"
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
            </div>
          </div>
          <div class="constructor-price"></div>
          <div class="constructor-description">
            <p class="constructor-description__txt">
              Конструктор чехлов рассчитан на 4-ёх местный автомобиль - точную
              стоимость комплекта уточняйте у наших менеджеров
              <span>Срок пошива от 15-25 рабочих дней</span>
            </p>
          </div>
          <div class="construction-btns">
            <a
              href="#"
              class="constructor-btn constructor-submit"
              @click="openModal()"
              >Оставить заявку</a
            >
            <a
              href="#"
              class="constructor-btn constructor-download"
              @click="downloadAsJpg"
              >Сохраниь в Jpg</a
            >
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
              "
            >
              <Button
                label="No"
                icon="pi pi-times"
                @click="closeModal"
                class="p-button-text"
              />
              <Button
                label="Оставить заявку"
                @click="closeModal"
                autofocus
                class="constructor-modal__submit"
                style="
                  max-width: 482px;
                  width: 100%;
                  border-radius: 50px;
                  background: #1e1e1e;
                  outline: none;
                  border: none !important;
                  box-shadow: none !important;
                  margin-bottom: 100px;
                  padding: 20px 0;
                "
              />
            </div>
          </template>
        </Dialog>
        <div class="constructor-right">
          <div class="constructor-aside constructor-inner">
            <h3 class="constructor-right__title">Материал боковой части</h3>

            <Dropdown
              class="constructor-dropdown"
              v-model="selectedAside"
              :options="asides"
              optionLabel="name"
              :filter="true"
              placeholder="Выберите марку"
              :showClear="true"
              :disabled="!selectedSeatCover"
            >
              <template #value="slotProps">
                <div
                  class="country-item country-item-value"
                  v-if="slotProps.value"
                >
                  <img
                    :src="require('@/assets/img/constructor/icon.svg')"
                    :class="'flag flag-' + slotProps.value.code.toLowerCase()"
                  />
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="country-item">
                  <img
                    :src="require('@/assets/img/constructor/icon.svg')"
                    :class="'flag flag-' + slotProps.option.code.toLowerCase()"
                  />
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
            </Dropdown>
          </div>

          <div class="constructor-color__aside">
            <h3 class="constructor-left__title">Цвет боковой части</h3>
            <div class="constructor-color__aside-inner">
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 4B4D4F"
                style="background: #4b4d4f !important; border: none !important"
                @click="changeAside('white')"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color F22121"
                style="background: #f22121 !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color C2C2C2"
                style="background: #51ff00 !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 332FEB"
                style="background: #332feb !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 9B4DC2"
                style="background: #9b4dc2 !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 4B4D4F"
                style="background: #4b4d4f !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color F2E9DC"
                style="background: #f2e9dc !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 7BB0FF"
                style="background: #7bb0ff !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 880827"
                style="background: #880827 !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color F4EDF8"
                style="background: #f4edf8 !important; border: none !important"
              />
            </div>
          </div>
          <div class="constructor-color__stitching">
            <h3 class="constructor-left__title">Цвет строчки</h3>
            <div class="constructor-color__aside-inner">
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 4B4D4F"
                style="background: #4b4d4f !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color F22121"
                style="background: #f22121 !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color C2C2C2"
                style="background: #51ff00 !important; border: none !important"
                @click="changeStitch('green')"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 332FEB"
                style="background: #332feb !important; border: none !important"
                @click="changeStitch('blue')"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 9B4DC2"
                style="background: #9b4dc2 !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 4B4D4F"
                style="background: #4b4d4f !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color F2E9DC"
                style="background: #f2e9dc !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 7BB0FF"
                style="background: #7bb0ff !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 880827"
                style="background: #880827 !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color F4EDF8"
                style="background: #f4edf8 !important; border: none !important"
              />
            </div>
          </div>
          <div class="constructor-kant">
            <h3 class="constructor-left__title">Кант</h3>
            <div class="constructor-radio">
              <div class="field-radiobutton">
                <RadioButton
                  id="withKant"
                  name="withKant"
                  value="withKant"
                  v-model="kant"
                  :disabled="!selectedSeatCover"
                />
                <label for="withKant">С кантом</label>
              </div>
            </div>
          </div>
          <div class="constructor-color__stitching">
            <h3 class="constructor-left__title">Цвет канта</h3>
            <div class="constructor-color__aside-inner">
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 4B4D4F"
                style="background: #4b4d4f !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color F22121"
                style="background: #f22121 !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color C2C2C2"
                style="background: #51ff00 !important; border: none !important"
                @click="changeKant('green')"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 332FEB"
                style="background: #332feb !important; border: none !important"
                @click="changeKant('blue')"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 9B4DC2"
                style="background: #9b4dc2 !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 4B4D4F"
                style="background: #4b4d4f !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color F2E9DC"
                style="background: #f2e9dc !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 7BB0FF"
                style="background: #7bb0ff !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color 880827"
                style="background: #880827 !important; border: none !important"
              />
              <Button
                :disabled="!selectedSeatCover"
                label=""
                class="constructor-select__color F4EDF8"
                style="background: #f4edf8 !important; border: none !important"
              />
            </div>
          </div>
        </div>
      </div>
      <Help></Help>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import RadioButton from "primevue/radiobutton";
import Dropdown from "primevue/dropdown";
import Help from "@/components/Help.vue";
import html2canvas from "html2canvas";
import Dialog from "primevue/dialog";
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
    placeHolderMarkText: '<i class="fas fa-car-side"></i>  Выберите марку',
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

    img: require("@/assets/img/constructor/constructor-img.png"),
    stitch: {
      green: {
        stitch: require("@/assets/img/constructor/stitch/green-stitch.png"),
      },
      blue: {
        stitch: require("@/assets/img/constructor/stitch/blue-stitch.png"),
      },
      pink: {
        stitch: require("@/assets/img/constructor/stitch/pink-stitch.png"),
      },
      yellow: {
        stitch: require("@/assets/img/constructor/stitch/yellow-stitch.png"),
      },
      /*  {
       
        kant: require("@/assets/img/constructor/green-kant.png"),
      }, */
    },
    kant: {
      green: {
        kant: require("@/assets/img/constructor/kant/green-kant.png"),
      },
      blue: {
        kant: require("@/assets/img/constructor/kant/blue-kant.png"),
      },
      pink: {
        kant: require("@/assets/img/constructor/kant/pink-kant.png"),
      },
      yellow: {
        kant: require("@/assets/img/constructor/kant/yellow-kant.png"),
      },
      white: {
        kant: require("@/assets/img/constructor/kant/white-kant.png"),
      },
    },
    aside: {
      white: {
        aside: require("@/assets/img/constructor/aside/white-aside.png"),
      },
      black: {
        aside: require("@/assets/img/constructor/aside/black-aside.png"),
      },
    },

    marks: [
      { name: "Chevrolet", code: "NY" },
      { name: "Rawon", code: "RM" },
      { name: "Daewoo", code: "LDN" },
      { name: "Kia", code: "IST" },
      { name: "Hyundai", code: "PRS" },
      { name: "BYD", code: "PRS" },
      { name: "Jetour", code: "PRS" },
    ],
    Models: [
      { name: "Chevrolet", code: "NY" },
      { name: "Rawon", code: "RM" },
      { name: "Daewoo", code: "LDN" },
      { name: "Kia", code: "IST" },
      { name: "Hyundai", code: "PRS" },
      { name: "BYD", code: "PRS" },
      { name: "Jetour", code: "PRS" },
    ],
    seatCovers: [
      { name: "Chevrolet", code: "NY" },
      { name: "Rawon", code: "RM" },
      { name: "Daewoo", code: "LDN" },
      { name: "Kia", code: "IST" },
      { name: "Hyundai", code: "PRS" },
      { name: "BYD", code: "PRS" },
      { name: "Jetour", code: "PRS" },
    ],
    materials: [
      { name: "Chevrolet", code: "NY" },
      { name: "Rawon", code: "RM" },
      { name: "Daewoo", code: "LDN" },
      { name: "Kia", code: "IST" },
      { name: "Hyundai", code: "PRS" },
      { name: "BYD", code: "PRS" },
      { name: "Jetour", code: "PRS" },
    ],
    tils: [
      { name: "Chevrolet", code: "NY" },
      { name: "Rawon", code: "RM" },
      { name: "Daewoo", code: "LDN" },
      { name: "Kia", code: "IST" },
      { name: "Hyundai", code: "PRS" },
      { name: "BYD", code: "PRS" },
      { name: "Jetour", code: "PRS" },
    ],
    asides: [
      { name: "Chevrolet", code: "NY" },
      { name: "Rawon", code: "RM" },
      { name: "Daewoo", code: "LDN" },
      { name: "Kia", code: "IST" },
      { name: "Hyundai", code: "PRS" },
      { name: "BYD", code: "PRS" },
      { name: "Jetour", code: "PRS" },
    ],
    links: [
      { link: "/", name: "Главная   >" },
      { link: "/", name: "Магазин" },
    ],
  }),
  computed: {
    ...mapGetters("filter", ["carBrand", "carModel", "categories"]),
    ...mapGetters("constructor", ["seatModel"]),
    ...mapGetters("products", ["products", "infoProduct", "filteredProducts"]),
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
  },
  methods: {
    ...mapActions("products", ["getProducts", "getInfoProduct", "applyFilter"]),
    ...mapActions("filter", ["getCarBrand", "getCarModel", "getCategories"]),
    ...mapActions("constructor", ["getSeatModel"]),
    changeStitch(color) {
      if (this.stitch.hasOwnProperty(color)) {
        this.defaultStitch = this.stitch[color].stitch;
      }
    },
    changeAside(color) {
      if (this.aside.hasOwnProperty(color)) {
        this.defaultAside = this.aside[color].aside;
      }
    },
    changeKant(color) {
      if (this.kant.hasOwnProperty(color)) {
        this.defaultKant = this.kant[color].kant;
      }
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
        this.getCarModel(selectedBrand.id);
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
    downloadAsJpg() {
      const element = document.querySelector(".constructor-workplace__seat");

      html2canvas(element, {
        useCORS: true,
        scale: 2,
        quality: 1,
      }).then((canvas) => {
        const dataUrl = canvas.toDataURL("image/jpeg");

        const link = document.createElement("a");
        link.href = dataUrl;

        link.download = "constructor-seat.jpg";

        link.click();
      });
    },
    openModal() {
      this.displayModal = true;
    },
    closeModal() {
      this.displayModal = false;
    },
  },
  mounted() {
    this.getCategories();
    this.getCarBrand();
    this.getCarModel();
    this.getSeatModel();
  },
};
</script>

<style lang="scss" scoped>
.label-dropdown {
  position: absolute;
}
.p-dropdown {
  position: relative !important;
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
  width: 24px !important
    ;
  height: 24px !important
    ;
  background: #1e1e1e !important
    ;
}
.p-dialog-header {
  border-bottom: none !important;
}
.constructor-select__color {
  width: 35px !important;
  height: 35px !important;
  padding: 0 !important;
  border-radius: 50% !important;
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
</style>

   