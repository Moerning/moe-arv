<template>
    <div class="basic-layout-container">
        <router-view></router-view>
    </div>
</template>
<script lang="ts" setup>
</script>
<style scoped>
.basic-layout-container{
    @apply h-screen w-full flex items-center justify-center bg-white;
}
</style>