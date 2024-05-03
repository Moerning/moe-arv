<template>
    <div
        class="default-side-menu"
        :class="{ 'displayed-menu': displayMenu, 'hidden-menu': !displayMenu }"
    >
        <nav>
            <ul v-for="m in menu">
                <span class="list-title">{{ m.title }}</span>
                <div class="py-4">
                    <router-link v-for="child in m.children" :to="child.to!">
                        <li :class="getClass(child)">
                            {{ child.title }}
                        </li>
                    </router-link>
                </div>
            </ul>
        </nav>
    </div>
    <div class="backdrop" :class="{ hidden: !displayMenu }"></div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLayout } from '@/composables/layout/useLayout'

const { displayMenu } = useLayout()
const route = useRoute()
const currentRoute = computed(() => {
    return route.name
})

type ArvMenuItem = {
    title: string
    to?: { name: string }
    children?: ArvMenuItem[]
}

const menu: ArvMenuItem[] = [
    {
        title: 'Post',
        children: [
            {
                title: 'All Articles',
                to: { name: 'ArticlesListView' }
            },
            {
                title: 'New Article',
                to: { name: 'CreateArticle' }
            }
        ]
    }
]

const getClass = (child: ArvMenuItem) => {
    return child.to?.name === currentRoute.value ? 'active-menu' : ''
}
</script>
<style scoped>
.default-side-menu {
    @apply h-full bg-water-blue text-white w-[250px] absolute lg:static;
}

.displayed-menu {
    @apply -left-0 z-[2];
}

.hidden-menu {
    @apply -left-full;
}

.backdrop {
    @apply z-[1] absolute w-full h-full top-0 left-0;
    background-color: rgba(0, 0, 0, 0.25);
}

ul {
    @apply py-4;
}

.list-title {
    @apply text-[22px] leading-[1.23];
    margin: 0 185px 132px 20px;
}

li {
    @apply py-[11px] pl-[34px] hover:text-black;
}
.active-menu {
    @apply bg-blue-400;
}
</style>
