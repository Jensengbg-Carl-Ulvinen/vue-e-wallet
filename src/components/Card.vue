<template>
  <section class="card-container">
    <h5 v-if="msg">{{ msg }}</h5>
    <div
      class="card-main"
      :style="{
        background:
          'linear-gradient(237.41deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 99.07%), ' +
          bckColor
      }"
      v-if="isRight || isNew"
    >
      <img class="abs card-logo" :src="card.vendor.logo" :alt="card.vendor.name" />
      <img class="abs card-chip" :src="chip" alt="chip" />
      <h1 class="abs card-num embossed big">{{ cardNum }}</h1>
      <p class="abs card-holder-title embossed">Namn</p>
      <h4 class="abs card-holder embossed big">{{ card.cardHolder }}</h4>

      <p class="abs valid-title embossed">Giltig till</p>
      <h4 class="abs valid embossed big">{{ cardValidity }}</h4>
    </div>
    <div v-else>
      <h3>Din plånbok innehåller inga kort</h3>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    card: Object,
    isNew: Boolean,
    msg: String,
    translateUp: String
  },
  computed: {
    isRight() {
      console.log(
        "card:",
        Object.prototype.hasOwnProperty.call(this.card, "id"),
        this.isNew
      );
      return Object.prototype.hasOwnProperty.call(this.card, "id");
    },
    cardNum() {
      if (this.card.cardNumber == null || !this.card.cardNumber.toString())
        return "";
      const text = this.card.cardNumber.toString();
      return (
        text.substring(0, 4) +
        " " +
        text.substring(4, 8) +
        " " +
        text.substring(8, 12) +
        " " +
        text.substring(12, 16)
      );
    },
    bckColor() {
      if (!this.card.vendor.color) return "rgb(221, 221, 221)";
      return this.card.vendor.color;
    },
    chip() {
      if (!this.card.vendor.theme) return "/images/chip-dark.svg";
      return "/images/chip-" + this.card.vendor.theme + ".svg";
    },
    cardValidity() {
      if (!this.card.valYear || !this.card.valMonth) return "";
      const month = "0" + this.card.valMonth.toString();
      const year = this.card.valYear.toString();
      console.log(year, month);
      return month.substring(month.length - 2, 2) + "/" + year.substring(2, 4);
    }
  }
};
</script>

<style>
.card-container {
  font-size: calc(12px + 0.5vw);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-main {
  box-shadow: 0px 0px 2em rgba(0, 0, 0, 0.25), 1px 1px 0.2em rgba(0, 0, 0, 0.5);
  border-radius: 0.8em;
  width: 24em;
  min-width: 24em;
  height: 15em;
  position: relative;
}

.abs {
  position: absolute;
}

.card-logo {
  fill:white;
  width: 2em;
  right: 2em;
  top: 2em;
}

.card-chip {
  width: 3em;
  left: 1.5em;
  top: 2.7em;
}

.card-num {
  font-size: 1.7em;
  width: 100%;
  top: 47%;
}

.embossed {
  color: transparent;
  text-shadow: -0.05em -0.05em 0.05em rgba(255, 255, 255, 1),
    0.025em 0.025em 0.025em rgba(0, 0, 0, 0.9),
    0.05em -0.05em 0.1em rgba(255, 255, 255, 1),
    -0.05em -0.05em 0.05em rgba(0, 0, 0, 0.9),
    -0.05em 0.05em 0.025em rgba(0, 0, 0, 0.9);
}

.card-main p {
  font-size: 0.75em;
}

.card-holder-title {
  top: 70%;
  left: 1.5rem;
}
.card-holder {
  top: 75%;
  left: 1.5rem;
}

.valid-title {
  right: 1.5rem;
  top: 70%;
}

.valid {
  right: 1.5rem;
  top: 75%;
}

.embossed.big {
  -webkit-text-stroke: 0.05em rgba(0, 0, 0, 0.4);
}
</style>
