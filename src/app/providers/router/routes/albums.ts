import type { RouteRecordRaw } from 'vue-router';

export const routeName = 'AlbumsPage';

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/albums/:bandId',
  component: () => import('@/pages/albums'),
};
