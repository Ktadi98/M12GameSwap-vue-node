<script setup lang="ts">
import CrossError from './Icons/CrossError.vue';
const props = defineProps<{
    messages: string[]
}>()
</script>
<template>
    <div class="errors-box d-flex flex-column gap-1 p-2 my-3" v-if="props.messages.length > 0">
        <p v-for="message in props.messages" :key="message">
            <CrossError></CrossError> {{ message }}
        </p>
    </div>
</template>
<style scoped>
.errors-box {
    background-color: #ECC8C5;
    color: #C65654;
    border-radius: 10px;
}
</style>