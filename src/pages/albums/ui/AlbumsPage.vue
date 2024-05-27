<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useBandStore } from '@/entities/Band/model';
import { IAlbum, IBand, ReleaseType } from '@/shared/lib/types';
import { IconPlus } from '@/shared/ui/icons';
import { useAlbumStore } from '@/entities/Album/model/album.store';
import { AlbumsList } from '@/entities/Album/ui/AlbumsList';

const route = useRoute();
const router = useRouter();
const bandStore = useBandStore();
const { bands } = storeToRefs(bandStore);
const currentBand = ref<IBand>();

const { fetchAlbums } = useAlbumStore();

const state = reactive({
  content: {} as IAlbum[],
});

const bg = computed(() => {
  return `background-image: url(${currentBand.value?.coverUrl})`;
});

const title = useTitle();

onMounted(() => {
  currentBand.value = bands.value.find(el => el.id === route.params.bandId);
  title.value = currentBand.value?.name;

  fetchAlbums(route.params.bandId as string).then((res) => {
    state.content = res;
  });
});
</script>

<template>
  <div
    class="text-white bg-fixed bg-center bg-no-repeat bg-cover"
    :style="bg"
  >
    <div class="flex flex-col justify-end w-full bg-cover bg-opacity-40 bg-theme-dark-4" style="height: 28rem">
      <h1 class="pb-2 pl-10 text-4xl font-semibold sm:text-7xl md:text-9xl">
        {{ currentBand?.name }}
      </h1>
      <div class="flex pb-4 pl-12">
        <div
          v-for="genre in currentBand?.genre"
          :key="genre"
        >
          <span class="pr-2 text-gray-300"> {{ genre }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="px-10 pt-8 pb-12">
    <div class="flex items-center">
      <h3 class="text-3xl font-semibold ">
        Discography
      </h3>

      <IconPlus
        class="w-8 h-8 ml-2 cursor-pointer"
        @click="router.push({
          name: 'AlbumAdd',
          params: {
            id: route.params.bandId,
          },
        })"
      />
    </div>
    <template v-if="state.content.length">
      <div>
        <AlbumsList :content="state.content" :content-type="ReleaseType.ALBUM" />
      </div>
      <div>
        <AlbumsList :content="state.content" :content-type="ReleaseType.EP" />
      </div>
      <div>
        <AlbumsList :content="state.content" :content-type="ReleaseType.SINGLE" />
      </div>
    </template>
  </div>
</template>
