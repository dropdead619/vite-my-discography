import { defineStore } from 'pinia';
import { ref, uploadBytes } from 'firebase/storage';
import { doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import type { Band, BandContent } from '../config/types';
import { bandsRef, contentRef, db, storage, tracksRef } from '../firebaseApp';
import { generateID, getFileExtension } from '@/config/utilities';

export const useBandStore = defineStore('app', {
  state: () => (
    {
      bands: [] as Band[],
    }
  ),
  actions: {
    async fetchBands() {
      this.bands = [];
      const bandsSnap = await getDocs(query(bandsRef));

      bandsSnap.forEach(async (band) => {
        const data = band.data();
        this.bands.push(data as Band);
      });
    },
    async fetchAlbums(bandId: string) {
      const contentQuery = query(contentRef, where('bandId', '==', bandId));
      const contentSnap = await getDocs(contentQuery);
      const contentData = contentSnap.docs.map(el => ({ ...el.data(), id: el.id }));
      return contentData;
    },
    async fetchTracks(albumId: string) {
      const tracksQuery = query(tracksRef, where('albumId', '==', albumId));
      const tracksSnap = await getDocs(tracksQuery);
      const tracksData = tracksSnap.docs.map(el => ({ ...el.data(), id: el.id }));
      return tracksData;
    },
    addAlbum(contentData: BandContent) {
      return setDoc(doc(db, 'content', contentData.id), contentData);
    },
    addFiles(image: File) {
      const extension = getFileExtension(image.name);
      const imagesRef = ref(storage, `${generateID()}.${extension}`);
      console.log(imagesRef);

      uploadBytes(imagesRef, image);
    },
  },
  persist: true,
},
);
