<script setup lang="ts">
import BandItems from './BandItems.vue';
import type { Band } from '@/config/types';
import { useBandStore } from '@/stores/band.store';

const bandsStore = useBandStore();

bandsStore.fetchBands();
</script>

<template>
  <ul class="flex justify-around">
    <li v-for="band in bandsStore.bands" :key="band.id">
      <BandItems
        :id="band.id"
        :name="band.name"
        :genres="band.genre"
        :description="band.description"
        :cover-url="band.coverUrl"
      />
    </li>
  </ul>
</template>
