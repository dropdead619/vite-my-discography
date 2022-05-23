<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  id: {
    type: Number,
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
  genres: {
    type: Array as PropType<Array<string>>,
  },
});

const router = useRouter();

function redirectToBand() {
  router.push({
    name: 'BandsView', params: { id: props.id },
  });
}
</script>

<template>
  <div class="cursor-pointer text-center bg-white transition border border-solid border-gray-200 rounded-t-xl ease-in-out delay-75 max-w-sm mt-12 shadow-[14px_13px_8px_0px_rgba(34,60,80,0.2)] dark:shadow-gray-400 mx-auto p-0 hover:scale-110 hover:shadow-[34px_44px_8px_0px_rgba(34,60,80,0.2)]" @click="redirectToBand">
    <div>
      <img
        class="w-full h-96 rounded-t-xl"
        :src="props.coverUrl"
        :alt="props.name"
      >
    </div>
    <div class="p-4 pt-2">
      <h2 class="font-semibold">
        {{ props.name }}
      </h2>
      <p>
        {{ props.description }}
      </p>
      <div
        v-for="genre in props.genres"
        :key="genre"
      >
        <div>
          {{ genre }}
        </div>
      </div>
    </div>
  </div>
</template>
