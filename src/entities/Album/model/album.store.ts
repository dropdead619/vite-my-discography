import { getDocs, query, where } from 'firebase/firestore';
import { defineStore } from 'pinia';
import { contentRef } from '@/app/firebase-app';
import { IAlbum } from '@/shared/lib/types';

export const useAlbumStore = defineStore('albums', () => {
  async function fetchAlbums(bandId: string): Promise<IAlbum[]> {
    const contentQuery = query(contentRef, where('bandId', '==', bandId));
    const contentSnap = await getDocs(contentQuery);
    const contentData = contentSnap.docs.map(el => ({ ...el.data(), id: el.id }));
    return contentData as unknown as Promise<IAlbum[]>;
  }

  async function fetchAlbum(albumId: string) {
    const contentQuery = query(contentRef, where('id', '==', albumId));
    const contentSnap = await getDocs(contentQuery);
    const contentData = contentSnap.docs.map(el => ({ ...el.data(), id: el.id }));
    return contentData;
  }

  //  function addAlbum(contentData: BandContent) {
  //     return setDoc(doc(db, 'content', contentData.id), contentData);
  //   }

  return {
    fetchAlbum,
    fetchAlbums,
  };
});
