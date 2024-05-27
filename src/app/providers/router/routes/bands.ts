import type { RouteRecordRaw } from 'vue-router';

export const routeName = 'BandsPage';

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/',
  component: () => import('@/pages/bands'),
};
