import { defineStore } from 'pinia';
import { getDocs, query } from 'firebase/firestore';
import type { IBand } from './band.dto';
import { bandsRef } from '@/app/firebase-app';

export const useBandStore = defineStore('bands', () => {
  const bands = ref<IBand[]>([]);

  async function fetchBands() {
    bands.value = [];
    const bandsSnap = await getDocs(query(bandsRef));

    bandsSnap.forEach((band) => {
      const data = band.data();
      bands.value.push(data as IBand);
    });
  }

  return {
    bands,
    fetchBands,
  };
}, {
  persist: true,
});
