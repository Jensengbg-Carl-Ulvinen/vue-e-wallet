<template>
  <div class="home">
    <Modal v-if="showModal" :hideButton="modalInfo.hideButton" @close="showModal = false">
      <h3 slot="header">{{ modalInfo.header }}</h3>
      <h3 slot="body">{{ modalInfo.body }}</h3>
      <h3 slot="footer">{{ modalInfo.footer }}</h3>
    </Modal>

    <Top msg="Elektronisk Plånbok" />
    <div class="top-card">
      <Card :card="card" msg="Aktiva kort" />
      <div class="btn-cont" v-if="card.id">
        <button class="btn btn-secondary" @click="removeCard">Ta bort kortet</button>
      </div>
    </div>
    <CardStack :cards="displayedCards" @pickCard="pickCard" />
  </div>
</template>

<script>
import { cards, remove } from "@/modules/localStorage-ops.js";
import { modalInfo, setModal } from "@/modules/modal-handler.js";
import Top from "@/components/Top.vue";
import Card from "@/components/Card.vue";
import CardStack from "@/components/CardStack.vue";
import Modal from "@/components/Modal.vue";

export default {
  name: "Home",
  data: () => {
    return {
      cards: cards,
      currentCardId: null,
      showModal: false
    };
  },
  components: {
    Top,
    Card,
    CardStack,
    Modal
  },
  methods: {
    pickCard(cardId) {
      this.currentCardId = cardId;
    },

    async removeCard() {
      this.setModal(11);
      const result = await remove(this.card.id);
      if (await !result) return this.setModal(3);
      this.currentCardId = null;
      this.setModal(12);
    },
    setModal(state = 0) {
      this.showModal = false;
      setModal(state);
      this.showModal = true;
    }
  },
  computed: {
    modalInfo() {
      return modalInfo;
    },
    card() {
      if (!this.cards.length) return {};
      if (this.currentCardId == null) return this.cards[0];
      if (this.cards.findIndex(c => c.id == this.currentCardId) > -1)
        return this.cards.find(c => c.id == this.currentCardId);
      else return this.cards[0];
    },
    displayedCards() {
      return this.cards;
    }
  }
};
</script>

<style lang="scss" scoped>
.body {
      background: black;
    }

.home {
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.top-card {
  margin-bottom: 3rem;
}

.btn-cont {
  width: 100%;
  margin-top: 1rem;
}
.btn {
  margin: 0.2rem;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  font-size: 1.1em;
  font-weight: bold;
  color: black;
  width: 98%;
  background-color: rgb(224, 174, 9);
  border-radius: 5px;
  height: 3rem;
}

.btn-secondary {
  background-color: rgb(44, 44, 44);
  color: white;
}
</style>
