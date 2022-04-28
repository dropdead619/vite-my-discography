<template>
  <div class="band-info">
    <BandItems :id="state.band.id" :name="state.band.name" :genre="state.band.genre"
      :description="state.band.description" :coverUrl="state.band.coverUrl" style=" overflow: hidden;" />

    <!-- <div id="vk_playlist_-159173154_2"></div>
    <script type="text/javascript" src="https://vk.com/js/api/openapi.js?169"></script>
    <script type="text/javascript">
      (function() {
    VK.Widgets.Playlist("vk_playlist_-159173154_2", -159173154, 2,'403de184eff2784755');
  }());
    </script> -->
  </div>
</template>

<script setup lang="ts">
import { Band } from '../config/types';
import { useBandStore } from '../stores/band.store';
import BandItems from '../components/Band/BandItems.vue';

const route = useRoute();
const { bands } = useBandStore();
const state = reactive({
  band: {} as Band | undefined
});

onMounted(() => {
  state.band = bands.find(el => el.id == route.params.id as unknown as number);
})
</script>