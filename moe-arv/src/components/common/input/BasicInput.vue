<script setup lang="ts">
import { computed } from 'vue';
import { useSlots } from 'vue';

const slots = useSlots()
interface InputProps {
  name: string,
  label: string,
  type?: "text" | "password",
  error?: string | undefined,
  block?: boolean,
  placeholder?: string
}

const model = defineModel()
const props = withDefaults(defineProps<InputProps>(), {
  type: "text"
})

const size = computed(() => {
  switch (props.block) {
    case true:
      return "block w-full h-[40px]"
    default:
      return "w-[410px] h-[40px]"
  }
})
</script>

<template>
  <label class="relative" :class="{ 'simple-label': !props.error, 'error-label': props.error }">{{ props.label }}
    <input :placeholder="props.placeholder" v-model="model" :name="props.name"
      :class="[{ 'simple-input': !props.error, 'error-input': props.error }, size]" :type="props.type" />
    <span v-if="slots['control']" class="right-control">
      <slot name="control" :value="model" />
    </span>
    <span>

    </span>
  </label>
  <span class="error-msg" v-if="props.error">
    {{ props.error }}
  </span>
</template>
<style scoped>
label {
  @apply block text-[1.14285714286rem] capitalize;
}

.simple-label {
  @apply text-charcoal-grey;
}

.error-label {
  @apply text-danger;
}

input {
  @apply rounded-[4px] bg-[#fff] mb-[10px] px-3 mt-[8px];
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

.right-control{
  @apply absolute right-0 bottom-0 h-[40px];
}
</style>