<template>
    <div class="default-navbar">
        <div class="flex justify-between items-center w-full">
            <div class="flex gap-5 items-center">
                <span class="logo-title">
                    Arvan Challenge
                </span>
                <span class="text-[16px]" v-if="user">
                    Welcome {{ user?.username }}
                </span>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useAuthentication } from "@/composables/auth/useAuthentication";

const { user, getUser } = useAuthentication()
getUser()
</script>
<style>
.default-navbar{
    @apply bg-charcoal-grey text-white;
    height: 60px;
    padding: 10px 29.3px 10px 20px;
}
.logo-title{
    @apply text-[22px] leading-[1.23];
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
}
</style>