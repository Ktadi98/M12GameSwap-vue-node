<script setup lang="ts">
import Breadcrumb from 'primevue/breadcrumb';


const props = defineProps<{
    items: any
}>()

</script>
<template>
    <section class="w-100 d-flex flex-row gap-5 justify-content-start">
        <Breadcrumb :model="items">
            <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a :href="href" v-bind="props.action" @click="navigate">
                        <span :class="[item.icon, 'text-color']"></span>
                        <span class="text-primary font-semibold">{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                    <span class="text-color">{{ item.label }}</span>
                </a>
            </template>
        </Breadcrumb>
    </section>
</template>
<style >
.p-breadcrumb {
    width: fit-content !important;
    padding: 5px !important;
    border: none;
}

.p-breadcrumb-home {
    display: none;
}

.p-breadcrumb-list {
    margin: 0;
    padding: 0;
}

.p-divider.p-divider-horizontal {
    margin: 0.45rem;
}
</style>