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
  },

  {
    path: '/bands/:id',
    component: () => import('@/layouts/TheBandLayout.vue'),
    children: [
      {
        path: '/bands/:id',
        name: 'BandsView',
        component: () => import('../pages/BandsView.vue'),
      },
    ],
  },
  {
    path: '/albums/:id',
    name: 'AlbumView',
    component: () => import('../pages/albums/AlbumView.vue'),
  },
  {
    path: '/albums/add/:id',
    name: 'AlbumAdd',
    props: true,
    component: () => import('../pages/albums/AlbumAdd.vue'),
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
