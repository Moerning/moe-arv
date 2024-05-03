<template>
    <div class="basic-layout-container">
        <div class="flex flex-col h-full">
            <TopNavbar />
            <div class="flex-grow">
                <div class="flex w-full h-full relative">
                    <SideMenu />
                    <div class="flex-grow">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import TopNavbar from './partials/TopNavbar.vue'
import SideMenu from './partials/SideMenu.vue'
</script>
<style scoped>
.basic-layout-container {
    @apply h-screen w-full bg-white;
}
</style>
