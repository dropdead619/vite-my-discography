<script setup lang="ts">
defineProps<{ fileProgress: number }>();
</script>

<template>
  <div v-if="fileProgress" class="rounded-lg bg-gray-300 h-6 ml-4 w-24">
    <div class="rounded-lg flex h-full bg-cyan-500 transition-width ease-in-out text-gray-50 items-center justify-around" :style="`width: ${fileProgress}%`">
      <div class="w-fit px-2">
        {{ fileProgress }}%
      </div>
      <IconCheck v-if="fileProgress >= 100" />
    </div>
  </div>
</template>
