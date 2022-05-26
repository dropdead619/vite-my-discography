<script setup lang="ts">
import type { Ref } from 'vue';
import type { Track } from '@/config/types';
import useMusicPlayer from '@/composables/useMusicPlayer';
import { useBandStore } from '@/stores/band.store';

const props = defineProps({
  albumId: {
    type: String,
    required: true,
  },
});

const { fetchTracks } = useBandStore();
const state = reactive({
  tracks: {} as Track[],
});

onMounted(() => {
  fetchTracks(props.albumId).then((res) => {
    state.tracks = res as Track[];
  });
});

const showByIndex: Ref<null | number> = ref(null);

const { play, pause, isPlaying, currentTrack } = useMusicPlayer();
</script>

<template>
  <ul>
    <li
      v-for="(track, index) in state.tracks"
      :key="track.id"
      class="flex justify-between px-4 py-2 my-2 rounded-full cursor-default bg-slate-200"
      @mouseover="showByIndex = index"
      @mouseout="showByIndex = null"
    >
      <div class="flex">
        <div class="w-4 h-4 mr-2 text-sm leading-7 text-center cursor-pointer text-slate-600">
          <button
            v-if="showByIndex === index || isPlaying && currentTrack === track.id"
            class="w-4 h-4"
          >
            <IconPause
              v-if="isPlaying && currentTrack === track.id"
              class="w-full"
              @click="pause()"
            />
            <IconPlay
              v-else
              class="w-full"
              @click="play(track)"
            />
          </button>
          <span v-else>
            {{ track.number }}.
          </span>
        </div>
        <div class="text-lg font-semibold">
          {{ track.name }}
        </div>
      </div>
      <div />
    </li>
  </ul>
</template>
