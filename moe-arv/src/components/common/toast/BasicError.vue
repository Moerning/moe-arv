<template>
    <div class="flex items-center gap-2 border border-pinkish-grey bg-pinkish-grey-pale text-danger-text h-full w-full">
        <span class="font-bold">{{ title }}</span>
        <span>{{ message }}</span>
    </div>
</template>
<script lang="ts" setup>
import { useToasMessage } from "@/composables/toast/useToastMessage";

const { message, title } = useToasMessage()

</script>