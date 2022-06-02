<script lang="ts" setup>
import type { BandContent } from '@/config/types';
import { useBandStore } from '@/stores/band.store';

const route = useRoute();

const currentAlbum = ref<BandContent>();

const breakpoints = useBreakpoints(breakpointsTailwind);

const smAndSmaller = breakpoints.smaller('sm');

const { fetchAlbum } = useBandStore();
onMounted(() => {
  fetchAlbum(route.params.id as string).then((res) => {
    currentAlbum.value = res[0] as BandContent;
  });
});
</script>

<template>
  <div v-if="currentAlbum" class="px-6 py-10">
    <ContentCard
      :id="currentAlbum.id"
      :card-size="smAndSmaller ? 'small' : 'large' "
      :name="currentAlbum.name"
      :year="currentAlbum.year"
      :cover-url="currentAlbum.coverUrl"
      class="mb-6"
    />
    <BandTracks class="max-w-md m-auto mt-4" :album-id="currentAlbum.id" />
  </div>
</template>
