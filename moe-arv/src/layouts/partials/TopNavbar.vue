<template>
    <div class="default-navbar">
        <div class="flex justify-between items-center w-full">
            <div
                class="flex flex-col lg:flex-row gap-[2px] lg:gap-5 items-start lg:items-center"
            >
                <span class="logo-title"> Arvan Challenge </span>
                <span
                    class="text-[12px] font-[300] lg:text-[16px] lg:font-normal"
                    v-if="user"
                >
                    Welcome {{ user?.username }}
                </span>
            </div>
            <div>
                <BasicButton
                    @click="logout"
                    size="md"
                    theme="sky"
                    class="hidden lg:inline-block"
                >
                    Logout
                </BasicButton>
                <BasicButton
                    theme="outline"
                    size="icon"
                    @click="logout"
                    class="hm-btn mx-4"
                >
                    <material-icon name="logout" class="sm" />
                </BasicButton>
                <BasicButton
                    theme="outline"
                    size="icon"
                    @click="toggleMenu"
                    class="hm-btn"
                >
                    <material-icon name="dehaze" class="sm" />
                </BasicButton>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useAuthentication } from '@/composables/auth/useAuthentication'
import { useLayout } from '@/composables/layout/useLayout'
import BasicButton from '@/components/common/input/BasicButton.vue'
import { useRouter } from 'vue-router'

const { toggleMenu } = useLayout()
const router = useRouter()
const { user, getUser, forget } = useAuthentication()

const logout = () => {
    forget()
    router.push({ name: 'LoginView' })
}

getUser()
</script>
<style>
.default-navbar {
    @apply bg-charcoal-grey text-white;
    height: 60px;
    padding: 10px 29.3px 10px 20px;
}
.logo-title {
    @apply text-[22px] leading-[1.23];
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
}
.hm-btn {
    @apply lg:hidden bg-transparent text-white;
}

.material-icon.sm {
    font-size: 12px;
    width: 12px;
    height: 12px;
}
</style>
