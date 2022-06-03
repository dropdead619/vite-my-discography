<script setup lang="ts">
import { useMeta } from 'vue-meta';

useMeta({
  title: '404',
});
</script>

<template>
  <h1> 404 </h1>
  <h2>
    Go <RouterLink :to="{ name: 'Bands' }">
      back?
    </RouterLink>
  </h2>
</template>
