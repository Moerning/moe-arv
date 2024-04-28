<script setup lang="ts">
    const model = defineModel()
    const props = defineProps<{
      name:string,
      label:string,
      type:"text" | "password",
      error?:string | undefined
    }>()
</script>

<template>
  <label :class="{ 'simple-label': !props.error, 'error-label': props.error  }" :for="props.name">{{ props.label }}
  </label>
  <input v-model="model" :name="props.name" :class="{ 'simple-input': !props.error, 'error-input': props.error  }" />
  <span class="error-msg" v-if="props.error">
    {{ props.error }}
  </span>
</template>
<style scoped>
label{
  @apply block text-[1.14285714286rem] capitalize;
  margin: 27px 86px 9px 8px;
}
.simple-label{
  @apply text-charcoal-grey;
}
.error-label{
  @apply text-danger;
}
input{
    @apply w-[410px] h-[40px] rounded-[4px] bg-[#fff] mb-[10px];
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