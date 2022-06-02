<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  coverUrl: {
    type: String,
    default: '',
  },
  year: {
    type: String,
    required: false,
    default: null,
  },
  genres: {
    type: Array as PropType<Array<string>>,
  },
  cardSize: {
    type: String,
    default: 'large',
  },
});

const size = computed(() => {
  if (props.cardSize === 'large')
    return 'w-96';

  else if (props.cardSize === 'medium')
    return 'w-72';

  else if (props.cardSize === 'small')
    return 'w-58';

  else if (props.cardSize === 'small')
    return 'w-48';
});

const imageSize = computed(() => {
  if (props.cardSize === 'large')
    return 'w-80 h-80';

  else if (props.cardSize === 'medium')
    return 'w-58 h-58';

  else if (props.cardSize === 'small')
    return 'w-48 h-48';
  else if (props.cardSize === 'smallest')
    return 'w-40 h-40';
});
</script>

<template>
  <div
    :class="size"
    class="cursor-pointer h-full bg-gray-200  dark:bg-theme-dark-1 text-center transition border border-solid border-gray-200 dark:border-gray-800 rounded-xl ease-in-out delay-75 max-w-sm shadow-[6px_6px_8px_0px_rgba(34,60,80,0.2)] dark:border-0 dark:shadow-none mx-auto p-0 hover:scale-105 hover:shadow-[14px_14px_8px_0px_rgba(34,60,80,0.2)]"
  >
    <div class="flex items-center justify-center w-full p-6 pb-2 ">
      <img
        class="rounded-lg"
        :class="imageSize"
        :src="props.coverUrl"
        :alt="props.name"
      >
    </div>
    <div class="p-4 pt-2">
      <h2 class="font-semibold">
        {{ props.name }}
        <span v-if="props.year" class="text-xs"> ({{ props.year }})</span>
      </h2>
      <p>
        {{ props.description }}
      </p>
      <div class="flex flex-wrap items-center justify-between w-1/2 mx-auto mt-2 text-xs dark:text-gray-300 ">
        <div
          v-for="genre in props.genres"
          :key="genre"
        >
          {{ genre }}
        </div>
      </div>
    </div>
  </div>
</template>
