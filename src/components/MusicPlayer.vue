<script setup lang="ts" >
import { storeToRefs } from 'pinia';
import { useMusicPlayer } from '@/stores/music-player.store';
import { fromSecondsToMinutes } from '@/config/utilities';

const musicPlayer = useMusicPlayer();
const { currentTrack, isPlaying, seekPosition } = storeToRefs(musicPlayer);

const inputBackgroundSize = computed(() => {
  return `background-size: ${seekPosition.value * 100 / (currentTrack.value?.duration as number)}% 100%`;
});

const onChange = (e: Event) => {
  musicPlayer.seek(+(e.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="flex items-center fixed z-50 bottom-0 w-full border-gray-400 border h-16 bg-gray-200 text-gray-900">
    <div class="flex items-center max-w-4xl px-4 w-full m-auto h-4/5 bg-gray-100 rounded-2xl ">
      <div class="pr-6 w-60">
        <span class="text-xs pr-1">{{ currentTrack?.number }}.</span> {{ currentTrack?.name }}
      </div>

      <div class="flex flex-col  max-w-lg w-full">
        <div class="flex justify-center items-center">
          <IconPrevious class="h-4 cursor-pointer" @click="musicPlayer.prev()" />
          <IconPause
            v-if="isPlaying"
            class="cursor-pointer w-8 h-6 border border-slate-500 mx-2 rounded-full"
            @click="musicPlayer.pause()"
          />
          <IconPlay
            v-else
            class="cursor-pointer w-8 h-6 border border-slate-500 mx-2 rounded-full"
            @click="musicPlayer.play()"
          />

          <IconNext class="cursor-pointer h-4" @click="musicPlayer.next()" />
        </div>
        <div class="flex items-center">
          <div class="w-8 text-xs mr-2">
            {{ fromSecondsToMinutes(seekPosition) }}
          </div>
          <input
            v-model="seekPosition"
            :style="inputBackgroundSize"
            class="appearance-none w-full
          h-1 p-0 bg-gray-300 bg-gradient-to-r from-orange-500 to-red-500 bg- focus:outline-none focus:ring-0 focus:shadow-none"
            type="range"
            min="0"
            :max="currentTrack?.duration"
            @change="onChange"
          >
          <div class="ml-2 text-xs">
            {{ fromSecondsToMinutes(currentTrack?.duration as number) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
