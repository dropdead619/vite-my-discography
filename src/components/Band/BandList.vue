<script setup lang="ts">
import { useBandStore } from '../../stores/band.store';
import BandItems from './BandItems.vue';

const { bands } = useBandStore();
</script>

<template>
  <ul class="flex justify-around">
    <li v-for="band in bands" :key="band.id">
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
