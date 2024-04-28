<template>
    <table>
        <thead>
            <tr>
                <th v-for="h in props.headers" :class="[getAlign(h)]">
                    {{ h.title }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="v in props.values">
                <td v-for="h in props.headers" :class="[getAlign(h)]">
                    {{ v[h.key] }}
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script setup lang="ts">
import { TableHeader } from '@/components/types/types.type';


const props = defineProps<{
    headers:TableHeader[],
    values:any[]
}>()

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
</script>