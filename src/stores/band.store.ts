import { defineStore } from 'pinia';
import { Band } from '../config/types';

export const useBandStore = defineStore('app', {
  state: () => (
    {
      bands: [
        {
          id: 0,
          name: 'Кофе Матильды',
          genre: ['Dream-pop', 'Shoegaze'],
          description: '',
          coverUrl: 'https://sun9-25.userapi.com/s/v1/if1/JZ7tnOKg1hgsauLfngGYbrOgaeRjocTM0-U_pBmSesiH7OJIYa2Pf515DgqHLJ9wM_KGEnye.jpg?size=1000x1000&quality=96&type=album',
        },
        {
          id: 1,
          name: 'w4stedlives',
          genre: ['Post-rock', 'Experimental'],
          description: '',
          coverUrl: 'https://sun9-30.userapi.com/s/v1/ig1/yfqcMYcydsIdKpfqcClipTW6hFzlgOe6Me9NiHp8-nBYZNZs_q86yRjtMvh3w59j639BxJ8D.jpg?size=1536x1152&quality=96&type=album',
        },
      ] as Band[]
    }
  ),
  actions: {
  },
});