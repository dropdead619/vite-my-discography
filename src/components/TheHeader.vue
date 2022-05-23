<script setup lang="ts">
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <div class="fixed top-0 left-0 right-0 flex justify-between w-full h-12 py-2 pl-16 align-middle bg-white shadow-md dark:bg-theme-dark pr-11 dark:shadow-sm dark:shadow-slate-50">
    <div class="text-2xl dark:text-slate-50">
      <RouterLink :to="{ name: 'Bands' }">
        w4stedfy
      </RouterLink>
    </div>
    <BaseButton class="py-1" @click="toggleDark()">
      <IconMoon v-if="isDark" />
      <IconSun v-else />
    </BaseButton>
  </div>
</template>
