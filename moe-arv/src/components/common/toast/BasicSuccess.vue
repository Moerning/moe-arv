<template>
    <div
        class="flex items-center gap-2 border border-success bg-success-pale text-success h-full w-full"
    >
        <span class="font-bold">{{ title }}</span>
        <span>{{ message }}</span>
    </div>
</template>
<script lang="ts" setup>
import { useToasMessage } from '@/composables/toast/useToastMessage'

const { message, title } = useToasMessage()
</script>
