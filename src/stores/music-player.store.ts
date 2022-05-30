import { defineStore } from 'pinia';
import type { Track } from '@/config/types';

export const useMusicPlayer = defineStore('player', {
  state: () => (
    {
      isPlaying: false,
      isLooped: false,
      duration: 0,
      volume: 1,
      currentTrack: {} as Track,
    }
  ),
});
