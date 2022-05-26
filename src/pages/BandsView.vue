<script setup lang="ts">
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { BandContent } from '../config/types';
import { useBandStore } from '../stores/band.store';
import BandItems from '../components/Band/BandItems.vue';

const route = useRoute();
const { fetchAlbums } = useBandStore();
const state = reactive({
  content: {} as BandContent[],
});

onMounted(() => {
  fetchAlbums(route.params.id as string).then((res) => {
    state.content = res as BandContent[];
  });
});
</script>

<template>
  <Swiper
    :modules="[Navigation]"
    navigation
    :slides-per-view="1"
    :space-between="50"
    :loop="true"
  >
    <SwiperSlide
      v-for="content in state.content"
      :key="content.id"
    >
      <BandItems
        :id="content.id"
        :name="content.name"
        :cover-url="content.coverUrl"
      />
      <BandTracks class="max-w-md m-auto mt-4" :album-id="content.id" />
    </SwiperSlide>
  </Swiper>
</template>
