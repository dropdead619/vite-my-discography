<script setup lang="ts">
import type { BandContent } from '@/config/types';
import { ReleaseType } from '@/config/types';
import { useBandStore } from '@/stores/band.store';

const props = defineProps<{
  contentType: ReleaseType
}>();
const route = useRoute();
const router = useRouter();

const breakpoints = useBreakpoints(breakpointsTailwind);

const smAndLower = breakpoints.smaller('sm');

const { fetchAlbums } = useBandStore();

const state = reactive({
  content: {} as BandContent[],
});

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

onMounted(() => {
  fetchAlbums(route.params.id as string).then((res) => {
    state.content = res as BandContent[];
    state.content = state.content.filter(el => el.type === props.contentType);
    state.content.sort((a, b) => a.year >= b.year ? -1 : 1);
  });
});
</script>

<template>
  <div v-if="state.content.length > 0" class="p-4 pl-2 text-lg font-semibold">
    {{ releaseType }}
  </div>
  <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-fit">
    <div
      v-for="content in state.content"
      :key="content.id"
    >
      <ContentCard
        :id="content.id"
        :card-size="smAndLower ? 'smallest' : 'small'"
        :year="content.year"
        :name="content.name"
        :cover-url="content.coverUrl"
        @click="redirectToAlbum(content.id)"
      />
    </div>
  </div>
</template>
