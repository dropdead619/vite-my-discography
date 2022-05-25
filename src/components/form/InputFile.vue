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
  error: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div class="flex flex-col w-full">
    <label class="font-semibold"> {{ props.label }} </label>
    <input
      type="file"
      v-bind="$attrs"
      class="p-2 max-w-xs rounded border border-solid border-slate-300 outline-none dark:text-black"
    >
    <div v-if="props.error" class="text-red-600">
      {{ props.error }}
    </div>
  </div>
</template>
