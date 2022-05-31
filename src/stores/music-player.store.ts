import { defineStore } from 'pinia';
import { Howl, Howler } from 'howler';
import { useBandStore } from './band.store';
import type { Track } from '@/config/types';

export const useMusicPlayer = defineStore('player', () => {
  const seekPosition = ref(0);

  const isLooped = ref(false);
  const volume = ref(1);
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
      volume: volume.value,
      loop: isLooped.value,
      preload: true,
    });
  }

  const { pause: pauseInterval, resume: resumeInterval } = useIntervalFn(() => {
    seekPosition.value = seek() as number;
  }, 1000);

  function play() {
    if (!soundId)
      Howler.stop();
    soundId.value = howlTrackInstance.value?.play();
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
    if (val >= (currentTrack.value?.duration as number) - 0.8)
      isEnded.value = true;
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

  return { currentTrack, seekPosition, isEnded, isPlaying, isLooped, init, seek, play, pause, stop, next, prev };
});
