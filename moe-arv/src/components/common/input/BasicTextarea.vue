<script setup lang="ts">
    interface AreaProps {
      name:string,
      label:string,
      error?:string | undefined,
      rows?: number
    }

    const model = defineModel<string>()
    const props = withDefaults(defineProps<AreaProps>(), {
      rows:10
    })
</script>

<template>
  <label :class="{ 'simple-label': !props.error, 'error-label': props.error  }" :for="props.name">{{ props.label }}
  </label>
  <textarea v-model="model" :name="props.name" :class="{ 'simple-area': !props.error, 'error-area': props.error  }" :rows="props.rows" />
  <span class="error-msg" v-if="props.error">
    {{ props.error }}
  </span>
</template>
<style scoped>
label{
  @apply block text-[1.14285714286rem] capitalize mb-[8px];
}
.simple-label{
  @apply text-charcoal-grey ml-2;
}
.error-label{
  @apply text-danger;
}
textarea{
    @apply w-[410px] rounded-[4px] bg-[#fff] mb-[10px] px-2;
}
.simple-area {
  @apply border border-[#ddd];
}
.error-area {
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