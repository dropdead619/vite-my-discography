<script setup lang="ts">
import type { IAlbum } from '../../model/album.dto';
import { ContentCard } from '@/shared/ui/ContentCard';
import { ReleaseType } from '@/shared/lib/types';

const props = defineProps<{
  contentType: ReleaseType;
  content: IAlbum[];
}>();

const filteredContent = computed(() => {
  return props.content.filter(el => el.type === props.contentType).sort((a, b) => +a.year >= +b.year ? -1 : 1);
});

const router = useRouter();

const releaseType = computed(() => {
  if (props.contentType === ReleaseType.ALBUM)
    return 'Albums';

  else if (props.contentType === ReleaseType.EP)
    return 'EPs';

  else
    return 'Singles';
});

function redirectToAlbum(id: string) {
  router.push({ name: 'AlbumView', params: { id } });
}
</script>

<template>
  <div class="p-4 pl-2 text-lg font-semibold">
    {{ releaseType }}
  </div>
  <div class="grid grid-cols-1 gap-4 mx-auto sm:mx-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 w-fit">
    <div
      v-for="info in filteredContent"
      :key="info.id"
    >
      <ContentCard
        :id="info.id"
        card-size="small"
        :cover-url="info.coverUrl"
        :name="info.name"
        :year="info.year"
        @click="redirectToAlbum(info.id)"
      />
    </div>
  </div>
</template>
