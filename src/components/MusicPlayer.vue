<script setup lang="ts" >
import { useMusicPlayer } from '@/stores/music-player.store';
import { fromSecondsToMinutes } from '@/config/utilities';

const musicPlayer = useMusicPlayer();
</script>

<template>
  <div class="flex items-center fixed z-50 bottom-0 w-full border-gray-400 border h-12 bg-gray-200 text-gray-900">
    <div class="flex items-center max-w-4xl px-4 w-full m-auto h-4/5 bg-gray-100 rounded-2xl ">
      <div class="pr-6 w-60">
        <span class="text-xs pr-1">{{ musicPlayer.currentTrack.number }}.</span> {{ musicPlayer.currentTrack.name }}
      </div>
      <input
        class="appearance-none max-w-lg w-full
      h-1 p-0 bg-gray-300 focus:outline-none focus:ring-0 focus:shadow-none "
        type="range"
        min="0"
        max="100"
        value="50"
      >
      <div class="ml-auto mr-0 text-xs">
        {{ fromSecondsToMinutes(musicPlayer.currentTrack.duration) }}
      </div>
    </div>
  </div>
</template>
