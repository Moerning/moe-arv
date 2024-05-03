<template>
    <span class="default-tag">
        {{ props.title }}
    </span>
</template>
<script setup lang="ts">
const props = defineProps<{
    title: string
}>()
</script>
<style>
.default-tag {
    @apply py-[2px] inline-block bg-water-blue text-white capitalize text-sm rounded px-2;
}
</style>
