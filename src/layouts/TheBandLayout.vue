<script setup lang="ts">
import type { Band } from '../config/types';
import { useBandStore } from '../stores/band.store';

const route = useRoute();
const store = useBandStore();
const state = reactive({
  band: {} as Band,
});

onMounted(() => {
  state.band = store.bands.find(el => el.id.toString() === route.params.id) as Band;
});
</script>

<template>
  <div class="flex">
    <div class="fixed h-screen px-3 py-8 text-center shadow-xl min-w-fit dark:text-slate-50 dark:shadow-gray-400 dark:shadow-md">
      <div>
        <img
          class="w-20 h-20 m-auto rounded-full"
          :src="state.band.coverUrl"
          :alt="state.band.name"
        >
        <h2 class="pt-4 text-sm font-semibold">
          {{ state.band.name }}
        </h2>
        <span
          v-for="genre in state.band.genre"
          :key="genre"
          class="p-2 text-xs text-gray-400"
        >{{ genre }}</span>
      </div>
      <BaseButton class="mt-5" @click="$router.push({ name: 'BandsAddAlbum' })">
        Add new
      </BaseButton>
    </div>
    <RouterView class="pb-28 ml-44" />
  </div>
</template>
