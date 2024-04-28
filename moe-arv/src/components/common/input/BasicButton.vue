<template>
    <button class="basic-btn" :class="[style,display]">
        <slot />
    </button>
</template>
<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps<{
    variant:"primary",
    block?: boolean
}>()

const style = computed(()=>{
    switch (props.variant) {
        case "primary":
            return "bg-water-blue text-white"
        default:
            return "bg-water-blue text-white"
    }
})

const display = computed(()=>{
    if(props.block){
        return "block w-full"
    }
    return "inline-block"
})

</script>
<style>
.basic-btn{
    @apply text-center py-[11px] rounded-[4px];
}
</style>