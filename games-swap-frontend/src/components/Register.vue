<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';


const emit = defineEmits<{
  (e: 'confirm'): void
}>()
</script>

<template>
  <VueFinalModal
    class="confirm-modal"
    content-class="confirm-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
  <form>
        <h1>DATE DE ALTA</h1>
       
        <input type="name" name="name" id="name" placeholder="Nombre">
        <input type="email" name="email" id="email" placeholder="Correo">
        <input type="password" name="password" id="password" placeholder="Contraseña">
        <input type="password2" name="password2" id="password2" placeholder="Repite contraseña">
       
        <div class="terms">
            <input type="checkbox" name="conditions" id="conditions-text">
        <label for="conditions" id="conditions">He leído y acepto las <u>Condiciones de uso</u> y la <u>Política de privacidad de GameSwap</u>.
Ver +info sobre protección de datos</label>
        </div>
        <button>REGISTRARSE </button>
    </form>
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

h1{
    color: #9F87F5;
    text-align: center;
    font-family: Roboto;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}
form {
    display: flex;
    flex-direction: column;
}
form input {
    border-radius: 29px;
    border: 3px solid #9F87F5;
    background: #F6F6F6;
    padding: 0.75rem;
    margin-bottom: 2rem;
}

form input #placeholder{
    color:#D3D3D3;
}

button {
    background-color: #9F87F5;
    color: white;
    margin: 0 auto;
    width: 70%;
}
.terms {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
}

</style>