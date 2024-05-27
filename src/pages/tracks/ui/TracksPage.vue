<script setup lang="ts">
import { TracksList } from '@/entities/Track/ui/index'
import { ContentCard } from '@/shared/ui/ContentCard'
import { useAlbumStore } from '@/entities/Album/model/album.store';
import { IBandContent } from '@/shared/lib/types';

const route = useRoute();

const currentAlbum = ref<IBandContent>();

const breakpoints = useBreakpoints(breakpointsTailwind);

const smAndSmaller = breakpoints.smaller('sm');

const { fetchAlbum } = useAlbumStore();
onMounted(() => {
  fetchAlbum(route.params.albumId as string).then((res) => {
    currentAlbum.value = res[0] as IBandContent;
  });
});
</script>

<template>
 <div v-if="currentAlbum" class="px-6 py-10">
    <ContentCard
      :id="currentAlbum.id"
      :card-size="smAndSmaller ? 'small' : 'large' "
      :name="currentAlbum.name"
      :year="currentAlbum.year.toString()"
      :cover-url="currentAlbum.coverUrl"
      class="mb-6"
    />
    <TracksList class="max-w-md m-auto mt-4" :album-id="currentAlbum.id" />
  </div>
</template>