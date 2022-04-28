import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: {
      name: 'Bands'
    }
  },
  {
    path: '/bands',
    name: 'Bands',
    component: () => import('../pages/BandsMain.vue'),
    meta: {
      title: 'My Bands',
    },
  },
  {
    path: '/bands/:id',
    name: 'BandsView',
    component: () => import('../pages/BandsView.vue'),
    meta: {
      title: 'My Bands',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Error404',
    meta: {
      title: 'Ошибка 404 | Страница не найдена',
    },
    component: () => import('../pages/Error404.vue'),
  },
];