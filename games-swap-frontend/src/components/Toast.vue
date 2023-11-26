<script setup lang="ts">

const emit = defineEmits<{
    click: []
}>()

const clicked = () => {
    emit("click");
}
</script>
<template>
    <div>
        <span>Anything can be added here.</span>
        <button class="action" @click.stop="clicked">Open!</button>
    </div>
</template>