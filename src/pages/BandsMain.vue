<script setup lang="ts">
import { useMeta } from 'vue-meta';
import BandList from '../components/Band/BandList.vue';

useMeta({
  title: 'Main page',
});
</script>

<template>
  <BandList />
</template>
