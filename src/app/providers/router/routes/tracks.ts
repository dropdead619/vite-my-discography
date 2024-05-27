import type { RouteRecordRaw } from 'vue-router';

export const routeName = 'TracksPage';

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/:albumId/tracks/',
  component: () => import('@/pages/tracks'),
};
