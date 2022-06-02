<script setup lang="ts" >
import { storeToRefs } from 'pinia';
import { useMusicPlayer } from '@/stores/music-player.store';
import { fromSecondsToMinutes } from '@/config/utilities';

const musicPlayer = useMusicPlayer();
const { currentTrack, isPlaying, seekPosition, volumePosition } = storeToRefs(musicPlayer);

const inputBackgroundSize = computed(() => {
  return `background-size: ${seekPosition.value * 100 / (currentTrack.value?.duration as number)}% 100%`;
});

const onSeekChange = (e: Event) => {
  musicPlayer.seek(+(e.target as HTMLInputElement).value);
};

const onVolumeChange = (e: Event) => {
  musicPlayer.volume(+(e.target as HTMLInputElement).value / 100);
};
</script>

<template>
  <div v-if="currentTrack" class="bottom-0 flex items-center invisible w-full h-16 text-gray-900 bg-gray-200 border border-gray-400" />

  <div v-if="currentTrack" class="fixed bottom-0 z-50 flex items-center w-full h-16 bg-gray-200 border-t border-gray-400 dark:bg-theme-dark-4">
    <div class="flex items-center w-full max-w-4xl px-4 m-auto bg-gray-100 dark:bg-theme-dark-1 h-4/5 rounded-2xl ">
      <div class="h-6 pr-6 text-xs truncate cursor-default sm:text-md w-60">
        {{ currentTrack.name }}
      </div>

      <div class="flex flex-col w-full max-w-lg">
        <div class="flex items-end justify-center">
          <IconPrevious class="h-4 cursor-pointer" @click="musicPlayer.prev()" />
          <IconPause
            v-if="isPlaying"
            class="w-8 h-6 mx-1 rounded-full cursor-pointer"
            @click="musicPlayer.pause()"
          />
          <IconPlay
            v-else
            class="w-8 h-6 mx-1 rounded-full cursor-pointer"
            @click="musicPlayer.play()"
          />

          <IconNext class="h-4 cursor-pointer" @click="musicPlayer.next()" />
        </div>
        <div class="flex items-center">
          <div class="w-8 mr-2 text-xs">
            {{ fromSecondsToMinutes(seekPosition) }}
          </div>
          <input
            v-model="seekPosition"
            :style="inputBackgroundSize"
            class="w-full h-1 p-0 bg-gray-300 appearance-none bg-primary focus:outline-none focus:ring-0 focus:shadow-none"
            type="range"
            min="0"
            :max="currentTrack.duration"
            @change="onSeekChange"
          >
          <div class="ml-2 text-xs">
            {{ fromSecondsToMinutes(currentTrack.duration as number) }}
          </div>
        </div>
      </div>
      <IconSound
        v-if="volumePosition > 0"
        class="mx-2 cursor-pointer"
        @click="musicPlayer.mute()"
      />
      <IconNoSound
        v-else
        class="mx-2 cursor-pointer"
        @click="musicPlayer.unmute()"
      />
      <input
        :value="volumePosition * 100"
        :style="inputBackgroundSize"
        class="w-12 h-1 p-0 bg-gray-300 appearance-none bg-gradient-to-r from-gray-500 to-black-500 focus:outline-none focus:ring-0 focus:shadow-none"
        type="range"
        :min="0"
        :max="100"
        @change="onVolumeChange"
      >
    </div>
  </div>
</template>
