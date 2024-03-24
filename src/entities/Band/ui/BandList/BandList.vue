<script setup lang="ts">
import { useBandStore } from '../../model';
import { AppRoutes } from '@/app/providers';
import { ContentCard } from '@/shared/ui/ContentCard';

const bandsStore = useBandStore();

const breakpoints = useBreakpoints(breakpointsTailwind);

const smAndSmaller = breakpoints.smaller('sm');

const router = useRouter();

function redirectToBand(id: string) {
  router.push(AppRoutes.getAlbums(id));
}
bandsStore.fetchBands();
</script>

<template>
  <ul class="flex flex-col flex-wrap justify-around px-8 mt-24 md:flex-row">
    <li
      v-for="band in bandsStore.bands"
      :key="band.id"
      class="mb-12 md:mb-0"
    >
      <ContentCard
        :id="band.id"
        :card-size="smAndSmaller ? 'small' : 'large' "
        :cover-url="band.coverUrl"
        :description="band.description"
        :genres="band.genre"
        :name="band.name"
        @click="redirectToBand(band.id)"
      />
    </li>
  </ul>
</template>
