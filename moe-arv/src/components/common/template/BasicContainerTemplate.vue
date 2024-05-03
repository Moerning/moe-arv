<template>
    <div class="basic-container">
        <div>
            <h2 class="default-title">{{ props.title }}</h2>
        </div>
        <slot />
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    title: string
}>()
</script>
<style scoped>
.basic-container {
    @apply py-[24px] px-[19px];
}

.default-title {
    @apply mb-8;
    font-size: 40px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: left;
    color: #000;
}
</style>
