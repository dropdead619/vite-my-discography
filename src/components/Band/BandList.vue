<script setup lang="ts">
import ContentCard from './ContentCard.vue';
import { useBandStore } from '@/stores/band.store';

const bandsStore = useBandStore();

const breakpoints = useBreakpoints(breakpointsTailwind);

const smAndSmaller = breakpoints.smaller('sm');

const router = useRouter();

function redirectToBand(id: string) {
  router.push({
    name: 'BandsView', params: { id },
  });
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
        :name="band.name"
        :card-size="smAndSmaller ? 'small' : 'large' "
        :genres="band.genre"
        :description="band.description"
        :cover-url="band.coverUrl"
        @click="redirectToBand(band.id)"
      />
    </li>
  </ul>
</template>
