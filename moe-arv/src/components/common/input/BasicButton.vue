<template>
    <button :disabled="props.loading || props.disabled" class="basic-btn" :class="[style, display]" @click="onClick">
        <div class="loader-container">
            <div class="loader" v-if="props.loading"></div>
        </div>
        <slot />
    </button>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    theme?: "primary" | "danger" | "white" | "sky",
    block?: boolean,
    loading?: boolean,
    disabled?: boolean,
    size?:"md"
}>()

const onClick = (e: Event) => {
    if (props.loading) {
        e.preventDefault()
    }
}

const style = computed(() => {
    switch (props.theme) {
        case "primary":
            return "bg-water-blue text-white"
        case "danger":
            return "bg-pale-red text-white"
        case "white":
            return "bg-white border text-gunpowder"
        case "sky":
            return "bg-transparent border border-dark-sky-blue text-dark-sky-blue"
        default:
            return "bg-water-blue text-white"
    }
})

const display = computed(() => {
    if (props.block) {
        return "block w-full"
    } else if(props.size == 'md'){
        return "inline-block w-[87px] h-[40px]"
    }
    return "inline-block min-w-[120px]"
})

</script>
<style scoped>
.basic-btn {
    @apply text-center py-[11px] rounded-[4px] relative;
}
button:disabled{
    @apply text-[#c7c7c7];
}
.loader-container{
    position: absolute;
    top: 55%;
    transform: translateY(-50%);
    left: 5%;
}
.loader {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, .3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
    to {
        -webkit-transform: rotate(360deg);
    }
}

@-webkit-keyframes spin {
    to {
        -webkit-transform: rotate(360deg);
    }
}
</style>