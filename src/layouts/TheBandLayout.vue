<script setup lang="ts">
import type { Band } from '../config/types';
import { useBandStore } from '../stores/band.store';

const route = useRoute();
const store = useBandStore();
const state = reactive({
  band: {} as Band,
});

onMounted(() => {
  state.band = store.bands.find(el => el.id.toString() === route.params.id) as Band;
});
</script>

<template>
  <RouterView />
</template>
