<template>
    <BasicInput v-model="name" name="username" label="username"/>
</template>
<script setup lang="ts">
import BasicInput from '@/components/common/input/BasicInput.vue';
import { ref } from 'vue';

const name = ref()
</script>