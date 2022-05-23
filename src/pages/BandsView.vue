<script setup lang="ts">
import { EffectCards, Navigation } from 'swiper';
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
    <div class="h-screen py-8 text-center shadow-xl px-28 min-w-fit dark:text-slate-50 dark:shadow-slate-200">
      <img
        class="rounded-full w-80 h-80"
        :src="state.band.coverUrl"
        :alt="state.band.name"
      >
      <h2 class="text-3xl font-semibold pt-7">
        {{ state.band.name }}
      </h2>
      <span
        v-for="genre in state.band.genre"
        :key="genre"
        class="p-2 text-gray-400"
      >{{ genre }}</span>
    </div>
    <Swiper
      :modules="[Navigation]"
      navigation
      class="py-20"
      :slides-per-view="1"
      :space-between="50"
    >
      <SwiperSlide v-for="content in state.band.content" :key="content.id">
        <BandItems
          :id="content.id"
          :name="content.name"
          :cover-url="content.coverUrl"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>
