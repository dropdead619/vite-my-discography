import type { AudioPlaylistType } from 'ts-audio';
import AudioPlaylist from 'ts-audio';
import type { Track } from '@/config/types';

export default function useMusicPlayer(tracks: Track[]) {
  const isPlaying = ref(false);
  // const isLooped = ref(false);
  const volume = ref(1);
  const currentTrack = ref('');
  const audio = ref<AudioPlaylistType>(
    AudioPlaylist({
      files: tracks.map(el => el.trackUrl),
      volume: volume.value,
    }));

  function play(trackId: string) {
    currentTrack.value = trackId;

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
