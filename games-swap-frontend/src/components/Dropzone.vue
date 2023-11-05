<script setup lang="ts">
import { type Ref, ref } from 'vue';

// function selectFile(event: any) {
//     formState.value.images = event.target.files[0];
// }


const uploading: Ref<Boolean> = ref(false);
</script>
<template>
    <div class="dropzone">
        <input type="file" name="file" id="file">
    </div>
    <p v-if="!uploading">Arrastra tus imágenes aquí!</p>
</template>
<style scoped></style>