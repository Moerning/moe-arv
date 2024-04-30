<script setup lang="ts">
import { ref } from 'vue';

interface InputProps {
  name: string,
  label: string,
}

const model = defineModel()
const props = defineProps<InputProps>()
const theInput = ref()

const clickShadowInput = () => theInput.value.click()

</script>

<template>
  <label class="simple-lable" :for="props.name">
    <input ref="theInput" class="hidden" v-model="model" :name="props.name" type="checkbox" />
    <span @click="clickShadowInput" class="input-shadow" :class="{ 'active-box': model, 'inactive-box': !model }">

    </span>
    {{ props.label }}
  </label>
</template>
<style scoped>
label {
  @apply text-[1.14285714286rem] capitalize mb-[8px] ml-2 mb-[10px] inline-block;
}

.simple-label {
  @apply text-charcoal-grey;
}

.error-label {
  @apply text-danger;
}

.input-shadow {
  @apply rounded-[4px] w-[15px] h-[15px] bg-[#fff] px-2 mr-2 inline-block cursor-pointer;
}

.active-box {
  @apply bg-water-blue relative;
}

.active-box::after{
  @apply text-white absolute top-[1px] left-[5px];
  display: inline-block;
  transform: rotate(45deg);
  height: 10px;
  width: 5px;
  border-bottom: 2px solid white;
  border-right: 2px solid white;
  content: "";
}

.inactive-box {
  background-color: #ddd;
}

input {
  @apply rounded-[4px] bg-[#fff] px-2 mr-2;
}
</style>