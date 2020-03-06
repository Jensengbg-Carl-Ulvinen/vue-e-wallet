<template>
  <section class="form-sect">
    <Modal v-if="showModal" :hideButton="modalInfo.hideButton" @close="closeModal">
      <h3 slot="header">{{ modalInfo.header }}</h3>
      <h3 slot="body">{{ modalInfo.body }}</h3>
      <h3 slot="footer">{{ modalInfo.footer }}</h3>
    </Modal>
    <form>
      <div class="form-group" :class="{ 'form-group--error': $v.input.cardNumber.$error }">
        <label class="form-label">Kort nummer</label>
        <input
          placeholder="16-digit card number"
          class="form-input form-input--std"
          type="text"
          pattern="[0-9]{16,16}"
          maxlength="16"
          v-model.number="input.cardNumber"
          @input="setValue('cardNumber', $event.target.value)"
        />

        <p class="error" v-if="!$v.input.cardNumber.integer">Endast nummer accepteras</p>
        <p class="error" v-else-if="!$v.input.cardNumber.minLength">
          Kort nummret måste vara minst
          {{ $v.input.cardNumber.$params.minLength.min }} digits långt!
        </p>
        <p
          class="error"
          v-else-if="
            !$v.input.cardNumber.required && $v.input.cardNumber.$dirty
          "
        >Kort nummer är nödvändigt</p>
      </div>
      <div class="form-group" :class="{ 'form-group--error': $v.input.cardHolder.$error }">
        <label class="form-label">Kort hållare</label>
        <input
          placeholder="Firstname Lastname"
          class="form-input form-input--std"
          maxlength="30"
          type="text"
          v-model.trim="input.cardHolder"
          @input="setValue('cardHolder', $event.target.value)"
        />
        <p
          class="error"
          v-if="!$v.input.cardHolder.alphaDiacritic"
        >Nummer och speciella karaktärer är ogiltiga</p>
        <p class="error" v-else-if="!$v.input.cardHolder.minLength">
          Kort hållare måste vara minst
          {{ $v.input.cardHolder.$params.minLength.min }} bokstäver långt.
        </p>
        <p
          class="error"
          v-else-if="
            !$v.input.cardHolder.required && $v.input.cardHolder.$dirty
          "
        >Kort hållare är nödvändigt.</p>
      </div>
      <div class="form-group-inline">
        <div class="form-group form-group-inline-1">
          <label class="form-label">Giltigt till</label>
          <div class="form-group-valid">
            <div :class="{ 'form-group--error': yearEmpty }">
              <vSelect
                :components="{ Deselect }"
                placeholder="Year"
                v-model="input.valYear"
                :options="years"
                @input="setSelect('yearEmpty')"
              />
              <p class="error" v-if="yearEmpty">År är nödvändigt</p>
            </div>
            <div :class="{ 'form-group--error': monthEmpty }">
              <vSelect
                :components="{ Deselect }"
                placeholder="Month"
                v-model="input.valMonth"
                :options="months"
                @input="setSelect('monthEmpty')"
              />
              <p class="error" v-if="monthEmpty">Månader är nödvändigt</p>
            </div>
          </div>
        </div>
        <div
          class="form-group form-group-inline-2"
          :class="{ 'form-group--error': $v.input.ccv.$error }"
        >
          <label class="form-label">CCV</label>
          <input
            placeholder="3-digits"
            class="form-input form-input--min"
            type="text"
            v-model.number="input.ccv"
            maxlength="3"
            @input="setValue('ccv', $event.target.value)"
          />

          <p class="error" v-if="!$v.input.ccv.integer">Endast nummer accepteras.</p>
          <p class="error" v-else-if="!$v.input.ccv.minLength">
            CCV måste vara
            {{ $v.input.ccv.$params.minLength.min }} nummer långt
          </p>
          <p
            class="error"
            v-else-if="!$v.input.ccv.required && $v.input.ccv.$dirty"
          >CCV är nödvändigt</p>
        </div>
      </div>
      <div class="form-group" :class="{ 'form-group--error': vendorEmpty }">
        <label class="form-label">Återförsäljare</label>
        <vSelect
          class="form-input--std"
          type="text"
          v-model="input.vendor"
          :options="vendors"
          label="name"
          @input="setSelect('vendorEmpty')"
        ></vSelect>
        <p class="error" v-if="vendorEmpty">Återförsäljare är nödvändigt</p>
      </div>
    </form>

    <div class="btn-cont">
      <button class="btn btn-primary" @click="addCard">Lägg till kort!</button>
      <button class="btn btn-secondary" @click="$router.push('/')">Avbryt!</button>
    </div>
  </section>
</template>

<script>
import {
  required,
  integer,
  minLength,
  maxLength,
  helpers
} from "vuelidate/lib/validators";
import vSelect from "vue-select";
const alphaDiacritic = helpers.regex("alphaDiacritic", /^[a-zA-ZÀ-ž ]*$/);
import { vendors } from "@/assets/vendors.json";
import { add } from "@/modules/localStorage-ops.js";
import { modalInfo, setModal } from "@/modules/modal-handler.js";
import Modal from "./Modal.vue";

export default {
  components: {
    vSelect,
    Modal
  },
  data: () => {
    return {
      vendors: vendors,
      vendorEmpty: false,
      yearEmpty: false,
      monthEmpty: false,
      showModal: false
    };
  },
  props: {
    input: Object
  },
  methods: {
    setValue(field, value) {
      this.input[field] = value;
      this.$v.input[field].$touch();
    },
    setSelect(field) {
      this[field] = false;
    },
    closeModal() {
      this.showModal = false;
      if (!this.modalInfo.state) this.$router.push("/");
    },
    setModal(state = 0) {
      this.showModal = false;
      setModal(state);
      this.showModal = true;
    },
    async addCard() {
      let stop = false;
      if (
        !Object.prototype.hasOwnProperty.call(this.input.vendor, "name") ||
        !this.input.vendor.name
      ) {
        stop = true;
        this.vendorEmpty = true;
      }
      if (!this.input.valYear) {
        stop = true;
        this.yearEmpty = true;
      }
      if (!this.input.valMonth) {
        stop = true;
        this.monthEmpty = true;
      }
      if (this.$v.$invalid) {
        stop = true;
        this.$v.input.$touch();
      }
      if (stop) return this.setModal(1);
      this.setModal(10);
      const { result } = await add(this.input);
      if (await !result) return this.setModal(3);

      return this.setModal(0);
    }
  },
  computed: {
    modalInfo() {
      return modalInfo;
    },
    Deselect() {
      return null;
    },
    date() {
      return new Date();
    },
    currentYear() {
      return this.date.getFullYear();
    },
    years() {
      return [
        this.currentYear,
        this.currentYear + 1,
        this.currentYear + 2,
        this.currentYear + 3,
        this.currentYear + 4
      ];
    },
    months() {
      if (this.input.valYear === this.currentYear) {
        const currentMonth = this.date.getMonth();
        const months = [];
        for (let m = currentMonth; m <= 11; m++) {
          months.push(m + 1);
        }
        return months;
      } else return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }
  },
  validations: {
    input: {
      cardNumber: {
        required: required,
        integer: integer,
        minLength: minLength(16),
        maxLength: maxLength(16)
      },
      cardHolder: {
        required: required,
        alphaDiacritic: alphaDiacritic,
        minLength: minLength(5),
        maxLength: maxLength(30)
      },
      ccv: {
        required,
        integer,
        minLength: minLength(3),
        maxLength: maxLength(3)
      },
      vendor: {
        required
      }
    }
  }
};
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
$error-color: rgb(255, 87, 87);

.form-sect {
  background: black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 3em 0;
}
.form-sect > form,
.btn-cont {
  width: 22em;
}

.form-label {
  font-size: 0.7em;
}
::placeholder,
.vs__selected-options ::placeholder {
  color: grey;
}
.form-input--std {
  width: 100%;
}

.form-input {
  background: black;
  color: white;
  width: 100%;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
  font-size: 1em;
  padding: 5px;
  line-height: 1.4;
  border: 1px solid map_get($vs-colors, "lightest");
  border-radius: $vs-border-radius;
  appearance: none;
}

.form-group-valid .error {
  position: absolute;
}

.error {
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  margin-block-start: 0;
  font-size: 0.7rem;
  color: $error-color;
}

.form-group {
  background: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 4em;
  margin: 0 0.3em;
}
.form-group-inline {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.form-group-inline-1 {
  width: 100%;
}

.form-group-valid {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
}

.vs__selected {
  padding: 0;
  margin: 4px 0px 0px 0px;
  flex-grow: 100;
}
.vs__search {
  max-width: 50%;
  padding: 0;
}
.form-group-valid > div {
  width: 50%;
}
.form-group-valid > div:first-child {
  margin-right: 0.5rem;
}

.form-group--error > input {
  border-color: $error-color;
  color: $error-color;
}
.form-group--error > input:focus {
  outline-color: $error-color;
}

.form-group--error .vs__dropdown-toggle {
  border-color: $error-color;
  color: $error-color;
}

.form-group--error .vs__dropdown-toggle:focus {
  outline-color: $error-color;
}
.btn-cont {
  margin-top: 2rem;
  padding: 0.2rem;
}

.btn {
  margin: 0.2rem;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  font-size: 1.1em;
  font-weight: bold;
  width: 98%;
  border: 2px solid rgb(44, 44, 44);
  border-radius: 5px;
  height: 3rem;
}
.btn-primary {
  background-color: rgb(224, 174, 9);
  color: black;
}
.btn-secondary {
  background-color: rgb(46, 46, 46);
  color: rgb(255, 255, 255);
}
@media screen and (min-width: 600px) {
  .form-sect > form,
  .btn-cont {
    width: 80vw;
    max-width: 700px;
  }
}
</style>
