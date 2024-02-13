<script setup lang="ts">
import useCustomToast from '@/composables/useCustomToast';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { VueFinalModal } from 'vue-final-modal';
import { useRouter } from 'vue-router';

const emit = defineEmits<{
  (e: 'confirm'): void,
  (e: 'cancel'): void
}>()

const router = useRouter();
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
const { token, userIsLoggedIn } = storeToRefs(useAuthStore());
const authStore = useAuthStore();

const { triggerToast } = useCustomToast("¡Tu cuenta se ha desactivado correctamente!");


const deactivateUser = async () => {

  try {
    const response: Response = await fetch(`${apiEndpoint}/users/deactivate`, {
      method: "DELETE", headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token.value}`
      }
    })

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        authStore.deleteToken();
        router.push("/");
      }
    }

    authStore.deleteToken();
    router.push("/");

    triggerToast();

    emit('cancel');
  } catch (err) {
    console.error(err);
  }

}
</script>

<template>
  <VueFinalModal class="confirm-modal" content-class="confirm-modal-content" overlay-transition="vfm-fade"
    content-transition="vfm-fade">
    <h1>¿Estás seguro que quieres desactivar tu cuenta?</h1>
    <p>Recuerda que esta acción no se puede deshacer por un tiempo</p>
    <button class="btn-delete mb-3" @click="deactivateUser">DESACTIVAR</button>
    <button class="btn-cancel" @click="emit('cancel')">CANCELAR</button>
  </VueFinalModal>
</template>

<style scoped>
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
  height: 250px;
  width: auto;
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
  margin: auto;
  width: 70%;
  border: none !important;
}

.btn-cancel {
  border-color: #9F87F5;
  color: #9F87F5;
  background-color: white;
  margin: auto;
  width: 70%;
}
</style>