<script setup lang="ts">
import DeleteUserProfile from '@/components/DeleteUserProfile.vue';
import ResetPassword from '@/components/ResetPassword.vue';
import SuggestionsMailbox from '@/components/SuggestionsMailbox.vue';
import { useModal } from 'vue-final-modal';

const { open: openDelete, close: closeDelete } = useModal({
  component: DeleteUserProfile,
  attrs: {
    onConfirm() {
      closeDelete()
    },
    onCancel() {
      closeDelete()
    },
  }
});
const { open: openChangePassword, close: closeChangePassword } = useModal({
  component: ResetPassword,
  attrs: {
    onConfirm() {
      openChangePassword()
    },
    onCancel() {
      closeChangePassword()
    },
  }
});
const { open: openSendSuggestions, close: closeSendSuggestions } = useModal({
  component: SuggestionsMailbox,
  attrs: {
    onConfirm() {
      openSendSuggestions()
    },
    onCancel() {
      closeSendSuggestions()
    },
  }
});
</script>
<template>
  <div class="profile">
    <h1>This is a profile page</h1>

    <button @click="openDelete">BORRAR PERFIL</button>
    <button @click="openChangePassword">RESET PASSWORD</button>
    <button @click="openSendSuggestions">ENVIAR SUGERENCIAS</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
