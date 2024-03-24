import { defineStore } from 'pinia';
import { ref as fbRef, uploadBytesResumable } from 'firebase/storage';
import { doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import type { ITrack } from './track.dto';
import { db, storage, tracksRef } from '@/app/firebase-app';
import { generateID } from '@/shared/lib/utils/generate';
import { getFileExtension } from '@/shared/lib/utils/get';

export const useTrackStore = defineStore('tracks', () => {
  const currentTracks = ref<ITrack[]>([]);

  async function fetchTracks(albumId: string) {
    const tracksQuery = query(tracksRef, where('albumId', '==', albumId));
    const tracksSnap = await getDocs(tracksQuery);
    const tracksData = tracksSnap.docs.map(el => ({ ...el.data(), id: el.id }));
    currentTracks.value = tracksData as ITrack[];
    return tracksData;
  }

  function addImages(image: File) {
    const extension = getFileExtension(image.name);
    const imagesRef = fbRef(storage, `images/${generateID()}.${extension}`);
    return uploadBytesResumable(imagesRef, image);
  }

  async function addTrack(trackData: ITrack) {
    await setDoc(doc(db, 'tracks', trackData.id), trackData);
  }

  function addTrackFile(track: File) {
    const extension = getFileExtension(track.name);
    const tracksRef = fbRef(storage, `tracks/${generateID()}.${extension}`);
    return uploadBytesResumable(tracksRef, track);
  }

  return {
    currentTracks,
    fetchTracks,
    addImages,
    addTrack,
    addTrackFile,
  };
});
