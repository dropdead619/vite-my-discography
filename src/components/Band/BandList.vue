<template>
  <ul class="band-list">
    <li v-for="band in bands">
      <BandItems :id="band.id" :name="band.name" :genre="band.genre" :description="band.description"
        :coverUrl="band.coverUrl" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useBandStore } from '../../stores/band.store';
import BandItems from './BandItems.vue';

const { bands } = useBandStore();

</script>