<script setup lang="ts">
    interface InputProps {
      name:string,
      label:string,
    }

    const model = defineModel()
    const props = defineProps<InputProps>()

</script>

<template>
  <input v-model="model" :name="props.name" type="checkbox" />
  <label class="simple-lable" :for="props.name">{{ props.label }}
  </label>
</template>
<style scoped>
label{
  @apply text-[1.14285714286rem] capitalize mb-[8px] ml-2;
}
.simple-label{
  @apply text-charcoal-grey ml-2;
}
.error-label{
  @apply text-danger;
}
input{
    @apply rounded-[4px] bg-[#fff] mb-[10px] px-2;
}
.simple-input {
  @apply border border-[#ddd];
}
.error-input {
  @apply border border-danger;
}
.error-msg {
  @apply text-danger;
  margin: 10px 34px 28px 0;
}
input:focus {
  @apply border border-white outline-slate-grey;
}
</style>