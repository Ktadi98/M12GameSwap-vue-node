<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';

const emit = defineEmits<{
  (e: 'confirm'): void,
  (e: 'cancel'): void
}>()
</script>

<template>
  <VueFinalModal class="confirm-modal" content-class="confirm-modal-content" overlay-transition="vfm-fade"
    content-transition="vfm-fade">
    <h1>¿Estás seguro que quieres elimninar tu cuenta?</h1>
    <p>Recuerda que esta acción no se puede deshacer</p>
    <button class="btn-delete" @click="emit('confirm')">ELIMINAR</button>
    <button class="btn-cancel" @click="emit('cancel')">CANCELAR</button>
  </VueFinalModal>
</template>

<style>
.confirm-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}

.confirm-modal-content {
  display: flex;
  flex-direction: column;
  border-radius: 27px;
  border: 1px solid var(--Color-3, #000);
  background: var(--Color, #F6F6F6);
  padding: 2rem;
  height: auto;
}

.dark .confirm-modal-content {
  background: #000;
}

h1 {
  color: #9F87F5;
  text-align: center;
  font-family: Roboto;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.btn-delete {
  background-color: #f12121;
  color: white;
  margin: 0 auto;
  width: 70%;
}

.btn-cancel {
  border-color: #9F87F5;
  color: #9F87F5;
  background-color: white;
  margin: 0 auto;
  width: 70%;
}
</style>