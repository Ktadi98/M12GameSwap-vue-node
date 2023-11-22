<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';
import BackArrow from "@/components/Icons/BackArrow.vue";
</script>

<template>
 <VueFinalModal>
    <main>
    <div class="arrow-box" style="color: #8a6cf6">
      <BackArrow />
    </div>
    <h1>BUZÓN DE SUGERENCIAS</h1>
    <form>
      <textarea
        id="message"
        name="message"
        placeholder="Introduce aquí tus sugerencias"
      ></textarea>
      <button type="submit">ENVIAR</button>
    </form>
  </main>
 </VueFinalModal>
</template>

<style scoped>
.arrow-box {
  cursor: pointer;
}

header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: 0;
  align-items: center;
  border-bottom: 1px solid #8a6cf6;
}

.logo img {
  width: 100px;
  height: 100px;
}

.profile-info {
  display: flex;
  align-items: center;
  justify-content: end;
  flex: 1;
  border: 1px;
  border-color: black;
  color: black;
}

.profile-image img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.profile-name {
  margin-left: 5px;
  color: #8a6cf6;
}

.back-arrow {
  height: 50px;
  width: 50px;
}

main {
  display: block;
  margin: 0 auto;
  margin-bottom: 8rem;
}

form {
  width: 50rem;
  margin: 0 auto;
}

button {
  background-color: #9F87F5;
  color: white;
  width: 70%;
  margin: 0 auto;
}
</style>
