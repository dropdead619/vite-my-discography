<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="flex flex-col w-full">
    <label class="font-semibold"> {{ props.label }} </label>
    <input
      v-bind="$attrs"
      class="max-w-xs p-2 border border-solid rounded outline-none border-slate-300 dark:text-black"
      :class="{ 'bg-gray-300': $attrs.disabled }"
      :value="props.modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
    <div v-if="props.error" class="text-red-600">
      {{ props.error }}
    </div>
  </div>
</template>
