<template>
    <form @submit.prevent="() => onSubmit()">
        <div class="text-center mb-[27px]" v-if="props.title">
            <span class="form-title">{{ props.title }}</span>
        </div>
        <div class="flex flex-col gap-5">
            <slot name="body" />
            <div>
                <BasicButton v-if="!slots['bottom']" :loading="props.loading" variant="primary" block type="submit">Submit</BasicButton>
                <slot name="bottom"></slot>
            </div>
        </div>
    </form>
</template>
<script setup lang="ts">
import BasicButton from '../input/BasicButton.vue';
import { useSlots } from 'vue';

const props = defineProps<{
    onSubmit: Function,
    title?:string,
    loading?: boolean
}>()

const slots = useSlots()
</script>
<style>
.form-title{
    @apply text-warm-grey;
    font-size: 47px;
    line-height: 1.19;
}
</style>