<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">default header</slot>
          </div>

          <div class="modal-body">
            <slot name="body">default body</slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">default footer</slot>
            <button v-if="!hideButton" class="btn" @click="$emit('close')">OK</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: { hideButton: Boolean }
};
</script>

<style lang="css" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  background: black;
}

.modal-container {
  background: black;
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #000;
  border: 1px solid white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #b9b7b7;
}

.modal-body {
  margin: 20px 0;
  background: black;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.btn {
  background: black;
  color: white;
  border: 1px solid white;
  border-radius: 10px;
}
</style>
