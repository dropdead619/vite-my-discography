<script setup lang="ts">
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { Band } from '../config/types';
import { useBandStore } from '../stores/band.store';
import BandItems from '../components/Band/BandItems.vue';

const route = useRoute();
const { bands } = useBandStore();
const state = reactive({
  band: {} as Band,
});

onMounted(() => {
  state.band = bands.find(el => el.id.toString() === route.params.id) as Band;
});
</script>

<template>
  <div class="flex">
    <div class="h-screen px-3 py-8 text-center shadow-xl min-w-fit dark:text-slate-50 dark:shadow-gray-400 dark:shadow-md">
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
    <Swiper
      :modules="[Navigation]"
      navigation
      :slides-per-view="1"
      :space-between="50"
    >
      <SwiperSlide v-for="content in state.band.content" :key="content.id">
        <BandItems
          :id="content.id"
          :name="content.name"
          :cover-url="content.coverUrl"
        />
        <BandTracks class="max-w-md m-auto mt-4" :tracks="content.tracks" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>
