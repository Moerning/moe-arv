<template>
    <table :class="tableClass">
        <thead>
            <tr>
                <th class="px-2">#</th>
                <th v-for="h in props.headers" :class="[getAlign(h), headerStyle(h)]">
                    {{ h.title }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(v, i) in props.values">
                <td class="px-8">{{ i }}</td>
                <td v-for="h in props.headers" :class="[getAlign(h)]">
                    <template v-if="!slots[h.key]">
                        {{ v[h.key] }}
                    </template>
                    <slot :name="h.key" :row="v" />
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script setup lang="ts">
import { TableHeader } from '@/components/types/types.type';
import { computed, useSlots } from 'vue';


const slots = useSlots()
const props = defineProps<{
    headers:TableHeader[],
    values:any[],
    block?: boolean
}>()

const tableClass = computed(()=>{
    return props.block ? "w-full" : ''
})

const getAlign = (header:TableHeader) => {
    switch (header.align) {
        case 'center':
            return 'text-center'
        case 'left':
            return 'text-left'
        case 'right':
            return 'text-right'
        default:
            break;
    }
}

const headerStyle = (header:TableHeader) => {
    if(header.class)
        return header.class
    return "default-th"
}
</script>
<style>
.default-th{
    @apply text-[16px] leading-[1.5] font-bold text-gunmetal pt-[10px] pb-[11px] capitalize px-2;
    font-stretch: normal;
    font-style: normal;
}
thead tr {
    @apply bg-silver;
}

tbody tr td {
    @apply text-[16px] leading-[1.5] text-gunmetal pt-[10px] pb-[11px] capitalize;
}

tbody tr {
    @apply border-b border-black;
}

</style>