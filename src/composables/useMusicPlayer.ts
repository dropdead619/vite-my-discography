import type { Track } from '@/config/types';

export default function useMusicPlayer() {
  const isPlaying = ref(false);
  const currentTrack = ref('');
  const audio = ref<HTMLAudioElement>();

  function play(track: Track) {
    currentTrack.value = track.id;
    audio.value = new Audio(track.trackUrl);
    audio.value.play();
    isPlaying.value = true;
  }

  // function nextTrack() {

  // }

  function pause() {
    audio.value?.pause();
    isPlaying.value = false;
  }

  return { isPlaying, currentTrack, pause, play };
}
