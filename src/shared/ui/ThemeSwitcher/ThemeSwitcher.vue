<script setup lang="ts">
import { IconMoon, IconSun } from '@/shared/ui/icons';
import { BaseButton } from '@/shared/ui/base';

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <BaseButton class="py-1 bg-primary" @click="toggleDark()">
    <IconMoon v-if="isDark" />
    <IconSun v-else />
  </BaseButton>
</template>
