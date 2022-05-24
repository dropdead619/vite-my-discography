export default function useMusicPlayer() {
  const isPlaying = ref(false);
  const currentTrack = ref(0);

  function play(id: number) {
    currentTrack.value = id;
    isPlaying.value = true;
  }

  // function nextTrack() {

  // }

  function pause() {
    isPlaying.value = false;
  }

  return { isPlaying, currentTrack, pause, play };
}
