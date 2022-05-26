<script setup lang="ts">
defineProps<{ fileProgress: number }>();
</script>

<template>
  <div v-if="fileProgress" class="w-24 h-6 ml-4 bg-gray-300 rounded-lg">
    <div class="flex items-center justify-around h-full ease-in-out rounded-lg bg-cyan-500 text-gray-50 transition-width" :style="`width: ${fileProgress}%`">
      <div class="px-2 w-fit">
        {{ fileProgress }}%
      </div>
      <IconCheck v-if="fileProgress >= 100" />
    </div>
  </div>
</template>
