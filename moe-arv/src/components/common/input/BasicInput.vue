<script setup lang="ts">
    const model = defineModel()
</script>

<template>
    
  <input v-model="model" />
</template>
<style scoped>
input{
    @apply border border-silver;
}
</style>