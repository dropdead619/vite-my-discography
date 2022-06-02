import { defineStore } from 'pinia';
import { Howl, Howler } from 'howler';
import { useBandStore } from './band.store';
import type { Track } from '@/config/types';

export const useMusicPlayer = defineStore('player', () => {
  const seekPosition = ref(0);

  const isLooped = ref(false);
  const volumePosition = ref(1);
  const soundId = ref<number>();
  const howlTrackInstance = ref<Howl>();

  const bandStore = useBandStore();
  const isPlaying = computed(() => {
    return howlTrackInstance.value?.playing();
  });

  const currentTrack = ref<Track>();
  const isEnded = ref<boolean>();

  function init(track: Track) {
    currentTrack.value = track;
    howlTrackInstance.value = new Howl({
      src: track.trackUrl,
      html5: true,
      volume: +volumePosition.value,
      loop: isLooped.value,
      preload: true,
    });
  }

  const { pause: pauseInterval, resume: resumeInterval } = useIntervalFn(() => {
    seekPosition.value = seek() as number;
  }, 1000);

  function play() {
    if (!soundId) {
      Howler.stop();
      seekPosition.value = 0;
    }
    soundId.value = howlTrackInstance.value?.play();
    seekPosition.value = howlTrackInstance.value?.seek(soundId.value) as number;
    isEnded.value = false;
  }

  function pause() {
    howlTrackInstance.value?.pause(soundId.value);
  }

  function next() {
    stop();
    const track = bandStore.currentTracks.find(el => el.number === (currentTrack.value?.number as number) + 1);
    if (track)
      init(track);
    else
      init(bandStore.currentTracks[0]);

    play();
  }

  function prev() {
    stop();
    const track = bandStore.currentTracks.find(el => el.number === (currentTrack.value?.number as number) - 1);
    if (track)
      init(track);
    else
      init(bandStore.currentTracks[bandStore.currentTracks.length - 1]);

    play();
  }

  watch(() => seekPosition.value, (val) => {
    if (val >= (currentTrack.value?.duration as number) - 0.8) {
      isEnded.value = true;
      seekPosition.value = 0;
    }
  });

  watch(() => isEnded.value, (val) => {
    if (val)
      next();
  });

  watch(() => isPlaying.value, (val) => {
    if (val)
      resumeInterval();
    else
      pauseInterval();
  });

  function stop() {
    howlTrackInstance.value?.stop(soundId.value);
  }

  function seek(position?: number) {
    if (position || position === 0) {
      howlTrackInstance.value?.seek(position, soundId.value);
      return position;
    }
    else {
      return howlTrackInstance.value?.seek(soundId.value);
    }
  }

  function mute() {
    volumePosition.value = 0;
    volume(volumePosition.value);
  }

  function unmute() {
    volumePosition.value = 1;
    volume(volumePosition.value);
  }

  function volume(position?: number) {
    if (position || position === 0) {
      volumePosition.value = position;
      howlTrackInstance.value?.volume(position);
      return position;
    }
    volumePosition.value = 0;
    return howlTrackInstance.value?.volume();
  }

  return { currentTrack, volumePosition, seekPosition, isEnded, isPlaying, isLooped, volume, mute, unmute, init, seek, play, pause, stop, next, prev };
});
