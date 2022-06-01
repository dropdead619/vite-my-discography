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
    ],
  },
  {
    path: '/albums/:id',
    name: 'AlbumView',
    component: () => import('../pages/albums/AlbumView.vue'),
    meta: {
      title: 'Artist album',
    },
  },
  {
    path: '/albums/add/:id',
    name: 'AlbumAdd',
    props: true,
    component: () => import('../pages/albums/AlbumAdd.vue'),
    meta: {
      title: 'Add Album',
    },
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
