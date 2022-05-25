import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: {
      name: 'Bands',
    },
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
    component: () => import('@/layouts/TheBandLayout.vue'),
    children: [
      {
        path: '/bands/:id',
        name: 'BandsView',
        component: () => import('../pages/BandsView.vue'),
        meta: {
          title: 'View band',
        },
      },
      {
        path: '/bands/:id/add',
        name: 'BandsAddAlbum',
        component: () => import('../pages/BandsAddAlbum.vue'),
        meta: {
          title: 'Add Album',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Error404',
    meta: {
      title: 'Error 404 | Page not found',
    },
    component: () => import('../pages/Error404.vue'),
  },
];
