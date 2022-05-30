<script setup lang="ts">
import type { Ref } from 'vue';
import type { Track } from '@/config/types';
import { useBandStore } from '@/stores/band.store';
import useMusicPlayer from '@/composables/useMusicPlayer';
import { fromSecondsToMinutes } from '@/config/utilities';
import { useMusicPlayer as musicPlayerStore } from '@/stores/music-player.store';

const props = defineProps({
  albumId: {
    type: String,
    required: true,
  },
});

const { init, play, pause, stop } = useMusicPlayer();
const musicPlayer = musicPlayerStore();

const { fetchTracks } = useBandStore();

const state = reactive({
  tracks: {} as Track[],
});

onMounted(() => {
  fetchTracks(props.albumId).then((res) => {
    state.tracks = res as Track[];
    state.tracks.sort((a, b) => a.number < b.number ? -1 : 1);
  });
});

const onPlay = (track: Track) => {
  if (musicPlayer.currentTrack.id !== track.id) {
    stop();
    init(track);
  }

  play(track);
};

const showByIndex: Ref<null | number> = ref(null);
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
      <div class="flex items-center w-full">
        <div class="flex items-center w-4 mr-2 text-sm leading-7 text-center cursor-pointer text-slate-600">
          <button
            v-if="showByIndex === index || musicPlayer.isPlaying && musicPlayer.currentTrack.id === track.id"
            class="w-4 h-4"
          >
            <IconPause
              v-if=" musicPlayer.isPlaying && musicPlayer.currentTrack.id === track.id"
              class="w-full"
              @click="pause()"
            />
            <IconPlay
              v-else
              class="w-full"
              @click="onPlay(track)"
            />
          </button>
          <span v-else>
            {{ track.number }}.
          </span>
        </div>
        <div class="text-lg font-semibold">
          {{ track.name }}
        </div>
        <div class="ml-auto mr-0">
          {{ fromSecondsToMinutes(track.duration) }}
        </div>
      </div>
      <div />
    </li>
  </ul>
</template>
