import { defineStore } from 'pinia';
import type { Band } from '../config/types';

export const useBandStore = defineStore('app', {
  state: () => (
    {
      bands: [
        {
          id: 1,
          name: 'Кофе Матильды',
          genre: ['Dream-pop', 'Shoegaze'],
          description: '',
          coverUrl: 'https://sun9-25.userapi.com/s/v1/if1/JZ7tnOKg1hgsauLfngGYbrOgaeRjocTM0-U_pBmSesiH7OJIYa2Pf515DgqHLJ9wM_KGEnye.jpg?size=1000x1000&quality=96&type=album',
          content: [
            {
              id: 1,
              type: 'single',
              name: 'Каждый вечер',
              coverUrl: 'https://sun9-13.userapi.com/s/v1/if1/USmA6Ze68c7BbVnO_qHWEDdV8HYrFe66iiF6-BukXyufIjXSqECjTJRCK4c-cVRr_mwqfvGy.jpg?size=1600x1600&quality=96&type=album',
              year: 2020,
            },
            {
              id: 2,
              type: 'single',
              name: 'Вмерла вид кофе...',
              coverUrl: 'https://sun9-13.userapi.com/s/v1/if1/USmA6Ze68c7BbVnO_qHWEDdV8HYrFe66iiF6-BukXyufIjXSqECjTJRCK4c-cVRr_mwqfvGy.jpg?size=1600x1600&quality=96&type=album',
              year: 2022,
            },
          ],
        },
        {
          id: 2,
          name: 'w4stedlives',
          genre: ['Post-rock', 'Experimental'],
          description: '',
          coverUrl: 'https://sun9-30.userapi.com/s/v1/ig1/yfqcMYcydsIdKpfqcClipTW6hFzlgOe6Me9NiHp8-nBYZNZs_q86yRjtMvh3w59j639BxJ8D.jpg?size=1536x1152&quality=96&type=album',
          content: [
            {
              id: 1,
              type: 'EP',
              name: 'dream.',
              coverUrl: 'https://sun9-67.userapi.com/s/v1/ig1/vIaXOGucmmrU0pGndvNrl0wNiUyuEBMIPp4ztxDujH6qCqnyW6f0rX9Kt0clPZZ9AqPJTKpG.jpg?size=1080x1080&quality=96&type=album',
              year: 2020,
            },
          ],
        },
      ] as Band[],
    }
  ),
  actions: {
  },
});
