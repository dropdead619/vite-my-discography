import { Howl, Howler } from 'howler';
import type { Track } from '@/config/types';
import { useMusicPlayer as musicPlayerStore } from '@/stores/music-player.store';

export default function useMusicPlayer() {
  interface musicPlayerType {
    isLooped: boolean
    volume: number
    soundId?: number
    currentTrack?: Howl
  }

  const musicPlayer = musicPlayerStore();

  const state = reactive({
    isLooped: false,
    volume: 1,
    soundId: undefined,
    currentTrack: undefined,
  } as musicPlayerType,
  );

  const stateAsRefs = toRefs(state);

  function init(track: Track) {
    musicPlayer.currentTrack = track;
    state.currentTrack = new Howl({
      src: track.trackUrl,
      html5: true,
      volume: state.volume,
      loop: state.isLooped,
      preload: true,
    });
  }

  function duration() {
    return state.currentTrack?.duration(state.soundId);
  }

  function play(track: Track) {
    if (!state.soundId)
      Howler.stop();
    musicPlayer.currentTrack = track;
    state.soundId = state.currentTrack?.play();
    musicPlayer.isPlaying = true;
  }

  function pause() {
    state.currentTrack?.pause(state.soundId);
    musicPlayer.isPlaying = false;
  }

  function stop() {
    state.currentTrack?.stop(state.soundId);
    musicPlayer.isPlaying = false;
  }

  return { ...stateAsRefs, duration, pause, play, stop, init };
}
