<script setup lang="ts">
import { useBandStore } from '../../stores/band.store';
import BandItems from './BandItems.vue';
import { db } from '../../firebaseApp'
import { collection, query } from 'firebase/firestore';
import { getDocs } from "firebase/firestore"
import { Band } from '@/config/types';

// const { bands } = useBandStore();

const store = reactive({
  bands: [] as Band[],
});

const bandsRef = collection(db, 'bands');

async function readBands() {
  const docSnap = await getDocs(query(bandsRef));

  docSnap.forEach(doc => {
    const data = doc.data();
    console.log(data.content ? data.content : '');
    store.bands.push(data);
  });
  console.log(store.bands);
  }

  readBands();
</script>

<template>
  <ul class="flex justify-around">
    <li v-for="band in store.bands" :key="band.id">
      <BandItems
        :id="band.id"
        :name="band.name"
        :genres="band.genre"
        :description="band.description"
        :cover-url="band.coverUrl"
      />
    </li>
  </ul>
</template>
