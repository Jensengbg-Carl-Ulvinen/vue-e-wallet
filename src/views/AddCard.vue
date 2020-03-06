<template>
  <main>
    <Top msg="Lägg till ett nytt Kort" />
    <Card :card="card" :isNew="true" msg="Nytt kort" />
    <CardForm :input="card" />
  </main>
</template>

<script>
// import { cards } from "@/modules/localStorage-ops.js";
import CardForm from "@/components/CardForm.vue";
import Card from "@/components/Card.vue";
import Top from "@/components/Top.vue";
export default {
  data: () => {
    return {
      // cards: cards,
      card: {
        cardNumber: "",
        cardHolder: null,
        valYear: "",
        valMonth: "",
        ccv: null,
        vendor: { color: "", name: "", logo: "", theme: "" }
      }
    };
  },
  props: {},
  components: {
    CardForm,
    Card,
    Top
  }
};
</script>

<style>
</style>
