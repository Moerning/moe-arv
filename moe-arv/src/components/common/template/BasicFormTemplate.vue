<template>
    <form @submit.prevent="() => onSubmit()">
        <div class="text-center mb-[27px]">
            <span class="form-title">{{ props.title }}</span>
        </div>
        <div class="flex flex-col gap-5">
            <slot name="body" />
            <div>
                <BasicButton variant="primary" block type="submit">Submit</BasicButton>
                <slot name="bottom"></slot>
            </div>
        </div>
    </form>
</template>
<script setup lang="ts">
import BasicButton from '../input/BasicButton.vue';

const props = defineProps<{
    onSubmit: Function,
    title:string
}>()
</script>
<style>
.form-title{
    @apply text-warm-grey;
    font-size: 47px;
    line-height: 1.19;
}
</style>