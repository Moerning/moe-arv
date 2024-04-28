<script setup lang="ts">
    const model = defineModel()
    const props = defineProps<{
      name:string,
      label:string
    }>()
</script>

<template>
  <label :for="props.name">{{ props.label }}
  </label>
  <input v-model="model" :name="props.name"/>
</template>
<style scoped>
label{
  @apply block text-[1.14285714286rem] capitalize;
  margin: 27px 86px 9px 8px;
}
input{
    @apply border border-[#ddd] w-[410px] h-[40px] rounded-[4px] bg-[#fff];
}
input:focus {
  @apply border border-white outline-slate-grey;
}
</style>