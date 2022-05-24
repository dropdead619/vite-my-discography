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
              genres: ['Dream-pop'],
              coverUrl: 'https://sun9-13.userapi.com/s/v1/if1/USmA6Ze68c7BbVnO_qHWEDdV8HYrFe66iiF6-BukXyufIjXSqECjTJRCK4c-cVRr_mwqfvGy.jpg?size=1600x1600&quality=96&type=album',
              year: 2020,
              tracks: [{
                id: 1,
                length: 3.54,
                name: 'Каждый вечер',
              }],
            },
            {
              id: 2,
              type: 'single',
              name: 'Вмерла вид кофе...',
              genres: ['Shoegaze'],
              coverUrl: 'https://sun9-13.userapi.com/s/v1/if1/USmA6Ze68c7BbVnO_qHWEDdV8HYrFe66iiF6-BukXyufIjXSqECjTJRCK4c-cVRr_mwqfvGy.jpg?size=1600x1600&quality=96&type=album',
              year: 2022,
              tracks: [{
                id: 2,
                length: 4.24,
                name: 'Вмерла вид кофе...',
              }],
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
              genres: ['Shoegaze'],
              coverUrl: 'https://sun9-67.userapi.com/s/v1/ig1/vIaXOGucmmrU0pGndvNrl0wNiUyuEBMIPp4ztxDujH6qCqnyW6f0rX9Kt0clPZZ9AqPJTKpG.jpg?size=1080x1080&quality=96&type=album',
              year: 2020,
              tracks: [
                {
                  id: 1,
                  length: 4.24,
                  name: 'things that never happened',
                },
                {
                  id: 2,
                  length: 4.24,
                  name: 'dream.',
                },
                {
                  id: 3,
                  length: 4.24,
                  name: 'as bright as the sky',
                },
                {
                  id: 4,
                  length: 4.24,
                  name: 'soulshine',
                },
              ],
            },
          ],
        },
      ] as Band[],
    }
  ),
  actions: {
  },
});
