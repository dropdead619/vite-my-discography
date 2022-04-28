<template>
  <div class="band" @click="redirectToBand">
    <div class="band__cover">
      <img :src="props.coverUrl" :alt="props.name">
    </div>
    <div class="band__wrapper">
      <h2 class="band__title">{{ props.name }}</h2>
      <p class="band__description">{{ props.description }}</p>
      <div class="genre__list" v-for="genre in props.genre">
        <div class="genre__item">
          {{ genre }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  coverUrl: {
    type: String,
    required: true
  },
  genre: {
    type: Array as PropType<Array<string>>
  },
});

const router = useRouter();

function redirectToBand() {
  router.push({
    name: 'BandsView', params: { id: props.id }
  })
}

</script>