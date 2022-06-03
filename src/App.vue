<script setup lang="ts">
import { useMeta } from 'vue-meta';
import { DEFAULT_TITLE } from './config/constants';

useMeta({
  title: DEFAULT_TITLE,
  description: {
    content: 'Web music player, to share my music with others',
  },
});
</script>

<template>
  <Metainfo>
    <template #title="{ content }">
      {{ content ? `${content} - ${DEFAULT_TITLE}` : DEFAULT_TITLE }}
    </template>
  </Metainfo>
  <div>
    <TheHeader />
    <RouterView />
  </div>
  <MusicPlayer />
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
