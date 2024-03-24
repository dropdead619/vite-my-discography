<script setup lang="ts">
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher';
import { IconBack } from '@/shared/ui/icons';
</script>

<template>
  <div class="fixed bottom-0 flex justify-between w-full h-12 col-span-3 py-2 pl-16 align-middle bg-white shadow-md pr-11 dark:bg-theme-dark-4 dark:shadow-sm dark:shadow-slate-50">
    <div class="flex items-center gap-2">
      <IconBack class="w-8 mr-1 cursor-pointer" @click="$router.go(-1)" />
    </div>
    <ThemeSwitcher />
  </div>
</template>
