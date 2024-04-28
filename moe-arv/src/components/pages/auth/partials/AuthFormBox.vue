<template>
    <div class="auth-form-box">
        <slot />
    </div>
</template>
<script lang="ts" setup>
</script>
<style scoped>
.auth-form-box{
    @apply w-[32.14rem] px-[1.42rem] pb-[1.42rem] pt-[2.5rem] bg-silver rounded-[.3rem];
}
</style>