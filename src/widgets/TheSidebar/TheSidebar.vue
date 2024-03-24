<script setup lang="ts">
import { useAppRoutes } from '@/app/providers';
import { IconHome, IconMic } from '@/shared/ui/icons';

const appRoutes = useAppRoutes();

const linksList = [
  {
    to: appRoutes.getMain(),
    title: 'Main',
    icon: IconHome,
  },
  {
    to: appRoutes.getBands(),
    title: 'Artists',
    icon: IconMic,
  },
];
</script>

<template>
  <aside class="relative w-full px-3 py-4 border-r border-r-label-divider">
    <div class="fixed flex flex-col gap-10">
      <div class="text-xl sm:text-2xl dark:text-slate-50">
        <RouterLink class="flex gap-2 font-bold" :to="appRoutes.getMain()">
          <img
            alt="logo"
            class="w-8"
            src="@/shared/assets/logo.webp"
          >
          w4stedfy
        </RouterLink>
      </div>

      <nav>
        <div
          v-for="link, i in linksList"
          :key="`${link.title} ${i}`"
          class="flex items-center gap-1"
        >
          <component :is="link.icon" />
          <RouterLink
            :to="link.to"
          >
            {{ link.title }}
          </RouterLink>
        </div>
      </nav>
    </div>
  </aside>
</template>
